const router = require('express').Router();
const { Tag, Product, ProductTag, } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: {
      // associated Product data
      model: Product,
      through: ProductTag
    }
  }).then((tagData) => {
    res.json(tagData)
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      msg: 'an error occured',
      err: err
    })
  })
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: {
      model: Product,
      through: ProductTag
    }
  }).then((tagData) => {
    if ((tagData)) {
      return res.json((tagData));
    } else {
      res.status(404).json({
        msg: "no Tag found"
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      msg: "an error occured,",
      err: err
    })
  })
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
    tagId: req.body.tagId
  }, {
    include: [{
      model: Product
    }]
  }).then((tagData) => {
    res.status(201).json((tagData))
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      msg: "an error occured, ",
      err: err
    })
  })
});


// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Category.update({
    tag_name: req.body.tag_name,
    tagId: req.body.tagId
  }, {
    where: {
      id: req.params.id
    }
  }).then((tagData) => {
    if ((tagData)[0]) {
      return res.json((tagData))
    } else {
      return res.status(404).json({ msg: "no Tag" })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      msg: "an error occured",
      err: err
    })
  })
});


// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then((ragData) => {
    if ((categoryData)) {
      return res.json(data)
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
