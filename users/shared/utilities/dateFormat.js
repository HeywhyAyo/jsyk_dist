"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
}
//# sourceMappingURL=dateFormat.js.map