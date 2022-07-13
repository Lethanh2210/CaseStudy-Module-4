"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cvSchema = void 0;
const mongoose_1 = require("mongoose");
const cvSchema = new mongoose_1.Schema({
    avatar: String,
    title: String,
    desc: String,
    duration: String
});
exports.cvSchema = cvSchema;
const CvModel = (0, mongoose_1.model)('account', cvSchema);
//# sourceMappingURL=cv.model.js.map