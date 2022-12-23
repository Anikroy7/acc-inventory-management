const {
    getProductServices,
    createProductServices,
    updateProductServiceById,
    bulkUpdateProductService,
    deleteProductServiceById,
    bulkDeleteProductsService
} = require("../services/products.services")

exports.getProducts = async (req, res, next) => {

    try {
        console.log(req.username, req.userID, 'inside get product');

        // filters

        let filters = { ...req.query };
        const excludeField = ['sort', 'limit', 'page']

        excludeField.forEach(field => delete filters[field])


        // gt, lt, gte, lte, ne

        let filterString = JSON.stringify(filters)
        filterString = filterString.replace(/\b(gt|lt|gte|lte)\b/g, match => (`$${match}`))
        filters = JSON.parse(filterString);



        // queries
        const queries = {};
        // sorts
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        // fields
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        }

        // pagination

        const { page = 1, limit = 2 } = req.query
        // console.log(page, limit, "form  quiry");
        const skip = (page - 1) * parseInt(limit)
        // console.log(skip, "skip");
        queries.skip = skip
        queries.limit = parseInt(limit)



        const products = await getProductServices(filters, queries)
        res.status(200).json({
            status: "Success",
            data: products
        })

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get data",
            error: error.message
        })
    }

}

exports.createProduct = async (req, res, next) => {

    try {
        // save or create
        // create
        const result = await createProductServices(req.body)

        result.logger()
        // instance creation -> do something-> use save() method
        // const product = new Product(req.body);
        // const result = await product.save()
        res.status(200).json({
            status: 'success',
            message: 'data post successfully',
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Data is not inserted",
            message: error.message
        })
    }
}

exports.updateAProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doc = req.body;
        const result = await updateProductServiceById(id, doc);

        res.status(200).json({
            status: "success",
            message: "product updated successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Couldn't update the product",
            error: error.message
        })
    }
}


exports.bulkUpdateProuducts = async (req, res, next) => {

    try {
        const result = await bulkUpdateProductService(req.body);
        res.status(200).json({
            status: "success",
            message: "Bulk update successfully",
            result: result
        })

    } catch (error) {

        res.status(400).json({
            status: "Failed",
            message: "Bulk_update failed",
            error: error.message
        })

    }
}



exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteProductServiceById(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "failed",
                error: "Couldn't found the product",
            })
        }

        res.status(200).json({
            status: "success",
            message: "Product deleted successfully",
            result: result
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Couldn't delete the product",
            error: error.message
        })
    }
}


// bulk delete the products

exports.bulkDeleteProducts = async (req, res, next) => {
    try {
        const result = await bulkDeleteProductsService(req.body.ids);

        res.status(200).json({
            status: "success",
            message: "Deleted the given product successfully",
            result: result
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Couldn't delete the given product",
            error: error.message
        })
    }
}