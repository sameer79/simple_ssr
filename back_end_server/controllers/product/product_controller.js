const uuid = require('uuid'); 
const HttpError = require('../../models/http-error');

const DUMMY_PRODUCTS = [];
const PROPERTIES = {
    ENCRYPTION: false
}

const getAllProducts = (req, res, next) => {
    res.status(200).json(DUMMY_PRODUCTS );
}

const getAllProperties = (req, res, next) => {
    res.status(200).json(PROPERTIES );
}

const createProduct = (req, res, next) => {
    const {title, price, description} = req.body;

    if (!title || title.trim().length === 0 || !price || price <= 0) {
        return res.status(422).json({
            message: 'Invalid input, please enter a valid title and price.'
        })
    }
    
    const createdProduct = {
        id: uuid.v4(),
        title,
        description: description || '',
        price
    }
    DUMMY_PRODUCTS.push(createdProduct);

    res
        .status(201)
        .json({
            message: 'Created new product.', product: createdProduct 
        });
}

const getProductById = (req, res, next) => {
    const {params: {id}} = req;
    const productId = id;
    if (productId) {
        return next( new HttpError('Could not find the product for the id ' + productId, 404));
    }
    res.json({message: productId + ' This is a product id..'})
}

const deleteProductById = (req, res, next) => {
    const {params: {id}} = req;
    const productIndex = DUMMY_PRODUCTS.findIndex(p => p.id == id);;
    if (productIndex == -1) {
        return next( new HttpError('Could not find the product for the id ' + id, 404));
    }
    DUMMY_PRODUCTS.splice(productIndex, 1);
    res.json({message: ' This is a product has been deleted successfully'})
}

exports.getAllProducts = getAllProducts;
exports.createProduct = createProduct;
exports.getProductById = getProductById;
exports.deleteProductById = deleteProductById;
exports.getAllProperties = getAllProperties;