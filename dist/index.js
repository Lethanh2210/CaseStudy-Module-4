"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const job_router_1 = __importDefault(require("./src/routes/job.router"));
const connectDb = require("./src/config/db");
const auth_router_1 = __importDefault(require("./src/routes/auth.router"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./src/controllers/passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_Middleware_1 = __importDefault(require("./src/middlewares/auth.Middleware"));
const PORT = 3000;
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set('views', './src/views');
connectDb();
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/public', express_1.default.static(path_1.default.join(__dirname, '../src', 'public')));
app.use((0, express_session_1.default)({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/cv", auth_Middleware_1.default.authCheck, job_router_1.default);
app.use("/auth", auth_router_1.default);
app.get('/', (req, res) => {
    res.render('home');
});
app.listen(PORT, () => {
    console.log("App running on port: " + PORT);
});
//# sourceMappingURL=index.js.map