import Lottie from "lottie-react";
import info from "@/assets/animation/info.json";

const Info = () => {
  return (
    <div className="space-y-8 mt-16 p-5 md:p-9">
      <h1 className="section-heading text-center">What Can Our AI Bots Do?</h1>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
        {/* Text section */}
        <div className="space-y-4 flex-1 text-center md:text-left">
          <h2 className="text-2xl font-semibold">
            Empowering Your Health Journey with Intelligent Assistance
          </h2>
          <p className="text-color text-sm md:text-base">
            Our AI bots are designed to be your reliable health companions,
            offering a wide range of features to enhance your well-being. From
            personalized health advice and symptom checking to real-time
            monitoring and medication reminders, our bots provide you with the
            support you need, whenever you need it. They adapt to your
            lifestyle, delivering tailored wellness plans that help you stay on
            track with your health goals. With secure data management and
            seamless integration with human healthcare professionals, our AI
            bots ensure you have the best of both worlds—advanced technology and
            human expertise—at your fingertips.
          </p>
        </div>
        {/* Animation section */}
        <div className="flex-1 flex items-center justify-center">
          <Lottie animationData={info} loop={true} className="h-64 md:h-[500px] w-full md:w-auto" />
        </div>
      </div>
    </div>
  );
};

export default Info;
