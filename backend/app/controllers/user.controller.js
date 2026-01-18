import userModel from "../model/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const { email } = req.body || {};

    const user = await userModel.findById(email);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        username: user.username,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

