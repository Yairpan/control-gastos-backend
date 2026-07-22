const connection = require("../db")
const bcrypt = require("bcrypt")

const crearUsuario = async ({nombre, contraseña, email, edad}) =>{
    edad = parseInt(edad);

    if(!nombre || nombre.trim() === "" || !contraseña || contraseña.trim() === "" || !email || email.trim() === "" || !edad || isNaN(edad)){

        throw new Error("VALIDATION_ERROR")
    }

    const hash = await bcrypt.hash(contraseña,10)

    const sql = "INSERT INTO usuario (nombre, contraseña, email, edad) VALUES (?,?,?,?)"
    const [result] = await connection.query(sql,[nombre, hash, email, edad]);

    if(!result.insertId) {
        const error = new Error("Error al crear usuario");
        error.status = 500;
        throw error;
    }


    return result.insertId
}


// practicando

const connection = require('../db');
const bcrypt = require('bcrypt');

const crearUsuario = async ({nombre, contraseña, email, edad}) => {
    edad = parseFloat(edad);

    if(!nombre || nombre.trim() === "" || !contraseña || contraseña.trim() === "" || !email || email.trim() === "" || !edad || isNaN(edad)){

        throw new error("VALIDATION_ERROR")
    }



    const hash = await bcrypt.hash(contraseña, 10)

    const sql = "INSERT INTO usuario (nombre, contraseña, email, edad) VALUES (?,?,?,?)"
    const [result] = await connection.query(sql, [nombre, hash, email, edad]);

    if(result.insertId === 0) {
        const error = new Error ("Error al crear usuario");
        error.status = 500;
        throw error;
    }

    return result.insertId
}


// terminado



// practicando 2


const iniciarUsuario = async ({nombre, contraseña}) =>{
    const sql = "SELECT * FROM usuario WHERE nombre = ?";
    const [rows] = await connection.query(sql, [nombre]);

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

const iniciarUsuario = async ({nombre, contraseña}) =>{

    const sql = "SELECT * FROM usuario WHERE nombre = ?"
    const [rows] = await connection.query(sql,[nombre]);

    if(rows.length === 0){
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
    }


    const usuario = rows[0]

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if(!esValida){
        const error = new Error ("Credenciales incorrectas");
        error.status = 401;
        throw error;
    }

    return usuario;
}




module.exports = {crearUsuario, iniciarUsuario};