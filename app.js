const express = require('express');
const app = express();
const helmet = require('helmet');

const usuarioRoutes = require('./routes/usuario.routes');
const gastoRoutes = require('./routes/gasto.routes');

app.use(express.json());
app.use(helmet());

app.use('/usuario', usuarioRoutes);
app.use('/gasto', gastoRoutes);


app.listen(3000, () => {
  console.log('servidor iniciado en el puerto: 3000');
});

























