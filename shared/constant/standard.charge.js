"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TAX_RATE = exports.SHIPPING_FEES = exports.FEEs = void 0;
const shipment_methods_1 = require("../../orders/enum/shipment.methods");
exports.FEEs = {
    STANDARDAMOUNT: Number(process.env.STANDARDCARDCHARGE) ?? 700,
    withdrawalPercentage: Number(process.env.withdrawalPercentage),
    maximumAmountsMaxToFund: Number(process.env.maximumAmountsMaxToFund),
    maximumAmountsMaxToWithraw: Number(process.env.maximumAmountsMaxToWithraw),
    maximumAmountsMaxToTransfer: Number(process.env.maximumAmountsMaxToTransfer)
};
exports.SHIPPING_FEES = {
    [shipment_methods_1.ShippingMethod.STANDARD]: 2000,
    [shipment_methods_1.ShippingMethod.EXPRESS]: 5000,
    [shipment_methods_1.ShippingMethod.OVERNIGHT]: 10000,
    [shipment_methods_1.ShippingMethod.PICKUP]: 0,
};
exports.TAX_RATE = 0.075;
//# sourceMappingURL=standard.charge.js.map