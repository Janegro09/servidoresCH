const express = require('express');
const app     = express();
const port = 8080;
const Contenedor = require('./main');
const nuevoProducto = new Contenedor("productos.txt");


app.get('/productos', function (req, res) {
    let c = nuevoProducto.getAll();
    res.send(d)
})

app.get('/productosRandom', function (req, res) {
  const todos = nuevoProducto.getAll();
  const largo = todos.length
  const id = Math.floor(Math.random() * (largo + 1))

  res.send(todos[id])      

})
 
app.listen(port, () => {
  console.log(`Corriendo en http://localhost:${port}`)
})