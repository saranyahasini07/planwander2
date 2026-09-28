import { HotelOption, RestaurantOption, PhotoSlide, TravelerReview } from '../types/travel';
import { getDestinationById } from './destinationsCatalog';

const makeSlides = (
  name: string,
  t1: PhotoSlide['theme'],
  t2: PhotoSlide['theme'],
  t3: PhotoSlide['theme']
): PhotoSlide[] => [
  { id: `${name}-1`, caption: `${name} — Signature Exterior & Ambience`, theme: t1, accentHex: '#0F172A', secondaryHex: '#0284C7' },
  { id: `${name}-2`, caption: `${name} — Interior Suite & Courtyard`, theme: t2, accentHex: '#78350F', secondaryHex: '#D97706' },
  { id: `${name}-3`, caption: `${name} — Terrace & Dining View`, theme: t3, accentHex: '#064E3B', secondaryHex: '#059669' },
];

const makeSampleReview = (comment: string, author: string, role = 'Verified Guest · Sample Data'): TravelerReview[] => [
  {
    id: `rev-${author}`,
    author,
    travelerType: role,
    rating: 5,
    date: 'Recent Stay',
    comment,
    isSampleData: true,
  },
];

export function getHotelsForDestination(destinationId: string): HotelOption[] {
  const dest = getDestinationById(destinationId);
  const isIndia = dest.regionGroup === 'India';
  const baseNight = isIndia ? Math.round(dest.startingPriceInr * 0.22) : Math.round(dest.startingPriceInr * 0.18);

  return [
    {
      id: `${destinationId}-hotel-luxury`,
      destinationId,
      name:
        destinationId === 'hyderabad'
          ? 'Taj Falaknuma Palace Heritage Sanctuary'
          : destinationId === 'udaipur'
          ? 'The Royal Lakefront Palace & Spa'
          : `The Grand ${dest.name} Palace & Luxury Resort`,
      stars: 5,
      rating: 4.9,
      reviewCountText: '3.4K+ verified reviews',
      pricePerNightInr: Math.round(baseNight * 2.4),
      locationArea: `Royal Heritage & Scenic District, ${dest.name}`,
      distanceFromCenter: '1.2 km from iconic landmarks',
      keyAmenities: ['Complimentary Artisan Breakfast', 'Infinity Pool & Spa', 'Airport Chauffeur Transfer', '24/7 Butler Concierge', 'Free Cancellation'],
      shortDescription: `Flagship 5-star sanctuary in ${dest.name} featuring panoramic terraces, heritage architecture, and curated private experiences.`,
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
      breakfastIncluded: true,
      categories: ['Luxury', 'Best Rated', 'Romantic'],
      coordinates: { x: 38, y: 42 },
      photos: makeSlides(`${dest.name} Grand Palace`, 'palace', 'luxury_room', 'coast'),
      reviews: makeSampleReview(
        `Impeccable hospitality, breathtaking sunset terrace views over ${dest.name}, and unforgettable breakfast spreads.`,
        'Vikramaditya S.'
      ),
    },
    {
      id: `${destinationId}-hotel-best-rated`,
      destinationId,
      name:
        destinationId === 'hyderabad'
          ? 'ITC Kohenur Waterfront Suites'
          : `${dest.name} Boutique Heritage Courtyard`,
      stars: 4,
      rating: 4.8,
      reviewCountText: '4.8K+ verified reviews',
      pricePerNightInr: Math.round(baseNight * 1.35),
      locationArea: `Old Quarter & Cultural Hub, ${dest.name}`,
      distanceFromCenter: '0.4 km walk to main attractions',
      keyAmenities: ['Breakfast Included', 'Rooftop Lounge', 'High-Speed Wi-Fi', 'Guided Walking Tour Desk', 'Free Cancellation'],
      shortDescription: `Traveler-favorite 4-star boutique stay steps away from ${dest.name}'s top sights, combining local character with modern comfort.`,
      cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
      breakfastIncluded: true,
      categories: ['Best Rated', 'Near Attractions', 'Romantic'],
      coordinates: { x: 46, y: 54 },
      photos: makeSlides(`${dest.name} Boutique Courtyard`, 'luxury_room', 'palace', 'garden'),
      reviews: makeSampleReview(
        'Location is unbeatable—we walked to the main monuments and markets in 5 minutes and loved the quiet courtyard rooms.',
        'Nandini P.'
      ),
    },
    {
      id: `${destinationId}-hotel-family`,
      destinationId,
      name: `${dest.name} Regency Family Suites & Gardens`,
      stars: 4,
      rating: 4.7,
      reviewCountText: '2.9K+ verified reviews',
      pricePerNightInr: Math.round(baseNight * 1.15),
      locationArea: `Green Promenade, ${dest.name}`,
      distanceFromCenter: '1.8 km from city center',
      keyAmenities: ['Interconnecting Family Rooms', 'Kids Activity Lawn & Pool', 'Buffet Breakfast Included', 'Travel Desk & Cab Booking'],
      shortDescription: `Spacious family-friendly resort hotel in ${dest.name} offering interconnecting suites, landscaped gardens, and all-day dining.`,
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
      breakfastIncluded: true,
      categories: ['Family Friendly', 'Best Rated', 'Near Attractions'],
      coordinates: { x: 55, y: 48 },
      photos: makeSlides(`${dest.name} Family Regency`, 'garden', 'luxury_room', 'coast'),
      reviews: makeSampleReview(
        'Traveling with parents and kids was effortless here—spacious suites, helpful staff, and delicious morning buffet.',
        'Rajesh & Family'
      ),
    },
    {
      id: `${destinationId}-hotel-budget`,
      destinationId,
      name: `Zostel & Wanderer Smart Inn ${dest.name}`,
      stars: 3,
      rating: 4.5,
      reviewCountText: '5.1K+ verified reviews',
      pricePerNightInr: Math.round(baseNight * 0.65),
      locationArea: `Transit & Market Hub, ${dest.name}`,
      distanceFromCenter: '0.6 km from metro / central bazaar',
      keyAmenities: ['Clean Private En-Suite Rooms', 'Rooftop Café', 'Luggage Storage', 'High-Speed Wi-Fi', 'Instant Metro Access'],
      shortDescription: `Crisp, design-forward smart hotel in ${dest.name} crafted for value-conscious travelers who want clean comfort right near transit.`,
      cancellationPolicy: 'Flexible date modification & 48h cancellation',
      breakfastIncluded: false,
      categories: ['Budget', 'Near Attractions'],
      coordinates: { x: 50, y: 60 },
      photos: makeSlides(`${dest.name} Smart Inn`, 'market', 'rooftop', 'luxury_room'),
      reviews: makeSampleReview(
        'Spotless rooms, super friendly rooftop café, and saved us a fortune while staying right in the heart of town.',
        'Aarav K.'
      ),
    },
    {
      id: `${destinationId}-hotel-romantic`,
      destinationId,
      name: `${dest.name} Serene Pavilion & Sunset Villas`,
      stars: 5,
      rating: 4.8,
      reviewCountText: '1.9K+ verified reviews',
      pricePerNightInr: Math.round(baseNight * 1.85),
      locationArea: `Scenic Overlook, ${dest.name}`,
      distanceFromCenter: '2.4 km from center',
      keyAmenities: ['Private Plunge Pool / Balcony', 'Candlelight Terrace Dining', 'Couples Spa Rituals', 'Artisan Breakfast'],
      shortDescription: `Intimate retreat tucked into ${dest.name}'s most scenic vantage point with private sunset decks and bespoke dining.`,
      cancellationPolicy: 'Free cancellation up to 72 hours before check-in',
      breakfastIncluded: true,
      categories: ['Romantic', 'Luxury', 'Best Rated'],
      coordinates: { x: 30, y: 36 },
      photos: makeSlides(`${dest.name} Sunset Villas`, 'coast', 'luxury_room', 'rooftop'),
      reviews: makeSampleReview(
        'Watched the sunset from our private terrace every evening. Peaceful, romantic, and thoughtfully designed.',
        'Kabir & Rhea'
      ),
    },
  ];
}

export function getRestaurantsForDestination(destinationId: string): RestaurantOption[] {
  const dest = getDestinationById(destinationId);
  const isIndia = dest.regionGroup === 'India';

  if (destinationId === 'hyderabad') {
    return [
      {
        id: 'hyd-rest-shadab',
        destinationId: 'hyderabad',
        name: 'Hotel Shadab & Heritage Dum Kitchen',
        rating: 4.6,
        reviewCountText: '38K+ dining reviews',
        priceRangeText: '₹350 – ₹700 per person',
        avgCostPerPersonInr: 500,
        cuisine: 'Authentic Hyderabadi Mughlai & Nizami',
        locationAndDistance: 'High Court Road, Madina Circle · 0.6 km from Charminar',
        shortDescription: 'Legendary Old City culinary institution famed for slow-cooked Kachchi Gosht Dum Biryani, Haleem, and Qubani ka Meetha.',
        popularDishes: ['Hyderabadi Mutton Dum Biryani', 'Zafrani Chicken Biryani', 'Double Ka Meetha', 'rescued Mirchi Ka Salan'],
        categories: ['Local food', 'Highly rated', 'Family-friendly', 'Budget'],
        mealTypes: ['Lunch', 'Dinner'],
        coordinates: { x: 49, y: 63 },
        photos: makeSlides('Hotel Shadab Heritage Kitchen', 'culinary', 'market', 'palace'),
        reviews: makeSampleReview(
          'Unbeatable authentic Hyderabadi Dum Biryani right near Charminar. The saffron aroma and tender spice balance are legendary.',
          'Farhan A.',
          'Local Food Critic · Sample Data'
        ),
      },
      {
        id: 'hyd-rest-nimrah',
        destinationId: 'hyderabad',
        name: 'Nimrah Café & Bakery at Charminar Plaza',
        rating: 4.7,
        reviewCountText: '29K+ dining reviews',
        priceRangeText: '₹80 – ₹220 per person',
        avgCostPerPersonInr: 150,
        cuisine: 'Irani Chai, Osmania Biscuits & Heritage Bakery',
        locationAndDistance: 'Beside Charminar Bus Stand · 50m from Charminar',
        shortDescription: 'Iconic open-front bakery serving piping hot Irani Chai in porcelain cups alongside melt-in-the-mouth Osmania and Tie biscuits.',
        popularDishes: ['Irani Dum Chai', 'Warm Osmania Biscuits', 'Khara Biscuit & Lukhmi', 'Dry Fruit Dilpasand'],
        categories: ['Cafés', 'Budget', 'Local food', 'Vegetarian', 'Fast food'],
        mealTypes: ['Breakfast', 'Cafe'],
        coordinates: { x: 48, y: 67 },
        photos: makeSlides('Nimrah Café Charminar', 'culinary', 'monument', 'market'),
        reviews: makeSampleReview(
          'Sipping hot Irani chai with fresh Osmania biscuits while looking directly up at Charminar is the ultimate Hyderabad moment.',
          'Shruti V.',
          'Verified Traveler · Sample Data'
        ),
      },
      {
        id: 'hyd-rest-chutneys',
        destinationId: 'hyderabad',
        name: 'Chutneys Pure Vegetarian South Indian Kitchen',
        rating: 4.7,
        reviewCountText: '24K+ dining reviews',
        priceRangeText: '₹300 – ₹550 per person',
        avgCostPerPersonInr: 420,
        cuisine: 'Pure Vegetarian Telugu & South Indian Specialty',
        locationAndDistance: 'Banjara Hills & Jubilee Hills · 3.2 km from Hussain Sagar',
        shortDescription: 'Beloved vegetarian dining room celebrated for Guntur MLA Pesarattu, steamed Babai Idli, and a signature platter of six fresh chutneys.',
        popularDishes: ['Steam Dosa with 6 Signature Chutneys', 'MLA Pesarattu Upma', 'Ghee Babai Idli', 'Filter Coffee'],
        categories: ['Vegetarian', 'Family-friendly', 'Highly rated', 'Local food'],
        mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
        coordinates: { x: 35, y: 44 },
        photos: makeSlides('Chutneys Vegetarian Kitchen', 'culinary', 'garden', 'luxury_room'),
        reviews: makeSampleReview(
          'The six freshly ground chutneys—especially the roasted peanut and ginger—make this the best vegetarian meal in town.',
          'Deepak N.',
          'Vegetarian Traveler · Sample Data'
        ),
      },
      {
        id: 'hyd-rest-jewel-of-nizam',
        destinationId: 'hyderabad',
        name: 'Jewel of Nizam — The Minar Rooftop Dining',
        rating: 4.8,
        reviewCountText: '6.2K+ dining reviews',
        priceRangeText: '₹1,600 – ₹2,500 per person',
        avgCostPerPersonInr: 1950,
        cuisine: 'Royal Nizami Fine Dining & Rooftop Panorama',
        locationAndDistance: 'Gandipet Lake Overlook · 15 min from Golconda Fort',
        shortDescription: 'Perched atop a 100-foot minaret tower overlooking Osman Sagar Lake, serving royal recipes from the kitchens of the Seventh Nizam.',
        popularDishes: ['ShahiSubz Shikampuri Kebab (Veg)', 'Nizami Tarkari Biryani', 'Pathar Ka Gosht', 'Anjeer Badam Halwa'],
        categories: ['Rooftop', 'Romantic', 'Highly rated', 'Local food'],
        mealTypes: ['Lunch', 'Dinner'],
        coordinates: { x: 20, y: 55 },
        photos: makeSlides('Jewel of Nizam Rooftop', 'rooftop', 'palace', 'culinary'),
        reviews: makeSampleReview(
          'Dining high up on the minaret terrace with lake breezes and live santoor music felt truly royal.',
          'Siddharth & Pooja',
          'Anniversary Travelers · Sample Data'
        ),
      },
    ];
  }

  const baseMeal = isIndia ? 450 : 1650;

  return [
    {
      id: `${destinationId}-rest-local`,
      destinationId,
      name: `${dest.name} Heritage Spice Kitchen & Courtyard`,
      rating: 4.8,
      reviewCountText: '14K+ dining reviews',
      priceRangeText: isIndia ? '₹350 – ₹700 per person' : '₹1,200 – ₹2,200 per person',
      avgCostPerPersonInr: baseMeal,
      cuisine: `Authentic ${dest.name} Regional & Heritage Cuisine`,
      locationAndDistance: `Old Heritage Quarter, ${dest.name} · 0.4 km from main square`,
      shortDescription: `Celebrated local kitchen preserving ${dest.name}'s heirloom family recipes, wood-fired specialties, and traditional brass-platter thalis.`,
      popularDishes: [`Signature ${dest.name} Heritage Platter`, 'Slow-Simmered Regional Curry', 'Artisan Flatbreads', 'Saffron Dessert'],
      categories: ['Local food', 'Highly rated', 'Family-friendly'],
      mealTypes: ['Lunch', 'Dinner'],
      coordinates: { x: 45, y: 52 },
      photos: makeSlides(`${dest.name} Heritage Kitchen`, 'culinary', 'palace', 'market'),
      reviews: makeSampleReview(
        `Authentic regional flavors and warm hospitality right near ${dest.name}'s central landmarks.`,
        'Tanvi M.'
      ),
    },
    {
      id: `${destinationId}-rest-veg`,
      destinationId,
      name: `Sattva & Green Leaf Pure Vegetarian Bistro ${dest.name}`,
      rating: 4.7,
      reviewCountText: '9.4K+ dining reviews',
      priceRangeText: isIndia ? '₹250 – ₹500 per person' : '₹950 – ₹1,500 per person',
      avgCostPerPersonInr: Math.round(baseMeal * 0.75),
      cuisine: '100% Pure Vegetarian, Plant-Based & Wholesome Regional',
      locationAndDistance: `Garden Promenade, ${dest.name} · 0.8 km from center`,
      shortDescription: `Dedicated vegetarian and vegan culinary sanctuary in ${dest.name} crafting organic farm-to-table bowls, regional thalis, and fresh-pressed juices.`,
      popularDishes: ['Seasonal Farm-to-Table Thali', 'Crispy Millet & Herb Fritters', 'Spiced Coconut Vegetable Stew', 'Artisanal Sorbet'],
      categories: ['Vegetarian', 'Family-friendly', 'Budget', 'Highly rated'],
      mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
      coordinates: { x: 52, y: 46 },
      photos: makeSlides(`${dest.name} Vegetarian Bistro`, 'garden', 'culinary', 'coast'),
      reviews: makeSampleReview(
        'So refreshing to find a dedicated vegetarian kitchen that makes local specialties with fresh organic ingredients.',
        'Harshita G.'
      ),
    },
    {
      id: `${destinationId}-rest-rooftop`,
      destinationId,
      name: `Skyline Horizon Rooftop & Sunset Lounge ${dest.name}`,
      rating: 4.8,
      reviewCountText: '7.8K+ dining reviews',
      priceRangeText: isIndia ? '₹900 – ₹1,600 per person' : '₹2,400 – ₹3,800 per person',
      avgCostPerPersonInr: Math.round(baseMeal * 2.1),
      cuisine: 'Contemporary Coastal & Rooftop Grill',
      locationAndDistance: `Panoramic Terrace District, ${dest.name} · Overlooking main vista`,
      shortDescription: `Open-air rooftop terrace offering uninterrupted sunset views over ${dest.name}, acoustic live music, and small-plate tasting menus.`,
      popularDishes: ['Chargrilled Glazed Skewers', 'Truffle & Herb Flatbread', 'Botanical Mocktail Pairing', 'Molten Hazelnut Tart'],
      categories: ['Rooftop', 'Romantic', 'Highly rated'],
      mealTypes: ['Dinner'],
      coordinates: { x: 36, y: 39 },
      photos: makeSlides(`${dest.name} Sunset Rooftop`, 'rooftop', 'coast', 'culinary'),
      reviews: makeSampleReview(
        'Book a 6:00 PM table along the terrace railing—the sunset view and candlelit ambiance are unmatched.',
        'Rohan & Aisha'
      ),
    },
    {
      id: `${destinationId}-rest-cafe`,
      destinationId,
      name: `The Roastery & Artisan Courtyard Café ${dest.name}`,
      rating: 4.6,
      reviewCountText: '11K+ dining reviews',
      priceRangeText: isIndia ? '₹180 – ₹400 per person' : '₹650 – ₹1,100 per person',
      avgCostPerPersonInr: Math.round(baseMeal * 0.55),
      cuisine: 'Specialty Coffee, Bakehouse & Quick Bites',
      locationAndDistance: `Artisan Lane, ${dest.name} · 0.3 km from Old Quarter`,
      shortDescription: `Sunlit heritage courtyard café serving single-estate pour-overs, flaky sourdough croissants, quick wraps, and local street-style snacks.`,
      popularDishes: ['Single-Origin Cold Brew', 'Warm Cinnamon Brioche', 'Crispy Street-Style Sliders', 'Matcha & Pistachio Cake'],
      categories: ['Cafés', 'Budget', 'Fast food', 'Vegetarian'],
      mealTypes: ['Breakfast', 'Cafe', 'Lunch'],
      coordinates: { x: 48, y: 58 },
      photos: makeSlides(`${dest.name} Roastery Café`, 'market', 'culinary', 'garden'),
      reviews: makeSampleReview(
        'Perfect mid-morning coffee and pastry stop between sightseeing walks; fast service and shaded courtyard seating.',
        'Karan V.'
      ),
    },
  ];
}
