const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://conbinhbe:Anhyeuem.123@modul4.a22t9.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect success');
    }
    catch (err) {
        console.log(err);
    }
};
module.exports = connectDB;
//# sourceMappingURL=db.js.map