import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import appRootPath from "path-root";
import cVRouter from "./src/routes/job.router"
const connectDb = require("./src/config/db");


import session from "express-session";


const PORT = 3000;

const app = express();
app.set("view engine", "ejs");
app.set('views', './src/views');


connectDb();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname,'../src', 'public')))
app.use('/cv',cVRouter);

app.listen(PORT, () => {

    console.log("App running on port: " + PORT)

})


