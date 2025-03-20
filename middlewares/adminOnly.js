export const adminOnly = (req, res, next) => {
    if(req.user.rol !== 1){
      return res.status(403).json({ message: "Acceso denegado, solo administradores." });
    }
    next();
}
  