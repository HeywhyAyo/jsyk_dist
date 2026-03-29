"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = createResponse;
exports.createUnSuccessfulResponse = createUnSuccessfulResponse;
function createResponse(successful, message, data) {
    return { successful, message, data };
}
function createUnSuccessfulResponse(message) {
    return {
        data: null,
        message,
        successful: false,
    };
}
//# sourceMappingURL=apiResponse.js.map