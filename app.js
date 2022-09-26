// Imports
const T = require("tesseract.js");
const express = require("express");
const app = express();
const fs = require("fs");
const multer = require('multer');
const { requires, react } = require("consolidate");
const { request } = require("http");
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
app.get("/resultado", (req, res) => {
    res.render("resultado")
})
//Funciones
app.post("/upload", (req, res) => {
    upload(req, res, err => {
        fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
            if (err) return console.log('Este es el error: ' + err); 
            T.recognize(data, "spa", { logger: (m) => resultado(m) })
            .then(result => {
                fs.writeFile('Resultado.txt', result.text, (error)=> {
                    if(error){
                        throw error;
                    }
                    console.log('Archivo creado exitosamente')
                    res.redirect("/dowload");
                } )
            })
        });
    });
});
app.get('/dowload', (req, res) => {
    const file = `${__dirname}/Resultado.txt`
    res.download(file);
});
//Iniciar server
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})
