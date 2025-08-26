import { Spinner } from "@heroui/react";

export default function SpinnerLoading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Spinner size="lg" color="success" />
        </div>
    );
}