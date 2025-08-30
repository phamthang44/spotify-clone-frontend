import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    verifyToken,
    resendVerification,
    getEmailFromRefreshToken,
    getUserStatus,
} from "../services/authService.js";
import { useToast } from "../../../core/contexts/ToastContext.jsx";
import Button from "../components/Common/Button.jsx";
import { useSelector } from "react-redux";

export default function VerifyEmailPage() {
    const { addToast } = useToast();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [status, setStatus] = useState("idle");
    const [verifyResult, setVerifyResult] = useState(null);
    const [resendStatus, setResendStatus] = useState("idle");

    const { email: emailFromStore } = useSelector((state) => state.verify);
    const [emailLocal, setEmailLocal] = useState(null);
    const [hasCalled, setHasCalled] = useState(false);
    // Gộp email từ store + local fallback
    const email = emailFromStore || emailLocal;

    // --- resend verification email ---
    const handleResendVerification = async () => {
        if (!email) return;
        setResendStatus("sending");
        try {
            await resendVerification(email);
            setResendStatus("sent");
            addToast.success("Verification email sent successfully!");
        } catch (err) {
            setResendStatus("error");
            addToast.error("Failed to resend verification email.");
        }
    };

    // --- verify token on mount ---
    useEffect(() => {
        if (hasCalled) return;
        setHasCalled(true);
        const verify = async () => {
            if (!token) {
                setVerifyResult({ status: "NO_TOKEN" });
                setStatus("error");

                // Nếu chưa có email trong store thì thử lấy qua refresh token
                if (!email) {
                    try {
                        const res = await getEmailFromRefreshToken();
                        if (res?.data) {
                            setEmailLocal(res.data);
                        }
                    } catch (err) {
                        console.error(err);
                    }
                }
                return;
            }

            setStatus("loading");
            try {
                const res = await verifyToken(token);
                setVerifyResult({ status: "VERIFIED" });
                setStatus("success");
                addToast.success(res?.message || "Your email has been verified!");
            } catch (err) {
                if (err.status === 401 && err.response?.data?.message?.includes("verification")) {
                    try {
                        const res = await getEmailFromRefreshToken();
                        if (res?.data) {
                            setEmailLocal(res.data);
                            const userStatus = await getUserStatus();
                            if (userStatus?.data === "active") {
                                setVerifyResult({ status: "ALREADY_VERIFIED" });
                            } else {
                                setVerifyResult({ status: "EXPIRED_TOKEN" });
                            }
                        } else {
                            setVerifyResult({ status: "EXPIRED_TOKEN" });
                        }
                    } catch {
                        setVerifyResult({ status: "INVALID_TOKEN" });
                    }
                } else {
                    setVerifyResult({ status: "INVALID_TOKEN" });
                }
                setStatus("error");
            }
        };

        verify();
    }, [token, email]); // nhớ include email để tránh bị stale

    return (
        <div className="w-150 h-150 bg-[#121212] flex flex-col justify-center items-center gap-6 rounded-lg p-6 text-center">
            {/* --- Loading --- */}
            {status === "loading" && <p className="text-white">Verifying your email...</p>}

            {/* --- VERIFIED --- */}
            {status === "success" && verifyResult?.status === "VERIFIED" && (
                <>
                    <p className="text-green-400 font-semibold">✅ Email verified successfully!</p>
                    <Button onClick={() => navigate("/login")} className="w-full h-12 bg-green-600 rounded-lg hover:bg-green-700">
                        <span className="text-white font-semibold">Go to Login</span>
                    </Button>
                </>
            )}

            {/* --- ALREADY_VERIFIED --- */}
            {status === "error" && verifyResult?.status === "ALREADY_VERIFIED" && (
                <>
                    <p className="text-yellow-400 font-semibold">⚠️ Your email is already verified!</p>
                    <Button onClick={() => navigate("/")} className="w-full h-12 bg-green-600 rounded-lg hover:bg-green-700">
                        <span className="text-black font-semibold">Go to Home</span>
                    </Button>
                </>
            )}

            {/* --- EXPIRED_TOKEN --- */}
            {status === "error" && verifyResult?.status === "EXPIRED_TOKEN" && (
                <div className="flex flex-col gap-4 w-full">
                    <p className="text-red-400 font-semibold">
                        ❌ Verification link expired. Resend verification email.
                    </p>
                    <Button
                        onClick={handleResendVerification}
                        disabled={resendStatus === "sending" || resendStatus === "sent"}
                        className="w-full h-12 bg-[#1ED760] rounded-lg hover:bg-[#3be477] cursor-pointer"
                    >
            <span className="text-black font-semibold">
              {resendStatus === "sending"
                  ? "Sending..."
                  : resendStatus === "sent"
                      ? "Sent! Check your inbox"
                      : "Send Verification"}
            </span>
                    </Button>
                </div>
            )}

            {/* --- INVALID_TOKEN --- */}
            {status === "error" && verifyResult?.status === "INVALID_TOKEN" && (
                <>
                    <p className="text-red-400 font-semibold">
                        ❌ Verification failed.{" "}
                        {email
                            ? "Please try again."
                            : "Your verification may have been deleted, expired or the link is invalid."}
                    </p>

                    {email ? (
                        <Button
                            onClick={handleResendVerification}
                            disabled={resendStatus === "sending" || resendStatus === "sent"}
                            className="w-full h-12 bg-[#1ED760] rounded-lg hover:bg-[#3be477] cursor-pointer"
                        >
              <span className="text-black font-semibold">
                {resendStatus === "sending"
                    ? "Sending..."
                    : resendStatus === "sent"
                        ? "Sent! Check your inbox"
                        : "Send Verification"}
              </span>
                        </Button>
                    ) : (
                        <Button
                            onClick={() => navigate("/login")}
                            className="w-100 h-12 bg-[#1ED760] rounded-lg hover:bg-[#3be477] cursor-pointer"
                        >
                            <span className="text-black font-semibold">Log in your account</span>
                        </Button>
                    )}
                </>
            )}

            {/* --- NO_TOKEN --- */}
            {status === "error" && verifyResult?.status === "NO_TOKEN" && (
                <>
                    <h1 className="text-white text-xl font-semibold">
                        Your account {email} is not verified yet!
                    </h1>
                    <Button
                        onClick={handleResendVerification}
                        disabled={resendStatus === "sending" || resendStatus === "sent"}
                        className="w-100 h-12 bg-[#1ED760] rounded-lg hover:bg-[#3be477] cursor-pointer"
                    >
            <span className="text-black font-semibold">
              {resendStatus === "sending"
                  ? "Sending..."
                  : resendStatus === "sent"
                      ? "Sent! Check your inbox"
                      : "Send Verification"}
            </span>
                    </Button>
                    <Button
                        onClick={() => navigate("/login")}
                        className="w-100 h-12 bg-[#1ED760] rounded-lg hover:bg-[#3be477] cursor-pointer"
                    >
                    <span className="text-black font-semibold">
                      Back to login
                    </span>
                    </Button>

                </>
            )}
        </div>
    );
}
