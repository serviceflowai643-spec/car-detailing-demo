export interface DetailingService {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  description: string;
  splitImage: string;
  beforeLabel: string;
  afterLabel: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'exterior' | 'interior' | 'paint' | 'wheels';
  image: string;
  description: string;
}

export const BUSINESS_INFO = {
  name: 'Pure Detailing UK',
  tagline: 'Precision detailing. Pristine finish.',
  subheading: 'Premium car detailing in Chelmsford, focused on bringing out the best in every vehicle.',
  statement: 'Premium detailing. Professional finish. Your car deserves better.',
  category: 'Car Detailing Service',
  address: "Unit 16, Yard, 1 Pool's Ln, Chelmsford CM1 3QL, United Kingdom",
  shortAddress: 'Unit 16, Pool\'s Ln, Chelmsford CM1 3QL',
  phone: '+44 7875 500935',
  phoneRaw: '+447875500935',
  phoneDisplay: '07875 500935',
  whatsappUrl: 'https://wa.me/447875500935?text=Hi%20Pure%20Detailing%20UK,%20I%20would%20like%20to%20request%20a%20detailing%20quote.',
  googleRating: 5.0,
  googleReviewCount: 2,
  openingHours: 'Opens 9 AM (Mon – Sat)',
  location: 'Chelmsford, United Kingdom',
  teamMembers: ['Alex', 'Nathan'],
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pure+Detailing+UK+Unit+16+Yard+1+Pools+Ln+Chelmsford+CM1+3QL",
  googleReviewsSearchUrl: "https://www.google.com/maps/search/?api=1&query=Pure+Detailing+UK+Chelmsford",
  
  // Real Google reviews provided
  reviews: [
    {
      author: 'Vishal Bika',
      rating: 5,
      date: 'Google Review',
      reviewBody: 'Amazing work by Alex and Nathan. Highly recommended!',
      verified: true
    }
  ]
};

export const SERVICES: DetailingService[] = [
  {
    id: 'exterior-detailing',
    name: 'Exterior Detailing',
    tagline: 'Meticulous decontamination & spotless finish',
    description: 'Deep exterior cleaning and meticulous finishing for a spotless appearance.',
    image: '/src/assets/images/service_exterior_detail_1791338096503.jpg',
    features: [
      'Multi-stage contactless pre-wash and gentle foam bath',
      'Intricate grime removal from badges, grills and door shuts',
      'Iron fallout & tar contaminant removal',
      'Hydrophobic protective rinse and spot-free air dried'
    ]
  },
  {
    id: 'interior-detailing',
    name: 'Interior Detailing',
    tagline: 'Deep sanitisation & cabin revival',
    description: 'Thorough interior cleaning and refreshing for a clean, comfortable cabin.',
    image: '/src/assets/images/service_interior_detail_1791338115456.jpg',
    features: [
      'Deep carpet and upholstery vacuuming & extraction',
      'Leather cleaning, nourishment and matte conditioning',
      'Steam sanitation of vents, cup holders and compartments',
      'Crystal-clear streak-free glass inside and out'
    ]
  },
  {
    id: 'full-detail',
    name: 'Full Detail',
    tagline: 'The complete inside & out rejuvenation',
    description: 'A complete interior and exterior detailing experience designed to refresh the entire vehicle.',
    image: '/src/assets/images/service_full_detail_1791338129922.jpg',
    features: [
      'Comprehensive exterior wash, wheel cleanse & glass polish',
      'Full interior deep cleanse and cabin deodorisation',
      'Engine bay light wipe down and dressing',
      'Complete vehicle turnaround for showroom presentation'
    ]
  },
  {
    id: 'paint-enhancement',
    name: 'Paint Enhancement',
    tagline: 'Restoring depth, gloss & clarity',
    description: 'Professional paint-focused treatment designed to improve gloss and presentation.',
    image: '/src/assets/images/service_paint_enhancement_1791338145288.jpg',
    features: [
      'Thorough chemical & mechanical decontamination',
      'Machine polishing treatment to boost optical gloss',
      'Diminishes hazing and dullness across painted panels',
      'Protective sealant application for high-gloss reflection'
    ]
  },
  {
    id: 'maintenance-detail',
    name: 'Maintenance Detail',
    tagline: 'Regular care for pristine vehicles',
    description: 'A convenient option for keeping an already detailed vehicle looking its best.',
    image: '/src/assets/images/service_maintenance_detail_1791338162689.jpg',
    features: [
      'Safe wash method to preserve existing finishes',
      'Wheel faces and barrels cleaned safely',
      'Interior vacuum, dashboard dust and glass clean',
      'Top-up gloss enhancer for continuous protection'
    ]
  }
];

export const BEFORE_AFTER_CASES: BeforeAfterItem[] = [
  {
    id: 'exterior-road-grime',
    title: 'Black BMW Exterior Road Grime Decontamination',
    category: 'Exterior',
    description: 'Exact same vehicle split 50/50: heavy road film and dirty wheels on the left, transformed into deep mirror-gloss black paint and gleaming alloys on the right.',
    splitImage: '/src/assets/images/split_detailing_car_1791339586342.jpg',
    beforeLabel: 'BEFORE',
    afterLabel: 'AFTER'
  },
  {
    id: 'paint-enhancement-swirls',
    title: 'Paint Enhancement 50/50 Test Spot',
    category: 'Paintwork',
    description: 'Exact same panel divided down the center: dull swirl marks and clearcoat haze on the left versus machine-polished deep optical gloss on the right.',
    splitImage: '/src/assets/images/split_detailing_bonnet_1791339572102.jpg',
    beforeLabel: 'BEFORE',
    afterLabel: 'AFTER'
  },
  {
    id: 'interior-refresh',
    title: 'Cockpit & Console 50/50 Deep Restoration',
    category: 'Interior',
    description: 'Exact same cockpit divided down the center: accumulated dust and grime on the left versus revived, spotless OEM matte leather and clean controls on the right.',
    splitImage: '/src/assets/images/split_detailing_interior_1791339603134.jpg',
    beforeLabel: 'BEFORE',
    afterLabel: 'AFTER'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Active Snow Foam Exterior Wash',
    category: 'exterior',
    image: '/src/assets/images/service_exterior_detail_1791338096503.jpg',
    description: 'Thick lubricating foam lifting road grit safely without marring the clear coat.'
  },
  {
    id: 'g2',
    title: 'Precision Interior Brushing & Detailing',
    category: 'interior',
    image: '/src/assets/images/service_interior_detail_1791338115456.jpg',
    description: 'Gentle horsehair brushwork removing dust from vents, seams, and console switches.'
  },
  {
    id: 'g3',
    title: 'Alloy Wheel Barrel & Caliper Cleaning',
    category: 'wheels',
    image: '/src/assets/images/gallery_wheel_cleaning_1791338306179.jpg',
    description: 'Targeted decontamination removing baked-on brake dust from spokes, barrels, and calipers.'
  },
  {
    id: 'g4',
    title: 'Dual-Action Machine Paint Polishing',
    category: 'paint',
    image: '/src/assets/images/service_paint_enhancement_1791338145288.jpg',
    description: 'Precision pad rotation bringing out true optical reflections across sculpted automotive panels.'
  },
  {
    id: 'g5',
    title: 'Showroom Studio Delivery Presentation',
    category: 'paint',
    image: '/src/assets/images/hero_detailing_studio_1791338067380.jpg',
    description: 'Completed Porsche under inspection lighting with deep liquid gloss and flawless finish.'
  },
  {
    id: 'g6',
    title: 'Complete Inside & Out Full Turnaround',
    category: 'exterior',
    image: '/src/assets/images/service_full_detail_1791338129922.jpg',
    description: 'Total rejuvenation uniting immaculate interior leather and flawless exterior paintwork.'
  },
  {
    id: 'g7',
    title: 'Maintenance Detail Final Microfiber Wipe',
    category: 'exterior',
    image: '/src/assets/images/service_maintenance_detail_1791338162689.jpg',
    description: 'Gentle buffing with ultra-plush microfiber towel and gloss enhancer for continuous protection.'
  },
  {
    id: 'g8',
    title: 'Razor-Sharp Paint Mirror Reflection',
    category: 'paint',
    image: '/src/assets/images/gallery_reflection_closeup_1791338320137.jpg',
    description: 'Immaculate paint clarity reflecting studio LED lighting with zero distortion.'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Attention to Detail',
    description: 'From badge crevices to seat stitching, no element is rushed or overlooked. Every millimeter receives meticulous care.',
    icon: 'Sparkles'
  },
  {
    title: 'Premium Presentation',
    description: 'We bring out the definitive depth, gloss, and crisp lines of your vehicle for true studio-grade visual impact.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Professional Service',
    description: 'Clear communication, respectful vehicle handling, and punctual turnarounds from trusted detailing specialists.',
    icon: 'Award'
  },
  {
    title: 'Convenient Chelmsford Location',
    description: 'Situated at Unit 16, Yard, 1 Pool\'s Ln, Chelmsford with straightforward road access and dedicated private bay space.',
    icon: 'MapPin'
  },
  {
    title: 'Focus on Quality Finishes',
    description: 'Technique-driven processes tailored strictly to modern automotive paints, trims, leathers, and alloy surfaces.',
    icon: 'Wrench'
  },
  {
    title: 'Customer Satisfaction',
    description: 'Backed by a perfect 5.0-star Google rating and enthusiastic personal recommendations from vehicle owners.',
    icon: 'ThumbsUp'
  }
];
