'use client';
import Hero from '@/components/Hero';

import { useEffect } from 'react';

function FeedBackWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://feedback-widget-weld.vercel.app/feedback-widget.js';
    script.type = 'module';
    document.body.appendChild(script);
  }, []);

  return (
    <>
      {/* @ts-ignore */}
      <feedback-widget projectId="1" websiteName="YourWebsiteName" />
    </>
  );
}

export default function Home() {
  return (
    <div>
      {/* <FeedBackWidget /> */}
      <Hero />
    </div>
  );
}
