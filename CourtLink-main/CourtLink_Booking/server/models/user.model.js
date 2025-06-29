import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique: true},
    password:{type:String, required:true},
    suspended:{type:Boolean, default:false},
    suspendedAt:{type:Date},
    suspensionEndsAt:{type:Date},
    ip:{type:String},
    device:{type:String},
    bookings:[{type:mongoose.Schema.Types.ObjectId, ref:'Booking'}],
 }, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;