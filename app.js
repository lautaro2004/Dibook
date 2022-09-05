const T = require("tesseract.js")

T.recognize('./1.png', 'eng', {logger: e => console.log(e)})
    .then(out => console.log(out))

//Iniciar server
const PORT = 5000 || process.env.PORT;
