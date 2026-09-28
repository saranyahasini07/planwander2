export type CurrencyCode = 'INR' | 'USD';

export type TransportType =
  | 'Flight'
  | 'Train'
  | 'Bus'
  | 'Self-Drive Car'
  | 'Taxi / Cab'
  | 'Private Transfer'
  | 'Metro / Rail Pass';

export type TransportSortFilter =
  | 'all'
  | 'fastest'
  | 'cheapest'
  | 'best_value'
  | 'most_comfortable';

export interface TransportOption {
  id: string;
  destinationId: string;
  type: TransportType;
  provider: string;
  routeCode: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  durationText: string;
  stopsText: string;
  stopsCount: number;
  priceInr: number;
  comfortClass: string;
  comfortScore: number; // 1-5
  rating: number;
  reviewCount: string;
  baggageOrAmenities: string[];
  originHub: string;
  destinationHub: string;
  valueScore: number;
}

export interface LocalTransportOption {
  id: string;
  destinationId: string;
  mode: 'Metro / Subway' | 'City Bus Pass' | 'Auto-Rickshaw / Tuk-Tuk' | 'App Taxi / Cab' | 'Scooter / Car Rental' | 'Walking & Heritage Pass';
  name: string;
  dailyPriceInr: number;
  coverage: string;
  bestFor: string;
  convenienceRating: number;
}

export type PlaceCategory =
  | 'History'
  | 'Photography'
  | 'Nature'
  | 'Shopping'
  | 'Family'
  | 'Scenic'
  | 'Culture'
  | 'Adventure';

export interface TravelerReview {
  id: string;
  author: string;
  travelerType: string;
  rating: number;
  date: string;
  comment: string;
  isSampleData: boolean;
}

export interface PhotoSlide {
  id: string;
  caption: string;
  theme: 'coast' | 'palace' | 'shrine' | 'alps' | 'market' | 'garden' | 'culinary' | 'luxury_room' | 'rooftop' | 'monument';
  accentHex: string;
  secondaryHex: string;
}

export interface PlaceToVisit {
  id: string;
  destinationId: string;
  name: string;
  rating: number;
  reviewCountText: string;
  shortDescription: string;
  detailedHistoryAndTips: string;
  locationArea: string;
  recommendedDuration: string;
  durationHours: number;
  entryFeeInr: number;
  entryFeeText: string;
  openingHours: string;
  bestTimeToVisit: string;
  categories: PlaceCategory[];
  coordinates: { x: number; y: number }; // normalized 0-100 map coordinates
  photos: PhotoSlide[];
  reviews: TravelerReview[];
}

export type RestaurantCategory =
  | 'Local food'
  | 'Budget'
  | 'Highly rated'
  | 'Vegetarian'
  | 'Rooftop'
  | 'Family-friendly'
  | 'Romantic'
  | 'Fast food'
  | 'Cafés';

export interface RestaurantOption {
  id: string;
  destinationId: string;
  name: string;
  rating: number;
  reviewCountText: string;
  priceRangeText: string;
  avgCostPerPersonInr: number;
  cuisine: string;
  locationAndDistance: string;
  shortDescription: string;
  popularDishes: string[];
  categories: RestaurantCategory[];
  mealTypes: ('Breakfast' | 'Lunch' | 'Dinner' | 'Cafe')[];
  coordinates: { x: number; y: number };
  photos: PhotoSlide[];
  reviews: TravelerReview[];
}

export type HotelCategory =
  | 'Best Rated'
  | 'Budget'
  | 'Luxury'
  | 'Near Attractions'
  | 'Family Friendly'
  | 'Romantic';

export interface HotelOption {
  id: string;
  destinationId: string;
  name: string;
  stars: number;
  rating: number;
  reviewCountText: string;
  pricePerNightInr: number;
  locationArea: string;
  distanceFromCenter: string;
  keyAmenities: string[];
  shortDescription: string;
  cancellationPolicy: string;
  breakfastIncluded: boolean;
  categories: HotelCategory[];
  coordinates: { x: number; y: number };
  photos: PhotoSlide[];
  reviews: TravelerReview[];
}

export interface DestinationSeasonality {
  bestMonths: string;
  peakSeason: string;
  offSeason: string;
  weatherSummary: string;
  tempRangeC: string;
  rainfallMm: string;
  crowdLevel: 'Low' | 'Moderate' | 'High';
  seasonalPriceDiff: string;
  majorFestivals: string[];
  seasonalAttractions: string[];
  advisoryByMonth: Record<string, { status: 'Ideal' | 'Shoulder' | 'Avoid / Off-Peak'; reason: string; alternativeSuggestion?: string }>;
}

export interface DestinationInfo {
  id: string;
  name: string;
  country: string;
  regionGroup: 'India' | 'International';
  tagline: string;
  description: string;
  defaultAirportOrStation: string;
  startingPriceInr: number;
  heroTheme: 'coast' | 'palace' | 'shrine' | 'alps';
  seasonality: DestinationSeasonality;
}

export interface UserPreferences {
  destinationId: string;
  originCity: string;
  travelMonth: string;
  startDate: string;
  durationDays: number;
  travelersCount: number;
  roomsCount: number;
  roomType: 'Standard Queen' | 'Deluxe Twin' | 'Family Suite' | 'Heritage / Luxury Villa';
  budgetTotalInr: number;
  budgetTier: 'Budget' | 'Balanced' | 'Comfort / Luxury';
  preferredTransportTypes: TransportType[];
  travelStyle: 'Balanced' | 'Budget Explorer' | 'Luxury Sanctuary' | 'Adventure & Outdoors' | 'Relaxed & Scenic';
  pace: 'Relaxed' | 'Balanced' | 'Fast-Paced';
  interests: PlaceCategory[];
  foodPreferences: RestaurantCategory[];
  accommodationCategory: HotelCategory;
  specialRequirements: string;
}

export interface MyTripSelections {
  destinationId: string;
  selectedTransportId: string | null;
  selectedLocalTransportIds: string[];
  selectedHotelId: string | null;
  selectedPlaceIds: string[];
  selectedRestaurantIds: string[];
}

export interface ItinerarySlot {
  id: string;
  time: string;
  title: string;
  slotType: 'transport' | 'hotel' | 'place' | 'restaurant' | 'activity';
  referenceId?: string;
  location: string;
  duration: string;
  costInr: number;
  travelTimeFromPrev: string;
  distanceFromPrev: string;
  notes: string;
  coordinates: { x: number; y: number };
}

export interface ItineraryDayPlan {
  dayNumber: number;
  title: string;
  themeSummary: string;
  dailySpendInr: number;
  slots: ItinerarySlot[];
}

export type ItineraryOptionStrategy =
  | 'smart_cluster'
  | 'relaxed_scenic'
  | 'early_bird'
  | 'budget_maximizer'
  | 'luxury_signature';

export interface GeneratedTripOption {
  id: string;
  strategy: ItineraryOptionStrategy;
  badgeLabel: string;
  title: string;
  subtitle: string;
  whyItMatchesYou: string;
  totalEstimatedCostInr: number;
  costPerPersonInr: number;
  costPerDayInr: number;
  daysCount: number;
  transport: TransportOption;
  localTransports: LocalTransportOption[];
  hotel: HotelOption;
  places: PlaceToVisit[];
  restaurants: RestaurantOption[];
  days: ItineraryDayPlan[];
  pros: string[];
  considerations: string[];
  budgetBreakdown: {
    intercityTransport: number;
    hotelStay: number;
    foodAndDining: number;
    placesAndActivities: number;
    localTransit: number;
    shoppingAndMisc: number;
  };
}

export interface SavedTripRecord {
  id: string;
  savedAt: string;
  customName: string;
  preferences: UserPreferences;
  selections: MyTripSelections;
  chosenOption: GeneratedTripOption;
}
