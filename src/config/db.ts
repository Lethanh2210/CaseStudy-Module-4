const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://leduongthinh0107:thinh2000@cluster0.efmyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connect success')
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;