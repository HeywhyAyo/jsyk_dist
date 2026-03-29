"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rethrowIfHttpException = rethrowIfHttpException;
const common_1 = require("@nestjs/common");
const apiResponse_1 = require("./apiResponse");
const responseComment_1 = require("../constant/responseComment");
function rethrowIfHttpException(error) {
    console.log("Occured Error: ", error);
    if (error instanceof common_1.HttpException) {
        throw error;
    }
    const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(responseComment_1.COMMENT.INTERNAL_ERROR_COMMENT);
    throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
}
//# sourceMappingURL=rethrow-exception.js.map