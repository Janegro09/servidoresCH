const express = require('express');
const app     = express();
const port = 8080;

const frase   = 'Hola mundo como están';


app.get('/productos', function (req, res) {
  
    res.send({frase})
  
})

app.get('/productosRandom', function (req, res) {
  
  const id = parseInt(req.params.id);

  if(isNaN(id)){
    res.send({error: "parametro invalido"})      
  }

  if(id) {
    if (id < 0 || id > frase.length) {
      res.send({error: "parametro invalido"})      
    } else {
      res.send(frase[id])
    }
  } else {
    res.send(frase)
  }
})
 
app.listen(port, () => {
  console.log(`Corriendo en http://localhost:${port}`)
})