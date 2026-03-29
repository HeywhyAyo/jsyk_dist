"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJSYKTransactionRef = generateJSYKTransactionRef;
function generateJSYKTransactionRef() {
    const prefix = "JSYK";
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `${prefix}-${timestamp}-${randomPart}`;
}
//# sourceMappingURL=generate-txrefs.js.map