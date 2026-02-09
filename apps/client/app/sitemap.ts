import { MetadataRoute } from 'next';
import {
  SITE_CONFIG,
  DUBAI_AREAS,
  DUBAI_FREE_ZONES,
  DUBAI_LANDMARKS,
  ABU_DHABI_AREAS,
  ABU_DHABI_FREE_ZONES,
  ABU_DHABI_LANDMARKS,
  SHARJAH_AREAS,
  SHARJAH_FREE_ZONES,
  SHARJAH_LANDMARKS,
  RAK_AREAS,
  RAK_FREE_ZONES,
  AJMAN_AREAS,
  AJMAN_FREE_ZONES,
  FUJAIRAH_AREAS,
  FUJAIRAH_FREE_ZONES,
  FUJAIRAH_LANDMARKS,
  UAQ_AREAS,
  UAQ_FREE_ZONES,
} from '@gratuity/shared';

const baseUrl = SITE_CONFIG.url;

// Ajman landmarks (defined in page, not shared constants)
const AJMAN_LANDMARKS = [
  { slug: 'museum' },
  { slug: 'corniche' },
  { slug: 'city-centre' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Main pages
  const mainPages = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/mohre-calculator`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/mohre-gratuity-calculator`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/limited-contract`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/unlimited-contract`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/labor-card-check`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/e-signature-card`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms-of-use`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  // Free zones hub pages
  const FREE_ZONE_SLUGS = [
    'difc', 'adgm', 'jafza', 'dmcc', 'saif-zone', 'hamriyah',
    'dafza', 'dso', 'tecom', 'rak-ftz', 'ajman-free-zone', 'fujairah-free-zone',
  ];

  const freeZonesPages = [
    { url: `${baseUrl}/free-zones`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...FREE_ZONE_SLUGS.map(slug => ({
      url: `${baseUrl}/free-zones/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  // Emirate main pages
  const emiratePages = [
    { url: `${baseUrl}/dubai`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/abu-dhabi`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/sharjah`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/ajman`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/ras-al-khaimah`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/fujairah`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/umm-al-quwain`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  // Dubai pages
  const dubaiAreas = DUBAI_AREAS.map(area => ({
    url: `${baseUrl}/dubai/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const dubaiFreeZones = DUBAI_FREE_ZONES.map(zone => ({
    url: `${baseUrl}/dubai/free-zones/${zone.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const dubaiLandmarks = DUBAI_LANDMARKS.map(landmark => ({
    url: `${baseUrl}/dubai/landmarks/${landmark.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Abu Dhabi pages
  const abuDhabiAreas = ABU_DHABI_AREAS.map(area => ({
    url: `${baseUrl}/abu-dhabi/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const abuDhabiFreeZones = ABU_DHABI_FREE_ZONES.map(zone => ({
    url: `${baseUrl}/abu-dhabi/free-zones/${zone.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const abuDhabiLandmarks = ABU_DHABI_LANDMARKS.map(landmark => ({
    url: `${baseUrl}/abu-dhabi/landmarks/${landmark.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Sharjah pages
  const sharjahAreas = SHARJAH_AREAS.map(area => ({
    url: `${baseUrl}/sharjah/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const sharjahFreeZones = SHARJAH_FREE_ZONES.map(zone => ({
    url: `${baseUrl}/sharjah/free-zones/${zone.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const sharjahLandmarks = SHARJAH_LANDMARKS.map(landmark => ({
    url: `${baseUrl}/sharjah/landmarks/${landmark.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Ajman pages
  const ajmanAreas = AJMAN_AREAS.map(area => ({
    url: `${baseUrl}/ajman/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const ajmanFreeZones = AJMAN_FREE_ZONES.map(zone => ({
    url: `${baseUrl}/ajman/free-zones/${zone.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const ajmanLandmarks = AJMAN_LANDMARKS.map(landmark => ({
    url: `${baseUrl}/ajman/landmarks/${landmark.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // RAK pages
  const rakAreas = RAK_AREAS.map(area => ({
    url: `${baseUrl}/ras-al-khaimah/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const rakFreeZones = RAK_FREE_ZONES.map(zone => ({
    url: `${baseUrl}/ras-al-khaimah/free-zones/${zone.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Fujairah pages
  const fujairahAreas = FUJAIRAH_AREAS.map(area => ({
    url: `${baseUrl}/fujairah/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const fujairahFreeZones = FUJAIRAH_FREE_ZONES.map(zone => ({
    url: `${baseUrl}/fujairah/free-zones/${zone.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const fujairahLandmarks = FUJAIRAH_LANDMARKS.map(landmark => ({
    url: `${baseUrl}/fujairah/landmarks/${landmark.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Umm Al Quwain pages
  const uaqAreas = UAQ_AREAS.map(area => ({
    url: `${baseUrl}/umm-al-quwain/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const uaqFreeZones = UAQ_FREE_ZONES.map(zone => ({
    url: `${baseUrl}/umm-al-quwain/free-zones/${zone.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...mainPages,
    ...freeZonesPages,
    ...emiratePages,
    // Dubai
    ...dubaiAreas,
    ...dubaiFreeZones,
    ...dubaiLandmarks,
    // Abu Dhabi
    ...abuDhabiAreas,
    ...abuDhabiFreeZones,
    ...abuDhabiLandmarks,
    // Sharjah
    ...sharjahAreas,
    ...sharjahFreeZones,
    ...sharjahLandmarks,
    // Ajman
    ...ajmanAreas,
    ...ajmanFreeZones,
    ...ajmanLandmarks,
    // RAK
    ...rakAreas,
    ...rakFreeZones,
    // Fujairah
    ...fujairahAreas,
    ...fujairahFreeZones,
    ...fujairahLandmarks,
    // UAQ
    ...uaqAreas,
    ...uaqFreeZones,
  ];
}
