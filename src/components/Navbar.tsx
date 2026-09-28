import React from 'react';
import { CurrencyCode } from '../types/travel';

export type ActiveWorkspaceTab =
  | 'builder'
  | 'compare'
  | 'itinerary'
  | 'seasonality_map'
  | 'saved';

interface NavbarProps {
  activeTab: ActiveWorkspaceTab;
  onSelectTab: (tab: ActiveWorkspaceTab) => void;
  currency: CurrencyCode;
  onToggleCurrency: () => void;
  selectedItemsCount: number;
  savedTripsCount: number;
  onBuildMyTrip: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  currency,
  onToggleCurrency,
  selectedItemsCount,
  savedTripsCount,
  onBuildMyTrip,
}) => {
  const navLinks: { id: ActiveWorkspaceTab; label: string }[] = [
    { id: 'builder', label: 'Discover & Choose' },
    { id: 'compare', label: 'Compare Plans' },
    { id: 'itinerary', label: 'Final Itinerary' },
    { id: 'seasonality_map', label: 'Best Time & Map' },
    { id: 'saved', label: `Saved Trips (${savedTripsCount})` },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-3.5">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('builder');
          }}
          className="font-display text-xl font-semibold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          Plan &amp; Wander
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => onSelectTab(link.id)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                  isActive
                    ? 'text-slate-950 border-sky-700 font-semibold'
                    : 'border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleCurrency}
            className="px-3 py-2 text-xs font-mono tabular-nums font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            {currency === 'INR' ? '₹ INR' : '$ USD'}
          </button>

          <button
            type="button"
            onClick={onBuildMyTrip}
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-800 hover:bg-sky-900 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Build My Trip ({selectedItemsCount})
          </button>
        </div>
      </div>
    </header>
  );
};
