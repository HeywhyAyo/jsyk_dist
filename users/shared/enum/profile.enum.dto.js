"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaritalStatus = exports.BloodGroup = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
    Gender["OTHER"] = "other";
})(Gender || (exports.Gender = Gender = {}));
var BloodGroup;
(function (BloodGroup) {
    BloodGroup["A_POS"] = "A+";
    BloodGroup["A_NEG"] = "A-";
    BloodGroup["B_POS"] = "B+";
    BloodGroup["B_NEG"] = "B-";
    BloodGroup["AB_POS"] = "AB+";
    BloodGroup["AB_NEG"] = "AB-";
    BloodGroup["O_POS"] = "O+";
    BloodGroup["O_NEG"] = "O-";
})(BloodGroup || (exports.BloodGroup = BloodGroup = {}));
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus["SINGLE"] = "Single";
    MaritalStatus["MARRIED"] = "Married";
    MaritalStatus["DIVORCED"] = "Divorced";
    MaritalStatus["WIDOWED"] = "Widowed";
})(MaritalStatus || (exports.MaritalStatus = MaritalStatus = {}));
//# sourceMappingURL=profile.enum.dto.js.map