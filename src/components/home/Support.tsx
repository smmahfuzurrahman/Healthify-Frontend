import img from "@/assets/time.png";
import img1 from "@/assets/med.png";
import img2 from "@/assets/symptoms.png";
import img3 from "@/assets/healthcare.png";

const Support = () => {
  const data = [
    {
      title: "24/7 AI Health Assistant",
      description:
        "Get round-the-clock support with personalized health advice and reminders tailored to your needs.",
      image: img,
    },
    {
      title: "Real-Time Health Monitoring",
      description:
        "Track your health metrics in real-time, with instant feedback and guidance based on your data.",
      image: img1,
    },
    {
      title: "Symptom Checker",
      description:
        "Quickly assess symptoms with our AI-powered checker, offering potential causes and next steps for care.",
      image: img2,
    },
    {
      title: "Medication Reminders",
      description:
        "Never miss a dose with smart reminders that help you stay on track with your treatment.",
      image: img3,
    },
  ];
  return (
    <div className="space-y-5 mt-16 p-5 md:p-9">
      <h1 className="section-heading">Support and Features</h1>
      <div className=" grid grid-cols-2 gap-5">
        {data.map((item, index) => (
          <div
            key={index}
            className="border flex flex-col items-center text-center p-5 space-y-3"
          >
            <div className="w-20">
              <img
                src={item.image}
                alt=""
                className="object-fill w-full h-full"
              />
            </div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-color">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;
