

export const adminMiddleware = (req, res, next) => {
  // Check if the user is authenticated
  try {

    // console.log("User Data:", req.user.isAdmin);
    const adminRole = req.user.isAdmin;

    if (!adminRole) {
      return res.status(403).json({
        status: "403",
        message: "Access Denied: Admins Only",
      });
    }
    next();

  } catch (error) {
    console.error("Admin Middleware Error:", error);
  }
}