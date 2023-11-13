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

app.get("/api/101", (req, res) => {

  const autos = require("./api/101.json"); 
  res.json(autos);
});

app.get("/api/102", (req, res) => {
  
    const juguetes = require("./api/102.json"); 
    res.json(juguetes);
  });

app.get("/api/103", (req, res) => {

  const muebles = require("./api/103.json"); 
  res.json(muebles);
});

app.get("/api/104", (req, res) => {
  
    const herramientas = require("./api/104.json"); 
    res.json(herramientas);
});

app.get("/api/105", (req, res) => {
  
    const computadoras = require("./api/105.json"); 
    res.json(computadoras);
});

app.get("/api/106", (req, res) => {
  
    const vestimenta = require("./api/106.json"); 
    res.json(vestimenta);
});

app.get("/api/107", (req, res) => {
  
    const electrodomesticos = require("./api/107.json"); 
    res.json(electrodomesticos);
});

app.get("/api/108", (req, res) => {
  
    const deporte = require("./api/108.json"); 
    res.json(deporte);
});

app.get("/api/109", (req, res) => {
  
    const celulares = require("./api/109.json"); 
    res.json(celulares);
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});