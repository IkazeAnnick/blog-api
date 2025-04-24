const Blog = require('../models/Blog');
module.exports = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    if (blog.author.toString() === req.user.id || req.user.role === 'admin') {
      req.blog = blog;
      return next();
    }

    return res.status(403).json({ message: 'Not authorized to perform this action' });
  } catch (err) {
    console.error('Owner check error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};