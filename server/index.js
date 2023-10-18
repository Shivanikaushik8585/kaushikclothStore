const express = require('express');
const dotenv = require('dotenv');
dotenv.config('./.env');
const dbConnect = require('./dbConnect');
const authRouter =require('./routers/authRouter');
const postsRouter = require('./routers/postRouter')
const userRouter =require('./routers/userRouter');
const cors = require('cors');

const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const PORT =process.env.PORT ||4000;
const app = express();
dbConnect();
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))
app.use(express.json());
app.use(morgan('common'));
app.use(cookieparser());
app.use('/auth',authRouter);
app.use("/posts",postsRouter);

app.use("/user", userRouter);

app.get('/',(req,res)=>{
    res.status(200).send("Ok from server")
})

app.listen(PORT,()=>{
    console.log(`listening on post :${PORT}`);
});

