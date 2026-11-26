import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/config/weddingConfig';
import { useMusicController } from '@/hooks/useMusicController';
import { FloatingPetals } from '@/components/atmosphere/FloatingPetals';
import { MusicControl } from '@/components/atmosphere/MusicControl';
import { OpeningImageScene } from '@/scenes/OpeningImageScene';
import { DoorScene } from '@/scenes/DoorScene';
import { InvitationReveal } from '@/scenes/InvitationReveal';
import { FamilyIntroduction } from '@/scenes/FamilyIntroduction';
import { SpecialDateScratchCard } from '@/scenes/SpecialDateScratchCard';
import { CeremonialDetails } from '@/scenes/CeremonialDetails';
import { StorySection } from '@/scenes/StorySection';
import { VenueSection } from '@/scenes/VenueSection';
import { DinnerSection } from '@/scenes/DinnerSection';
import { Countdown } from '@/scenes/Countdown';
import { WeddingAlbum } from '@/scenes/WeddingAlbum';
import { RSVP } from '@/scenes/RSVP';
import { DearGuest } from '@/scenes/DearGuest';
import { FinalScene } from '@/scenes/FinalScene';

type Phase = 'opening' | 'doors' | 'experience';

/** The full cinematic wedding experience — one continuous journey. */
export function WeddingExperience() {
  const [phase, setPhase] = useState<Phase>('opening');
  const music = useMusicController(weddingConfig.music);

  const handleDoorEntered = useCallback(() => {
    setPhase('experience');
    // gentle scroll to the top of the experience
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const doorsActive = phase !== 'experience';

  return (
    <>
      {/* floating petals once the experience is live */}
      <FloatingPetals count={phase === 'experience' ? 14 : 0} active={phase === 'experience'} />

      

      {/* The scrollable invitation — revealed after the doors open */}
      {phase === 'experience' && (
        <main>
          <InvitationReveal />
         
          <SpecialDateScratchCard />
           <WeddingAlbum />
         
          
          <VenueSection />
         
          
         
         
        
          <DearGuest />
         
        </main>
      )}

      {/* The door scene stays mounted on top until the guest enters */}
      {doorsActive && (
        <>
          <AnimatePresence mode="wait">
            {phase === 'opening' && (
              <OpeningImageScene key="opening" onDone={() => setPhase('doors')} />
            )}
          </AnimatePresence>

          {phase === 'doors' && (
            <div className="fixed inset-0 z-30">
              <DoorScene onEntered={handleDoorEntered} music={music} />
            </div>
          )}
        </>
      )}
    </>
  );
}
