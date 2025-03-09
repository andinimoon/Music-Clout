import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Music Clout';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/portfolio_gallery',
      label: 'portfolio_gallery',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/blog',
      label: 'blog',
    },
  ];

  const faqs = [
    {
      question: 'How do I upload my music?',
      answer:
        "To upload your music, simply log in to your ${projectName} account, navigate to the 'Upload' section, and follow the prompts to add your tracks. Ensure your files are in a supported format.",
    },
    {
      question: 'How can I earn points by listening?',
      answer:
        "You earn points by listening to tracks on ${projectName}. The more you listen, the more points you accumulate, which can be used to boost your own music's visibility.",
    },
    {
      question: 'What are the benefits of participating in contests?',
      answer:
        "Participating in contests on ${projectName} allows you to showcase your talent, gain exposure, and win exciting rewards. It's a great way to engage with the community and grow your audience.",
    },
    {
      question: 'Is there a cost to use ${projectName}?',
      answer:
        '${projectName} offers a free tier with basic features. For advanced features and additional benefits, you can explore our premium plans, which are detailed on our pricing page.',
    },
    {
      question: 'How do I contact support for help?',
      answer:
        'If you need assistance, you can reach out to our support team via the contact form on our website. We aim to respond to all inquiries within 24 hours.',
    },
    {
      question: 'Can I integrate ${projectName} with other platforms?',
      answer:
        'Yes, ${projectName} supports integration with various platforms for authentication and data sharing. Check our API documentation for more details.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions | Music Platform`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about our music platform. Learn more about features, usage, and support.`}
        />
      </Head>
      <WebSiteHeader projectName={'Music Clout'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Music Clout'}
          image={['Question mark on a screen']}
          mainText={`Your Questions Answered at ${projectName}`}
          subTitle={`Explore our FAQ section to find answers to common questions about using ${projectName}. Get the information you need quickly and easily.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Learn More`}
        />

        <FaqSection
          projectName={'Music Clout'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'Music Clout'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
