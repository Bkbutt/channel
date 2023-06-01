const mongoose= require('mongoose');
 mongoose.set('strictQuery', true);
 const db= process.env.databaseurl;
 mongoose.connect(db)
 .then(()=>console.log("connection Successfull"))
 .catch((err)=>console.log('Unable to connect',err));
// const mongoose = require('mongoose');

// async function connectDb() {
//     try {
//         await mongoose.connect(process.env.databaseurl, {
//             useNewUrlParser: true
//         });
//         console.log("Database connected successfully!")
//     } catch (error) {
//         console.log(error);
//         process.exit();
//     }
// }

// module.exports = connectDb;