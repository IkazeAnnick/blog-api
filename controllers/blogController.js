const { validationResult } = require('express-validator');
const Blog = require('../models/Blog');
const Category = require('../models/Category');
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .populate('category', 'name');
    
    res.json(blogs);
  } catch (err) {
    console.error('Get all blogs error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email')
      .populate('category', 'name');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (err) {
    console.error('Get blog by ID error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.getBlogsByCategory = async (req, res) => {
  try {
    const categoryExists = await Category.findById(req.params.categoryId);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const blogs = await Blog.find({ category: req.params.categoryId })
      .populate('author', 'name email')
      .populate('category', 'name');
    
    res.json(blogs);
  } catch (err) {
    console.error('Get blogs by category error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.createBlog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, category } = req.body;

  try {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Category not found' });
    }
    const blog = new Blog({
      title,
      content,
      author: req.user.id,
      category
    });

    await blog.save();
    await blog.populate('author', 'name email');
    await blog.populate('category', 'name');

    res.status(201).json({
      message: 'Blog created successfully',
      blog
    });
  } catch (err) {
    console.error('Create blog error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.updateBlog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const blog = req.blog;

  try {
    const { title, content, category } = req.body;
    
    if (title) blog.title = title;
    if (content) blog.content = content;
    
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Category not found' });
      }
      blog.category = category;
    }
    
    blog.updatedAt = Date.now();

    await blog.save();
    await blog.populate('author', 'name email');
    await blog.populate('category', 'name');

    res.json({
      message: 'Blog updated successfully',
      blog
    });
  } catch (err) {
    console.error('Update blog error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    await req.blog.deleteOne();
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Delete blog error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};