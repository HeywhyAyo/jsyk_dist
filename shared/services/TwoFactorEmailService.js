"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTwoFactorStatusNotification = sendTwoFactorStatusNotification;
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
require("dotenv").config();
async function sendTwoFactorStatusNotification(recipient, name, status) {
    const responseData = {
        data: null,
        message: "",
        successful: false,
    };
    const Domain = process.env.BrevoDomain;
    const ApiKey = process.env.BrevoApiKey;
    const SenderEmail = process.env.BrevoSenderEmail;
    const SenderName = process.env.BrevoSenderName;
    if (Domain === undefined ||
        ApiKey === undefined ||
        SenderEmail === undefined ||
        SenderName === undefined) {
        responseData.message = "Missing Credentials";
        responseData.successful = false;
        return responseData;
    }
    const Subject = "Two Factor Authentication";
    const templatePath = path.join(__dirname, "../../emailTemplate/TwoFactor.html");
    const templateContent = fs.readFileSync(templatePath, "utf8");
    const compiledEmailTemplate = Handlebars.compile(templateContent);
    const htmlToSend = compiledEmailTemplate({ firstName: name, status });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("api-key", ApiKey ?? "");
    const sender = {
        email: SenderEmail,
        name: SenderName,
    };
    const towho = [{ name: name, email: recipient }];
    const sendinBlueEmailModel = {
        sender,
        subject: Subject,
        to: towho,
        htmlContent: htmlToSend,
    };
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(sendinBlueEmailModel),
    };
    try {
        const response = await fetch(Domain ?? "", requestOptions);
        const res = await response.json();
        if (!response.ok) {
            responseData.message = "Failed to send email";
            responseData.successful = false;
            return responseData;
        }
        responseData.message = "Verification email sent";
        responseData.successful = true;
        return responseData;
    }
    catch (error) {
        console.error(error);
        responseData.message = "Something went wrong";
        responseData.successful = false;
        return responseData;
    }
}
module.exports = { sendTwoFactorStatusNotification };
//# sourceMappingURL=TwoFactorEmailService.js.map