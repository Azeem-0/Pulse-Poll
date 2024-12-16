// "use client";

// import { useNotificationStore } from "@/store/notificationStore";
// import { useUserStore } from "@/store/userStore";

// export const handleApiError = (error: any, message: string) => {
//     const { notifyError, notifyWarning } = useNotificationStore((state) => state);
//     const { resetUserSession } = useUserStore((state) => state);
//     if (error.name === "NotAllowedError") {
//         resetUserSession();
//         notifyError("Authentication cancelled.");
//     } else if (error.response?.data?.message) {
//         notifyError(error.response.data.message);
//     } else {
//         notifyWarning(message);
//         console.error(error);
//     }
// };

// Modify the handleApiError to accept the necessary functions as arguments
export const handleApiError = (
    error: any,
    message: string,
    notifyError: (message: string) => void,
    notifyWarning: (message: string) => void,
    resetUserSession: () => void
) => {

    console.log(error);
    if (error.name === "NotAllowedError") {
        resetUserSession();
        notifyError(message);
    } else if (error.response?.data) {
        if (error.response.data.error === "Unauthorized") {
            resetUserSession();
            notifyError(error.response.data.message);
        }
        else {
            notifyError(error.response.data);
        }
    } else {
        notifyWarning(message);
        console.error(error);
    }
};
