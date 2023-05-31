export const RoleValidation = (req, res, next) => {
  try {
    const { role } = req?.body?.user;
    if (role !== "ADMIN_ROLE" || role !== "SUPER_ADMIN") {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized",
        });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
};
