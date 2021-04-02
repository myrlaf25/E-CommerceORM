const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
    try {
        const allTags = await Tag.findAll({
            include: [{ model: Product, through: ProductTag }]
        })
        res.status(200).json(allTags)
    } catch (err) {
        res.status(500).json(err);
    }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
    try {
        const tagId = await Tag.findByPk(req.params.id, {
            include: [{ model: Product, through: ProductTag }]
        });
        if (!tagId) {
            res.status(404).json({ message: 'No tag found with that id.' });
            return;
        }
        res.status(200).json(tagId);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new tag
router.post('/', async (req, res) => {
    try{
    const newTag = await Tag.create(req.body, {
        include: { model: Product, through: ProductTag },
        attribute: ['id', 'product_name', 'price', 'stock', 'category_id']
    })
    res.status(200).json(newCategory);
} catch (err) {
    res.status(500).json(err);
}
});


// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
    const updateTag = await Tag.update(
        {
            tag_name: req.body.tag_name,
        },
        {
            where: {
                id: req.params.id,
            }
        }
    );
    return res.json(updateTag);
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
    const tagData = await Tag.destroy({
        where: {
            id: req.params.id,
        },
    });
    return res.json(tagData);
});

module.exports = router;
