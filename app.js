const express = require("express"); // Importa ExpressJS. Más info de Express en =>https://expressjs.com/es/starter/hello-world.html

const cors = require("cors");

const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

app.use(cors());

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

const fs = require ('fs')

app.get("/", (req, res) => {
    // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
    res.send("<h1>Bienvenid@ al servidor</h1>");
  });

app.get("/api/:category", (req, res) => {
  const DATOS = require("./api/"+req.params.category+"/cat.json"); 
  res.json(DATOS);
});

app.get("/api/:category/:index", (req, res) => {
  const DATOS = require("./api/"+req.params.category+"/"+req.params.index+".json"); 
  res.json(DATOS);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});