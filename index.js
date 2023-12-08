const express = require("express");
const mysql = require ("mysql");
const cors = require ("cors");
const bodyparser = require("body-parser");
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use("/api",router);


// Crearemos la conexion a la base de datos

const db= mysql.createConnection({
    host: "localhost",
    user: "adminlacabana",
    password: "654321",
    database: "lacabana",
});


// Metodo listar
router.get("/", (req, res)=>{
    db.query("SELECT * FROM resenas",(error, resultado)=>{
        error ? console.log("Error", error): res.send(resultado);
    });
});

//Metodo Guardar

router.post("/",(req,res)=>{
    const nombre = req.body.nombre;
    const contenido = req.body.contenido;
    const fecha = new Date().toISOString();

db.query(
    "INSERT INTO resenas(nombre, contenido, fecha) VALUES(?,?,?);",
    [
        nombre,
        contenido,
        fecha
    ],
    (error, resultado) => {
        error
        ? console.log("Error: ", error)
        : res.send("Reseña guardada con éxito");
    }
);
});

// Metodo para actualizar

router.put("/", (req, res)=>{
    const nombre = req.body.nombre;
    const contenido = req.body.contenido;
    const fecha = new Date().toISOString();

db.query(
    "UPDATE resenas SET nombre=?, contenido=?, fecha=?",
    [
        nombre,
        contenido,
        fecha
    ],
    (error, resultado) => {
        error
        ? console.log("Error: ", error)
        : res.send("Rseña actualizada con éxito");
    }
);
});

// Metodo para eliminar
router.delete("/:id",(req, res)=>{
    const id = req.params.id;
    db.query("DELETE FROM resenas WHERE id=?",id,(error, resultado)=>{
        error? console.log("Error: ", error): res.send(resultado);
    });
});


//Inicilizando servidor

app.listen(3005,()=> console.log("Servidor funcionando en el puerto 3005"));


  