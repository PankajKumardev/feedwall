import {
  BarChart,
  Bot,
  Download,
  Eye,
  MonitorSmartphone,
  Rows2,
} from 'lucide-react';

export default function Features() {
  return (
    <div className="mt-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl text-center  text-slate-800 dark:text-[#E7E9EC] font-medium">
        Why Choose Feed-Wall for Collecting Feedback?
      </h2>
      <p className="text-base sm:text-lg text-center mt-4 max-w-xl mx-auto text-slate-800 dark:text-slate-500">
        Feed-wall offers a powerful suite of features to make feedback
        collection and showcasing effortless.
      </p>
      <div className="text-center text-3xl text-slate-800 dark:text-[#E7E9EC] font-medium mt-20">
        Powereful Features!
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 text-center px-4 sm:px-0 max-w-7xl mx-auto">
        {[
          {
            icon: <Bot className="w-6 h-6" />,
            title: 'AI-Powered Summary',
            description:
              'Get quick insights from feedback highlights, making it easier to understand user sentiments.',
          },
          {
            icon: <MonitorSmartphone className="w-6 h-6" />,
            title: 'Easy Integration',
            description:
              'Embed our feedback widget with minimal code, ensuring a seamless integration process.',
          },
          {
            icon: <Rows2 className="w-6 h-6" />,
            title: 'Showcase Feedbacks',
            description:
              'Display user feedback prominently to build trust and credibility with your audience.',
          },
          {
            icon: <BarChart className="w-6 h-6" />,
            title: 'Categorize Feedback',
            description:
              'Organize feedback by different categories to better analyze and act on user input.',
          },
          {
            icon: <Download className="w-6 h-6" />,
            title: 'Download CSV',
            description:
              'Export all collected feedback as a CSV file for further analysis and record-keeping.',
          },
          {
            icon: <Eye className="w-6 h-6" />,
            title: 'Feedback Visibility',
            description:
              'Manage and control the visibility of user feedback efficiently within your platform.',
          },
        ].map((feature, index) => (
          <div key={index} className="width-fit text-left">
            <div className="flex items-center gap-2">
              <div className="mb-2 w-fit rounded-lg p-1 text-center dark:text-white text-slate-900">
                {feature.icon}
              </div>
              <div className="text-md mb-1 font-normal text-gray-900 dark:text-gray-100">
                {feature.title}
              </div>
            </div>
            <div className="font-regular max-w-sm text-xs text-gray-600 dark:text-gray-400">
              {feature.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
