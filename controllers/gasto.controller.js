const gastoServices = require('../service/gasto.service');


exports.crearGastos = async (req, res) => {
  try {
    const {monto, descripcion, fecha} = req.body;

    const IdUsuario = req.usuario.id;

    const IdGastoNuevo = await gastoServices.crearGastos(monto, descripcion, fecha, IdUsuario);
    
     return res.status(201).json({message: "Gasto creado exitosamente", id: IdGastoNuevo});

  } catch (error) {
    console.error("Error en crear gastos:", error.message);
    if(error.message === "VALIDATION_ERROR") {
      return res.status(400).json({message: "Todos los datos son obligatorios"});
    
    }
        return res.status(error.status || 500).json({error: message.error || "Error en el servidor" });
    
  }
};




exports.obtenerGastos = async (req, res) =>{
  try{

  
    const listaGastos = await gastoServices.obtenerGastos(idUsuario);


     return res.status(200).json({ message: "Gastos obtenidos con exito", total: listaGastos.length, gasto: listaGastos});  

  } catch(error){
    console.error("Error en la base de datos:", error)
    return res.status(error.status || 500).json({message: error.message || "error en el servidor"});

  }
};



exports.actualizarGastos = async (req, res) =>{
  try{

    const {Idgasto} = req.params;
    const IdUsuario = req.usuario.id;
     const gastoModificado = await gastoServices.actualizarGastos(Idgasto, req.body, IdUsuario);
      
      return res.status(200).json({message: "Gastos actualizados correctamente", gasto: gastoModificado});
     

    } catch(error){
      console.error("Error en la base de datos", error);

      return res.status(error.status || 500).json({message: error.message || "Ocurrio un error al actualizar tus datos"});

    }
};



exports.eliminarGastos = async (req, res) =>{
  try{

    const {Idgasto} = req.params;
    const IdUsuario = req.usuario.id
    
    const gastoEliminado = await gastoServices.eliminarGastos(Idgasto, IdUsuario);

      return res.tatus(200).json({message: "Gasto eliminado correctamente", datos: gastoEliminado});
      

    

  }catch(error){
    console.error("Error en la base de datos:", error);
    
    return res.status(error.status || 500).json({message: error.message || "Ocurrio un error al eliminar el gasto"});
  }
};
