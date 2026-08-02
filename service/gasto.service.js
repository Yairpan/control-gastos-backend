const connection = require("../db");



const bcrypt = require('bcrypt'); 

const crearGastos = async ({ monto, descripcion, fecha, idUsuario }) => {

    const montoNumerico = parseFloat(monto);

    if (!montoNumerico || isNaN(montoNumerico) || !descripcion || descripcion.trim() === "") {
        const error = new Error('VALIDATION_ERROR');
        error.status = 400;
        throw error;
    } 
    
    const fechaFinal = fecha ? new Date(fecha) : new Date();

    try {
       
        const sql = "INSERT INTO gasto (monto, descripcion, fecha, idUsuario) VALUES (?,?,?,?)";
        
        
        const [result] = await connection.query(sql, [montoNumerico, descripcion, fechaFinal, idUsuario]);

        if (!result.insertId) {
            const error = new Error('Error al crear el gasto en el servidor');
            error.status = 500;
            throw error;
        }
        
        return result.insertId;

    } catch (errorDB) {
        if (errorDB.code === 'ER_DUP_ENTRY') {
            const error = new Error('Este registro ya existe en el sistema');
            error.status = 400;
            throw error;
        }

        errorDB.status = 500;
        throw errorDB;
    }
};


const obtenerGastos = async (idUsuario) =>{
    const sql = "SELECT * FROM gasto WHERE idUsuario = ? ORDER BY fecha DESC"
    const [rows] = await connection.query(sql);

    return rows;
};



const actualizarGastos = async ({monto, descripcion, fecha}, idUsuario, idGasto) =>{
    monto = parseFloat(monto);

    if(!monto || isNaN(monto) || !descripcion || !descripcion.trim() === ''){
        const error = new Error('VALIDATION_ERROR');
        error.status = 400;
        throw error;
    }

    const fechaFinal = fecha ? new Date(fecha) : new Date();


    const sql = "UPDATE gasto SET monto = ?, descripcion = ?, fecha = ? WHERE idGasto = ? AND IdUsusario = ?"
    const [result] = await connection.query(sql[monto, descripcion, fecha, idUsuario, idGasto]);

    if(result.affectedRows === 0){
        const error = new Error("Gasto no encontrado");
        error.status = 404;
        throw error;
    }



    return result;
};

const eliminarGastos = async (idGasto, IdUsuario) =>{
    const sql = "DELETE * FROM gastos WHERE idGasto = ? AND IdUsuario"

    const [result] = await connection.query(sql, [idGasto, IdUsuario]);

    if(result.affectedRows === 0){
        const error = new Error("Gasto no encontrado");
        error.status = 404;
        throw error;
    }

    return result;
};
































module.exports = {crearGastos, obtenerGastos, actualizarGastos, eliminarGastos};
