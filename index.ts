import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cVRouter from "./src/routes/job.router"
const connectDb = require("./src/config/db");
import authRoutes from "./src/routes/auth.router"
import session from "express-session";
import passport from "./src/controllers/passport";
import cookieParser from 'cookie-parser';
import auth from "./src/middlewares/auth.Middleware";


const PORT = 3000;

const app = express();
app.set("view engine", "ejs");
app.set('views', './src/views');


connectDb().catch(r => {
    console.log(r.message);
});


app.use(bodyParser.json());
app.use(cookieParser());


app.use('/public', express.static(path.join(__dirname,'../src', 'public')))
// app.use(express.static(__dirname+'/public/uploads'));
console.log(__dirname)
app.use(session({

    secret: 'SECRET',

    resave: false,

    saveUninitialized: true,

    cookie: { maxAge: 60 * 60 * 1000 }

}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(passport.session());

app.use("/cv", auth.authCheck, cVRouter);
app.use("/auth", authRoutes);

app.get('/', (req, res) => {
    res.render('home');
})


app.listen(PORT, () => {

    console.log("App running on port: " + PORT)

})

