import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User,validate} from '../models/user.js';
import bcrypt from "bcrypt";

dotenv.config();


export const registerUser = async (req,res)=>{
    try{

    
        
        
 
        const user = await User.findOne({email:req.body.email});
        console.log("Hitted");
        if(user){
            return res
                      .status(409)
                      .send({message:"User with given email already Exist"});
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        await new User({...req.body,password:hashPassword}).save();

        res.status(201).send({message:"User created Successfully"});

    }catch(error){
         console.log(error);
         res.status(500).send({message:"Internal Server Error"});
    }


}

export const loginUser = async (req,res)=>{
    try{
        

        const user = await User.findOne({email:req.body.email});
        console.log(user);
        


        if(!user) return res.status(401).send({message:"User with Provided email does not exists!"});

        const validatePassword = await bcrypt.compare(req.body.password,user.password);
        console.log(validatePassword,"password");

        if(!validatePassword) return res.status(401).send({message:"Invalid Password"});

        const token = await user.generateAuthToken();

        res.status(200).send({data:token,message:"logged in successfull"});

    }catch(error){
        console.log("here at login");
        res.status(401).send({message:"unautherized User"});
    }
}

export const getUserDetails = async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(401).send({message:"User Not found!"});

        return res.status(200).send({data:user,message:"succesfully fetched users data"});

    }catch(error){
         
    }
}

export const forgotPassword = async (req, res) => {
    console.log(req.body);

    try {
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await User.updateOne(
            { email: email },
            { $set: { password: hashedPassword } }
        );

        if (result.nModified === 0) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error during password reset:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};


export const validateEmailPassword = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

