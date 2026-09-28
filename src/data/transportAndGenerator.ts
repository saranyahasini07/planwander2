import {
  TransportOption,
  LocalTransportOption,
  UserPreferences,
  MyTripSelections,
  GeneratedTripOption,
  ItineraryDayPlan,
  ItinerarySlot,
} from '../types/travel';
import { getDestinationById } from './destinationsCatalog';
import { getPlacesForDestination } from './placesAndReviews';
import { getHotelsForDestination, getRestaurantsForDestination } from './hotelsAndRestaurants';

export function getTransportOptionsForRoute(destinationId: string, originCity: string): TransportOption[] {
  const dest = getDestinationById(destinationId);
  const isIndia = dest.regionGroup === 'India';
  const cleanOrigin = originCity.split('(')[0].trim() || 'Delhi';

  const baseFlightPrice = isIndia ? 4200 : 24500;

  const options: TransportOption[] = [
    {
      id: `${destinationId}-trans-flight-morning`,
      destinationId,
      type: 'Flight',
      provider: isIndia ? 'IndiGo / Air India Direct' : 'Singapore Airlines / Emirates',
      routeCode: isIndia ? '6E-2142 · Airbus A320neo' : 'SQ-428 · Boeing 787 Dreamliner',
      departureTime: '10:30 AM',
      arrivalTime: isIndia ? '11:45 AM' : '04:50 PM',
      durationMinutes: isIndia ? 75 : 320,
      durationText: isIndia ? '1h 15m' : '5h 20m',
      stopsText: 'Non-stop',
      stopsCount: 0,
      priceInr: baseFlightPrice,
      comfortClass: 'Economy Standard · 15kg Check-in + 7kg Cabin',
      comfortScore: 4.4,
      rating: 4.4,
      reviewCount: '4.2K ratings',
      baggageOrAmenities: ['15kg Check-in Baggage', 'Web Check-in Seat Selection', 'On-Time Performance 92%'],
      originHub: cleanOrigin,
      destinationHub: dest.defaultAirportOrStation,
      valueScore: 92,
    },
    {
      id: `${destinationId}-trans-flight-comfort`,
      destinationId,
      type: 'Flight',
      provider: isIndia ? 'Vistara / Air India Premier' : 'Emirates / ANA Business Flex',
      routeCode: isIndia ? 'UK-879 · Premier Cabin' : 'EK-512 · Widebody Lounge Access',
      departureTime: '08:15 AM',
      arrivalTime: isIndia ? '09:35 AM' : '02:30 PM',
      durationMinutes: isIndia ? 80 : 315,
      durationText: isIndia ? '1h 20m' : '5h 15m',
      stopsText: 'Non-stop',
      stopsCount: 0,
      priceInr: Math.round(baseFlightPrice * 1.65),
      comfortClass: 'Premium Economy / Extra Legroom · Hot Meal',
      comfortScore: 4.9,
      rating: 4.8,
      reviewCount: '2.8K ratings',
      baggageOrAmenities: ['25kg Priority Baggage', 'Complimentary Hot Dining', 'Lounge Access Available'],
      originHub: cleanOrigin,
      destinationHub: dest.defaultAirportOrStation,
      valueScore: 88,
    },
    {
      id: `${destinationId}-trans-train-express`,
      destinationId,
      type: 'Train',
      provider: isIndia ? 'Vande Bharat / Rajdhani Express' : 'High-Speed Rail / Eurostar / Shinkansen',
      routeCode: isIndia ? '20701 · AC Executive Chair / 2AC' : 'HSR-302 · Reserved Panorama Car',
      departureTime: '06:00 AM',
      arrivalTime: '12:30 PM',
      durationMinutes: 390,
      durationText: '6h 30m',
      stopsText: '3 Express Stops',
      stopsCount: 3,
      priceInr: isIndia ? 1650 : 6800,
      comfortClass: 'AC Chair Car / 2-Tier AC · Onboard Meals',
      comfortScore: 4.6,
      rating: 4.6,
      reviewCount: '6.5K ratings',
      baggageOrAmenities: ['Generous 40kg Luggage Allowance', 'At-Seat Charging Socket', 'Onboard Catering Included'],
      originHub: `${cleanOrigin} Central Rail`,
      destinationHub: `${dest.name} Junction`,
      valueScore: 96,
    },
    {
      id: `${destinationId}-trans-train-sleeper`,
      destinationId,
      type: 'Train',
      provider: isIndia ? 'Indian Railways Superfast Sleeper / 3AC' : 'Overnight Intercity Rail Sleeper',
      routeCode: isIndia ? '12724 · Overnight Express' : 'IC-710 · Night Couchette',
      departureTime: '02:00 PM',
      arrivalTime: '06:00 AM',
      durationMinutes: 960,
      durationText: '16h 00m',
      stopsText: 'Overnight Direct',
      stopsCount: 6,
      priceInr: isIndia ? 850 : 3900,
      comfortClass: 'Sleeper / 3AC Berth · Budget Favorite',
      comfortScore: 4.1,
      rating: 4.3,
      reviewCount: '9.1K ratings',
      baggageOrAmenities: ['Saves 1 Night Hotel Cost', 'Full Sleeping Berth', 'Station-to-City Center Arrival'],
      originHub: `${cleanOrigin} Terminus`,
      destinationHub: `${dest.name} Station`,
      valueScore: 94,
    },
    {
      id: `${destinationId}-trans-bus-volvo`,
      destinationId,
      type: 'Bus',
      provider: isIndia ? 'IntrCity SmartBus / Volvo 9600 Multi-Axle' : 'Express Luxury Coach Liner',
      routeCode: 'AC Sleeper + Lounge Boarding',
      departureTime: '09:00 PM',
      arrivalTime: '07:30 AM',
      durationMinutes: 630,
      durationText: '10h 30m',
      stopsText: '1 Highway Dining Stop',
      stopsCount: 1,
      priceInr: isIndia ? 1150 : 3200,
      comfortClass: 'Volvo AC Sleeper Berth · Live GPS',
      comfortScore: 4.2,
      rating: 4.4,
      reviewCount: '3.7K ratings',
      baggageOrAmenities: ['Private Curtain Berth', 'USB Port & Blanket', 'Washroom Onboard'],
      originHub: `${cleanOrigin} Boarding Lounge`,
      destinationHub: `${dest.name} Central Bus Port`,
      valueScore: 89,
    },
    {
      id: `${destinationId}-trans-self-drive`,
      destinationId,
      type: 'Self-Drive Car',
      provider: 'Zoomcar / Avis Self-Drive SUV',
      routeCode: 'Hyundai Creta / Compact SUV · Automatic',
      departureTime: 'Flexible (07:00 AM rec.)',
      arrivalTime: 'Flexible (02:30 PM est.)',
      durationMinutes: 450,
      durationText: '7h 30m drive',
      stopsText: 'Scenic Highway Route',
      stopsCount: 0,
      priceInr: isIndia ? 3400 : 8900,
      comfortClass: 'Private SUV · Unlimited Km Package',
      comfortScore: 4.7,
      rating: 4.5,
      reviewCount: '1.9K ratings',
      baggageOrAmenities: ['Door-to-Door Flexibility', 'Stop at Highway Viewpoints', 'FASTag & Roadside Assist'],
      originHub: cleanOrigin,
      destinationHub: dest.name,
      valueScore: 87,
    },
    {
      id: `${destinationId}-trans-private-cab`,
      destinationId,
      type: 'Taxi / Cab',
      provider: 'Chauffeur-Driven Innova Crysta / Sedan',
      routeCode: 'Private Intercity Outstation Cab',
      departureTime: 'Anytime (Doorstep Pickup)',
      arrivalTime: 'Direct to Hotel Lobby',
      durationMinutes: 430,
      durationText: '7h 10m',
      stopsText: 'Direct Door-to-Door',
      stopsCount: 0,
      priceInr: isIndia ? 4800 : 12500,
      comfortClass: 'AC Chauffeur SUV · Up to 6 Travelers',
      comfortScore: 4.8,
      rating: 4.7,
      reviewCount: '2.4K ratings',
      baggageOrAmenities: ['Zero Luggage Hauling', 'Verified Professional Driver', 'Includes Local Sightseeing Drop'],
      originHub: `${cleanOrigin} Home Pickup`,
      destinationHub: `${dest.name} Hotel`,
      valueScore: 90,
    },
  ];

  return options;
}

export function getLocalTransportForDestination(destinationId: string): LocalTransportOption[] {
  const dest = getDestinationById(destinationId);
  const isIndia = dest.regionGroup === 'India';

  return [
    {
      id: `${destinationId}-local-metro`,
      destinationId,
      mode: 'Metro / Subway',
      name: `${dest.name} Tourist Metro & Rail Smart Card`,
      dailyPriceInr: isIndia ? 200 : 850,
      coverage: 'Unlimited rides across major monument corridors and commercial hubs',
      bestFor: 'Beating city traffic and fast cross-town connections',
      convenienceRating: 4.7,
    },
    {
      id: `${destinationId}-local-auto`,
      destinationId,
      mode: 'Auto-Rickshaw / Tuk-Tuk',
      name: 'App-Metered Auto-Rickshaw / Hop-On Local Drops',
      dailyPriceInr: isIndia ? 350 : 1100,
      coverage: 'Point-to-point short hops through narrow Old City bazaar lanes',
      bestFor: 'Short 1–4 km hops between markets, cafés, and monuments',
      convenienceRating: 4.5,
    },
    {
      id: `${destinationId}-local-cab`,
      destinationId,
      mode: 'App Taxi / Cab',
      name: '8-Hour / 80 Km Dedicated AC Sightseeing Cab',
      dailyPriceInr: isIndia ? 1800 : 5400,
      coverage: 'Full-day private AC sedan waiting for you at every attraction',
      bestFor: 'Families, groups, and comfortable midday transfers',
      convenienceRating: 4.9,
    },
    {
      id: `${destinationId}-local-scooter`,
      destinationId,
      mode: 'Scooter / Car Rental',
      name: 'Self-Ride Two-Wheeler / Compact Rental',
      dailyPriceInr: isIndia ? 500 : 1900,
      coverage: '24-hour self-ride rental with 2 helmets and digital map mount',
      bestFor: 'Solo travelers and couples exploring coastal or hillside lanes',
      convenienceRating: 4.6,
    },
    {
      id: `${destinationId}-local-walk`,
      destinationId,
      mode: 'Walking & Heritage Pass',
      name: 'Old Quarter Guided Heritage Walk & City Bus Pass',
      dailyPriceInr: isIndia ? 150 : 600,
      coverage: 'Morning heritage walk + all-day AC city bus feeder pass',
      bestFor: 'Photography enthusiasts and slow cultural immersion',
      convenienceRating: 4.4,
    },
  ];
}

export function generateTripOptionsFromChoices(
  prefs: UserPreferences,
  selections: MyTripSelections
): GeneratedTripOption[] {
  const destId = selections.destinationId || prefs.destinationId;
  const dest = getDestinationById(destId);
  const allTransports = getTransportOptionsForRoute(destId, prefs.originCity);
  const allLocalTransports = getLocalTransportForDestination(destId);
  const allHotels = getHotelsForDestination(destId);
  const allPlaces = getPlacesForDestination(destId);
  const allRestaurants = getRestaurantsForDestination(destId);

  const userTransport =
    allTransports.find((t) => t.id === selections.selectedTransportId) || allTransports[0];
  const userHotel =
    allHotels.find((h) => h.id === selections.selectedHotelId) || allHotels[1] || allHotels[0];
  const userLocalTransports =
    selections.selectedLocalTransportIds.length > 0
      ? allLocalTransports.filter((l) => selections.selectedLocalTransportIds.includes(l.id))
      : [allLocalTransports[0]];

  const userPlaces =
    selections.selectedPlaceIds.length > 0
      ? allPlaces.filter((p) => selections.selectedPlaceIds.includes(p.id))
      : allPlaces.slice(0, 4);

  const userRestaurants =
    selections.selectedRestaurantIds.length > 0
      ? allRestaurants.filter((r) => selections.selectedRestaurantIds.includes(r.id))
      : allRestaurants.slice(0, 3);

  const daysCount = Math.max(2, Math.min(10, prefs.durationDays || 4));
  const travelers = Math.max(1, prefs.travelersCount || 2);
  const rooms = Math.max(1, prefs.roomsCount || 1);

  const buildDaysForStrategy = (
    strategy: GeneratedTripOption['strategy'],
    transport: TransportOption,
    hotel: HotelOption,
    places: PlaceToVisit[],
    restaurants: RestaurantOption[]
  ): ItineraryDayPlan[] => {
    const orderedPlaces = [...places];
    if (strategy === 'smart_cluster') {
      orderedPlaces.sort((a, b) => a.coordinates.x - b.coordinates.x);
    } else if (strategy === 'early_bird') {
      orderedPlaces.sort((a, b) => b.rating - a.rating);
    } else if (strategy === 'budget_maximizer') {
      orderedPlaces.sort((a, b) => a.entryFeeInr - b.entryFeeInr);
    }

    const days: ItineraryDayPlan[] = [];
    const placesPerDay = Math.max(1, Math.ceil(orderedPlaces.length / daysCount));

    for (let d = 1; d <= daysCount; d++) {
      const dayPlaces = orderedPlaces.slice((d - 1) * placesPerDay, d * placesPerDay);
      const activePlaces =
        dayPlaces.length > 0 ? dayPlaces : [orderedPlaces[(d - 1) % orderedPlaces.length]];

      const lunchSpot = restaurants[(d - 1) % restaurants.length];
      const dinnerSpot = restaurants[d % restaurants.length] || lunchSpot;

      const slots: ItinerarySlot[] = [];

      if (d === 1) {
        slots.push({
          id: `d${d}-slot-arrival`,
          time: strategy === 'relaxed_scenic' ? '10:30 AM' : '09:30 AM',
          title: `Arrive in ${dest.name} via ${transport.provider} (${transport.type})`,
          slotType: 'transport',
          referenceId: transport.id,
          location: transport.destinationHub,
          duration: transport.durationText,
          costInr: transport.priceInr * travelers,
          travelTimeFromPrev: 'Arrival Point',
          distanceFromPrev: '0 km',
          notes: `${transport.departureTime} → ${transport.arrivalTime} · ${transport.comfortClass}`,
          coordinates: { x: 15, y: 20 },
        });
        slots.push({
          id: `d${d}-slot-checkin`,
          time: strategy === 'relaxed_scenic' ? '12:00 PM' : '11:00 AM',
          title: `Check-in & Refresh at ${hotel.name}`,
          slotType: 'hotel',
          referenceId: hotel.id,
          location: hotel.locationArea,
          duration: '1 hour',
          costInr: hotel.pricePerNightInr * rooms,
          travelTimeFromPrev: '25 min transfer',
          distanceFromPrev: '8.4 km',
          notes: `${hotel.stars}-Star Stay · ${hotel.keyAmenities.slice(0, 2).join(' · ')}`,
          coordinates: hotel.coordinates,
        });
      } else {
        slots.push({
          id: `d${d}-slot-morning-start`,
          time: strategy === 'early_bird' ? '08:00 AM' : strategy === 'relaxed_scenic' ? '10:00 AM' : '09:00 AM',
          title: `Morning Breakfast at ${hotel.name}`,
          slotType: 'hotel',
          referenceId: hotel.id,
          location: hotel.locationArea,
          duration: '45 mins',
          costInr: hotel.breakfastIncluded ? 0 : 250 * travelers,
          travelTimeFromPrev: 'At Hotel',
          distanceFromPrev: '0 km',
          notes: hotel.breakfastIncluded ? 'Complimentary hotel breakfast included' : 'Fresh local morning breakfast',
          coordinates: hotel.coordinates,
        });
      }

      // First attraction
      if (activePlaces[0]) {
        const p1 = activePlaces[0];
        slots.push({
          id: `d${d}-slot-place-1`,
          time: d === 1 ? '01:30 PM' : strategy === 'early_bird' ? '09:00 AM' : '10:15 AM',
          title: `Explore ${p1.name}`,
          slotType: 'place',
          referenceId: p1.id,
          location: p1.locationArea,
          duration: p1.recommendedDuration,
          costInr: p1.entryFeeInr * travelers,
          travelTimeFromPrev: '15 min local ride',
          distanceFromPrev: '3.2 km',
          notes: `${p1.shortDescription} (Best time: ${p1.bestTimeToVisit})`,
          coordinates: p1.coordinates,
        });
      }

      // Lunch
      slots.push({
        id: `d${d}-slot-lunch`,
        time: d === 1 ? '03:30 PM' : '01:00 PM',
        title: `Lunch & Local Flavors at ${lunchSpot.name}`,
        slotType: 'restaurant',
        referenceId: lunchSpot.id,
        location: lunchSpot.locationAndDistance,
        duration: '1h 15m',
        costInr: lunchSpot.avgCostPerPersonInr * travelers,
        travelTimeFromPrev: '10 min walk / auto',
        distanceFromPrev: '1.4 km',
        notes: `Try: ${lunchSpot.popularDishes.slice(0, 2).join(', ')} (${lunchSpot.cuisine})`,
        coordinates: lunchSpot.coordinates,
      });

      // Second attraction or afternoon experience
      const p2 = activePlaces[1] || orderedPlaces[(d + 1) % orderedPlaces.length];
      if (p2) {
        slots.push({
          id: `d${d}-slot-place-2`,
          time: d === 1 ? '05:00 PM' : '03:30 PM',
          title:
            strategy === 'relaxed_scenic'
              ? `Golden Hour & Scenic Walk at ${p2.name}`
              : `Discover ${p2.name}`,
          slotType: 'place',
          referenceId: p2.id,
          location: p2.locationArea,
          duration: p2.recommendedDuration,
          costInr: p2.entryFeeInr * travelers,
          travelTimeFromPrev: '14 min local transit',
          distanceFromPrev: '2.8 km',
          notes: `${p2.categories.join(' · ')} · ${p2.entryFeeText}`,
          coordinates: p2.coordinates,
        });
      }

      // Dinner
      slots.push({
        id: `d${d}-slot-dinner`,
        time: '08:00 PM',
        title: `Evening Dinner at ${dinnerSpot.name}`,
        slotType: 'restaurant',
        referenceId: dinnerSpot.id,
        location: dinnerSpot.locationAndDistance,
        duration: '1h 30m',
        costInr: dinnerSpot.avgCostPerPersonInr * travelers,
        travelTimeFromPrev: '12 min ride',
        distanceFromPrev: '2.1 km',
        notes: `${dinnerSpot.categories.slice(0, 2).join(' · ')} · Popular: ${dinnerSpot.popularDishes[0]}`,
        coordinates: dinnerSpot.coordinates,
      });

      const dailySpendInr = slots.reduce((sum, s) => sum + s.costInr, 0);

      days.push({
        dayNumber: d,
        title:
          d === 1
            ? `Day 1 — Arrival in ${dest.name} & Signature Landmarks`
            : d === daysCount
            ? `Day ${d} — Cultural Immersion, Souvenirs & Departure`
            : `Day ${d} — ${activePlaces.map((p) => p.name.split('&')[0].trim()).join(' & ')}`,
        themeSummary:
          strategy === 'smart_cluster'
            ? 'Geographically grouped stops to cut transit time by 35%'
            : strategy === 'relaxed_scenic'
            ? 'Unhurried pacing with golden-hour viewpoints and leisurely dining'
            : strategy === 'early_bird'
            ? 'Early morning landmark entries for quiet photography & zero queues'
            : 'Cost-optimized route using smart local transit and heritage gems',
        dailySpendInr,
        slots,
      });
    }

    return days;
  };

  const buildCompleteOption = (
    id: string,
    strategy: GeneratedTripOption['strategy'],
    badgeLabel: string,
    title: string,
    subtitle: string,
    whyItMatchesYou: string,
    transport: TransportOption,
    hotel: HotelOption,
    places: PlaceToVisit[],
    restaurants: RestaurantOption[],
    pros: string[],
    considerations: string[]
  ): GeneratedTripOption => {
    const days = buildDaysForStrategy(strategy, transport, hotel, places, restaurants);
    const intercityTransport = transport.priceInr * travelers * 2; // round-trip estimate
    const hotelStay = hotel.pricePerNightInr * rooms * daysCount;
    const foodAndDining = restaurants.reduce((acc, r) => acc + r.avgCostPerPersonInr, 0) * travelers * Math.max(1, Math.ceil(daysCount / 2));
    const placesAndActivities = places.reduce((acc, p) => acc + p.entryFeeInr, 0) * travelers + 600 * travelers;
    const localTransit =
      userLocalTransports.reduce((acc, l) => acc + l.dailyPriceInr, 0) * daysCount * Math.ceil(travelers / 2);
    const shoppingAndMisc = Math.round((intercityTransport + hotelStay) * 0.08);

    const totalEstimatedCostInr =
      intercityTransport + hotelStay + foodAndDining + placesAndActivities + localTransit + shoppingAndMisc;

    return {
      id,
      strategy,
      badgeLabel,
      title,
      subtitle,
      whyItMatchesYou,
      totalEstimatedCostInr,
      costPerPersonInr: Math.round(totalEstimatedCostInr / travelers),
      costPerDayInr: Math.round(totalEstimatedCostInr / daysCount),
      daysCount,
      transport,
      localTransports: userLocalTransports,
      hotel,
      places,
      restaurants,
      days,
      pros,
      considerations,
      budgetBreakdown: {
        intercityTransport,
        hotelStay,
        foodAndDining,
        placesAndActivities,
        localTransit,
        shoppingAndMisc,
      },
    };
  };

  const budgetTransport =
    allTransports.find((t) => t.type === 'Train' && t.id.includes('sleeper')) || allTransports[3] || userTransport;
  const luxuryTransport =
    allTransports.find((t) => t.id.includes('comfort')) || allTransports[1] || userTransport;
  const budgetHotel = allHotels.find((h) => h.categories.includes('Budget')) || allHotels[3] || userHotel;
  const luxuryHotel = allHotels.find((h) => h.categories.includes('Luxury')) || allHotels[0] || userHotel;

  return [
    buildCompleteOption(
      'opt-your-custom-smart',
      'smart_cluster',
      'Built From Your Exact Selections',
      'Option A · Smart Clustered Itinerary (Your Choices)',
      `Uses your selected ${userTransport.type}, ${userHotel.name}, ${userPlaces.length} chosen places & ${userRestaurants.length} dining spots`,
      `Directly sequences your hand-picked selections in ${dest.name} by neighborhood proximity so you spend more time exploring and less time in traffic.`,
      userTransport,
      userHotel,
      userPlaces,
      userRestaurants,
      [
        `Includes 100% of your selected places (${userPlaces.map((p) => p.name.split('&')[0].trim()).join(', ')})`,
        `Paired with ${userHotel.name} (${userHotel.rating}/5) & ${userTransport.provider}`,
        'Shortest daily travel hops between consecutive stops',
      ],
      ['Popular morning landmarks require arriving on schedule']
    ),
    buildCompleteOption(
      'opt-relaxed-scenic',
      'relaxed_scenic',
      'Unhurried & Scenic Pace',
      'Option B · Relaxed Golden-Hour & Leisure Flow',
      `Same selected ${userPlaces.length} attractions & ${userRestaurants.length} restaurants arranged with later starts and sunset windows`,
      `Ideal if you want your chosen ${dest.name} spots without rushing—starts mornings around 10:00 AM and schedules scenic landmarks at golden hour.`,
      userTransport,
      userHotel,
      userPlaces,
      userRestaurants,
      [
        'Later morning starts with buffer time for cafés and bazaar strolling',
        'Aligns scenic viewpoints with sunset lighting for photography',
        'Uses your exact selected hotel and dining spots',
      ],
      ['Slightly shorter midday museum windows due to relaxed morning start']
    ),
    buildCompleteOption(
      'opt-budget-saver',
      'budget_maximizer',
      'Smart Value Alternative',
      'Option C · Budget-Saver & Local Value Plan',
      `Pairs your ${userPlaces.length} chosen sights with ${budgetTransport.type} (${budgetTransport.provider}) & ${budgetHotel.name}`,
      `Keeps every attraction and restaurant you chose in ${dest.name}, while swapping to high-value transit and a top-rated smart hotel to lower overall spend.`,
      budgetTransport,
      budgetHotel,
      userPlaces,
      userRestaurants,
      [
        'Lowest total cost per traveler while keeping all chosen attractions',
        `Uses ${budgetTransport.type} (${budgetTransport.durationText}) & ${budgetHotel.name}`,
        'Great for extending trip length or saving budget for shopping & experiences',
      ],
      [`Longer transit duration (${budgetTransport.durationText}) compared to direct flights`]
    ),
    buildCompleteOption(
      'opt-comfort-luxury',
      'early_bird',
      'Comfort & Priority Access',
      'Option D · Comfort / Luxury & Early-Access Plan',
      `Upgrades your selections with ${luxuryHotel.name} (${luxuryHotel.stars}★) & ${luxuryTransport.provider}`,
      `Combines your selected ${dest.name} places with a flagship 5-star stay, priority morning entry before crowds arrive, and effortless transfers.`,
      luxuryTransport,
      luxuryHotel,
      userPlaces,
      userRestaurants,
      [
        `5-Star stay at ${luxuryHotel.name} with breakfast & concierge perks`,
        'Early-bird landmark scheduling beats peak midday crowds and heat',
        `Fastest nonstop arrival via ${luxuryTransport.provider}`,
      ],
      ['Higher nightly tariff for 5-star heritage/luxury accommodation']
    ),
  ];
}
