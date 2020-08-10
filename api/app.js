const express = require('express')
const multer = require('multer')
const fs = require('fs') 
const cors = require('cors')

const app = express()
app.use(cors())


var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, 'data.txt' )
    }
})

var upload = multer({ storage: storage }).single('file')


app.post('/upload',function(req, res) {
    
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
    //Read from file here
    
    var Data = fs.readFileSync('./public/data.txt', 'utf-8');

    return res.send(Data.split('\n'))

    })

});


app.post('/demo', (req, res) => {

	var Data = fs.readFileSync('./public/data.txt', 'utf-8');

    return res.send(Data.split('\n'))

})



app.get('/', (req, res) => {
	res.send('hello world')
});

app.listen(8080)