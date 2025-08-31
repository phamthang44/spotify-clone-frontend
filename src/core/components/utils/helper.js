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
    },
    formatDateOfBirth: function(date) {
        if (!date) return null;

        const d = new Date(date); // date từ backend: "1995-08-31"

        // Option 1: dùng toLocaleDateString
        return d.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        // "31 Aug 1995"

        // Option 2: nếu muốn "August 31, 1995"
        /*
        return d.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        */
    },
    formatUppercaseFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    normalizeSearchResults: function (results) {
        return results.map((item) => {
            const { type, ...rest } = item;
            return {
                type,
                data: item[type]
            };
        });
    },

}