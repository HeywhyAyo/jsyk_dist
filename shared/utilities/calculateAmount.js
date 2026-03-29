"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateAmountWhenGivenPercentage = CalculateAmountWhenGivenPercentage;
function CalculateAmountWhenGivenPercentage(percentage, availableShares, pricePerShare, raisedAmount) {
    const numberOfShares = (percentage / 100) * availableShares;
    const amount = pricePerShare * numberOfShares;
    const newAvailableShares = availableShares - numberOfShares;
    const newRaisedAmount = raisedAmount + amount;
    return {
        newAvailableShares,
        newRaisedAmount,
        amount,
    };
}
//# sourceMappingURL=calculateAmount.js.map