const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// Get all product routes 
router.get('/', (req, res) => {
    Product.findAll({
        include: {
            model: Category, Tag
        }
    }).then(productData => {
        res.json(productData)
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            msg: 'an error occured',
            err: err
        })
    })
});


// Get one product by its id
router.get('/:id', (req, res) => {
    Product.findByPk(req.params.id, {
        include: [
            {
                model: Category,
                through: ProductTag
            },
            {
                model: Tag,
                through: ProductTag
            }
        ]
    })
        .then(productData => {
            if (productData) {
                res.json(productData);
            } else {
                res.status(404).json({
                    msg: "No product found with the provided ID"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg: "An error occurred while retrieving the product data",
                err: err
            });
        });
});


// Post to create product
router.post('/', (req, res) => {
    Product.create(req.body)
        .then((product) => {
            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json('product has been created'))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});
// 
router.put('/:id', (req, res) => {
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {
            return ProductTag.findAll({ where: { product_id: req.params.id } });
        })
        .then((productTags) => {
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });
            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);

            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then((updatedProductTags) => res.json('product has been updated'))
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    }).then(productData => {
        res.json('product has been deleted')
    })
});

module.exports = router;
