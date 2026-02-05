import FeelingSection from "@/components/FeelingSection/FeelingSection";

export default function Home() {
  return (
    <div>
      <div className="animate-fade-in py-25 px-4.5 m-auto flex justify-center flex-col items-center">
        <h1 className="text-[20px] md:text-[45px] font-extrabold dark:text-white">Take a breath. Let's reset</h1>
        <p className="text-[16px] md:text-[20px] text-gray-500 dark:text-gray-400">
          Choose how you feel and how much time you have. We'll handle the reset
        </p>
      </div>
      <div>
        <FeelingSection/>
      </div>
    </div>
  );
}
