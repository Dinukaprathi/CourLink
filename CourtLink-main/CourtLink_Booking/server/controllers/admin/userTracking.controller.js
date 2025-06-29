import User from "../../models/user.model.js";

// Get all users with tracking information
export const getTrackedUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('name email createdAt suspended suspendedAt suspensionEndsAt ip device')
      .sort({ createdAt: -1 });

    // Check for expired suspensions and auto-unsuspend
    const now = new Date();
    const usersToUpdate = users.filter(user => 
      user.suspended && user.suspensionEndsAt && user.suspensionEndsAt < now
    );

    if (usersToUpdate.length > 0) {
      await User.updateMany(
        { _id: { $in: usersToUpdate.map(u => u._id) } },
        { 
          suspended: false, 
          suspendedAt: null, 
          suspensionEndsAt: null 
        }
      );
    }

    // Fetch updated users
    const updatedUsers = await User.find({})
      .select('name email createdAt suspended suspendedAt suspensionEndsAt ip device')
      .sort({ createdAt: -1 });

    // Use real data, fallback to "Unknown" if not available
    const usersWithTracking = updatedUsers.map(user => ({
      ...user.toObject(),
      ip: user.ip || "Unknown IP",
      device: user.device || "Unknown Device"
    }));

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users: usersWithTracking,
      total: usersWithTracking.length
    });
  } catch (error) {
    console.error("Error fetching tracked users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message
    });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message
    });
  }
};

// Suspend a user for 48 hours
export const suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.suspended) {
      return res.status(400).json({
        success: false,
        message: "User is already suspended"
      });
    }

    // Calculate suspension end time (48 hours from now)
    const now = new Date();
    const suspensionEndsAt = new Date(now.getTime() + (48 * 60 * 60 * 1000)); // 48 hours in milliseconds

    // Update user suspension status
    user.suspended = true;
    user.suspendedAt = now;
    user.suspensionEndsAt = suspensionEndsAt;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User suspended for 48 hours",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        suspended: user.suspended,
        suspendedAt: user.suspendedAt,
        suspensionEndsAt: user.suspensionEndsAt
      }
    });
  } catch (error) {
    console.error("Error suspending user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to suspend user",
      error: error.message
    });
  }
};

// Manually unsuspend a user (admin override)
export const unsuspendUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (!user.suspended) {
      return res.status(400).json({
        success: false,
        message: "User is not suspended"
      });
    }

    // Remove suspension
    user.suspended = false;
    user.suspendedAt = null;
    user.suspensionEndsAt = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User unsuspended successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        suspended: user.suspended
      }
    });
  } catch (error) {
    console.error("Error unsuspending user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to unsuspend user",
      error: error.message
    });
  }
}; 