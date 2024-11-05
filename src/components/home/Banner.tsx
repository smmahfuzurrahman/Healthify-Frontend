import Lottie from "lottie-react";
import ai from '@/assets/animation/ai.json';

const Banner = () => {
  return (
    <>
      <div className="banner-bg h-screen md:h-[500px] flex flex-col md:flex-row items-center justify-center px-6 md:px-10">
        {/* text section */}
        <div className="space-y-5 flex-1 text-center md:text-left mb-8 md:mb-0">
          <h1 className="section-heading">
            Your AI Health Partner: <br /> Empowering Wellness
          </h1>
          <p className="text-color">
            Get tailored health advice, track your progress, and achieve your wellness goals with our AI-powered assistant.
          </p>
        </div>
        {/* animation section */}
        <div className="flex-1">
          <Lottie animationData={ai} loop={true} className="h-64 md:h-[500px]" />
        </div>
      </div>
    </>
  );
};

export default Banner;
