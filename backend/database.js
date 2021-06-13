import mongoose from 'mongoose';

const uri = process.env.DATABASE_URI || 'mongodb://localhost:27017/BelchoixDB';

const database = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err) => {
        if (err) {
            throw err.message;
        } else {
            console.log('Database Connected!')
        }
    })
}

export default database;