const mangoose = require('mongoose');

const enquirySchema = new mangoose.Schema({
    user:{
        type:mangoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{type:String,required:true},
    propertyName:{type:String,required:true},
    propertyFractionalPrice:{type:Number,required:true},
    enquiryDateTime:{type:Date,default:Date.now},
})
const Enquiry = mangoose.model("Enquiry",enquirySchema);
module.exports = Enquiry;