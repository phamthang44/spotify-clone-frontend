export const format = {

    formatMessageBadCredentials : function (message) {
        if (message) {
            return message.substring(13);
        }
    },
    formatMessageInvalidExpiredRefreshToken : function (message) {
        if (message) {
            if (message.includes("invalid") || message.includes("expired") || message.includes("provided")) {
                return "Your session has expired. Please login again";
            }
        }
    }
}