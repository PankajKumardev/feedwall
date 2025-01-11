function HowItWorksStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-[#E7E9EC] text-slate-900 flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-normal px-12">
        {description}
      </p>
    </div>
  );
}

export default function HowitWork() {
  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl text-gray-900 dark:text-gray-100">
        How Feed-Wall Works
      </h2>
      <div className="mt-12 sm:px-20">
        <div className="grid md:grid-cols-3 gap-4">
          <HowItWorksStep
            number={1}
            title="Sign Up"
            description="Create your account in minutes with our simple and secure registration process."
          />
          <HowItWorksStep
            number={2}
            title="Collect Feedback"
            description="Easily embed our widget on your site and start collecting valuable feedback from your users."
          />
          <HowItWorksStep
            number={3}
            title="Analyze & Showcase"
            description="Analyze the feedback and showcase the most impactful insights to drive growth."
          />
        </div>
      </div>
    </div>
  );
}
