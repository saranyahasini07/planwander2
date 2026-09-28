import { PlaceToVisit, PlaceCategory, PhotoSlide, TravelerReview } from '../types/travel';
import { getDestinationById } from './destinationsCatalog';

const makeSlides = (
  name: string,
  primaryTheme: PhotoSlide['theme'],
  secondTheme: PhotoSlide['theme'],
  thirdTheme: PhotoSlide['theme']
): PhotoSlide[] => [
  {
    id: `${name}-1`,
    caption: `${name} — Iconic Architecture & Exterior`,
    theme: primaryTheme,
    accentHex: '#0F172A',
    secondaryHex: '#0284C7',
  },
  {
    id: `${name}-2`,
    caption: `${name} — Golden Hour Perspective`,
    theme: secondTheme,
    accentHex: '#78350F',
    secondaryHex: '#D97706',
  },
  {
    id: `${name}-3`,
    caption: `${name} — Surrounding Heritage & Details`,
    theme: thirdTheme,
    accentHex: '#064E3B',
    secondaryHex: '#059669',
  },
];

const makeReviews = (quote1: string, author1: string, quote2: string, author2: string): TravelerReview[] => [
  {
    id: `rev-1-${author1}`,
    author: author1,
    travelerType: 'Verified Cultural Traveler · Sample Review',
    rating: 5,
    date: 'Recent Visit',
    comment: quote1,
    isSampleData: true,
  },
  {
    id: `rev-2-${author2}`,
    author: author2,
    travelerType: 'Family & Photography Explorer · Sample Review',
    rating: 5,
    date: 'Recent Visit',
    comment: quote2,
    isSampleData: true,
  },
];

const SPECIFIC_PLACES: Record<string, PlaceToVisit[]> = {
  hyderabad: [
    {
      id: 'hyd-charminar',
      destinationId: 'hyderabad',
      name: 'Charminar & Laad Bazaar',
      rating: 4.6,
      reviewCountText: '25K+ traveler reviews',
      shortDescription:
        "One of Hyderabad's most iconic landmarks, known for its 1591 four-minaret Indo-Islamic architecture and the lively pearl and lacquer bangle markets surrounding it.",
      detailedHistoryAndTips:
        'Built by Sultan Muhammad Quli Qutb Shah in 1591 to mark the founding of Hyderabad. Climb the 149 winding steps to the upper gallery for panoramic views over Old City and pair your visit with Irani chai at Nimrah Café right across the plaza.',
      locationArea: 'Old City, Hyderabad',
      recommendedDuration: '1–2 hours',
      durationHours: 2,
      entryFeeInr: 25,
      entryFeeText: '₹25 (Indian) / ₹300 (Foreign)',
      openingHours: '9:00 AM – 5:30 PM (Markets open till 10:30 PM)',
      bestTimeToVisit: 'Evening',
      categories: ['History', 'Photography', 'Shopping', 'Culture'],
      coordinates: { x: 48, y: 66 },
      photos: makeSlides('Charminar', 'palace', 'market', 'monument'),
      reviews: makeReviews(
        'Beautiful architecture and the surrounding Laad Bazaar market was amazing at dusk.',
        'Ananya R.',
        'Climbing to the upper floor balcony gave an unforgettable view of the bustling Old City lanes.',
        'Karthik M.'
      ),
    },
    {
      id: 'hyd-golconda',
      destinationId: 'hyderabad',
      name: 'Golconda Fort & Acoustic Citadel',
      rating: 4.7,
      reviewCountText: '31K+ traveler reviews',
      shortDescription:
        'A monumental 16th-century granite fortress famed for its Fateh Rahben acoustic hand-clap portico, diamond trade history, and sunset views from Bala Hissar Pavilion.',
      detailedHistoryAndTips:
        'Once the capital of the Qutb Shahi dynasty and vault of the Koh-i-Noor and Hope diamonds. Wear comfortable walking shoes for the 360 steps to Baradari summit and stay for the evening Sound & Light narration.',
      locationArea: 'Ibrahim Bagh, West Hyderabad',
      recommendedDuration: '2.5–3 hours',
      durationHours: 3,
      entryFeeInr: 25,
      entryFeeText: '₹25 Entry · ₹150 Sound & Light Show',
      openingHours: '9:00 AM – 5:30 PM (Light Show 6:30 PM)',
      bestTimeToVisit: 'Late Afternoon & Sunset',
      categories: ['History', 'Scenic', 'Photography', 'Family'],
      coordinates: { x: 24, y: 52 },
      photos: makeSlides('Golconda Fort', 'monument', 'palace', 'coast'),
      reviews: makeReviews(
        'The acoustic engineering at the main gate that carries a clap to the hilltop palace is extraordinary.',
        'Rohan V.',
        'Sunset from the top citadel overlooking the granite ramparts and Qutb Shahi Tombs is worth every step.',
        'Meera S.'
      ),
    },
    {
      id: 'hyd-chowmahalla',
      destinationId: 'hyderabad',
      name: 'Chowmahalla Palace',
      rating: 4.7,
      reviewCountText: '18K+ traveler reviews',
      shortDescription:
        'The official seat of the Asaf Jahi Nizams featuring the grand Khilwat Mubarak Durbar Hall lit by 19 Belgian crystal chandeliers and vintage royal Rolls-Royces.',
      detailedHistoryAndTips:
        'Located 10 minutes on foot from Charminar. Its tranquil Mughal water fountains and manicured courtyards offer a peaceful oasis right in the heart of the Old City.',
      locationArea: 'Motigalli, Near Charminar',
      recommendedDuration: '1.5–2 hours',
      durationHours: 2,
      entryFeeInr: 100,
      entryFeeText: '₹100',
      openingHours: '10:00 AM – 5:00 PM (Closed Fridays)',
      bestTimeToVisit: 'Morning',
      categories: ['History', 'Culture', 'Photography', 'Family'],
      coordinates: { x: 45, y: 72 },
      photos: makeSlides('Chowmahalla Palace', 'palace', 'luxury_room', 'garden'),
      reviews: makeReviews(
        'The Belgian crystal chandeliers in the Durbar Hall and the 1912 yellow Rolls-Royce Silver Ghost are stunning.',
        'Vikram D.',
        'Very well maintained palace grounds with serene courtyards just a short walk from Charminar.',
        'Priya K.'
      ),
    },
    {
      id: 'hyd-hussain-sagar',
      destinationId: 'hyderabad',
      name: 'Hussain Sagar Lake & Buddha Monolith',
      rating: 4.5,
      reviewCountText: '22K+ traveler reviews',
      shortDescription:
        'A heart-shaped 16th-century lake linking Hyderabad and Secunderabad with an 18-meter monolithic Buddha statue on Gibraltar Rock reached by sunset ferry.',
      detailedHistoryAndTips:
        'Board the evening mechanized boat from Lumbini Park or Necklace Road jetty for golden-hour breezes and skyline reflections.',
      locationArea: 'Necklace Road, Central Hyderabad',
      recommendedDuration: '1.5 hours',
      durationHours: 1.5,
      entryFeeInr: 80,
      entryFeeText: '₹80 Boat Transfer',
      openingHours: '9:00 AM – 9:00 PM',
      bestTimeToVisit: 'Sunset',
      categories: ['Scenic', 'Nature', 'Family', 'Photography'],
      coordinates: { x: 54, y: 38 },
      photos: makeSlides('Hussain Sagar Lake', 'coast', 'monument', 'alps'),
      reviews: makeReviews(
        'The boat ride out to the Buddha statue during sunset offers the best breeze and skyline view in the city.',
        'Sandeep T.',
        'Great family evening walk along Necklace Road followed by the ferry ride.',
        'Neha G.'
      ),
    },
    {
      id: 'hyd-salar-jung',
      destinationId: 'hyderabad',
      name: 'Salar Jung Museum',
      rating: 4.6,
      reviewCountText: '19K+ traveler reviews',
      shortDescription:
        'One of India’s three National Museums housing 43,000 art objects, including the famous Veiled Rebecca marble sculpture and the 19th-century musical chime clock.',
      detailedHistoryAndTips:
        'Be in the central courtyard by 11:50 AM to watch the British mechanical toy clock strike noon.',
      locationArea: 'Darulshifa, Musi River Bank',
      recommendedDuration: '2–3 hours',
      durationHours: 2.5,
      entryFeeInr: 50,
      entryFeeText: '₹50',
      openingHours: '10:00 AM – 5:00 PM (Closed Fridays)',
      bestTimeToVisit: 'Mid-day (Air-conditioned galleries)',
      categories: ['History', 'Culture', 'Family'],
      coordinates: { x: 50, y: 58 },
      photos: makeSlides('Salar Jung Museum', 'palace', 'monument', 'luxury_room'),
      reviews: makeReviews(
        'Veiled Rebecca carved from a single block of Carrara marble looks remarkably lifelike.',
        'Arjun P.',
        'Vast collection spanning Persian carpets, Jade daggers of Mughal emperors, and European galleries.',
        'Divya N.'
      ),
    },
    {
      id: 'hyd-shilparamam',
      destinationId: 'hyderabad',
      name: 'Shilparamam Crafts Village & Night Bazaar',
      rating: 4.5,
      reviewCountText: '14K+ traveler reviews',
      shortDescription:
        'A 65-acre traditional arts and handloom village in HITEC City showcasing Pochampally Ikat weavers, Kalamkari artists, open-air Kuchipudi stages, and sculpture gardens.',
      detailedHistoryAndTips:
        'Directly accessible via Raidurg Metro Station. Ideal for authentic Telangana handicrafts directly from artisans.',
      locationArea: 'Madhapur / HITEC City',
      recommendedDuration: '1.5–2 hours',
      durationHours: 2,
      entryFeeInr: 60,
      entryFeeText: '₹60',
      openingHours: '10:30 AM – 8:00 PM',
      bestTimeToVisit: 'Afternoon & Evening',
      categories: ['Shopping', 'Culture', 'Family', 'Photography'],
      coordinates: { x: 22, y: 28 },
      photos: makeSlides('Shilparamam Crafts Village', 'market', 'garden', 'shrine'),
      reviews: makeReviews(
        'Bought authentic Pochampally silk dupattas directly from the weavers and watched a live classical dance show.',
        'Sneha L.',
        'Lush green walkways, rural artisan huts, and great street snacks in the evening.',
        'Rahul B.'
      ),
    },
  ],
};

interface QuickPlaceSeed {
  name: string;
  area: string;
  desc: string;
  duration: string;
  hours: number;
  feeInr: number;
  bestTime: string;
  cats: PlaceCategory[];
  theme: PhotoSlide['theme'];
  review1: string;
  review2: string;
}

const DESTINATION_PLACE_SEEDS: Record<string, QuickPlaceSeed[]> = {
  goa: [
    { name: 'Basilica of Bom Jesus & Old Goa Heritage Quarter', area: 'Old Goa', desc: 'UNESCO World Heritage 16th-century Baroque basilica and gilded cathedral plaza shaded by centuries-old banyan trees.', duration: '1.5–2 hours', hours: 2, feeInr: 0, bestTime: 'Morning', cats: ['History', 'Culture', 'Photography'], theme: 'palace', review1: 'Remarkable Portuguese stonework and serene cloisters in the morning.', review2: 'Combine with Se Cathedral across the street for a complete heritage walk.' },
    { name: 'Fontainhas Latin Quarter & Panjim Art Lanes', area: 'Panjim', desc: 'Pastel ochre, indigo, and terracotta Portuguese villas with wrought-iron balconies, bakeries, and ceramic azulejo tiles.', duration: '1.5 hours', hours: 1.5, feeInr: 0, bestTime: 'Late Afternoon', cats: ['Photography', 'Culture', 'Shopping'], theme: 'market', review1: 'Every lane is a postcard; stop at Confeitaria 31 de Janeiro for fresh pastries.', review2: 'Best explored on foot around 4:30 PM when the sunlight hits the colorful facades.' },
    { name: 'Palolem & Cabo de Rama Clifftop Lookout', area: 'South Goa', desc: 'Crescent palm-lined bay paired with dramatic red-laterite sea cliffs and panoramic Arabian Sea sunset views.', duration: '3 hours', hours: 3, feeInr: 0, bestTime: 'Sunset', cats: ['Scenic', 'Nature', 'Photography', 'Family'], theme: 'coast', review1: 'The view from Cabo de Rama cliff pebbles at sunset is breathtaking.', review2: 'Calm waters at Palolem are ideal for kayaking and relaxed beach dining.' },
    { name: 'Chapora Fort & Vagator Headland', area: 'North Goa', desc: 'Historic red-laterite hilltop ramparts commanding 360-degree views where the Chapora River meets the Arabian Sea.', duration: '1.5 hours', hours: 1.5, feeInr: 0, bestTime: 'Evening', cats: ['Scenic', 'History', 'Photography'], theme: 'coast', review1: 'Short 15-minute climb rewarded with sweeping coastal breezes and golden light.', review2: 'Iconic viewpoint overlooking Vagator and Morjim estuary.' },
    { name: 'Sahakari Spice Plantation & Tropical Trail', area: 'Ponda', desc: 'Guided walk through organic cardamom, vanilla, nutmeg, and black pepper groves with a traditional Goan lunch served on banana leaves.', duration: '2.5 hours', hours: 2.5, feeInr: 500, bestTime: 'Mid-day', cats: ['Nature', 'Family', 'Culture'], theme: 'garden', review1: 'Informative spice walk in cool forest shade followed by delicious home-style Goan food.', review2: 'Great family excursion away from the midday beach sun.' },
  ],
  kashmir: [
    { name: 'Dal Lake Shikara Cruise & Floating Market', area: 'Srinagar', desc: 'Wooden canopied Shikara ride past carved cedar houseboats, lotus gardens, and Char Chinar island framed by the Zabarwan range.', duration: '2 hours', hours: 2, feeInr: 800, bestTime: 'Sunrise or Sunset', cats: ['Scenic', 'Nature', 'Photography', 'Family'], theme: 'alps', review1: 'Gliding across the mirror-like water at golden hour with Kahwa tea was unforgettable.', review2: 'Peaceful inner canals and floating handicraft boats make it truly special.' },
    { name: 'Gulmarg Gondola Phase 1 & Phase 2 Apharwat Peak', area: 'Gulmarg', desc: 'One of the highest operating cable cars in the world ascending to 3,979 meters over snow meadows and Himalayan ridgelines.', duration: '4 hours', hours: 4, feeInr: 1700, bestTime: 'Morning', cats: ['Adventure', 'Scenic', 'Nature', 'Photography'], theme: 'alps', review1: 'Book morning slots early; the snow panorama from Phase 2 is world-class.', review2: 'Sweeping views of Nanga Parbat on a clear morning.' },
    { name: 'Nishat Bagh & Shalimar Mughal Gardens', area: 'Dal Lake Boulevard', desc: '17th-century terraced Persian water gardens featuring cascading stone chutes, ancient Chinar trees, and mountain backdrops.', duration: '2 hours', hours: 2, feeInr: 40, bestTime: 'Afternoon', cats: ['History', 'Nature', 'Family', 'Photography'], theme: 'garden', review1: 'Twelve royal terraces rising toward the mountains with views straight over Dal Lake.', review2: 'Magnificent Chinar foliage and peaceful marble pavilions.' },
    { name: 'Betaab Valley & Lidder River Pine Meadows', area: 'Pahalgam', desc: 'Emerald alpine valley encircled by deodar pines and snow-fed turquoise streams of the Lidder River.', duration: '2.5 hours', hours: 2.5, feeInr: 100, bestTime: 'Morning to Afternoon', cats: ['Nature', 'Scenic', 'Family'], theme: 'alps', review1: 'Crystal-clear glacial river and lush pine trails perfect for a relaxed picnic.', review2: 'Postcard scenery in every direction.' },
  ],
  manali: [
    { name: 'Hadimba Devi Cedar Forest Temple', area: 'Old Manali Ridge', desc: '1553 four-tiered pagoda-style wooden temple nestled inside a towering sanctuary of ancient Himalayan deodar trees.', duration: '1.5 hours', hours: 1.5, feeInr: 30, bestTime: 'Morning', cats: ['History', 'Culture', 'Nature', 'Photography'], theme: 'shrine', review1: 'The intricate wood carvings and giant cedar forest create a magical atmosphere.', review2: 'Arrive by 9 AM for quiet photos among the towering pines.' },
    { name: 'Solang Valley Ropeway & Paragliding Bowl', area: 'Solang', desc: 'High-altitude adventure amphitheater offering cable-car rides to Mount Phatru, tandem paragliding, and winter snow sports.', duration: '3.5 hours', hours: 3.5, feeInr: 850, bestTime: 'Morning', cats: ['Adventure', 'Scenic', 'Family'], theme: 'alps', review1: 'Took the ropeway up to the snow ridge and watched paragliders launch over the valley.', review2: 'Thrilling mountain views and crisp alpine air.' },
    { name: 'Atal Tunnel & Sissu Glacial Waterfall (Lahaul)', area: 'North Portal / Sissu', desc: 'Drive through the 9.02 km engineering marvel at 10,000 ft into the dramatic Lahaul valley to see Sissu’s roaring cliff waterfall.', duration: '4 hours', hours: 4, feeInr: 0, bestTime: 'Mid-day', cats: ['Scenic', 'Adventure', 'Photography', 'Nature'], theme: 'alps', review1: 'Crossing the tunnel transforms the landscape instantly into stark, majestic Himalayan peaks.', review2: 'Sissu waterfall and lake walk are unforgettable.' },
    { name: 'Old Manali Café Lanes & Manu Temple Walk', area: 'Old Manali', desc: 'Cobblestone orchard trails above the Manalsu River lined with wood-fired bakeries, apple trees, and traditional Kath-Kuni houses.', duration: '2 hours', hours: 2, feeInr: 0, bestTime: 'Evening', cats: ['Culture', 'Shopping', 'Scenic'], theme: 'market', review1: 'Relaxed vibe with rushing river views and cozy acoustic cafés.', review2: 'Great spot for handcrafted woolens and riverside strolls.' },
  ],
  ladakh: [
    { name: 'Pangong Tso High-Altitude Turquoise Lake', area: 'Eastern Ladakh (4,225m)', desc: 'Endorheic 134-km Himalayan lake whose waters shift from deep sapphire to emerald jade against golden barren mountains.', duration: '5 hours', hours: 5, feeInr: 400, bestTime: 'Mid-day Sunlight', cats: ['Scenic', 'Nature', 'Photography', 'Adventure'], theme: 'alps', review1: 'The surreal shades of blue against the rust-colored mountains take your breath away.', review2: 'Unmatched clarity and silence at 14,000 feet.' },
    { name: 'Thiksey Monastery (Mini Potala of Ladakh)', area: 'Indus Valley, Leh', desc: '12-story Tibetan Buddhist gompa cascading down a rocky hill, housing a 49-foot gilded Maitreya Buddha statue.', duration: '2 hours', hours: 2, feeInr: 50, bestTime: 'Early Morning', cats: ['Culture', 'History', 'Photography', 'Scenic'], theme: 'shrine', review1: 'Attending the 7 AM morning chanting with rooftop views over the Indus Valley was deeply moving.', review2: 'Stunning whitewashed stupas and vibrant prayer halls.' },
    { name: 'Nubra Valley Hunder Sand Dunes & Khardung La', area: 'Nubra via Khardung La', desc: 'Cold-desert silver sand dunes framed by snow peaks where Bactrian double-humped camels roam beside the Shyok River.', duration: '4 hours', hours: 4, feeInr: 300, bestTime: 'Late Afternoon', cats: ['Adventure', 'Scenic', 'Nature', 'Family'], theme: 'alps', review1: 'Seeing sand dunes, a river, and snow-capped peaks in a single frame is surreal.', review2: 'Golden sunset light on the Hunder dunes is a photographer’s dream.' },
    { name: 'Shanti Stupa & Leh Palace Sunset Ridge', area: 'Leh Town', desc: 'White-domed peace stupa built on a steep spur offering 360-degree twilight views of Leh town and the Stok Kangri range.', duration: '1.5 hours', hours: 1.5, feeInr: 30, bestTime: 'Sunset', cats: ['Scenic', 'Culture', 'Photography'], theme: 'monument', review1: 'Best acclimatization evening walk on Day 1 with panoramic sunset views.', review2: 'Peaceful ambience above the historic nine-story Leh Palace.' },
  ],
  kerala: [
    { name: 'Alleppey Backwaters Shikara & Kettuvallam Cruise', area: 'Alappuzha', desc: 'Palm-fringed Vembanad Lake canals where thatched rice-barge houseboats glide past emerald paddy fields below sea level.', duration: '4 hours', hours: 4, feeInr: 1500, bestTime: 'Morning to Sunset', cats: ['Scenic', 'Nature', 'Family', 'Photography'], theme: 'coast', review1: 'Cruising through narrow village canals with fresh tender coconut and Karimeen fry was pure bliss.', review2: 'So tranquil watching kingfishers and palm reflections on the water.' },
    { name: 'Munnar Tea Gardens & Eravikulam National Park', area: 'Munnar Hills', desc: 'Rolling velvet carpets of high-altitude tea estates at 1,600m and misty shola grasslands home to the Nilgiri Tahr.', duration: '3 hours', hours: 3, feeInr: 200, bestTime: 'Morning', cats: ['Nature', 'Scenic', 'Photography', 'Family'], theme: 'garden', review1: 'Endless green tea slopes wrapped in morning mist and fresh mountain air.', review2: 'The Tea Museum tasting session added great context to the plantation trails.' },
    { name: 'Fort Kochi Chinese Fishing Nets & Jew Town', area: 'Kochi', desc: '14th-century cantilevered teak fishing nets along the waterfront, Paradesi Synagogue, Dutch Palace, and spice-warehouse cafés.', duration: '2.5 hours', hours: 2.5, feeInr: 50, bestTime: 'Late Afternoon & Sunset', cats: ['History', 'Culture', 'Shopping', 'Photography'], theme: 'coast', review1: 'Watching the fishermen lower the giant nets at sunset followed by spice shopping in Mattancherry.', review2: 'Rich multicultural history blending Portuguese, Dutch, and Malabar heritage.' },
    { name: 'Kathakali Classical Dance & Kalaripayattu Theatre', area: 'Fort Kochi / Munnar', desc: 'Evening live performance showcasing elaborate hand-painted Kathakali makeup rituals and ancient Kerala martial arts.', duration: '1.5 hours', hours: 1.5, feeInr: 400, bestTime: 'Evening', cats: ['Culture', 'Family', 'History'], theme: 'palace', review1: 'Arrive 45 minutes early to watch the artists apply natural mineral makeup on stage.', review2: 'Expressive storytelling and dramatic percussion.' },
  ],
  jaipur: [
    { name: 'Amber Fort (Amer Fort) & Sheesh Mahal', area: 'Amer, Jaipur', desc: 'Crowning sandstone-and-marble hilltop citadel featuring the Mirror Palace (Sheesh Mahal), Ganesh Pol, and Maota Lake.', duration: '3 hours', hours: 3, feeInr: 100, bestTime: 'Morning (8:30 AM)', cats: ['History', 'Photography', 'Culture', 'Scenic'], theme: 'palace', review1: 'The intricate mirror mosaic work in Sheesh Mahal glitters like a thousand stars.', review2: 'Majestic courtyards and sweeping views of the Aravalli watchtowers.' },
    { name: 'Hawa Mahal (Palace of Winds) & Sireh Deori', area: 'Badi Choupad, Pink City', desc: 'Iconic 1799 five-story pink sandstone honeycomb facade with 953 carved jharokha lattice windows built for royal observation.', duration: '1.5 hours', hours: 1.5, feeInr: 50, bestTime: 'Early Morning Sunlight', cats: ['Photography', 'History', 'Shopping', 'Culture'], theme: 'palace', review1: 'Morning sun turns the pink facade luminous; grab a coffee at the rooftop café opposite.', review2: 'Architectural masterpiece right in the heart of Jaipur’s bazaars.' },
    { name: 'City Palace & Jantar Mantar Observatory', area: 'Royal Precinct, Jaipur', desc: 'Royal residence featuring the Peacock Gate courtyard alongside UNESCO-listed monumental stone astronomical instruments.', duration: '2.5 hours', hours: 2.5, feeInr: 300, bestTime: 'Mid-morning', cats: ['History', 'Culture', 'Family', 'Photography'], theme: 'palace', review1: 'Pritam Niwas Chowk’s four seasonal gates are among the most photogenic spots in Rajasthan.', review2: 'The giant sundial at Jantar Mantar is still accurate to two seconds.' },
    { name: 'Nahargarh Fort Sunset Ramparts', area: 'Aravalli Ridge', desc: 'Hilltop fortress overlooking the entire illuminated Pink City basin with dramatic golden-hour views from Madhavendra Bhawan.', duration: '2 hours', hours: 2, feeInr: 50, bestTime: 'Sunset', cats: ['Scenic', 'Photography', 'History'], theme: 'monument', review1: 'Watching the whole city of Jaipur light up at dusk from the fort walls is magical.', review2: 'Breezy ramparts and stunning geometric stepwell (baori) nearby.' },
  ],
  udaipur: [
    { name: 'Udaipur City Palace & Lake Pichola Boat Cruise', area: 'Lake Pichola Bank', desc: 'Rajasthan’s largest palace complex rising in granite and marble above Lake Pichola, paired with a sunset boat ride to Jag Mandir.', duration: '3.5 hours', hours: 3.5, feeInr: 400, bestTime: 'Afternoon into Sunset', cats: ['History', 'Scenic', 'Photography', 'Culture'], theme: 'palace', review1: 'Cruising past the floating Lake Palace and Jag Mandir in golden light is unforgettable.', review2: 'Mor Chowk’s glass peacock mosaics inside the City Palace are breathtaking.' },
    { name: 'Bagore Ki Haveli & Dharohar Folk Dance Show', area: 'Gangaur Ghat', desc: '18th-century waterfront mansion with 138 rooms hosting an electric evening courtyard performance of Rajasthani Ghoomar and Bhavai dances.', duration: '2 hours', hours: 2, feeInr: 150, bestTime: 'Evening (7:00 PM Show)', cats: ['Culture', 'History', 'Family', 'Photography'], theme: 'palace', review1: 'The evening folk dancers balancing flaming brass pots in the candlelit haveli courtyard amazed everyone.', review2: 'Gangaur Ghat right outside is iconic for sunset photography.' },
    { name: 'Saheliyon-ki-Bari & Fateh Sagar Promenade', area: 'North Udaipur', desc: 'Courtyard of the Maidens featuring marble lotus pools, rain fountains, and sculpted kiosks beside Fateh Sagar Lake.', duration: '1.5 hours', hours: 1.5, feeInr: 30, bestTime: 'Morning', cats: ['Nature', 'Family', 'Scenic'], theme: 'garden', review1: 'Cool gravity-fed fountains and peaceful marble pavilions shaded by bougainvillea.', review2: 'Pair with a breezy stroll along Fateh Sagar Paal.' },
    { name: 'Sajjangarh Monsoon Palace Hilltop', area: 'Bansdara Peak', desc: 'White marble cloud-palace perched at 944m above sea level offering panoramic views of Udaipur’s lakes and Aravalli peaks.', duration: '2 hours', hours: 2, feeInr: 110, bestTime: 'Sunset', cats: ['Scenic', 'Photography', 'Nature'], theme: 'palace', review1: 'Unbeatable bird’s-eye view of Lake Pichola and Fateh Sagar at twilight.', review2: 'Cool mountain breeze and dramatic sunset colors.' },
  ],
};

export function getPlacesForDestination(destinationId: string): PlaceToVisit[] {
  if (SPECIFIC_PLACES[destinationId]) {
    return SPECIFIC_PLACES[destinationId];
  }

  const dest = getDestinationById(destinationId);
  const seeds = DESTINATION_PLACE_SEEDS[destinationId];

  if (seeds) {
    return seeds.map((s, idx) => ({
      id: `${destinationId}-place-${idx + 1}`,
      destinationId,
      name: s.name,
      rating: Number((4.6 + (idx % 3) * 0.1).toFixed(1)),
      reviewCountText: `${12 + idx * 5}K+ traveler reviews`,
      shortDescription: s.desc,
      detailedHistoryAndTips: `${s.desc} Located in ${s.area}, ${dest.name}. Arrive 20 minutes before peak hours for the clearest photography angles and relaxed exploration.`,
      locationArea: `${s.area}, ${dest.name}`,
      recommendedDuration: s.duration,
      durationHours: s.hours,
      entryFeeInr: s.feeInr,
      entryFeeText: s.feeInr === 0 ? 'Free Entry' : `₹${s.feeInr.toLocaleString('en-IN')}`,
      openingHours: '8:30 AM – 6:30 PM',
      bestTimeToVisit: s.bestTime,
      categories: s.cats,
      coordinates: { x: 22 + idx * 18, y: 30 + (idx % 2) * 28 },
      photos: makeSlides(s.name, s.theme, 'coast', 'palace'),
      reviews: makeReviews(s.review1, 'Aditi M.', s.review2, 'Siddharth R.'),
    }));
  }

  // Rich curated fallback for remaining destinations (Varanasi, Meghalaya, Andaman, Bali, Maldives, Singapore, Thailand, Japan, South Korea, Dubai, Switzerland, Paris, Australia)
  const seasonal = dest.seasonality.seasonalAttractions;
  const baseItems: QuickPlaceSeed[] = [
    {
      name: seasonal[0] || `${dest.name} Grand Heritage Landmark`,
      area: `Central ${dest.name}`,
      desc: `The signature architectural and cultural centerpiece of ${dest.name}, celebrated for panoramic views and timeless craftsmanship.`,
      duration: '2–3 hours',
      hours: 2.5,
      feeInr: dest.regionGroup === 'India' ? 100 : 1800,
      bestTime: 'Morning or Sunset',
      cats: ['History', 'Photography', 'Culture', 'Scenic'],
      theme: dest.heroTheme,
      review1: `A must-experience highlight in ${dest.name}; the scale and atmosphere are unforgettable.`,
      review2: 'Going early in the morning made the experience calm and effortless for photography.',
    },
    {
      name: seasonal[1] || `${dest.name} Scenic Waterfront & Nature Trail`,
      area: `${dest.name} Scenic District`,
      desc: `Breathtaking natural landscapes and waterfront promenades showcasing ${dest.name}'s signature coastal or mountain beauty.`,
      duration: '2.5 hours',
      hours: 2.5,
      feeInr: dest.regionGroup === 'India' ? 150 : 2200,
      bestTime: 'Late Afternoon',
      cats: ['Nature', 'Scenic', 'Photography', 'Family'],
      theme: 'coast',
      review1: 'Golden hour here was the highlight of our entire itinerary.',
      review2: 'Well-marked walkways and plenty of scenic viewpoints along the route.',
    },
    {
      name: seasonal[2] || `${dest.name} Artisan Quarter & Cultural Market`,
      area: `Old Quarter, ${dest.name}`,
      desc: `Vibrant heritage quarter filled with local crafts, street performances, boutique galleries, and evening lantern-lit lanes.`,
      duration: '2 hours',
      hours: 2,
      feeInr: 0,
      bestTime: 'Evening',
      cats: ['Shopping', 'Culture', 'Family', 'Photography'],
      theme: 'market',
      review1: 'Picked up authentic local crafts and loved the lively evening atmosphere.',
      review2: 'Easy to walk around with great cafés and street food stops nearby.',
    },
    {
      name: `${dest.name} Panoramic Sky Deck & Sunset Viewpoint`,
      area: `Highland / Skyline Point, ${dest.name}`,
      desc: `Elevated observation point offering 360-degree vistas across ${dest.name}'s landmarks, waterways, and horizon.`,
      duration: '1.5–2 hours',
      hours: 2,
      feeInr: dest.regionGroup === 'India' ? 200 : 2600,
      bestTime: 'Sunset',
      cats: ['Scenic', 'Photography', 'Adventure'],
      theme: 'alps',
      review1: 'Watching the transition from sunset to evening lights from the viewpoint was spectacular.',
      review2: 'Smooth entry process and crystal-clear visibility across the region.',
    },
    {
      name: `${dest.name} Botanical Sanctuary & Heritage Museum`,
      area: `Cultural Park, ${dest.name}`,
      desc: `Curated galleries and landscaped gardens preserving the royal, maritime, and artistic legacy of ${dest.name}.`,
      duration: '2 hours',
      hours: 2,
      feeInr: dest.regionGroup === 'India' ? 80 : 1400,
      bestTime: 'Mid-day',
      cats: ['History', 'Culture', 'Family', 'Nature'],
      theme: 'garden',
      review1: 'Thoughtfully curated exhibits and shaded garden courtyards ideal for midday exploring.',
      review2: 'Great audio guide and family-friendly interactive displays.',
    },
  ];

  return baseItems.map((s, idx) => ({
    id: `${destinationId}-place-${idx + 1}`,
    destinationId,
    name: s.name,
    rating: Number((4.6 + (idx % 4) * 0.1).toFixed(1)),
    reviewCountText: `${15 + idx * 6}K+ traveler reviews`,
    shortDescription: s.desc,
    detailedHistoryAndTips: `${s.desc} Insider tip: Combine this stop with nearby dining in ${s.area} to minimize transit time.`,
    locationArea: s.area,
    recommendedDuration: s.duration,
    durationHours: s.hours,
    entryFeeInr: s.feeInr,
    entryFeeText: s.feeInr === 0 ? 'Free Entry' : `₹${s.feeInr.toLocaleString('en-IN')}`,
    openingHours: '9:00 AM – 7:00 PM',
    bestTimeToVisit: s.bestTime,
    categories: s.cats,
    coordinates: { x: 18 + idx * 17, y: 26 + (idx % 2) * 32 },
    photos: makeSlides(s.name, s.theme, 'palace', 'coast'),
    reviews: makeReviews(s.review1, 'Riya S.', s.review2, 'Devansh K.'),
  }));
}
