import { string } from "joi";
import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema({
    name:String,
    image:String
}) 



const propertiesSchema = new mongoose.Schema({
    name:{type:String,require:true},
    area:String,
    CarpetArea:String,
    EnclBalconyArea:String,
    TerraceBalconyArea:String,
    H_property:Boolean,
    UseableArea:String,
    SaleableArea:String,
    image:{type:Object,default:{}},
    Price:String,
    FC_Price:String,
    Type:String,
    P_Type:String,
    Location:String,
    LocationImage:String,
    Latitude:String,
    Longitude:String,
    DistinctiveAmenities:[amenitySchema],
    TotalFractions:Number,
    AvailableFractions:Number,
    Description:String,


});

const property = new mongoose.model("Properties",propertiesSchema);

export default property;
