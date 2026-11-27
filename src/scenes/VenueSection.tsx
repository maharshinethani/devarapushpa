import { MapPin, CalendarPlus, Sparkles } from 'lucide-react';

import { weddingConfig } from '@/config/weddingConfig';
import { Reveal } from '@/components/motion/Reveal';

/* ------------------------------------------------------------------ */
/* Google Maps                                                         */
/* ------------------------------------------------------------------ */

const GOOGLE_MAPS_URL =
  'https://maps.app.goo.gl/t1pfdhtY3iixH1iq8?g_st=ac';

/* ------------------------------------------------------------------ */
/* Calendar                                                            */
/* ------------------------------------------------------------------ */

export function buildCalendarIcs(): string {
  const { wedding, venue } = weddingConfig;

  const stamp = wedding.sumuhurthamIso
    .replace(/[-:]/g, '')
    .replace('+05:30', '');

  const endHour = '20261212T223000+05:30'
    .replace(/[-:]/g, '')
    .replace('+05:30', '');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PushpaWedsSrikanth//Invitation//EN',
    'BEGIN:VEVENT',
    `UID:pushpa-srikanth-wedding-${stamp}@invitation`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${stamp}`,
    `DTEND:${endHour}`,
    `SUMMARY:${wedding.calendarTitle}`,
    `DESCRIPTION:Sumuhurtham at ${wedding.time} — ${wedding.nakshatra}\\, ${wedding.lagnam}`,
    `LOCATION:${venue.name}\\, ${venue.village}\\, ${venue.mandal}\\, ${venue.district}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function AddToCalendarButton({
  compact = false,
}: {
  compact?: boolean;
}) {
  const download = () => {
    const blob = new Blob([buildCalendarIcs()], {
      type: 'text/calendar;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pushpa-srikanth-wedding.ics';

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={download}
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
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Venue Section                                                       */
/* ------------------------------------------------------------------ */

export function VenueSection() {
  const { wedding, venue } = weddingConfig;

  const venueName = venue.name || 'Sangivalasa Village';
  const venueLocationLine = `${venue.mandal || 'Bheemili Mandal'}, ${
    venue.district || 'Visakhapatnam'
  }`;

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-[#FBF8F1]
        via-[#F6F4EF]
        to-[#F9EDE2]
        px-4
        py-14
        text-[#1D2B25]
        sm:px-6
        sm:py-20
      "
      aria-label="The Wedding"
    >
      {/* Subtle Ivory, White Smoke & Warm Peach Ambience */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            -top-24
            left-1/2
            h-[340px]
            w-[340px]
            -translate-x-1/2
            rounded-full
            bg-[#F5EFE2]
            blur-3xl
          "
        />
        <div
          className="
            absolute
            bottom-10
            right-[-80px]
            h-[320px]
            w-[320px]
            rounded-full
            bg-[#F8DFCC]/65
            blur-3xl
          "
        />
        <div
          className="
            absolute
            top-1/2
            left-[-90px]
            h-[280px]
            w-[280px]
            -translate-y-1/2
            rounded-full
            bg-[#F5F5F5]/90
            blur-3xl
          "
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[460px]">
        {/* Header Block */}
        <Reveal>
          <div className="text-center">
            <h2
              className="
                font-serif
                text-[42px]
                font-normal
                italic
                leading-[1.08]
                tracking-[-0.02em]
                text-[#1D2421]
                sm:text-[50px]
              "
            >
              The Wedding
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-[320px]
                font-serif
                text-[15px]
                italic
                leading-relaxed
                text-[#6B706B]
                sm:text-[16px]
              "
            >
              A sacred moment of blessings, love, and a beautiful new beginning
            </p>

            <div className="mt-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B8F89]">
                Location
              </p>
              <p className="mt-1 font-serif text-[26px] font-normal text-[#1F2724] sm:text-[30px]">
                {venue.mandal || 'Bheemili'}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Outer Soft White Smoke / Cream Card Container */}
        <Reveal delay={0.12}>
          <div
            className="
              mt-8
              rounded-[24px]
              border
              border-[#E7DFCE]
              bg-[#FDFBF7]/95
              p-3.5
              shadow-[0_14px_38px_rgba(28,45,38,0.06)]
              backdrop-blur-xs
              sm:p-4
            "
          >
            {/* Date + Occasion Row */}
            <div className="flex items-stretch gap-3 sm:gap-3.5">
              {/* Left Deep Emerald Date Block */}
              <div
                className="
                  flex
                  w-[88px]
                  shrink-0
                  flex-col
                  items-center
                  justify-center
                  rounded-[16px]
                  bg-[#14533E]
                  px-2
                  py-4
                  text-center
                  text-[#FBF8F1]
                  shadow-[0_6px_18px_rgba(20,83,62,0.22)]
                  sm:w-[98px]
                "
              >
                <span className="font-serif text-[34px] font-medium leading-none tracking-tight sm:text-[38px]">
                  12
                </span>
                <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E6C97A]">
                  DEC
                </span>
                <span className="mt-2.5 border-t border-[#FBF8F1]/20 pt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FBF8F1]/85">
                  SATURDAY
                </span>
              </div>

              {/* Right Event Details Card */}
              <div
                className="
                  flex
                  flex-1
                  flex-col
                  justify-center
                  rounded-[16px]
                  border
                  border-[#EFE8D8]
                  bg-[#FFFFFF]
                  px-4
                  py-4
                  sm:px-5
                "
              >
                <div className="flex items-center gap-2 text-[#14533E]">
                  <Sparkles size={15} strokeWidth={1.8} className="shrink-0" />
                  <h3 className="font-serif text-[21px] font-medium leading-tight text-[#1A221F] sm:text-[23px]">
                    Sumuhurtham
                  </h3>
                </div>

                <p className="mt-1.5 text-xs font-medium tracking-wide text-[#5B635E] sm:text-[13px]">
                  {wedding.time || '08:26 PM'} · Dec 12, 2026
                </p>

                <p className="mt-2 font-serif text-[13px] italic leading-snug text-[#6C786F]">
                  {wedding.nakshatra}, {wedding.lagnam}
                </p>

                <div className="mt-3.5">
                  <AddToCalendarButton compact />
                </div>
              </div>
            </div>

            {/* Bottom Deep Emerald Venue Card */}
            <div
              className="
                mt-3.5
                rounded-[18px]
                bg-[#14533E]
                px-5
                py-6
                text-center
                text-[#FBF8F1]
                shadow-[0_10px_26px_rgba(20,83,62,0.22)]
                sm:px-6
                sm:py-7
              "
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#E6C97A]">
                Wedding Venue
              </p>

              <h3 className="mt-2 font-serif text-[26px] font-normal leading-snug text-white sm:text-[30px]">
                {venueName}
              </h3>

              <p className="mt-1.5 inline-flex items-center justify-center gap-1.5 text-xs text-[#E4EDE9]/90 sm:text-sm">
                <MapPin
                  size={14}
                  strokeWidth={2}
                  className="shrink-0 text-[#E6C97A]"
                />
                <span>{venueLocationLine}, Andhra Pradesh</span>
              </p>

              {/* Golden Get Directions Button */}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get directions to ${venueName}`}
                className="
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-[12px]
                  bg-[#E7BD56]
                  px-5
                  py-3.5
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#17231E]
                  shadow-[0_6px_18px_rgba(231,189,86,0.28)]
                  transition-all
                  duration-300
                  hover:bg-[#F0C968]
                  active:scale-[0.99]
                "
              >
                <span aria-hidden="true">➢</span>
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Simple & Graceful Closing */}
        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <p className="font-serif text-sm italic text-[#6B706B]">
              With love &amp; blessings from family &amp; friends
            </p>
            <p className="mt-2 font-serif text-[28px] italic text-[#14533E] sm:text-[32px]">
              Srikanth &amp; Pushpa
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
