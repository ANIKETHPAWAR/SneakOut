const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  description: {
    type: String,
    required: true,
    maxLength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: ['food', 'adventure', 'photo', 'hidden', 'cultural', 'nature', 'urban', 'other']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 2 && v[0] >= -180 && v[0] <= 180 && v[1] >= -90 && v[1] <= 90;
        },
        message: 'Coordinates must be [longitude, latitude] with valid ranges'
      }
    },
    address: {
      type: String,
      required: true,
      maxLength: 200
    },
    city: {
      type: String,
      required: true,
      maxLength: 50
    },
    country: {
      type: String,
      required: true,
      maxLength: 50
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      maxLength: 100
    }
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  tags: [{
    type: String,
    maxLength: 20
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  bestTime: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'night', 'anytime'],
    default: 'anytime'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

//  geospatial index for location-based queries
spotSchema.index({ 'location.coordinates': '2dsphere' });

//  text index for search functionality
spotSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
  'location.city': 'text',
  'location.country': 'text'
});

// Update the average rating when reviews are added/updated
spotSchema.methods.updateRating = function(newRating) {
  const totalRating = this.rating.average * this.rating.count + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

const Spot = mongoose.model('Spot', spotSchema);

module.exports = { Spot }; 