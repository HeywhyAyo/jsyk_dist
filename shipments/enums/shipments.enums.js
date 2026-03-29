"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrier = exports.ShipmentStatus = void 0;
var ShipmentStatus;
(function (ShipmentStatus) {
    ShipmentStatus["PREPARING"] = "PREPARING";
    ShipmentStatus["SHIPPED"] = "SHIPPED";
    ShipmentStatus["IN_TRANSIT"] = "IN_TRANSIT";
    ShipmentStatus["OUT_FOR_DELIVERY"] = "OUT_FOR_DELIVERY";
    ShipmentStatus["DELIVERED"] = "DELIVERED";
    ShipmentStatus["FAILED_DELIVERY"] = "FAILED_DELIVERY";
    ShipmentStatus["RETURNED"] = "RETURNED";
})(ShipmentStatus || (exports.ShipmentStatus = ShipmentStatus = {}));
var Carrier;
(function (Carrier) {
    Carrier["DHL"] = "DHL";
    Carrier["FEDEX"] = "FEDEX";
    Carrier["UPS"] = "UPS";
    Carrier["ARAMEX"] = "ARAMEX";
    Carrier["GIG_LOGISTICS"] = "GIG_LOGISTICS";
    Carrier["SENDBOX"] = "SENDBOX";
    Carrier["IN_STORE"] = "IN_STORE";
})(Carrier || (exports.Carrier = Carrier = {}));
//# sourceMappingURL=shipments.enums.js.map