import Hero from '@/components/Hero';

function FeedBackWidget() {
  return (
    <>
      <div id="feedback-widget"></div>
      <script src="https://feedback-widget-lovat-nine.vercel.app/feedback.js"></script>
      <script>
        window.loadFeedbackWidget('yourProjectId', 'YourWebsiteName');
      </script>
    </>
  );
}
export default function Home() {
  return (
    <div>
      <FeedBackWidget />
      <Hero />
    </div>
  );
}
