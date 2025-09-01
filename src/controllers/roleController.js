import Role from '../models/Role.js';

// ✅ Create Role
export const createRole = async (req, res) => {
    try {
        const { roleName, tag, userName, phoneNumber, confirmNumber, mail, confirmMail, userStatus } = req.body;

        if (phoneNumber !== confirmNumber) {
            return res.status(400).json({ success: false, message: "Phone numbers do not match" });
        }
        if (mail !== confirmMail) {
            return res.status(400).json({ success: false, message: "Emails do not match" });
        }

        const role = await Role.create({ roleName, tag, userName, phoneNumber, confirmNumber, mail, confirmMail, userStatus });
        res.status(201).json({ success: true, message: "Role created successfully", data: role });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get All Roles
export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: roles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Single Role
export const getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return res.status(404).json({ success: false, message: "Role not found" });
        res.status(200).json({ success: true, data: role });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Role
export const updateRole = async (req, res) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedRole) return res.status(404).json({ success: false, message: "Role not found" });
        res.status(200).json({ success: true, message: "Role updated", data: updatedRole });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete Role
export const deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) return res.status(404).json({ success: false, message: "Role not found" });
        res.status(200).json({ success: true, message: "Role deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
