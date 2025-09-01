import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    roleName: { type: String, required: true, lowercase: true, trim: true },
    tag: [{ type: String, required: true, trim: true }],
    userName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true },
    confirmNumber: { type: String, required: true },
    mail: { type: String, required: true, lowercase: true, trim: true },
    confirmMail: { type: String, required: true, lowercase: true, trim: true },
    userStatus: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);

export default Role;