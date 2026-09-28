import React, { useState, useMemo } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import {
  TransportOption,
  LocalTransportOption,
  TransportSortFilter,
  TransportType,
  CurrencyCode,
} from '../types/travel';
import { formatMoney } from '../utils/formatters';

interface TransportationSectionProps {
  destinationName: string;
  originCity: string;
  transportOptions: TransportOption[];
  localTransportOptions: LocalTransportOption[];
  selectedTransportId: string | null;
  selectedLocalTransportIds: string[];
  onSelectTransport: (id: string) => void;
  onToggleLocalTransport: (id: string) => void;
  currency: CurrencyCode;
}

export const TransportationSection: React.FC<TransportationSectionProps> = ({
  destinationName,
  originCity,
  transportOptions,
  localTransportOptions,
  selectedTransportId,
  selectedLocalTransportIds,
  onSelectTransport,
  onToggleLocalTransport,
  currency,
}) => {
  const [sortFilter, setSortFilter] = useState<TransportSortFilter>('all');
  const [modeFilter, setModeFilter] = useState<'All' | TransportType>('All');

  const sortButtons: { id: TransportSortFilter; label: string }[] = [
    { id: 'all', label: 'All Options' },
    { id: 'fastest', label: 'Fastest' },
    { id: 'cheapest', label: 'Cheapest' },
    { id: 'best_value', label: 'Best Value' },
    { id: 'most_comfortable', label: 'Most Comfortable' },
  ];

  const modeTabs: ('All' | TransportType)[] = [
    'All',
    'Flight',
    'Train',
    'Bus',
    'Self-Drive Car',
    'Taxi / Cab',
  ];

  const displayedOptions = useMemo(() => {
    let list = [...transportOptions];
    if (modeFilter !== 'All') {
      list = list.filter((item) => item.type === modeFilter);
    }
    if (sortFilter === 'fastest') {
      list.sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else if (sortFilter === 'cheapest') {
      list.sort((a, b) => a.priceInr - b.priceInr);
    } else if (sortFilter === 'best_value') {
      list.sort((a, b) => b.valueScore - a.valueScore);
    } else if (sortFilter === 'most_comfortable') {
      list.sort((a, b) => b.comfortScore - a.comfortScore);
    }
    return list;
  }, [transportOptions, modeFilter, sortFilter]);

  const fastestId = useMemo(
    () => [...transportOptions].sort((a, b) => a.durationMinutes - b.durationMinutes)[0]?.id,
    [transportOptions]
  );
  const cheapestId = useMemo(
    () => [...transportOptions].sort((a, b) => a.priceInr - b.priceInr)[0]?.id,
    [transportOptions]
  );

  return (
    <div className="space-y-8">
      {/* Section Header & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <p className="text-xs font-medium text-sky-800 mb-1">
            01. Intercity &amp; Regional Transit Comparison
          </p>
          <h2 className="font-display text-2xl font-semibold text-slate-900">
            Transportation Options: {originCity.split('(')[0].trim()} to {destinationName}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Compare flights, trains, sleeper coaches, self-drive SUVs, and private cabs side-by-side. Select the option that fits your schedule and budget.
          </p>
        </div>

        {/* Sort Filter Segmented Bar */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start">
          {sortButtons.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setSortFilter(btn.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                sortFilter === btn.id
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {modeTabs.map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setModeFilter(mode)}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
              modeFilter === mode
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
            }`}
          >
            {mode === 'All' ? `All Modes (${transportOptions.length})` : mode}
          </button>
        ))}
      </div>

      {/* Transportation Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {displayedOptions.map((opt) => {
          const isSelected = selectedTransportId === opt.id;
          const isFastest = opt.id === fastestId;
          const isCheapest = opt.id === cheapestId;

          return (
            <div
              key={opt.id}
              className={`rounded-xl border p-5 bg-white transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-sky-700 ring-2 ring-sky-700/15'
                  : 'border-slate-200 hover:border-slate-400'
              }`}
            >
              <div>
                {/* Top metadata line (unboxed Zero-Pill discipline) */}
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{opt.type}</span>
                    <span aria-hidden="true">·</span>
                    <span>{opt.routeCode}</span>
                    {isFastest && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-sky-800">Fastest Route</span>
                      </>
                    )}
                    {isCheapest && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-emerald-700">Lowest Fare</span>
                      </>
                    )}
                  </div>
                  <span className="font-mono tabular-nums text-slate-700 font-medium">
                    Rating {opt.rating.toFixed(1)}/5 ({opt.reviewCount})
                  </span>
                </div>

                {/* Provider & Price Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {opt.provider}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {opt.originHub} → {opt.destinationHub}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-mono tabular-nums font-bold text-slate-900">
                      {formatMoney(opt.priceInr, currency)}
                    </div>
                    <div className="text-[11px] text-slate-500">per traveler (est.)</div>
                  </div>
                </div>

                {/* Schedule & Duration Row */}
                <div className="py-3 px-4 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="text-sm font-mono tabular-nums font-semibold text-slate-900">
                      {opt.departureTime}
                    </div>
                    <div className="text-[11px] text-slate-500">Departure</div>
                  </div>

                  <div className="flex flex-col items-center text-center px-2">
                    <span className="text-xs font-mono tabular-nums font-semibold text-sky-800">
                      {opt.durationText} · {opt.stopsText}
                    </span>
                    <div className="w-24 h-px bg-slate-300 my-1.5 relative">
                      <ArrowRight className="w-3 h-3 text-slate-400 absolute -right-1 -top-1.5" />
                    </div>
                    <span className="text-[11px] text-slate-500">{opt.comfortClass}</span>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-mono tabular-nums font-semibold text-slate-900">
                      {opt.arrivalTime}
                    </div>
                    <div className="text-[11px] text-slate-500">Arrival</div>
                  </div>
                </div>

                {/* Amenities & Baggage unboxed metadata */}
                <div className="text-xs text-slate-600 mb-5">
                  <span className="font-medium text-slate-800">Included: </span>
                  {opt.baggageOrAmenities.join(' · ')}
                </div>
              </div>

              {/* Select Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-mono tabular-nums">
                  Comfort {opt.comfortScore.toFixed(1)}/5 · Value Score {opt.valueScore}%
                </span>
                <button
                  type="button"
                  onClick={() => onSelectTransport(opt.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-900 hover:bg-sky-800 text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Selected for My Trip</span>
                    </>
                  ) : (
                    <span>Select {opt.type}</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Separate Section: Transportation Within the Destination */}
      <div className="pt-6 border-t border-slate-200">
        <div className="mb-4">
          <p className="text-xs font-medium text-sky-800 mb-1">
            Local Getting-Around Options
          </p>
          <h3 className="font-display text-xl font-semibold text-slate-900">
            Transportation Within {destinationName}
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Choose how you prefer to move between your hotel, monuments, markets, and restaurants once you arrive.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {localTransportOptions.map((local) => {
            const isAdded = selectedLocalTransportIds.includes(local.id);
            return (
              <div
                key={local.id}
                className={`rounded-xl border p-4 bg-white flex flex-col justify-between transition-all ${
                  isAdded
                    ? 'border-sky-700 ring-2 ring-sky-700/15'
                    : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-slate-800">{local.mode}</span>
                    <span className="font-mono tabular-nums">
                      Convenience {local.convenienceRating.toFixed(1)}/5
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">
                    {local.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    {local.coverage}
                  </p>
                  <p className="text-xs text-slate-500 mb-4">
                    <span className="font-medium text-slate-700">Best for:</span> {local.bestFor}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-sm font-mono tabular-nums font-bold text-slate-900">
                    {formatMoney(local.dailyPriceInr, currency)}
                    <span className="text-xs font-normal text-slate-500">/day</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleLocalTransport(local.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                    }`}
                  >
                    {isAdded ? 'Added to Trip ✓' : '+ Add Local Transit'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
