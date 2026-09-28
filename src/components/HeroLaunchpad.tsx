import React, { useState } from 'react';
import { Search, Compass, ArrowRight } from 'lucide-react';
import { DESTINATIONS, ORIGIN_CITIES, getDestinationById } from '../data/destinationsCatalog';
import { UserPreferences, CurrencyCode } from '../types/travel';
import { GENERATED_IMAGES, VisualCardGallery } from './VisualCardGallery';
import { formatMoney } from '../utils/formatters';

interface HeroLaunchpadProps {
  preferences: UserPreferences;
  onUpdatePreferences: (patch: Partial<UserPreferences>) => void;
  onSelectDestination: (destinationId: string) => void;
  onJumpToBuilderSection: () => void;
  currency: CurrencyCode;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const HeroLaunchpad: React.FC<HeroLaunchpadProps> = ({
  preferences,
  onUpdatePreferences,
  onSelectDestination,
  onJumpToBuilderSection,
  currency,
}) => {
  const [regionFilter, setRegionFilter] = useState<'All' | 'India' | 'International'>('All');
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  const activeDest = getDestinationById(preferences.destinationId);
  const indiaDestinations = DESTINATIONS.filter((d) => d.regionGroup === 'India');
  const intlDestinations = DESTINATIONS.filter((d) => d.regionGroup === 'International');

  const filteredDestinations =
    regionFilter === 'All'
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.regionGroup === regionFilter);

  const visibleDestinations = showAllDestinations
    ? filteredDestinations
    : filteredDestinations.slice(0, 8);

  const monthAdvisory =
    activeDest.seasonality.advisoryByMonth[preferences.travelMonth] ||
    activeDest.seasonality.advisoryByMonth['November'];

  return (
    <section className="border-b border-slate-200 bg-white">
      {/* Hero Banner with high-contrast scrim */}
      <div className="relative overflow-hidden bg-slate-950">
        <img
          src={GENERATED_IMAGES.coast}
          alt="Coastal cliffs and scenic travel horizon"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/40" />

        <div className="relative max-w-[1400px] mx-auto px-6 pt-12 pb-14">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-wide text-sky-300 mb-3">
              Discover · Compare · Choose · Build Across 21 India &amp; Global Destinations
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.12] mb-4">
              Plan the trip. We&apos;ll handle the rest.
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mb-8">
              Personalized trips, stays, transport and experiences — planned around you. Compare every flight, train, hotel, landmark, and local kitchen before building your custom day-by-day schedule.
            </p>
          </div>

          {/* Interactive Trip Preferences Control Panel */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-lg text-slate-900">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Destination */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Where to? (Destination)
                </label>
                <select
                  value={preferences.destinationId}
                  onChange={(e) => onSelectDestination(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-700"
                >
                  <optgroup label="India (11 Destinations)">
                    {indiaDestinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}, India
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="International (10 Destinations)">
                    {intlDestinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.country})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Starting Location */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  From (Starting Location)
                </label>
                <select
                  value={preferences.originCity}
                  onChange={(e) => onUpdatePreferences({ originCity: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-700"
                >
                  {ORIGIN_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Month */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Travel Month
                </label>
                <select
                  value={preferences.travelMonth}
                  onChange={(e) => onUpdatePreferences({ travelMonth: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-700"
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration & Travelers */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Duration &amp; Group Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={preferences.durationDays}
                    onChange={(e) => onUpdatePreferences({ durationDays: Number(e.target.value) })}
                    aria-label="Trip duration in days"
                    className="w-full px-2.5 py-2.5 text-sm font-mono tabular-nums font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    {[2, 3, 4, 5, 6, 7, 10].map((d) => (
                      <option key={d} value={d}>
                        {d} Days
                      </option>
                    ))}
                  </select>
                  <select
                    value={preferences.travelersCount}
                    onChange={(e) =>
                      onUpdatePreferences({
                        travelersCount: Number(e.target.value),
                        roomsCount: Math.max(1, Math.ceil(Number(e.target.value) / 2)),
                      })
                    }
                    aria-label="Number of travelers"
                    className="w-full px-2.5 py-2.5 text-sm font-mono tabular-nums font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    {[1, 2, 3, 4, 5, 6].map((t) => (
                      <option key={t} value={t}>
                        {t} {t === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Target Budget & Style */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Target Budget ({formatMoney(preferences.budgetTotalInr, currency)})
                </label>
                <select
                  value={preferences.budgetTotalInr}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    onUpdatePreferences({
                      budgetTotalInr: val,
                      budgetTier: val <= 30000 ? 'Budget' : val <= 85000 ? 'Balanced' : 'Comfort / Luxury',
                    });
                  }}
                  className="w-full px-3 py-2.5 text-sm font-mono tabular-nums font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  {[20000, 35000, 50000, 75000, 120000, 200000, 350000].map((amt) => (
                    <option key={amt} value={amt}>
                      Up to {formatMoney(amt, currency)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Primary CTA */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={onJumpToBuilderSection}
                  className="w-full py-2.5 px-4 bg-sky-800 hover:bg-sky-900 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Plan My Trip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Secondary quick preference row & live seasonal check */}
            <div className="mt-4 pt-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-semibold text-slate-900">
                  Active Route: {preferences.originCity.split('(')[0].trim()} → {activeDest.name}
                </span>
                <span aria-hidden="true">·</span>
                <span>Best Months: {activeDest.seasonality.bestMonths}</span>
                <span aria-hidden="true">·</span>
                <span>Expected Temp: {activeDest.seasonality.tempRangeC}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`font-semibold ${
                    monthAdvisory.status === 'Ideal'
                      ? 'text-emerald-700'
                      : monthAdvisory.status === 'Shoulder'
                      ? 'text-amber-700'
                      : 'text-rose-700'
                  }`}
                >
                  {preferences.travelMonth} Weather Check ({monthAdvisory.status}):
                </span>
                <span>{monthAdvisory.reason}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curated 21-Destination Selector Strip (India 11 + International 10) */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-900">
              Explore Destinations Across India &amp; the World
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Select any destination below to load its flights, trains, local transit, rich landmark cards, restaurants, and hotels.
            </p>
          </div>

          {/* Interactive Segmented Region Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start">
            {(['All', 'India', 'International'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setRegionFilter(tab)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  regionFilter === tab
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'All'
                  ? 'All Places (21)'
                  : tab === 'India'
                  ? 'India (11)'
                  : 'International (10)'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleDestinations.map((dest) => {
            const isSelected = dest.id === preferences.destinationId;
            return (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectDestination(dest.id);
                  }
                }}
                className={`group rounded-xl overflow-hidden border transition-all cursor-pointer bg-white flex flex-col justify-between ${
                  isSelected
                    ? 'border-sky-700 ring-2 ring-sky-700/20'
                    : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                <div>
                  <VisualCardGallery
                    slides={[
                      {
                        id: `${dest.id}-hero`,
                        caption: `${dest.name}, ${dest.country}`,
                        theme: dest.heroTheme,
                        accentHex: '#0F172A',
                        secondaryHex: '#0284C7',
                      },
                    ]}
                    title={dest.name}
                    subtitle={`Best: ${dest.seasonality.bestMonths}`}
                    aspectClass="aspect-[16/10]"
                  />
                  <div className="p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-800 transition-colors">
                        {dest.name}
                      </h3>
                      <span className="text-xs font-mono tabular-nums text-slate-600">
                        From {formatMoney(dest.startingPriceInr, currency)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {dest.country} · {dest.defaultAirportOrStation.split('/')[0].trim()}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {dest.tagline}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono tabular-nums">
                    {dest.seasonality.tempRangeC}
                  </span>
                  <span className="font-semibold text-sky-800">
                    {isSelected ? 'Currently Exploring ✓' : 'Select Destination →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDestinations.length > 8 && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllDestinations((prev) => !prev)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              {showAllDestinations
                ? 'Show Fewer Destinations'
                : `View All ${filteredDestinations.length} Destinations (${indiaDestinations.map((d) => d.name).slice(0, 5).join(', ')} & more)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
