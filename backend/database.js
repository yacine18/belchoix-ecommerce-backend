import mongoose from 'mongoose';

const uri = process.env.DATABASE_URI || 'mongodb+srv://yassine:yassine@cluster0.5fb3l.mongodb.net/BelchoixDB?retryWrites=true&w=majority';

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