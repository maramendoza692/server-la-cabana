const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use("/api", router);

//Crear la conexion a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "vt_mgmr",
    password: "123456",
    database: "veterinaria"
});

//Metodo listar
router.get('/', (req, res) => {
    db.query("select * from Adopciones", (error, resultado) => {
        if (error) {
            console.log("Error: ", error);
            res.status(500).send("Error al obtener las adopciones");
        } else {
            res.send(resultado);
        }
    });
});

//Metodo guardar
router.post("/", (req, res) => {
    const nombreAdoptante = req.body.nombreAdoptante;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const domicilio = req.body.domicilio;
    const mascota = req.body.mascota;
    const carcarteristicas = req.body.carcarteristicas;
    const interesAdoptar = req.body.interesAdoptar;

    db.query("INSERT INTO Adopciones(nombre_adoptante, telefono, email, domicilio, mascota, caracteristicas, interes_adoptar) VALUES(?, ?, ?, ?, ?, ?, ?);",
        [
            nombreAdoptante,
            telefono,
            email,
            domicilio,
            mascota,
            carcarteristicas,
            interesAdoptar
        ],
        (error, resultado) => {
            error
                ? console.log("Error: ", error)
                : res.send("Adopcion registrada con exito");
        })
});

//Metodo para actualizar
router.put("/", (req, res) => {
    const id = req.body.id;
    const nombreAdoptante = req.body.nombreAdoptante;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const domicilio = req.body.domicilio;
    const mascota = req.body.mascota;
    const carcarteristicas = req.body.carcarteristicas;
    const interesAdoptar = req.body.interesde;
    console.log(interesAdoptar);

    db.query("UPDATE Adopciones SET nombre_adoptante=?, telefono=?, email=?, domicilio=?, mascota=?, caracteristicas=?, interes_adoptar=? WHERE id=?",
        [
            nombreAdoptante,
            telefono,
            email,
            domicilio,
            mascota,
            carcarteristicas,
            interesAdoptar,
            id
        ],
        (error, resultado) => {
            error
                ? console.log("Error: ", error)
                : res.send("Adopción actualixada con exito");
        })
})

router.delete("/:id", (req, res) =>{
    const id = req.params.id;

    db.query("DELETE FROM Adopciones WHERE id=?", id, (error, resultado) => {
        error ? console.log("Error: ", error) : res.send(resultado);
    })
})

//Inicializar servidor
app.listen(3005, ()=>console.log('Servidor funcionando en el puerto 3005'));