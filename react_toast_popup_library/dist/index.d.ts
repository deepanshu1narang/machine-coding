import { JSX } from 'react';

type PositionType = "bottom-left" | "bottom-right" | "top-left" | "top-right";
interface NotificationProps {
    type: "success" | "info" | "warning" | "error";
    message: string;
    duration: number;
    onClose?: () => void;
    animation?: "fade" | "pop" | "slide";
}
interface UseNotificationReturn {
    NotificationComponent: JSX.Element;
    triggerNotification: (notificationProps: NotificationProps) => void;
}

declare const useNotification: (position?: PositionType) => UseNotificationReturn;

export { useNotification as default };
