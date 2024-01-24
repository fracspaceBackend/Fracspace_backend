import mongoose from "mongoose";

const connectToDatabase = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to the database successfully");
    } catch (error) {
        console.error(error);
        console.log("Could not connect to the database!");
    }
};

export default connectToDatabase;
