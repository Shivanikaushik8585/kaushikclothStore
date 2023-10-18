const mongoose = require('mongoose');
module.exports= async() =>{
    const mongoURL= 'mongodb+srv://shivani:shivani@cluster0.xzoogns.mongodb.net/?retryWrites=true&w=majority'
    try{
        const connect= await mongoose.connect(mongoURL,{
       useUnifiedTopology:true,
       useNewUrlParser:true
    });
    console.log(`Moongodb connect ${connect.connection.host}`)
}catch(e){
    console.log(error);
    process.exit(1);

}
}