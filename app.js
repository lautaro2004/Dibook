// Imports
const T = require("tesseract.js");
const express = require("express");
const app = express();
const fs = require("fs");
const multer = require('multer');
const { requires } = require("consolidate");

//Almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage}).single("avatar");

// view engine setup
app.set('view engine', 'ejs');
app.use(express.static('public'))
//Rutas
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/scan", (req, res) => {
    res.render("scan")
})
app.get("/result", (req, res) => {
    res.render("result")
})
//Funciones
app.post("/upload", (req, res) => {
    upload(req, res, err => {
        fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
            if (err) return console.log('Este es el error: ' + err);
            T.recognize(data, "spa", { tessjs_create_pdf:"1" })
            .then(result => {
                res.send(result.text)
            })
            .finally(() => T.terminate());
        });
    });
});

//Iniciar server
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})
