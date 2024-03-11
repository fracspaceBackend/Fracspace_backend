import mongoose from "mongoose";

const connectToDatabase = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        let DB = "mongodb+srv://User:User2024@fracspace.f6hwucy.mongodb.net/Test-database?retryWrites=true&w=majority"
        mongoose.connect(process.env.DB|| DB);
        console.log("Connected to the database successfully");
    } catch (error) {
        console.error(error);
        console.log("Could not connect to the database!");
    }
};

export default connectToDatabase;
