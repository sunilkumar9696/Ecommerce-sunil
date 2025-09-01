import SuperAdmin from '../models/SuperAdmin.js';

export const verifySuperAdmin = async (req, res, next) => {
    try {
        // `verifyToken` must run before this middleware to set `req.user.id`
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not found in token' });
        }

        const admin = await SuperAdmin.findById(userId);
        if (!admin) {
            return res.status(403).json({ success: false, message: 'Forbidden: Not a super admin' });
        }

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};