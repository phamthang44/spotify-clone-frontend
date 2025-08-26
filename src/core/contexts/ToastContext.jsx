import toast, { Toaster } from 'react-hot-toast';
import { createContext, useContext } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const addToast = {
        success: (msg, options) => toast.success(msg, options),
        error: (msg, options) => toast.error(msg, options),
        info: (msg, options) => toast(msg, options),
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <Toaster position="top-right" reverseOrder={false} />
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
