export const empleadOnly = (req, res, next) => {
    if(req.user.rol !== 3){
      return res.status(403).json({ message: "Acceso denegado, solo empleados." });
    }
    next();
}
  