
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
    shortDescription: 'Social media isn’t just posting — it’s building presence.',
    fullDescription: 'Our social media management services help brands stay active, relevant, and visible. We create structured content calendars, manage daily posting, and engage with your audience to drive organic growth and long-term brand value.',
    icon: 'fa-share-nodes',
    image: '/images/services/social-media.png',
    features: ['Content Planning', 'Brand Consistency', 'Audience Engagement', 'Analytics Tracking']
  },
  {
    id: 'influencer-marketing',
    title: 'Influencer Marketing',
    shortDescription: 'Influence works best when it feels real.',
    fullDescription: 'We create and manage influencer campaigns that connect your brand with the right creators. From influencer selection to campaign execution and tracking, we focus on building authentic partnerships that increase reach, trust, and engagement.',
    icon: 'fa-clapperboard',
    image: '/images/services/influencer.png',
    features: ['Brand Collaborations', 'Authentic Reach', 'Brand Awareness', 'Engagement Growth']
  },
  {
    id: 'production',
    title: 'Production Shoot',
    shortDescription: 'Every frame tells your brand story.',
    fullDescription: 'We handle end-to-end photo and video production to create visually compelling content for your brand. From concept planning to final editing, our production team ensures every frame reflects your brand’s identity and engages your audience effectively.',
    icon: 'fa-camera-retro',
    image: '/images/services/production-shoot.png',
    features: ['Commercial Videography', 'Product Photography', 'Post-Production', 'Concept Planning']
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    shortDescription: 'Performance marketing isn’t about spending more — it’s about converting better.',
    fullDescription: 'We create and manage data-driven advertising campaigns focused on real business outcomes. From strategy and audience targeting to continuous optimization, our performance marketing ensures maximum reach, quality leads, and measurable ROI across platforms.',
    icon: 'fa-chart-line',
    image: '/images/services/performance.png',
    features: ['ROI-Driven', 'High-Conversion', 'Lead Generation', 'Campaign Optimization']
  },
  {
    id: 'web-development',
    title: 'Web Development',
    shortDescription: 'Design that attracts. Development that converts.',
    fullDescription: 'We build modern, responsive websites that represent your brand and support your marketing goals. From design to development, our websites are optimized for performance, usability, and conversions across all devices.',
    icon: 'fa-lightbulb',
    image: '/images/services/web.png',
    features: ['Responsive Design', 'Conversion Focused', 'Performance Optimized', 'Mobile Optimized']
  }
];

export const PORTFOLIO: PortfolioDetail[] = [
  {
    id: 1,
    client: 'Luxe Wear',
    category: 'Production & Social',
    image: '/images/portfolio/production.png',
    video: '/videos/production.mp4',
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
