import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqData = [
  {
    value: 'item-1',
    question: 'What is Opinify?',
    answer:
      'Opinify is a feedback form integration website that is free to use and highly simplified.',
  },
  {
    value: 'item-2',
    question: 'How can Opinify improve user feedback collection?',
    answer:
      'Opinify improves user feedback collection by providing an easy-to-use and integrate feedback form, making it simple for users to give feedback.',
  },
  {
    value: 'item-3',
    question: 'What are the key features of Opinify?',
    answer:
      'Key features of Opinify include ease of use, seamless integration, and a simplified interface for collecting feedback from users.',
  },
  {
    value: 'item-4',
    question: 'How secure is the data collected by Feed-Wall?',
    answer:
      'Feed-Wall ensures that all collected data is securely stored and encrypted, adhering to industry-standard security practices.',
  },
  {
    value: 'item-5',
    question: 'Can I export the feedback data?',
    answer:
      'Yes, you can easily export all collected feedback data as a CSV file for further analysis and record-keeping.',
  },
];

const Accordian = () => {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="  mx-auto w-[70vw] text-slate-800 dark:text-[#E7E9EC] text-sm "
      >
        {faqData.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-400 ">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Accordian;
