import { toast } from "react-toastify";

interface ToastOptions {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning' | 'default';
    placement?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
    closeButton?: boolean;
    className?: string;
    autoClose?: number;
}

const useToast = () => {
    const showToast = ({
        message,
        type = 'default',
        placement = 'top-right',
        closeButton = false,
        className = 'px-4 py-2 w-max font-sans text-gray-300 text-sm',
        autoClose = 2000,
    }: ToastOptions) => {

        //@ts-ignore
        toast[type](message, {
            position: placement,
            closeButton,
            className,
            autoClose,
        });
    }
    return { showToast };
}

export default useToast;