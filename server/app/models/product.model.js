module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      prod_nom: String,
      id_prod_typ: String,
      prod_desc: String,
      precio: String,
      id_prod_cat: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", schema);
  return Product;
};
