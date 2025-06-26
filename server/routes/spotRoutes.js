const express = require('express');
const router = express.Router();
const { Spot } = require('../models/spot');
const { Auth } = require('../middlewares/auth');

// Get all spots with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      city,
      country,
      search,
      difficulty,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = { isPublic: true };

    // Add filters
    if (category) query.category = category;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (country) query['location.country'] = new RegExp(country, 'i');
    if (difficulty) query.difficulty = difficulty;

    // Add text search
    if (search) {
      query.$text = { $search: search };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const spots = await Spot.find(query)
      .populate('createdBy', 'firstName lastName username')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Spot.countDocuments(query);

    res.json({
      spots,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    console.error('Error fetching spots:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get spots near a location
router.get('/nearby', async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 10000 } = req.query; // maxDistance in meters

    if (!longitude || !latitude) {
      return res.status(400).json({ error: 'Longitude and latitude are required' });
    }

    const spots = await Spot.find({
      isPublic: true,
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    })
    .populate('createdBy', 'firstName lastName username')
    .limit(20);

    res.json(spots);
  } catch (err) {
    console.error('Error fetching nearby spots:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single spot by ID
router.get('/:id', async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.id)
      .populate('createdBy', 'firstName lastName username');

    if (!spot) {
      return res.status(404).json({ error: 'Spot not found' });
    }

    res.json(spot);
  } catch (err) {
    console.error('Error fetching spot:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new spot (requires authentication)
router.post('/', Auth, async (req, res) => {
  try {
    const spotData = {
      ...req.body,
      createdBy: req.user.id
    };

    const newSpot = new Spot(spotData);
    const savedSpot = await newSpot.save();

    const populatedSpot = await Spot.findById(savedSpot._id)
      .populate('createdBy', 'firstName lastName username');

    res.status(201).json(populatedSpot);
  } catch (err) {
    console.error('Error creating spot:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update spot (requires authentication and ownership)
router.put('/:id', Auth, async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.id);

    if (!spot) {
      return res.status(404).json({ error: 'Spot not found' });
    }

    // Check if user owns the spot or is admin
    if (spot.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this spot' });
    }

    const updatedSpot = await Spot.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('createdBy', 'firstName lastName username');

    res.json(updatedSpot);
  } catch (err) {
    console.error('Error updating spot:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete spot (requires authentication and ownership)
router.delete('/:id', Auth, async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.id);

    if (!spot) {
      return res.status(404).json({ error: 'Spot not found' });
    }

    // Check if user owns the spot or is admin
    if (spot.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this spot' });
    }

    await Spot.findByIdAndDelete(req.params.id);
    res.json({ message: 'Spot deleted successfully' });
  } catch (err) {
    console.error('Error deleting spot:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get spots by user
router.get('/user/:userId', async (req, res) => {
  try {
    const spots = await Spot.find({ 
      createdBy: req.params.userId,
      isPublic: true 
    })
    .populate('createdBy', 'firstName lastName username')
    .sort({ createdAt: -1 });

    res.json(spots);
  } catch (err) {
    console.error('Error fetching user spots:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Spot.distinct('category');
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get featured spots
router.get('/featured/list', async (req, res) => {
  try {
    const featuredSpots = await Spot.find({ isPublic: true, featured: true })
      .populate('createdBy', 'firstName lastName username')
      .sort({ createdAt: -1 });
    res.json(featuredSpots);
  } catch (err) {
    console.error('Error fetching featured spots:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 