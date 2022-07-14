"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const mongoose_1 = require("mongoose");
const accountSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    role: String,
    gmail: String,
    google: {
        id: {
            type: String,
        }
    }
});
const AccountModel = (0, mongoose_1.model)('account', accountSchema);
exports.AccountModel = AccountModel;
//# sourceMappingURL=account.model.js.map