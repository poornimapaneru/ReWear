import Hero from "../components/Hero";
import FeaturedClothes from "../components/FeaturedClothes";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedClothes/>
      <HowItWorks/>
      <WhyChooseUs/>
      <Stats/>
      <Testimonials/>
      <Newsletter/>
    </>
  );
}

export default Home;