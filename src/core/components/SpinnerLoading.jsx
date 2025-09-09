import { Spinner } from "@heroui/react";

export default function SpinnerLoading() {
    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <Spinner size="lg" color="success" />
        </div>
    );
}