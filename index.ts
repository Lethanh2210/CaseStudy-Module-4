import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import appRootPath from "path-root";



import session from "express-session";


const PORT = 3000;

const app = express();
app.set("view engine", "ejs");
app.set('views', './src/views');


const DB_URL = 'mongodb+srv://conbinhbe:Anhyeuem.123@modul4.a22t9.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URL)

    .then(() => console.log('DB Connected!'))

    .catch(error => console.log('DB connection error:', error.message));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname,'../src', 'public')))
console.log(__dirname,'======')
// app.use(session({
//
//     secret: 'SECRET',
//
//     resave: false,
//
//     saveUninitialized: true,
//
//     cookie: { maxAge: 60 * 60 * 1000 }
//
// }));






app.get('/', (req, res) => {
    res.render('home');
})





// app.use((req,res,next)=>{
//     res.status(400).render('error');
// })


app.listen(PORT, () => {

    console.log("App running on port: " + PORT)

})

