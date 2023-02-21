const router = require('express').Router();
const apiRoutes = require('./api');
const categoryRoutes= require('./category-routes');
const productRoutes= require('./product-routes');
const tagRoutes=require('./tag-routes');

router.use('/api', apiRoutes);
router.use('/category-routes', categoryRoutes);
router.use('/product-routes', productRoutes);
router.use('/tag-routes', tagRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;