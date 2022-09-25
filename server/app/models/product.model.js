const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      slug: { type: String, lowercase: true, unique: true },
      prod_nom: String,
      id_prod_typ: String,
      prod_desc: String,
      precio: String,
      id_prod_cat: String,
    },
    { timestamps: true }
  );

  schema.plugin(uniqueValidator, { msg: "already taken" });

  schema.pre('validate', function (next) {
    if (!this.slug) {
      this.slugify();
    }

    next();
  });//pre

  schema.methods.slugify = function () {
    this.slug = slug(this.prod_nom) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
    console.log(this.slug);
  };//slugify

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", schema);
  return Product;
};
