const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    const categoryData =  await Category.findAll().catch((err)=> {
        res.json(err);
    })
  // find all categories
  // be sure to include its associated Products
  res.json(categoryData);
});

router.get('/:id', async (req, res) => {
    const categoryId = await Category.findByPk(req.params.id);
  // find one category by its `id` value
  // be sure to include its associated Products
  return res.json(categoryId);
});

router.post('/', async (req, res) => {
    const newCategory = await Category.create(req.body);
  // create a new category
  return res.json(newCategory);
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
