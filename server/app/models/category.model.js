const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      slug: { type: String, lowercase: true, unique: true },
      id_cat: String,
      cat_name: String,
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
    this.slug = slug(this.cat_name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
    console.log(this.slug);
  };//slugify

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Category = mongoose.model("category", schema);
  return Category;
};
