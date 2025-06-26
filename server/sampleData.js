const mongoose = require('mongoose');
const { Spot } = require('./models/spot');
const { User } = require('./models/user');
require('dotenv').config();

const sampleSpots = [
  {
    name: "Marine Drive Sunset Point",
    description: "A beautiful promenade in Mumbai, perfect for evening walks and watching the sunset over the Arabian Sea.",
    category: "nature",
    location: {
      coordinates: [72.8194, 18.9430],
      address: "Marine Drive",
      city: "Mumbai",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1504609813440-554e64a8f005?w=800&auto=format&fit=crop&q=80",
        caption: "Marine Drive at sunset"
      }
    ],
    rating: { average: 4.8, count: 120 },
    tags: ["sunset", "sea", "walk", "mumbai"],
    difficulty: "easy",
    bestTime: "evening",
    isPublic: true,
    isVerified: true,
    featured: true
  },
  {
    name: "Hauz Khas Village Hidden Lake",
    description: "A serene lake surrounded by greenery and ancient ruins, hidden in the heart of Delhi's Hauz Khas Village.",
    category: "hidden",
    location: {
      coordinates: [77.1926, 28.5535],
      address: "Hauz Khas Village",
      city: "Delhi",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&auto=format&fit=crop&q=80",
        caption: "Hidden lake in Hauz Khas"
      }
    ],
    rating: { average: 4.7, count: 85 },
    tags: ["lake", "ruins", "delhi", "hidden"],
    difficulty: "easy",
    bestTime: "morning",
    isPublic: true,
    isVerified: true,
    featured: true
  },
  {
    name: "Bangalore Street Art Alley",
    description: "A vibrant alley in Bangalore filled with colorful street art and murals by local artists.",
    category: "cultural",
    location: {
      coordinates: [77.5946, 12.9716],
      address: "Church Street",
      city: "Bangalore",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&auto=format&fit=crop&q=80",
        caption: "Street art in Bangalore"
      }
    ],
    rating: { average: 4.6, count: 60 },
    tags: ["art", "murals", "bangalore", "culture"],
    difficulty: "easy",
    bestTime: "afternoon",
    isPublic: true,
    isVerified: true,
    featured: true
  },
  {
    name: "Goa Secret Beach",
    description: "A secluded beach in South Goa, far from the crowds, with golden sand and clear blue water.",
    category: "nature",
    location: {
      coordinates: [74.1230, 15.2719],
      address: "Butterfly Beach",
      city: "Goa",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500&auto=format&fit=crop&q=80",
        caption: "Secluded beach in Goa"
      }
    ],
    rating: { average: 4.9, count: 40 },
    tags: ["beach", "goa", "secret", "nature"],
    difficulty: "medium",
    bestTime: "morning",
    isPublic: true,
    isVerified: true,
    featured: true
  },
  
  {
    name: "Varanasi Sunrise Ghat",
    description: "A peaceful ghat on the Ganges, perfect for watching the sunrise and morning rituals in Varanasi.",
    category: "photo",
    location: {
      coordinates: [83.0095, 25.3176],
      address: "Assi Ghat",
      city: "Varanasi",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500&auto=format&fit=crop&q=80",
        caption: "Sunrise at Assi Ghat"
      }
    ],
    rating: { average: 4.8, count: 70 },
    tags: ["sunrise", "varanasi", "ghat", "photo"],
    difficulty: "easy",
    bestTime: "morning",
    isPublic: true,
    isVerified: true
  },
  {
    name: "Shillong Living Root Bridge",
    description: "A natural bridge made from living tree roots, deep in the forests of Meghalaya. A true wonder of nature!",
    category: "adventure",
    location: {
      coordinates: [91.7066, 25.5760],
      address: "Nongriat Village",
      city: "Shillong",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&auto=format&fit=crop&q=80",
        caption: "Living root bridge in Meghalaya"
      }
    ],
    rating: { average: 4.9, count: 30 },
    tags: ["bridge", "meghalaya", "nature", "adventure"],
    difficulty: "hard",
    bestTime: "afternoon",
    isPublic: true,
    isVerified: true
  },
  {
    name: "Pune Hidden Bookstore",
    description: "A cozy, hidden bookstore in Pune with rare finds and a peaceful reading corner.",
    category: "hidden",
    location: {
      coordinates: [73.8567, 18.5204],
      address: "FC Road",
      city: "Pune",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
        caption: "Hidden bookstore in Pune"
      }
    ],
    rating: { average: 4.7, count: 25 },
    tags: ["bookstore", "pune", "hidden", "reading"],
    difficulty: "easy",
    bestTime: "afternoon",
    isPublic: true,
    isVerified: true
  }
];

const sampleUsers = [
  {
    firstName: "System",
    lastName: "User",
    username: "system",
    email: "system@sneakout.in",
    password: "sampledata"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.URI);
    console.log('Connected to MongoDB');
    await Spot.deleteMany({});
    await User.deleteMany({ username: 'system' });
    console.log('Cleared existing sample data');
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`Created ${createdUsers.length} system user`);
    const spotsWithUsers = sampleSpots.map((spot) => ({
      ...spot,
      createdBy: createdUsers[0]._id
    }));
    const createdSpots = await Spot.insertMany(spotsWithUsers);
    console.log(`Created ${createdSpots.length} Indian sample spots`);
    console.log('Sample data seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase(); 