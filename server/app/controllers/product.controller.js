const { product } = require("../models");
const db = require("../models");
const Product = db.product;
const serializeProduct = require("./serializers/product_serializers")

// Create and Save a new Product
exports.create = async (req, res) => {
  if (!req.body.prod_nom) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  try {
    let product = new Product({
      prod_nom: req.body.prod_nom || null,
      id_prod_typ: req.body.id_prod_typ || null,
      prod_desc: req.body.prod_desc || null,
      precio: req.body.precio || null,
      id_prod_cat: req.body.id_prod_cat || null
    });
    console.log(product);
    await product.save();
    res.send(product);

  } catch (error) {
    console.log(error);
    res.status(500).send('You have error in Create and Save Product ');
  }
}

// Find all Products from the database.
exports.findAll = async (req, res) => {

  try {
    const prod_nom = req.body.prod_nom;
    var condition = prod_nom ? { prod_nom: { $regex: new RegExp(prod_nom), $options: "i" } } : {};

    const data_producto = await Product.find(condition);
    res.json(serializeProduct.serializeAllProcucts(data_producto));

  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  }
};

// Find a one Product with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findById(id)
    if (!product)
      res.status(404).send({ message: "Not found Tutorial with id " + id });
    else {
      res.send(product);
      // res.json(serializeProduct.serializeOneProcuct(product));
    } 
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error retrieving Tutorial with id=" + id });
  }
};
// Update a Products by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  try {
    const { prod_nom, id_prod_typ, prod_desc, precio, id_prod_cat } = req.body;

    let product = await Category.findById(req.params.id);

    if (!product) {
      res.status(404).json({ msg: 'No existe el category' })
    }

    product.prod_nom = prod_nom;
    product.id_prod_typ = id_prod_typ;
    product.prod_desc = prod_desc;
    product.precio = precio;
    product.id_prod_cat = id_prod_cat;

    product = await Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    res.json(product)

  } catch (error) {
    res.status(404).send({
      message: `Cannot update Product with id=${id}. Maybe Product was not found!`
    });
  }
};

// Delete a Products with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {

    let product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ msg: 'No existe la categoria' })
    }

    await Product.findByIdAndRemove(id, { useFindAndModify: false })

    res.send({ msg: 'Product eliminado con éxito!' })


  } catch (error) {
    res.status(404).send({
      message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
    });
  }
};

// Delete all Products from the database.
exports.deleteAll = async (req, res) => {
  try {
    const deleteALL = await Product.collection.drop();
    res.send({ msg: 'Product were deleted successfully' })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all product."
    });
  }
}

// Find all published Products
exports.findAllPublished = (req, res) => {
  Product.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
