const swagger = require("./openapi");
const express = require("express");
const app = express();
const cors = require("cors");

const { shopsData, shopsIems, detailData } = require("./data");
const swaggerUI = require("swagger-ui-express");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swagger));

const PORT = 3001;
app.use(cors());
app.use(express.json());

const findShopBySlug = (slug) =>{
  return shopsData.find(item => item.slug === slug);
}


app.get("/api/catalog/", function (req, res) {
  res.send(shopsData);
});
app.get("/api/catalog/:shop", function (req, res) {
  const shop = findShopBySlug(req.params.shop)
  res.send({
    items:shopsIems,
    shop
  })
  res.send(shopsIems);
});
app.get("/api/catalog/:shop/:item", function (req, res) {
  
  const item = req.params.item
  const shop = findShopBySlug(req.params.shop)
  res.send({
    item:{
      ...detailData[`${item}`] 
    },
    shop
  })
  res.send(detailData[`${item}`]);
});



const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server app listening at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};
start();