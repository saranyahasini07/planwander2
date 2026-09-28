import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { PhotoSlide } from '../types/travel';

import heroCoastImg from '../assets/images/hero_scenic_coast_1790610161868.jpg';
import indiaPalaceImg from '../assets/images/dest_india_palace_1790610173574.jpg';
import kyotoShrineImg from '../assets/images/dest_kyoto_shrine_1790610185245.jpg';
import swissAlpsImg from '../assets/images/dest_swiss_alps_1790610197879.jpg';

export const GENERATED_IMAGES = {
  coast: heroCoastImg,
  palace: indiaPalaceImg,
  shrine: kyotoShrineImg,
  alps: swissAlpsImg,
};

interface VisualCardGalleryProps {
  slides: PhotoSlide[];
  title: string;
  subtitle?: string;
  aspectClass?: string;
}

export const VisualCardGallery: React.FC<VisualCardGalleryProps> = ({
  slides,
  title,
  subtitle,
  aspectClass = 'aspect-[4/3]',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const safeSlides: PhotoSlide[] =
    slides && slides.length > 0
      ? slides
      : [
          {
            id: 'default-1',
            caption: `${title} — Primary View`,
            theme: 'palace',
            accentHex: '#0F172A',
            secondaryHex: '#0284C7',
          },
        ];

  const current = safeSlides[activeIndex % safeSlides.length];

  const getBaseImageForSlide = (theme: PhotoSlide['theme'], idx: number) => {
    if (theme === 'palace' || theme === 'monument' || theme === 'luxury_room') {
      return idx % 2 === 0 ? indiaPalaceImg : heroCoastImg;
    }
    if (theme === 'shrine' || theme === 'garden' || theme === 'market') {
      return idx % 2 === 0 ? kyotoShrineImg : indiaPalaceImg;
    }
    if (theme === 'alps') {
      return idx % 2 === 0 ? swissAlpsImg : kyotoShrineImg;
    }
    if (theme === 'culinary' || theme === 'rooftop') {
      return idx % 2 === 0 ? heroCoastImg : indiaPalaceImg;
    }
    return heroCoastImg;
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + safeSlides.length) % safeSlides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % safeSlides.length);
  };

  const baseImg = getBaseImageForSlide(current.theme, activeIndex);
  const filterClasses =
    activeIndex === 0
      ? 'scale-100 brightness-100'
      : activeIndex === 1
      ? 'scale-105 contrast-105 saturate-110 object-right'
      : 'scale-110 brightness-95 sepia-[.12] object-left';

  return (
    <div className={`relative w-full overflow-hidden bg-slate-900 select-none group ${aspectClass}`}>
      {!imgErrors[activeIndex] ? (
        <img
          src={baseImg}
          alt={`${title} - ${current.caption}`}
          referrerPolicy="no-referrer"
          onError={() => setImgErrors((prev) => ({ ...prev, [activeIndex]: true }))}
          className={`w-full h-full object-cover transition-transform duration-300 ease-out ${filterClasses}`}
        />
      ) : (
        <div
          className="w-full h-full flex flex-col justify-end p-5"
          style={{
            background: `linear-gradient(135deg, ${current.accentHex} 0%, ${current.secondaryHex} 100%)`,
          }}
        >
          <span className="text-white/90 text-sm font-medium">{title}</span>
        </div>
      )}

      {/* Subtle architectural overlay tint per slide so each slide feels distinct */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20 transition-opacity duration-200"
        style={{
          background: `linear-gradient(160deg, ${current.accentHex}, transparent 70%)`,
        }}
      />

      {/* Bottom dark gradient scrim for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

      {/* Top photo counter and caption */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 pointer-events-none">
        <span className="flex items-center gap-1.5 font-medium drop-shadow">
          <Camera className="w-3.5 h-3.5 opacity-85" />
          <span>{current.caption}</span>
        </span>
        {safeSlides.length > 1 && (
          <span className="font-mono tabular-nums text-[11px] text-white/80">
            {activeIndex + 1}/{safeSlides.length}
          </span>
        )}
      </div>

      {/* Prev / Next Gallery Controls */}
      {safeSlides.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Bottom slide selector bar & optional subtitle */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
        <span className="text-xs text-white/90 font-medium truncate">
          {subtitle || title}
        </span>
        {safeSlides.length > 1 && (
          <div className="flex items-center gap-1.5 shrink-0">
            {safeSlides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                aria-label={`View photo ${idx + 1}: ${slide.caption}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
