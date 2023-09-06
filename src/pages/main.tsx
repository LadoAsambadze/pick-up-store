import { useEffect, useRef } from "react";
import BrandCarousel from "../components/BrandCarousel";
import LightBanner from "../components/LightBanner";
import NewArrivals from "../components/NewArrivals";
import Gender from "../components/Gender";
import { useState } from "react";

export default function Main() {
  const [showBrandCarousel, setShowBrandCarousel] = useState(false);
  const brandCarouselRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowBrandCarousel(true);
        }
      },
      { threshold: 1.0 }
    );
    if (brandCarouselRef.current) {
      observer.observe(brandCarouselRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Gender />
      <NewArrivals />
      <div ref={brandCarouselRef}>{showBrandCarousel && <BrandCarousel />}</div>
      <LightBanner />
    </>
  );
}
