const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const fileUpload = require('express-fileupload');
const htmlPath = __dirname + '/views/index.html'


// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(htmlPath);
});

app.post('/api/fileanalyse', async (req, res) => {
  try {
    if(!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let file = req.files.upfile;

      //Use the mv() method to place the file in the upload directory (i.e. "uploads")
      file.mv('./uploads/' + file.name);

      //send response
      res.json({
          name: file.name,
          type: file.mimetype,
          size: file.size
      })
    }
  } catch (err) {
    res.status(500).send(err);
  }
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
