const router = require('express').Router();
const { Category, Product } = require('../models');


// get all
router.get('/', (req, res) => {

    Category.findAll({
        include: [Product]
    }).then(data => {
        res.json(data)
    })
});
// get category by id
router.get('/:id', (req, res) => {

    Category.findByPk(req.params.id, {
        include: [Product]
    }).then(data => {
        res.json(data)
    })
});

// create a new category
router.post('/', (req, res) => {
    Category.create(req.body)
        .then((category) => {
            return Category.findOneAndUPdate(
                { id: req.body.id },
                { category_name: req.body.category_name },
                { $addToSet: { categorys: category_name } },
                { new: true }
            );
        })
        .then((category) =>
            !category
                ? res.status(200).json(`${category_name} has been created`)
                : res.json('Created the Category')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update({
        category_name: req.body.category_name,
    }, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json('category has been updated')
    })
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json('category has been deleted')
    })
});

module.exports = router;