// Mock data for destinations
export const destinations = [
  {
    id: "iss",
    name: "International Space Station",
    description:
      "Experience weightlessness at 408km above Earth in the legendary ISS, the largest human structure in space.",
    image: "iss.jpg",
    distance: "408 km",
    travelTime: "6 hours",
  },
  {
    id: "moon",
    name: "Lunar Gateway",
    description:
      "Visit the Moon's orbit and experience breathtaking views of Earth's satellite from the Lunar Gateway station.",
    image: "moon.jpg",
    distance: "384,400 km",
    travelTime: "3 days",
  },
  {
    id: "lunar-surface",
    name: "Lunar Surface",
    description:
      "Walk on the surface of the Moon and experience 1/6th of Earth's gravity at our Artemis Base Camp.",
    image: "lunar-surface.jpg",
    distance: "384,400 km",
    travelTime: "3 days",
  },
  {
    id: "mars-transfer",
    name: "Mars Transfer Station",
    description:
      "The halfway point to Mars, experience deep space travel in our state-of-the-art transfer station.",
    image: "mars-transfer.jpg",
    distance: "54.6 million km",
    travelTime: "3 months",
  },
];

// Mock data for package classes
export const packageClasses = [
  {
    id: "economy",
    name: "Economy Class",
    description: "Basic space travel experience with all necessary amenities",
    features: [
      "Shared cabin (4 travelers)",
      "Standard space meals",
      "Basic space suit",
      "Emergency support",
      "Oxygen guarantee",
    ],
    priceMultiplier: 1,
  },
  {
    id: "luxury",
    name: "Luxury Class",
    description:
      "Enhanced comfort and exclusive experiences for discerning space travelers",
    features: [
      "Private cabin (2 travelers)",
      "Premium space cuisine",
      "Advanced space suit",
      "Priority emergency support",
      "Extended EVA time",
      "Space photography package",
    ],
    priceMultiplier: 2.5,
  },
  {
    id: "vip",
    name: "VIP Zero-Gravity Suite",
    description:
      "The ultimate space travel experience with premium service and exclusive access",
    features: [
      "Exclusive private suite",
      "Personal concierge",
      "Gourmet space meals by celebrity chefs",
      "Custom-tailored space suit",
      "Private EVA sessions",
      "Unlimited communications",
      "Professional space photography",
      "Exclusive access to all areas",
    ],
    priceMultiplier: 5,
  },
];

// Mock data for pricing based on destination
export const basePricing = {
  iss: 28000000, // $28 million
  moon: 58000000, // $58 million
  "lunar-surface": 95000000, // $95 million
  "mars-transfer": 250000000, // $250 million
};

// Calculate the price based on destination and package class
export const calculatePrice = (destinationId, packageClassId) => {
  const basePrice = basePricing[destinationId];
  const packageClass = packageClasses.find((pkg) => pkg.id === packageClassId);

  if (!basePrice || !packageClass) return null;

  return basePrice * packageClass.priceMultiplier;
};

// Mock data for accommodations
export const accommodations = [
  {
    id: "iss-module",
    name: "ISS Harmony Module",
    destination: "iss",
    description:
      "Stay in the legendary Harmony Module with views of Earth every 90 minutes.",
    amenities: [
      "Zero-G sleeping quarters",
      "Earth observation windows",
      "Space communication system",
    ],
    pricePerNight: 500000, // $500,000
    image: "iss-module.jpg",
  },
  {
    id: "lunar-orbit-hotel",
    name: "Artemis Lunar Orbital Resort",
    destination: "moon",
    description:
      "Luxury accommodations in lunar orbit with stunning views of both the Moon and Earth.",
    amenities: [
      "Lunar observation deck",
      "Artificial gravity quarters",
      "Gourmet space kitchen",
      "Spa treatments",
    ],
    pricePerNight: 1200000, // $1.2 million
    image: "lunar-orbit-hotel.jpg",
  },
  {
    id: "lunar-dome-a",
    name: "Lunar Dome Alpha",
    destination: "lunar-surface",
    description:
      "Pressurized glass dome habitat with breathtaking views of the lunar landscape.",
    amenities: [
      "Private lunar suites",
      "Guided moonwalks",
      "Lunar rover excursions",
      "Earth-viewing lounge",
    ],
    pricePerNight: 2500000, // $2.5 million
    image: "lunar-dome.jpg",
  },
  {
    id: "lunar-underground",
    name: "Artemis Underground Complex",
    destination: "lunar-surface",
    description:
      "Exclusive access to the secure underground lunar habitat, protected from radiation and micrometeorites.",
    amenities: [
      "Radiation-free environment",
      "Lunar lava tube exploration",
      "Underground lunar pool",
      "Research facilities access",
    ],
    pricePerNight: 3000000, // $3 million
    image: "lunar-underground.jpg",
  },
  {
    id: "mars-station",
    name: "Deep Space Habitat",
    destination: "mars-transfer",
    description:
      "Long-term accommodation aboard our Mars Transfer Station, the most distant human outpost.",
    amenities: [
      "Hydroponic garden access",
      "Virtual reality suite",
      "Long-duration medical facilities",
      "Deep space observation deck",
    ],
    pricePerNight: 5000000, // $5 million
    image: "mars-station.jpg",
  },
];

// Mock data for travel tips
export const travelTips = [
  {
    id: "tip1",
    title: "Preparing for Weightlessness",
    content:
      "Before your journey, spend time in our Earth-based neutral buoyancy lab to prepare for the zero-gravity experience.",
    destinationRelevance: ["iss", "moon", "lunar-surface", "mars-transfer"],
  },
  {
    id: "tip2",
    title: "Space Motion Sickness",
    content:
      "About 60% of astronauts experience space motion sickness. Take prescribed medication 1 hour before launch.",
    destinationRelevance: ["iss", "moon", "lunar-surface", "mars-transfer"],
  },
  {
    id: "tip3",
    title: "Lunar Dust Management",
    content:
      "Lunar dust is extremely abrasive. Always follow decontamination procedures before entering the habitat.",
    destinationRelevance: ["lunar-surface"],
  },
  {
    id: "tip4",
    title: "Sleep Cycle Adaptation",
    content:
      "In the ISS, you'll experience 16 sunrises and sunsets daily. Use our provided sleep mask and follow your schedule.",
    destinationRelevance: ["iss"],
  },
  {
    id: "tip5",
    title: "Long-Duration Space Travel",
    content:
      "For Mars transfer journeys, establish a daily routine and maintain consistent exercise to prevent muscle atrophy.",
    destinationRelevance: ["mars-transfer"],
  },
  {
    id: "tip6",
    title: "Communication Delays",
    content:
      "As you travel farther from Earth, communication delays increase. Mars transfer passengers should prepare for 20+ minute delays.",
    destinationRelevance: ["mars-transfer"],
  },
  {
    id: "tip7",
    title: "Lunar Photography",
    content:
      "The Moon's high contrast environment requires special camera settings. Attend our pre-flight photography workshop.",
    destinationRelevance: ["moon", "lunar-surface"],
  },
];
