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
  FeaturesDesigns,
  GalleryPortfolioDesigns,
  AboutUsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import GalleryPortfolioSection from '../../components/WebPageComponents/GalleryPortfolioComponent';

import { getMultiplePexelsImages } from '../../helpers/pexels';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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

  const features_points = [
    {
      name: 'Upload and Share Music',
      description:
        'Easily upload your tracks and share them with a global audience. Gain feedback and grow your fanbase effortlessly.',
      icon: 'mdiCloudUpload',
    },
    {
      name: 'Earn Points by Listening',
      description:
        'Listen to music and earn points that can be used to boost your own tracks. Engage with the community and discover new sounds.',
      icon: 'mdiHeadphones',
    },
    {
      name: 'Participate in Contests',
      description:
        'Join exciting contests to showcase your talent and gain exposure. Compete with other artists and win amazing rewards.',
      icon: 'mdiTrophyAward',
    },
  ];

  const [images, setImages] = useState([]);
  const pexelsQueriesWebSite = [
    'Artist performing live on stage',
    'Music notes and headphones',
    'Creative music studio setup',
    'Audience enjoying a concert',
    'Digital sound wave illustration',
    'Musician recording in studio',
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
        <title>{`Discover and Share Music | Music Platform`}</title>
        <meta
          name='description'
          content={`Join our music platform to upload, share, and discover new music. Earn points by listening and engage with a community of music enthusiasts.`}
        />
      </Head>
      <WebSiteHeader projectName={'Music Clout'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Music Clout'}
          image={['Musician sharing music online']}
          mainText={`Unleash Your Music Potential with ${projectName}`}
          subTitle={`Join ${projectName} to share your music, earn points by listening, and connect with a vibrant community of artists and listeners. Discover new tracks and gain exposure.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'Music Clout'}
          image={['Icons representing music features']}
          withBg={0}
          features={features_points}
          mainText={`Explore Key Features of ${projectName}`}
          subTitle={`Discover how ${projectName} empowers artists and listeners with innovative features designed to enhance your music experience.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <GalleryPortfolioSection
          projectName={'Music Clout'}
          images={images}
          mainText={`Showcase Your Musical Journey`}
          design={GalleryPortfolioDesigns.OVERLAPPING_CENTRAL_IMAGE || ''}
        />

        <AboutUsSection
          projectName={'Music Clout'}
          image={['Team collaborating on music project']}
          mainText={`Discover the Heart of ${projectName}`}
          subTitle={`${projectName} is a vibrant platform connecting artists and listeners worldwide. Our mission is to empower musicians to share their art and engage with a passionate community.`}
          design={AboutUsDesigns.IMAGE_RIGHT || ''}
          buttonText={`Learn More`}
        />

        <ContactFormSection
          projectName={'Music Clout'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on a laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime for support or inquiries. Our team at ${projectName} is here to assist you promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'Music Clout'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
