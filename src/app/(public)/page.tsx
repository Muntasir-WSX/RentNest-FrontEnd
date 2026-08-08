import FAQ from "./_components/FAQ";
import FeaturedProperties from "./_components/FeaturedProperties";
import HomeSlider from "./_components/homeSlider";
import HowItWorks from "./_components/HowItWorks";
import PropertyTypes from "./_components/PropertyTypes";
import ServiceArea from "./_components/ServiceArea";
import WhyChooseUS from "./_components/WhyChooseUS";


export default function HomePage() {
    return (
        <main>
          <HomeSlider></HomeSlider>
         <FeaturedProperties></FeaturedProperties>
          <HowItWorks></HowItWorks>
          <PropertyTypes></PropertyTypes>
          <ServiceArea></ServiceArea>
          <WhyChooseUS></WhyChooseUS>
          <FAQ></FAQ>

        </main>
    );
}