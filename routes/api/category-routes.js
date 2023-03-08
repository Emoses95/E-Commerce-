const router = require('express').Router();
const { Category, Product } = require('../../models');



router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      include: [Category]
    }
  }).then((categoryData) => {
    res.json(categoryData)
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      msg: "an error occured, sorry about that",
      err: err
    })
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: {
      model: Product,
      include: [Category]
    }
  }).then((categoryData) => {
    if ((categoryData)) {
      return res.json((categoryData));
    } else {
      res.status(404).json({
        msg: "no record found"
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      msg: "an error occured, sorry about that",
      err: err
    })
  })
});

router.post('/', (req, res) => {
  // create a new category
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
      msg: "an error occured, sorry about that",
      err: err
    })
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
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
      msg: "an error occured, sorry about that",
      err: err
    })
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then((categoryData) => {
    if ((categoryData)) {
      return res.json(data)
    } else {
      return res.status(404).json({ msg: "no such record" })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      msg: "an error occured, sorry about that",
      err: err
    })
  })
});

module.exports = router;
