const bodyParser = require('body-parser') // Interpreta os dados da requisição
const express = require('express')
const app = express()


app.use(express.static('.'))                        // Servindo os arquivos da pasta atual
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json())                          // caso tenha json na requisição, tranforma em objeto

const multer = require('multer')                    //Importando para interpretar o formulario do arquivo do upload

const storage = multer.diskStorage({                //Configurando pasta e arquivo  
    destination: function (req, file, callback) {   //Função para escolher a pasta destino
        callback(null, './upload')                  // Passando a pasta de destino ('.' = Pasta atual)
    },
    filename: function (req, file, callback) {               //Função para escolher o nome do arquivo
        callback(null, `${Date.now()}_${file.originalname}`) // Padronizando o nome do arquivo com a data atual + nome

    }
})

const upload = multer({ storage}).single('arquivo')     // Setando a chamada do storage em upload e passando o imput de arquivo

app.post('./upload',  (req, res) => {                   // Requisição do tipo Post
    upload(req, res, err => {                           // Função callback 
        if (err) {
            return res.end('Ocorreu um erro.')
        }
        res.end('Concluído com sucesso')
    })
})

app.listen(8080, () => console.log('Executando...')) // Startando o servidor