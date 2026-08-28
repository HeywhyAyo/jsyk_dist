"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintifyWebhookDto = exports.PrintifyWebhookResourceDto = exports.PrintifyShipmentDataDto = exports.PrintifyCarrierDto = void 0;
class PrintifyCarrierDto {
    code;
    tracking_number;
    tracking_url;
}
exports.PrintifyCarrierDto = PrintifyCarrierDto;
class PrintifyShipmentDataDto {
    shop_id;
    shipped_at;
    delivered_at;
    carrier;
    skus;
}
exports.PrintifyShipmentDataDto = PrintifyShipmentDataDto;
class PrintifyWebhookResourceDto {
    id;
    type;
    data;
}
exports.PrintifyWebhookResourceDto = PrintifyWebhookResourceDto;
class PrintifyWebhookDto {
    id;
    type;
    created_at;
    resource;
}
exports.PrintifyWebhookDto = PrintifyWebhookDto;
//# sourceMappingURL=printify-webhook.dto.js.map