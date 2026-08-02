import express from 'express';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route GET /api/projects (PUBLIC - koi bhi dekh sakta hai)
router.get('/', async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 });
  res.json(projects);
});

// @route POST /api/projects (ADMIN only - naya project add karna)
router.post('/', protect, async (req, res) => {
  const { title, description, imageUrl, category } = req.body;
  const project = await Project.create({ title, description, imageUrl, category });
  res.status(201).json(project);
});

// @route DELETE /api/projects/:id (ADMIN only - project delete karna)
router.delete('/:id', protect, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted successfully' });
});

// @route PUT /api/projects/:id
// @desc Update a project (Admin only)
router.put('/:id', protect, async (req, res) => {
  const { title, description, imageUrl, category } = req.body;

  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update only the fields that are provided
    project.title = title || project.title;
    project.description = description || project.description;
    project.imageUrl = imageUrl || project.imageUrl;
    project.category = category || project.category;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;