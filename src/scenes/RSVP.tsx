import { FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { GoldParticles } from '@/components/atmosphere/FloatingPetals';
import { Reveal } from '@/components/motion/Reveal';
import { OrnamentDivider } from '@/components/art/HeritageArt';

/** Scene 11 — RSVP saving directly to the database. */
export function RSVP() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'accept' | 'decline'>('accept');
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please tell us your name.');
      return;
    }
    setSubmitting(true);
    setError('');
    const { error: dbError } = await supabase.from('rsvps').insert({
      guest_name: name.trim(),
      attendance,
      guest_count: attendance === 'accept' ? count : 0,
      message: message.trim() || null,
    });
    setSubmitting(false);
    if (dbError) {
      setError('Something went wrong while sending your response. Please try again.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="paper-texture relative overflow-hidden px-6 py-24 text-royal-forest sm:py-32" aria-label="RSVP">
      <div className="pointer-events-none absolute inset-3 border border-gold/30 sm:inset-5" />
      <div className="relative mx-auto max-w-lg">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="relative flex flex-col items-center py-20 text-center"
            >
              <GoldParticles count={30} />
              <motion.p
                initial={{ letterSpacing: '0.6em', opacity: 0 }}
                animate={{ letterSpacing: '0.25em', opacity: 1 }}
                transition={{ duration: 1.6 }}
                className="font-display text-4xl text-royal-deep sm:text-5xl"
              >
                THANK YOU
              </motion.p>
              <OrnamentDivider className="mt-6 w-48" light={false} />
              <p className="mt-6 font-script text-3xl text-gold-deep">
                We can't wait to celebrate with you.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
              <Reveal className="text-center">
                <h2 className="font-display text-3xl font-light leading-snug tracking-[0.12em] text-royal-deep sm:text-4xl">
                  WE WOULD LOVE
                  <br />
                  TO HAVE YOU WITH US
                </h2>
                <p className="mx-auto mt-5 max-w-sm text-sm font-light leading-relaxed text-royal-emerald/80">
                  Your presence will make our celebration even more special.
                </p>
                <OrnamentDivider className="mx-auto mt-8 w-48" light={false} />
              </Reveal>

              <Reveal delay={0.15}>
                <form onSubmit={submit} className="mt-10 flex flex-col gap-6">
                  <Field label="Guest name">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full border-b border-royal-emerald/40 bg-transparent px-1 py-2.5 font-display text-lg text-royal-deep placeholder:font-body placeholder:text-sm placeholder:font-light placeholder:tracking-wide placeholder:text-royal-emerald/40 focus:border-gold-deep focus:outline-none"
                    />
                  </Field>

                  <Field label="Attendance">
                    <div className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {(
                        [
                          ['accept', 'JOYFULLY ACCEPT'],
                          ['decline', 'REGRETFULLY DECLINE'],
                        ] as const
                      ).map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setAttendance(value)}
                          aria-pressed={attendance === value}
                          className={`border px-4 py-3 text-[11px] font-light uppercase tracking-[0.2em] transition-all duration-300 ${
                            attendance === value
                              ? 'border-gold-deep bg-royal-deep text-cream'
                              : 'border-royal-emerald/30 text-royal-emerald/70 hover:border-gold-deep/50'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {attendance === 'accept' && (
                    <Field label="Number of guests">
                      <div className="mt-1 flex items-center gap-5">
                        <Stepper value={count} onChange={(v) => setCount(Math.min(20, Math.max(1, v)))} />
                      </div>
                    </Field>
                  )}

                  <Field label="Message (optional)">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="A few words for the couple..."
                      className="mt-1 w-full resize-none border-b border-royal-emerald/40 bg-transparent px-1 py-2.5 text-sm font-light text-royal-deep placeholder:text-royal-emerald/40 focus:border-gold-deep focus:outline-none"
                    />
                  </Field>

                  {error && <p className="text-center text-xs text-red-800">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group mx-auto mt-2 rounded-sm border border-gold-deep/70 bg-royal-deep px-10 py-4 transition-all duration-500 hover:bg-royal-emerald disabled:opacity-60"
                  >
                    <span className="label-caps flex items-center gap-3 text-gold-soft">
                      <span className="inline-block h-[1px] w-6 bg-gold/70 transition-all duration-500 group-hover:w-9" />
                      {submitting ? 'Sending...' : 'Send Response'}
                      <span className="inline-block h-[1px] w-6 bg-gold/70 transition-all duration-500 group-hover:w-9" />
                    </span>
                  </button>
                </form>
              </Reveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label-caps text-gold-deep">{label}</span>
      {children}
    </label>
  );
}

function Stepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        aria-label="Fewer guests"
        className="h-9 w-9 rounded-full border border-royal-emerald/40 font-display text-lg text-royal-emerald transition hover:border-gold-deep"
      >
        −
      </button>
      <span className="w-8 text-center font-display text-2xl text-royal-deep">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="More guests"
        className="h-9 w-9 rounded-full border border-royal-emerald/40 font-display text-lg text-royal-emerald transition hover:border-gold-deep"
      >
        +
      </button>
    </div>
  );
}
