const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
router.get(
  '/',
  categoryController.getAllCategories
);
router.get(
  '/:id',
  categoryController.getCategoryById
);
router.post(
  '/',
  auth,
  roleCheck(['admin']),
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
  ],
  categoryController.createCategory
);
router.put(
  '/:id',
  auth,
  roleCheck(['admin']),
  [
    check('name', 'Name is required').optional().not().isEmpty(),
    check('description', 'Description is required').optional().not().isEmpty()
  ],
  categoryController.updateCategory
);
router.delete(
  '/:id',
  auth,
  roleCheck(['admin']),
  categoryController.deleteCategory
);

module.exports = router;