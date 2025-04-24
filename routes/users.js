const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
router.get(
  '/',
  auth,
  roleCheck(['admin']),
  userController.getAllUsers
);
router.get(
  '/:id',
  auth,
  userController.getUserById
);
router.put(
  '/:id',
  auth,
  [
    check('name', 'Name is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
    check('role').optional().isIn(['author', 'admin'])
  ],
  userController.updateUser
);
router.delete(
  '/:id',
  auth,
  roleCheck(['admin']),
  userController.deleteUser
);

module.exports = router;