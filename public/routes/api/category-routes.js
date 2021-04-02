const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try{
    const allCategories =  await Category.findAll({
        include: {model: Product, attributes: ['product_name'],
    }
    })
    res.status(200).json(allCategories);
} catch (err) {
        res.status(500).json(err);
    }
})

// find one category by its `id` value
// be sure to include its associated Products

router.get('/:id', async (req, res) => {
    try{
    const categoryId = await Category.findByPk(req.params.id, {
        include: [{model: Product}],
    });
    if (!categoryId){
        res.status(404).json({message: 'No category found with that id.'});
        return;
    }
    res.status(200).json(categoryId);
} catch (err){
    res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
    try{
    const newCategory = await Category.create(req.body, {
    include: {model: Product, attributes: ['product_name'],
}
})
    res.status(200).json(newCategory);
} catch (err) {
    res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    const updateCategory = await Category.update(
        {
            category_name:req.body.category_name,
        },
        {
            where: {
                id: req.params.id,
            }
        }
    );
    return res.json(updateCategory);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryData= await Category.destroy({
      where: {
          id: req.params.id,
      },
  });
  return res.json(categoryData);
});

module.exports = router;
