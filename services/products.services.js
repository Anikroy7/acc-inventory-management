const Product = require('../models/Product');


exports.getProductServices = async (filters, queries) => {
    console.log(filters, queries.limit);
    const products = await Product
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)

    const total = await Product.countDocuments(filters);
    console.log(total);
    const page = Math.ceil(total / queries.limit)
    return { total, page, products };
}


exports.createProductServices = async (data) => {
    const result = await Product.create(data);
    return result;
}


exports.updateProductServiceById = async (updateId, doc) => {

    // first way
    const result = await Product.updateOne({ _id: updateId }, { $inc: doc }, { runValidators: true });
    return result;


    // second way
    /*  const product = await Product.findById(updateId);
     const result = await product.set(doc).save();
     return result; */
}


exports.bulkUpdateProductService = async (data) => {

    //--- first way
    // const result = await Product.updateMany({ _id: data.ids }, data.data, { runValidators: true });
    // return result;


    // --second way

    const products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data))
    });


    const result = Promise.all(products);

    return result;
}

exports.deleteProductServiceById = async (id) => {

    const result = await Product.deleteOne({ "_id": id });

    return result;

}


exports.bulkDeleteProductsService = async (ids) => {

    const result = await Product.deleteMany({ "_id": ids })

    return result;
}