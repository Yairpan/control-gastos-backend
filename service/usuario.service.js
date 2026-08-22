const connection = require("../db")
const bcrypt = require("bcrypt")

const crearUsuario = async ({nombre, contraseña, email, edad}) =>{
    edad = parseInt(edad);

    if(!nombre || nombre.trim() === "" || !contraseña || contraseña.trim() === "" || !email || email.trim() === "" || !edad || isNaN(edad)){

        throw new Error("VALIDATION_ERROR")
    }

    const hash = await bcrypt.hash(contraseña,10)
try{
    const sql = "INSERT INTO usuario (nombre, contraseña, email, edad) VALUES (?,?,?,?)"
    const [result] = await dataBase.query(sql,[nombre, hash, email, edad]);

    if(!result.insertId) {
        const error = new Error("Error al crear usuario");
        error.status = 400;
        throw error;
    }


    return result.insertId

    } catch(errorDB) {

    if(errorDB === 'ER_DUP_ENTRY'){
        const error = new Error('Correo ya registrado')
        error.status = 400;
        throw error;
    }
    errorDB.status = 500;
    throw errorDB;
    }
}





const iniciarUsuario = async ({nombre, contraseña}) =>{
    const sql = "SELECT * FROM usuario WHERE nombre = ?";
    const [rows] = await dataBase.query(sql, [nombre]);

    if(rows.length === 0){
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
    }

    const usuario = rows[0];

    const esValido = await bcrypt.compare(contraseña, usuario.contraseña);

    if(!esValido) {
        const error = new Error("credenciales incorrectas")
        error.status = 401;
        throw error;
    }

    return usuario;
}





module.exports = {crearUsuario, iniciarUsuario};
