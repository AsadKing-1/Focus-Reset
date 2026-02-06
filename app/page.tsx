import FeelingSection from "@/components/FeelingSection/FeelingSection";
import TimeSection from "@/components/TimeSection/TimeSection";

export default function Home() {
  return (
    <div>
      <div className="animate-fade-in py-25 px-4.5 m-auto flex justify-center flex-col items-center">
        <h1 className="text-[20px] md:text-[45px] font-extrabold dark:text-white">Take a breath. Let's reset</h1>
        <p className="text-[16px] md:text-[20px] text-gray-500 dark:text-gray-400 text-center">
          Choose how you feel and how much time you have. We'll handle the reset
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 p-1 md:grid-cols-2">
        <FeelingSection/>
        <TimeSection/>
      </div>
    </div>
  );
}
