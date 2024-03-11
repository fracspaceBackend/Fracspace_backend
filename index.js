import express from 'express';
import dotenv from 'dotenv';
import userRouter from "./Routers/User/users.js";
import connectToDatabase from './config/db.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8003;

connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.send("API IS UP AND RUNNING .");
});
//routers
app.use('/api/users',userRouter);


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});
