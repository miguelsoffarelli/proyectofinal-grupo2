const express = require("express"); // Importa ExpressJS. Más info de Express en =>https://expressjs.com/es/starter/hello-world.html

const cors = require("cors");

const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

const jwt = require("jsonwebtoken");

const SECRET_KEY = "ODIO BOOTSTRAP";

const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "e-commerce",
  connectionLimit: 5,
});

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

app.post("/register", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO users(username, password) VALUE(?, ?)`,
      [req.body.username, req.body.password]
    );

    res.json({ id: parseInt(response.insertId), ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  }
});

app.get("/login", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `SELECT * FROM users`
    );
    res.json(response);   
  } catch (error) {
      res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release();
  };
});

app.post("/login", (req, res) => {
  const {username, password, auth} = req.body;
  if (auth){
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({message: "Usuario y/o contraseña incorrecto(s)"});
  };
});

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVlZWVlZSIsImlhdCI6MTcwMDY3ODQ3Mn0.gHkQyyJMLkc8tfxzR8oOtWbsl8BQrlrSitxmAvrfphk"

app.post("/cart", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(`
    INSERT into cart (user, id, image, name, unitCost, unitCount, currency) VALUE (?, ?, ?, ?, ?, ?, ?)
    `, [req.body.user, req.body.id, req.body.image, req.body.name, req.body.unitCost, req.body.unitCount, req.body.currency]);
    res.status(200).json({message: "Producto añadido al carrito"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  }
})

app.get("/cart/:user", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `SELECT * FROM cart WHERE user =?`,
      [req.params.user]
    );
    res.json(response);   
  } catch (error) {
      res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release();
  };
});

app.use("/cart", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).json({message: "Usuario no autorizado"});
  }
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

