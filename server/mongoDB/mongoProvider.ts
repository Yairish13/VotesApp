import mongoose from 'mongoose';
require('dotenv').config();

const uri:string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluservoting.cohk6sf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set('useFindAndModify', false)

async function connectToDB(){ 
    mongoose
    .connect(uri, options)
    .then(() =>
    console.log('DB Connected')
    )
    .catch((error) => {
        throw error
    })
}

export default connectToDB;