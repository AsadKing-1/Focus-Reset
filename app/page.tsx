import FeelingSection from "@/components/FeelingSection/FeelingSection";
import TimeSection from "@/components/TimeSection/TimeSection";

export default function Home() {
  return (
    <div className="gradient-bg">
      <div className="animate-fade-in fade-in-delay-1 py-18 px-4.5 m-auto flex justify-center flex-col items-center">
        <h1 className="text-[40px] text-center md:text-[45px] font-extrabold dark:text-white">Take a breath. Let's reset</h1>
        <p className="text-[16px] md:text-[20px] text-gray-500 dark:text-gray-400 text-center">
          Choose how you feel and how much time you have. We'll handle the reset
        </p>
      </div>
      <div className="max-w-330 mx-auto grid grid-cols-1 gap-4 p-1 md:grid-cols-2">
        <div className="animate-fade-in fade-in-delay-2">
          <FeelingSection />
        </div>
        <div className="animate-fade-in fade-in-delay-3">
          <TimeSection />
        </div>
      </div>
      <div className="mt-20 w-full max-w-4xl opacity-20 pointer-events-none mx-auto">
      <div className="h-px w-full bg-linear-to-r from-transparent via-primary to-transparent"></div>
        <div className="flex justify-around py-8">
          <span className="material-symbols-outlined text-4xl dark:text-white">air</span>
          <span className="material-symbols-outlined text-4xl dark:text-white">self_improvement</span>
          <span className="material-symbols-outlined text-4xl dark:text-white">spa</span>
          <span className="material-symbols-outlined text-4xl dark:text-white">quiet_time</span>
        </div>
      </div>
      <footer className="py-8 text-center text-sm font-extrabold text-gray-700 dark:text-gray-600">
        © {new Date().getFullYear()} Focus Reset. All rights reserved.
      </footer>
    </div>
  );
}
