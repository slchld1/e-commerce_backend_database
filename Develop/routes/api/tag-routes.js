const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      attributes: [
        'id',
        'tag_name'
      ],
      include: [
        {
          model: Product,
          attributes: [
            'product_name',
            'price',
            'stock',
            'category_id'
          ]
        }
      ]
    })
    res.json(tags);
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagsById = await Tag.findByPk(req.params.id, {
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
          attributes: [
            'product_name',
            'price',
            'stock',
            'category_id'
          ]
        }
      ]
    })
    if(!tagsById){
      res.status(404).json({message: "Tag not found."})
    }
    res.json(tagsById)
  }catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.json(newTag)
  } catch(err) {
    console.log(err)
    res.json(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if(!updateTag) {
      res.status(404).json({message: "Tag is not Found!"})
    }
    res.json(updateTag)
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTags = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    delTags => {
      if(!delTags) {
        res.status(404).json({message: "This Tag does not exist"})
      }
    }
    res.json(delTags)
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;
