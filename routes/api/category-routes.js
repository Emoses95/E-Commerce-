const router = require('express').Router();
const { Category, Product } = require('../../models');



// find all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: {
      //  associated Products
      model: Product
    }
  }).then((categoryData) => {
    res.json(categoryData)
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      msg: "an error occured",
      err: err
    })
  })
});

// find one category by its `id` value
router.get('/:id', (req, res) => {
  // Associated model included is Product
  Category.findByPk(req.params.id, {
    include: {
      model: Category,
      include: [Product]
    }
  }).then((categoryData) => {
    if ((categoryData)) {
      return res.json((categoryData));
    } else {
      res.status(404).json({
        msg: "no Prodcut"
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      msg: "an error occured",
      err: err
    })
  })
});

// create a new category
// router.post('/', (req, res) => {
//   Category.create(req.body)
//       .then((category) => {
//           return Category.findOneAndUPdate(
//               { id: req.body.id },
//               { category_name: req.body.category_name },
//               { $addToSet: { categorys: category_name } },
//               { new: true }
//           );
//       })
//       .then((category) =>
//           !category
//               ? res.status(200).json(`${category_name} has been created`)
//               : res.json('Created the Category')
//       )
//       .catch((err) => {
//           console.log(err);
//           res.status(500).json(err);
//       });
// });
router.post('/', (req, res) => {
  Category.create({
    categoryName: req.body.categoryName,
    categoryId: req.body.categoryId
  }, {
    include: [{
      model: Product
    }]
  }).then((categoryData) => {
    res.status(201).json((categoryData))
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      msg: "an error occured",
      err: err
    })
  })
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update({
    categoryName: req.body.categoryName,
    categoryId: req.body.categoryId
  }, {
    where: {
      id: req.params.id
    }
  }).then((categoryData) => {
    if ((categoryData)[0]) {
      return res.json((categoryData))
    } else {
      return res.status(404).json({ msg: "no such record" })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      msg: "an error occured",
      err: err
    })
  })
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then((categoryData) => {
    if ((categoryData)) {
      return res.json(categoryData)
    } else {
      return res.status(404).json({ msg: "no such record" })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      msg: "an error occured",
      err: err
    })
  })
});

module.exports = router;
