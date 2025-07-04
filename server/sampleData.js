const mongoose = require('mongoose');
const { Spot } = require('./models/spot');
const { User } = require('./models/user');
require('dotenv').config();

const sampleSpots = [
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
    isVerified: true,
    featured: true
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
    isVerified: true,
    featured: true
  },
  
  {
    name: "Rann of Kutch White Desert",
    description: "A surreal salt desert in Gujarat, famous for its vast white landscape and the Rann Utsav festival.",
    category: "nature",
    location: {
      coordinates: [70.1979, 23.7337],
      address: "Rann of Kutch",
      city: "Kutch",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=500&auto=format&fit=crop&q=80",
        caption: "White desert at Rann of Kutch"
      }
    ],
    rating: { average: 4.8, count: 55 },
    tags: ["desert", "kutch", "white", "nature"],
    difficulty: "medium",
    bestTime: "night",
    isPublic: true,
    isVerified: true,
    featured: true
  },
  {
    name: "Munnar Tea Gardens",
    description: "Endless rolling hills covered in lush tea plantations, misty mornings, and scenic viewpoints in Kerala.",
    category: "nature",
    location: {
      coordinates: [77.0595, 10.0889],
      address: "Munnar",
      city: "Munnar",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80",
        caption: "Tea gardens in Munnar"
      }
    ],
    rating: { average: 4.9, count: 80 },
    tags: ["tea", "munnar", "kerala", "nature"],
    difficulty: "easy",
    bestTime: "morning",
    isPublic: true,
    isVerified: true,
    featured: true
  },
  
  {
    name: "Darjeeling Toy Train",
    description: "A UNESCO World Heritage narrow-gauge railway with scenic mountain views and charming stations.",
    category: "adventure",
    location: {
      coordinates: [88.2627, 27.0360],
      address: "Darjeeling Himalayan Railway",
      city: "Darjeeling",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=500&auto=format&fit=crop&q=80",
        caption: "Toy train in Darjeeling"
      }
    ],
    rating: { average: 4.7, count: 65 },
    tags: ["train", "darjeeling", "mountain", "adventure"],
    difficulty: "easy",
    bestTime: "morning",
    isPublic: true,
    isVerified: true,
    featured: true
  },
  
  {
    name: "Andaman Havelock Island",
    description: "Crystal clear waters, white sand beaches, and coral reefs make Havelock Island a paradise for divers and beach lovers.",
    category: "nature",
    location: {
      coordinates: [93.0133, 11.9722],
      address: "Havelock Island",
      city: "Andaman",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80",
        caption: "Beach at Havelock Island"
      }
    ],
    rating: { average: 4.9, count: 75 },
    tags: ["andaman", "havelock", "beach", "nature"],
    difficulty: "easy",
    bestTime: "afternoon",
    isPublic: true,
    isVerified: true,
    featured: true
  },
  {
    name: "Cherrapunji Living Root Bridge",
    description: "A natural wonder in Meghalaya, these bridges are made from the roots of living trees and are unique to the region.",
    category: "adventure",
    location: {
      coordinates: [91.7308, 25.2986],
      address: "Cherrapunji",
      city: "Cherrapunji",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80",
        caption: "Living root bridge in Cherrapunji"
      }
    ],
    rating: { average: 4.8, count: 60 },
    tags: ["bridge", "meghalaya", "nature", "adventure"],
    difficulty: "hard",
    bestTime: "afternoon",
    isPublic: true,
    isVerified: true,
    featured: true
  },
  
  {
    name: "Pondicherry French Quarter",
    description: "Colorful colonial buildings, chic cafes, and a laid-back vibe make this area a must-visit in Pondicherry.",
    category: "urban",
    location: {
      coordinates: [79.8322, 11.9360],
      address: "White Town",
      city: "Pondicherry",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500&auto=format&fit=crop&q=80",
        caption: "French Quarter in Pondicherry"
      }
    ],
    rating: { average: 4.6, count: 50 },
    tags: ["pondicherry", "french", "urban", "cafe"],
    difficulty: "easy",
    bestTime: "morning",
    isPublic: true,
    isVerified: true,
    featured: true
  },
  {
    name: "Spiti Valley Monastery",
    description: "Ancient monasteries perched on dramatic cliffs in the remote Spiti Valley, Himachal Pradesh.",
    category: "cultural",
    location: {
      coordinates: [78.0707, 32.2460],
      address: "Key Monastery",
      city: "Spiti",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500&auto=format&fit=crop&q=80",
        caption: "Key Monastery in Spiti Valley"
      }
    ],
    rating: { average: 4.9, count: 40 },
    tags: ["spiti", "monastery", "himachal", "cultural"],
    difficulty: "medium",
    bestTime: "afternoon",
    isPublic: true,
    isVerified: true,
    featured: true
  },
  {
    name: "Sundarbans Mangrove Forest",
    description: "The world's largest mangrove forest, home to the Royal Bengal Tiger and unique wildlife.",
    category: "nature",
    location: {
      coordinates: [88.7264, 21.9497],
      address: "Sundarbans",
      city: "Sundarbans",
      country: "India"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=500&auto=format&fit=crop&q=80",
        caption: "Mangrove forest in Sundarbans"
      }
    ],
    rating: { average: 4.8, count: 70 },
    tags: ["sundarbans", "mangrove", "tiger", "nature"],
    difficulty: "medium",
    bestTime: "morning",
    isPublic: true,
    isVerified: true,
    featured: true
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
    // Force delete all spots
    const delResult = await Spot.deleteMany({});
    await User.deleteMany({ username: 'system' });
    const createdUsers = await User.insertMany(sampleUsers);
    const spotsWithUsers = sampleSpots.map((spot) => ({
      ...spot,
      createdBy: createdUsers[0]._id
    }));
    const createdSpots = await Spot.insertMany(spotsWithUsers);
    // Log final count
    const finalCount = await Spot.countDocuments();
  } catch (error) {
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase(); 