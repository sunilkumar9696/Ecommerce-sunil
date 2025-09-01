import dotenv from 'dotenv';
dotenv.config({ override: true });

import SuperAdmin from '../models/SuperAdmin.js';
import twilio from 'twilio';
import jwt from 'jsonwebtoken';


const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Step 1: Request OTP (Register or Login)
export const requestOTP = async (req, res) => {
    try {
        const { mobile } = req.body;

        if (!mobile) return res.status(400).json({ message: 'Mobile number required' });

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 min 

        let superAdmin = await SuperAdmin.findOne({ mobile });
        if (!superAdmin) {
            superAdmin = new SuperAdmin({ mobile });
        }
        if (mobile !== superAdmin.preMobile) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Invalid mobile number'
            });
        }
        superAdmin.otp = otp;
        superAdmin.otpExpires = otpExpires;
        await superAdmin.save();

        // Send OTP via SMS
        await client.messages.create({
            body: `Your OTP For Super_Admin LOGIN is
            -->  ${otp}`,
            from: process.env.TWILIO_PHONE,
            to: mobile
        });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.log("Twilio error ", error);

        res.status(500).json({ error: error.message });
    }
};

// Step 2: Verify OTP & Generate Token
export const verifyOTP = async (req, res) => {
    try {
        const { mobile, otp } = req.body;
        const superAdmin = await SuperAdmin.findOne({ mobile });

        if (!superAdmin) return res.status(404).json({ message: 'SuperAdmin not found' });
        if (superAdmin.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
        if (superAdmin.otpExpires < Date.now()) return res.status(400).json({ message: 'OTP expired' });

        superAdmin.otp = null; // Clear OTP after successful verification
        superAdmin.otpExpires = null;
        await superAdmin.save();

        const token = jwt.sign(
            { id: superAdmin._id.toString(), mobile: superAdmin.mobile },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || '1d' }
        );


        res.status(200).json({ message: 'OTP verified successfully', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};