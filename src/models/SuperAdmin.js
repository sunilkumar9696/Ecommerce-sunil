import mongoose from 'mongoose';

const superAdminSchema = new mongoose.Schema({

    mobile: { type: String, required: true },

    firstName: { type: String, default: "sunil kumar" },
    lastName: { type: String, default: "patel" },
    email: { type: String, default: "superadmin@gmail.com" },
    preMobile: { type: String, default: "+917305761056", unique: true, trim: true }, //admin registered mobile number
    otp: String,
    otpExpires: Date
}, { timestamps: true });

const SuperAdmin = mongoose.model('SuperAdminSchema', superAdminSchema);

export default SuperAdmin;