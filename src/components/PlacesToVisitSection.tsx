import React, { useState, useMemo } from 'react';
import { Heart, Plus, Check, X } from 'lucide-react';
import { PlaceToVisit, PlaceCategory, CurrencyCode } from '../types/travel';
import { VisualCardGallery } from './VisualCardGallery';
import { formatMoney } from '../utils/formatters';

interface PlacesToVisitSectionProps {
  destinationName: string;
  places: PlaceToVisit[];
  selectedPlaceIds: string[];
  savedFavoriteIds: string[];
  onTogglePlaceInTrip: (placeId: string) => void;
  onToggleFavorite: (id: string) => void;
  currency: CurrencyCode;
}

const ALL_CATEGORIES: ('All' | PlaceCategory)[] = [
  'All',
  'History',
  'Photography',
  'Nature',
  'Shopping',
  'Family',
  'Scenic',
  'Culture',
  'Adventure',
];

export const PlacesToVisitSection: React.FC<PlacesToVisitSectionProps> = ({
  destinationName,
  places,
  selectedPlaceIds,
  savedFavoriteIds,
  onTogglePlaceInTrip,
  onToggleFavorite,
  currency,
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | PlaceCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailModalPlace, setDetailModalPlace] = useState<PlaceToVisit | null>(null);

  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      const matchesCat = activeCategory === 'All' || p.categories.includes(activeCategory);
      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.locationArea.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [places, activeCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <p className="text-xs font-medium text-sky-800 mb-1">
            03. Curated Landmarks, Heritage &amp; Experiences
          </p>
          <h2 className="font-display text-2xl font-semibold text-slate-900">
            Places to Visit in {destinationName}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Explore multi-photo destination cards with recommended durations, entry timings, and sample traveler reviews. Add your favorites to your trip.
          </p>
        </div>

        <div className="w-full lg:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${destinationName} landmarks...`}
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-sky-700"
          />
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rich Destination Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPlaces.map((place) => {
          const isAdded = selectedPlaceIds.includes(place.id);
          const isSaved = savedFavoriteIds.includes(place.id);
          const primaryReview = place.reviews[0];

          return (
            <article
              key={place.id}
              className={`rounded-xl overflow-hidden border bg-white flex flex-col justify-between transition-all ${
                isAdded
                  ? 'border-sky-700 ring-2 ring-sky-700/15'
                  : 'border-slate-200 hover:border-slate-400'
              }`}
            >
              <div>
                {/* Multi-Photo Gallery */}
                <VisualCardGallery
                  slides={place.photos}
                  title={place.name}
                  subtitle={place.locationArea}
                  aspectClass="aspect-[16/10]"
                />

                <div className="p-5">
                  {/* Unboxed Categories & Rating Line (Zero-Pill Discipline) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                    <span>{place.categories.join(' · ')}</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-800">
                      Rating {place.rating.toFixed(1)}/5 · {place.reviewCountText}
                    </span>
                  </div>

                  {/* Place Title */}
                  <h3 className="font-display text-xl font-semibold text-slate-900 mb-2">
                    {place.name}
                  </h3>

                  {/* Short, Useful Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    &ldquo;{place.shortDescription}&rdquo;
                  </p>

                  {/* Practical Visit Metadata Grid */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 py-3 px-3.5 bg-slate-50 rounded-lg border border-slate-200/75 text-xs mb-4">
                    <div>
                      <span className="text-slate-500 block">Location</span>
                      <span className="font-medium text-slate-900">{place.locationArea}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Recommended Duration</span>
                      <span className="font-mono tabular-nums font-medium text-slate-900">
                        {place.recommendedDuration}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Entry Fee</span>
                      <span className="font-mono tabular-nums font-medium text-slate-900">
                        {place.entryFeeInr === 0
                          ? 'Free Entry'
                          : `${formatMoney(place.entryFeeInr, currency)} (${place.entryFeeText})`}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Best Time &amp; Hours</span>
                      <span className="font-medium text-slate-900">
                        {place.bestTimeToVisit} ({place.openingHours.split('(')[0].trim()})
                      </span>
                    </div>
                  </div>

                  {/* Genuine-Looking Sample Traveler Review Section */}
                  {primaryReview && (
                    <div className="border-l-2 border-slate-300 pl-3.5 py-1 mb-4">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                        <span className="font-semibold text-slate-700">
                          Traveler Review ({primaryReview.rating}.0/5)
                        </span>
                        <span>{primaryReview.travelerType}</span>
                      </div>
                      <p className="text-xs text-slate-600 italic">
                        &ldquo;{primaryReview.comment}&rdquo;
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        — {primaryReview.author}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Bar: [Save] [+ Add to Trip] [View Details] */}
              <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(place.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      isSaved
                        ? 'bg-rose-50 border-rose-200 text-rose-700 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDetailModalPlace(place)}
                    className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-400 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    View Details
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onTogglePlaceInTrip(place.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-sky-800 hover:bg-sky-900 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to Trip</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Trip</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Place Details Modal */}
      {detailModalPlace && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setDetailModalPlace(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <VisualCardGallery
                slides={detailModalPlace.photos}
                title={detailModalPlace.name}
                subtitle={detailModalPlace.locationArea}
                aspectClass="aspect-[16/9]"
              />
              <button
                type="button"
                onClick={() => setDetailModalPlace(null)}
                aria-label="Close details"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/65 text-white flex items-center justify-center hover:bg-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>{detailModalPlace.categories.join(' · ')}</span>
                <span className="font-mono tabular-nums font-semibold text-slate-800">
                  Rating {detailModalPlace.rating.toFixed(1)}/5 · {detailModalPlace.reviewCountText}
                </span>
              </div>

              <h3 className="font-display text-2xl font-semibold text-slate-900">
                {detailModalPlace.name}
              </h3>

              <p className="text-sm text-slate-700 leading-relaxed">
                {detailModalPlace.detailedHistoryAndTips}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Duration</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    {detailModalPlace.recommendedDuration}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Entry Fee</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    {detailModalPlace.entryFeeText}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Best Time</span>
                  <span className="font-semibold text-slate-900">
                    {detailModalPlace.bestTimeToVisit}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Opening Hours</span>
                  <span className="font-semibold text-slate-900">
                    {detailModalPlace.openingHours}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold text-slate-900">
                  Traveler Reviews (Sample / Demo Data)
                </h4>
                {detailModalPlace.reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="font-semibold text-slate-800">
                        {rev.author} · {rev.rating}.0/5
                      </span>
                      <span>{rev.travelerType}</span>
                    </div>
                    <p className="text-slate-700 italic">&ldquo;{rev.comment}&rdquo;</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDetailModalPlace(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onTogglePlaceInTrip(detailModalPlace.id);
                    setDetailModalPlace(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-800 hover:bg-sky-900 rounded-lg cursor-pointer"
                >
                  {selectedPlaceIds.includes(detailModalPlace.id)
                    ? 'Remove from My Trip'
                    : '+ Add to My Trip'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
