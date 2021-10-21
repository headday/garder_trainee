const swagger = require('./openapi');
const express = require('express');
const app = express();
const cors = require('cors');

const swaggerUI = require('swagger-ui-express')


app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swagger))


const PORT = 3001;
app.use(cors());
app.use(express.json());



const obj = {
  name:'asdasd',
  age:'17',
  work:'IT'
}
app.get('/', function (req, res) {
  res.send(obj);  
});

const start = () =>{
  try {
    app.listen(PORT, () => {
      console.log(`Server app listening at http://localhost:${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
start();