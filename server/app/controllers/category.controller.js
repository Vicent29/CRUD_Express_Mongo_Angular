const { category } = require("../models");
const db = require("../models");
const Category = db.category;

// Create and Save a new Category
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.id_cat) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  try {
    // Create a Category
    const category = new Category({
      id_cat: req.body.id_cat || null,
      cat_name: req.body.cat_name || null,
    });
    await category.save();
    res.send(category);
  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};

// Retrieve all Categories from the database.
exports.findAll = async (req, res) => {
  try {
    const id_cat = req.body.id_cat;
    var condition = id_cat ? { id_cat: { $regex: new RegExp(id_cat), $options: "i" } } : {};

    const category = await Category.find(condition);
    res.json(category)
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {

  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ msg: 'No existe la categoria' })
    }

    res.json(category)

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }

};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  try {
    const { id_cat, cat_name } = req.body;
    let category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ msg: 'No existe el category' })
    }

    category.id_cat = id_cat;
    category.cat_name = cat_name;

    category = await Category.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    res.json(category)

  } catch (error) {
    res.status(404).send({
      message: `Cannot update Tutorial with id=${req.params.id}. Maybe Tutorial was not found!`
    });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {

    let category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ msg: 'No existe la categoria' })
    }

    await Category.findByIdAndRemove(id, { useFindAndModify: false })

    res.send({ msg: 'Category eliminado con éxito!' })


  } catch (error) {
    res.status(404).send({
      message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
    });
  }
};

// Delete all Categories from the database.

exports.deleteAll = async (req, res) => {

  try {
    const deleteALL = await Category.collection.drop();
    res.send({ msg: 'Category were deleted successfully' })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all product."
    });
  }
}

// Find all published Tutorials
exports.findAllPublished = async (req, res) => {
  try {
    Category.find({ published: true })
    res.json(data);
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  }
};
