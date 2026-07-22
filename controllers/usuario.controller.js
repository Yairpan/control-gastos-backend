const connection = require("../service/usuario.service");
const jwt = require ("jsonwebtoken");


exports.crearUsuario = async (req, res) =>{
  try{
      await usuarioService.crearUsuario(req.body)

      res.status(201).json({message: "Usuario creado exitosamente", id});

  } catch(error){
    console.error("Error en la base de datos:", error.message);
    res.status(error.status || 500).json({message: message.error || "Error interno en el servidor"});
    
  }
};



const iniciarUsuario = async (req, res) => {
  try {
    const { nombre, contraseña } = req.body;

    const usuario = await usuarioService.iniciarUsuario({nombre, contraseña,});

    const token = jwt.sign({id: usuario.id, nombre: usuario.nombre, rol: usuario.rol}, 'TU_CLAVE_SECRETA_AQUI', {expiresIn: '1h'});
    
    delete usuario.contraseña;

    res.status(200).json({message: "Login exitoso", usuario, token});

  } catch (error) {
    res.status(error.status || 500).json({message: error.message || "Error interno del servidor",});
  }
};




