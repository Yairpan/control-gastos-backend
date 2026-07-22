const jwt = require("jsonwebtoken")

const verificarToken = async(req, res, next) =>{
    try{
        const authHeader = req.headers["authorization"];

        if(!authHeader){
            return res.status(403).json({message: "Se requiere token"});
        }

        const token = authHeader.split(' ')[1];

        const decodificacion = jwt.verify(token, 'TU_CLAVE_SECRETA_AQUI');

        req.usuario = decodificacion

        console.log("middleware: Token valido. pasando al controlador");

        return next();

        
    } catch(error){
        console.error("Error verificando token:", error.message);
        return res.status(401).json({message: "Error interno verificando token"});
    }
    

   
};

const permitirRoles = (rolesPermetidos) =>{

    return (req, res, next) =>{
      if(!req.usuario || !rolesPermetidos.includes(req.usuario.rol)) {

        return res.status(403).json({message: 'No tienes permisos para realizar esta acccion'});


    }
        next();
    }

}





module.exports = {verificarToken, permitirRoles};


