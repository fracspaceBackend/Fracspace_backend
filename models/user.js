import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWTPRIVATEKEY, {
        expiresIn: "30d",
    });
    return token;
};

const User = mongoose.model("user", userSchema);

// const validate = (data) => {
//     try {
//         const schema = Joi.object({
//             userName: Joi.string().required().label("First Name"),
//             phoneNumber: Joi.string()
//                 .required()
//                 .label("phoneNumber")
//                 .message("Please Enter a valid phone number"),
//             email: Joi.string().email().required().label("Email"),
//             password: passwordComplexity().required().label("Password"),
//         });

//         const result = schema.validate(data);

//         if (result.error) {
//             console.error("Validation Error:", result.error.details);
//             throw new Error("Validation Error");
//         }

//         return result;
//     } catch (error) {
//         console.error("Unexpected Error:", error);
//         throw error;
//     }
// };
const validate = (data) => {
    try {
        const schema = Joi.object({
            userName: Joi.string().required().label("First Name"),
            phoneNumber: Joi.string()
                .required()
                .label("Phone Number")
                .message("Please Enter a valid phone number"),
            email: Joi.string().email().required().label("Email"),
            password: passwordComplexity().required().label("Password"),
        });

        const result = schema.validate(data, {
            abortEarly: false, // Include all errors, not just the first one
        });

        if (result.error) {
            const errorDetails = result.error.details.map((detail) => {
                return {
                    message: detail.message,
                    path: detail.path,
                };
            });
            console.error("Validation Error:", errorDetails);
            throw new Error("Validation Error");
        }

        return result;
    } catch (error) {
        console.error("Unexpected Error:", error);
        throw error;
    }
};



export { User, validate };
