const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');
const ownerCheck = require('../middleware/ownerCheck');
router.get(
  '/',
  blogController.getAllBlogs
);
router.get(
  '/:id',
  blogController.getBlogById
);
router.get(
  '/category/:categoryId',
  blogController.getBlogsByCategory
);
router.post(
  '/',
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    check('category', 'Category is required').isMongoId()
  ],
  blogController.createBlog
);
router.put(
  '/:id',
  auth,
  ownerCheck,
  [
    check('title', 'Title is required').optional().not().isEmpty(),
    check('content', 'Content is required').optional().not().isEmpty(),
    check('category', 'Invalid category ID').optional().isMongoId()
  ],
  blogController.updateBlog
);
router.delete(
  '/:id',
  auth,
  ownerCheck,
  blogController.deleteBlog
);

module.exports = router;