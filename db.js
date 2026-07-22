const mysql = require('mysql2');


const dataBase = mysql.createPool ({

  host: '127.8.9.0',
  usaer: 'Yair',
  password: '',
  database: 'prueba',

});


connection.connect((err) =>{
  if(err) { throw error;
  }
 console.log('conexion a la base de datos exitosa')
});

module.exports = {dataBase};





















