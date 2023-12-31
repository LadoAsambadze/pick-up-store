import { useEffect, useRef } from "react";
import BrandCarousel from "../components/MyBrandCarousel";
import NewArrivals from "../components/MyNewArrivals";
import Gender from "../components/MyGender";
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
    </>
  );
}
