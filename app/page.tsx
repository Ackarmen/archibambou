import { HeroImagesSlider } from '@/components/hero/HeroImagesSlider';
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <header>
        <HeroImagesSlider />
      </header>
    </div>
  );
}
