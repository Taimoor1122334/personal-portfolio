import { useState } from 'react';

import HeroSection from './sections/Herosection'
import Loader from './components/Loader'
import WorkSection from './sections/WorkSection'
import CustomCursor from './components/CustomCursor'
import StudioSection from './sections/StudioSection'

function App() {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <>
      <CustomCursor />
      {!hasLoaded && <Loader onComplete={() => setHasLoaded(true)} />}
      <HeroSection hasLoaded={hasLoaded} />
      <WorkSection />
      <StudioSection />
    </>
  )
}

export default App
