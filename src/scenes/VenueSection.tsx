import { MapPin, CalendarPlus, Sparkles } from 'lucide-react';

import { weddingConfig } from '@/config/weddingConfig';
import { Reveal } from '@/components/motion/Reveal';

/* ------------------------------------------------------------------ */
/* Google Maps                                                         */
/* ------------------------------------------------------------------ */

const GOOGLE_MAPS_URL =
  'https://maps.app.goo.gl/t1pfdhtY3iixH1iq8?g_st=ac';

/* ------------------------------------------------------------------ */
/* Calendar Helpers                                                    */
/* ------------------------------------------------------------------ */

function toGoogleCalendarUtc(isoWithOffset: string): string {
  // Example: "2026-12-12T20:26:00+05:30" -> Date object -> "20261212T145600Z"
  const date = new Date(isoWithOffset);
  if (Number.isNaN(date.getTime())) {
    return '20261212T145600Z';
  }
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function buildGoogleCalendarUrl(): string {
  const { wedding, venue } = weddingConfig;

  const startUtc = toGoogleCalendarUtc(wedding.sumuhurthamIso);
  const endUtc = toGoogleCalendarUtc('2026-12-12T22:30:00+05:30');

  const location = [venue.name, venue.village, venue.mandal, venue.district]
    .filter(Boolean)
    .join(', ');

  const details = `Sumuhurtham at ${wedding.time} — ${wedding.nakshatra}, ${wedding.lagnam}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: wedding.calendarTitle || 'Pushpa Weds Srikanth Wedding',
    dates: `${startUtc}/${endUtc}`,
    details,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildCalendarIcs(): string {
  const { wedding, venue } = weddingConfig;

  const startUtc = toGoogleCalendarUtc(wedding.sumuhurthamIso);
  const endUtc = toGoogleCalendarUtc('2026-12-12T22:30:00+05:30');
  const nowUtc = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');

  const location = [venue.name, venue.village, venue.mandal, venue.district]
    .filter(Boolean)
    .join('\\, ');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PushpaWedsSrikanth//Invitation//EN',
    'BEGIN:VEVENT',
    `UID:pushpa-srikanth-wedding-${startUtc}@invitation`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${wedding.calendarTitle}`,
    `DESCRIPTION:Sumuhurtham at ${wedding.time} — ${wedding.nakshatra}\\, ${wedding.lagnam}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function AddToCalendarButton({
  compact = false,
}: {
  compact?: boolean;
}) {
  const googleCalendarUrl = buildGoogleCalendarUrl();

  return (
    <a
      href={googleCalendarUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-[#14533E]/25
        bg-[#F8F3E8]
        text-[#14533E]
        transition-all
        duration-300
        hover:border-[#14533E]
        hover:bg-[#14533E]
        hover:text-[#FBF8F1]
        ${compact ? 'px-4 py-2 text-[11px]' : 'px-6 py-3 text-xs'}
      `}
    >
      <CalendarPlus size={compact ? 14 : 15} strokeWidth={1.8} />
      <span className="font-medium uppercase tracking-[0.16em]">
        Add to Calendar
      </span>
    </a>
  );
}
