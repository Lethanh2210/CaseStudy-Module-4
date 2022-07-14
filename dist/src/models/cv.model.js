"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobSchema = exports.CvModel = void 0;
const mongoose_1 = require("mongoose");
const jobSchema = new mongoose_1.Schema({
    avatar: String,
    name: String,
    title: String,
    salary: Number,
    location: String,
    desc: String,
    duration: String
});
exports.jobSchema = jobSchema;
exports.CvModel = (0, mongoose_1.model)('account', jobSchema);
//# sourceMappingURL=cv.model.js.map