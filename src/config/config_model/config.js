require('dotenv').config();
const colors = require('colors');

const mongoose = require('mongoose');
const username = encodeURIComponent(process.env.MONGOOSE_HOST);
const password = encodeURIComponent(process.env.MONGOOSE_PASSWORD);

//const uri = `mongodb+srv://${username}:${password}@cluster0.z1rlzqm.mongodb.net/zalo?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${username}:${password}@cluster0.0sa5nya.mongodb.net/university_courses?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = `mongodb+srv://ngothai9a1:bNf7l3BFk38mtgMY@cluster0.0sa5nya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// const uri = `mongodb+srv://tranminhthuan7230:tranminhthuan7230@cluster0.i50kgui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = `mongodb+srv://thuan1280:thuan1280@cluster0.yvyxb2v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectNoSql() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!".italic.bgBrightGreen);
    } catch (err) {
        throw err;
    }
    // finally {
    //     // Ensures that the client will close when you finish/error
    //     await mongoose.disconnect();
    // }
}
module.exports = connectNoSql;
