"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRawEmailTemplate = getRawEmailTemplate;
exports.insertContentIntoEmail = insertContentIntoEmail;
exports.prepareHTML = prepareHTML;
const path = require("path");
const fs = require("fs");
const handlebars_1 = require("handlebars");
function getRawEmailTemplate(fileName) {
    return path.join(__dirname, "../../emailTemplate", fileName);
}
function insertContentIntoEmail(emailTemplate, templateVariables) {
    const compiledTemplate = handlebars_1.default.compile(fs.readFileSync(emailTemplate, "utf8"));
    return compiledTemplate({
        ...templateVariables,
        contactEmail: process.env.CONTACT_EMAIL,
    });
}
function prepareHTML(fileName, templateVariables) {
    const template = getRawEmailTemplate(fileName);
    return insertContentIntoEmail(template, templateVariables);
}
//# sourceMappingURL=insertContent.js.map