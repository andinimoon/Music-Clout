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
  GalleryPortfolioDesigns,
  AboutUsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import GalleryPortfolioSection from '../../components/WebPageComponents/GalleryPortfolioComponent';

import { getMultiplePexelsImages } from '../../helpers/pexels';

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

  const [images, setImages] = useState([]);
  const pexelsQueriesWebSite = [
    'DJ mixing tracks at event',
    'Singer recording in studio',
    'Band performing live on stage',
    'Close-up of musical instruments',
    'Audience enjoying live concert',
    'Sound engineer at mixing desk',
  ];
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getMultiplePexelsImages(pexelsQueriesWebSite);
        const formattedImages = images.map((image) => ({
          src: image.src || undefined,
          photographer: image.photographer || undefined,
          photographer_url: image.photographer_url || undefined,
        }));
        setImages(formattedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Explore Our Music Portfolio | Music Platform`}</title>
        <meta
          name='description'
          content={`Dive into our diverse music portfolio. Discover tracks from talented artists and explore the creative journey of our community.`}
        />
      </Head>
      <WebSiteHeader projectName={'Music Clout'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Music Clout'}
          image={['Musician playing guitar on stage']}
          mainText={`Discover the Sound of ${projectName}`}
          subTitle={`Explore the diverse music portfolio of ${projectName}. Dive into tracks from talented artists and experience the creativity of our community.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Now`}
        />

        <GalleryPortfolioSection
          projectName={'Music Clout'}
          images={images}
          mainText={`Experience the Art of Sound`}
          design={GalleryPortfolioDesigns.HORIZONTAL_WITH_BUTTONS || ''}
        />

        <AboutUsSection
          projectName={'Music Clout'}
          image={['Team brainstorming music ideas']}
          mainText={`The Vision Behind ${projectName}`}
          subTitle={`At ${projectName}, we are passionate about connecting artists and listeners. Our mission is to create a platform where creativity thrives and music is celebrated.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Meet Our Team`}
        />
      </main>
      <WebSiteFooter projectName={'Music Clout'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
