
import { Service, CaseStudy } from './types';

export interface PortfolioDetail extends CaseStudy {
  fullDescription: string;
  challenge: string;
  solution: string;
  results: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'social-media',
    title: 'Social Media Management',
    shortDescription: 'Data-driven growth for your social channels.',
    fullDescription: 'We handle everything from strategy to posting, engagement, and reporting. Our goal is to build a community around your brand that converts into loyal customers.',
    icon: 'fa-share-nodes',
    features: ['Strategy Development', 'Community Management', 'Content Scheduling', 'Analytics & Reporting']
  },
  {
    id: 'content-creation',
    title: 'Creative Content',
    shortDescription: 'Static posts and cinematic reels that captivate.',
    fullDescription: 'Our creative team produces visually stunning static posts and high-energy reels tailored for Instagram, TikTok, and LinkedIn. We tell stories that stop the scroll.',
    icon: 'fa-clapperboard',
    features: ['Static Graphic Design', 'Video Reels & Shorts', 'Motion Graphics', 'Copywriting']
  },
  {
    id: 'production',
    title: 'Production Shoot',
    shortDescription: 'Professional studio and on-site production.',
    fullDescription: 'From high-end product photography to commercial video shoots, our production team ensures your brand looks premium and professional.',
    icon: 'fa-camera-retro',
    features: ['Commercial Videography', 'Product Photography', 'Post-Production', 'Set Design']
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    shortDescription: 'ROI-focused campaigns that drive results.',
    fullDescription: 'We optimize your ad spend across Google, Meta, and LinkedIn to ensure you get the highest possible return on investment.',
    icon: 'fa-chart-line',
    features: ['PPC Campaigns', 'Paid Social', 'Conversion Rate Optimization', 'Funnel Strategy']
  },
  {
    id: 'creative-ideas',
    title: 'Creative Ideation',
    shortDescription: 'Brainstorming the next big trend for your brand.',
    fullDescription: 'Stuck in a rut? Our creative consultants provide fresh ideas and innovative concepts to keep your brand ahead of the curve.',
    icon: 'fa-lightbulb',
    features: ['Trend Research', 'Campaign Concepting', 'Brand Voice Development', 'Viral Hook Strategy']
  }
];

export const PORTFOLIO: PortfolioDetail[] = [
  {
    id: 1,
    client: 'Luxe Wear',
    category: 'Production & Social',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-filming-with-her-smartphone-43487-large.mp4',
    fullDescription: 'A high-end fashion brand looking to redefine its digital presence through cinematic reels and premium photography.',
    challenge: 'Luxe Wear struggled with low engagement despite high-quality products. Their feed felt static and disconnected from modern consumer behavior.',
    solution: 'We implemented a "Cinematic First" strategy, producing short-form video content that highlighted the craftsmanship and lifestyle of the brand.',
    results: ['250% increase in engagement', '45% growth in follower base', 'Highest sales month on record']
  },
  {
    id: 2,
    client: 'Aero Tech',
    category: 'Performance Marketing',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-designer-working-on-a-tablet-40158-large.mp4',
    fullDescription: 'Revolutionizing performance marketing for a cutting-edge aerospace startup.',
    challenge: 'High cost-per-acquisition (CPA) was bleeding their marketing budget with little return.',
    solution: 'We rebuilt their entire funnel from scratch, focusing on hyper-targeted LinkedIn ads and high-converting landing pages.',
    results: ['60% reduction in CPA', '3.5x Return on Ad Spend (ROAS)', '120% increase in qualified leads']
  },
  {
    id: 3,
    client: 'Glow Skincare',
    category: 'Content Creation',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-holding-a-smartphone-in-horizontal-position-at-a-party-39871-large.mp4',
    fullDescription: 'Creating a viral content machine for a sustainable skincare brand.',
    challenge: 'Glow needed to stand out in a saturated market and build trust with Gen-Z audiences.',
    solution: 'We partnered with micro-influencers and created "Behind the Glow" BTS content to showcase their sustainable manufacturing process.',
    results: ['Viral hit with 1.2M views', 'Sold out entire inventory in 48 hours', 'Nominated for Best Digital Campaign']
  },
  {
    id: 4,
    client: 'FitFuel',
    category: 'Social Media Management',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-at-a-gym-with-dumbbells-4693-large.mp4',
    fullDescription: 'Building a fitness community that transcends digital boundaries.',
    challenge: 'FitFuel was perceived as just another supplement company with no soul.',
    solution: 'Shifted focus from products to people. We launched a weekly challenge series that encouraged community participation.',
    results: ['Active community of 50k+ members', '200% increase in user-generated content', 'Consistent 15% month-over-month growth']
  }
];
