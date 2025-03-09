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
  AboutUsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

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

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Insights and Stories | Music Platform Blog`}</title>
        <meta
          name='description'
          content={`Explore the latest insights, stories, and updates from our music platform. Stay informed and inspired with our curated blog content.`}
        />
      </Head>
      <WebSiteHeader projectName={'Music Clout'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Music Clout'}
          image={['Open book with music notes']}
          mainText={`Explore the World of ${projectName}`}
          subTitle={`Dive into our blog to discover the latest trends, stories, and insights from the music industry. Stay updated and inspired with ${projectName}.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Read More`}
        />

        <AboutUsSection
          projectName={'Music Clout'}
          image={['Team discussing music strategy']}
          mainText={`The Story Behind ${projectName}`}
          subTitle={`Learn about the journey and vision of ${projectName}. Discover how we aim to revolutionize the music industry and connect artists with listeners worldwide.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Our Journey`}
        />
      </main>
      <WebSiteFooter projectName={'Music Clout'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
