import type { Emirate, FreeZone } from '../types';

// UAE Emirates Data
export const UAE_EMIRATES: Record<Emirate, { name: string; nameAr: string; slug: string }> = {
  'dubai': { name: 'Dubai', nameAr: 'دبي', slug: 'dubai' },
  'abu-dhabi': { name: 'Abu Dhabi', nameAr: 'أبوظبي', slug: 'abu-dhabi' },
  'sharjah': { name: 'Sharjah', nameAr: 'الشارقة', slug: 'sharjah' },
  'ajman': { name: 'Ajman', nameAr: 'عجمان', slug: 'ajman' },
  'ras-al-khaimah': { name: 'Ras Al Khaimah', nameAr: 'رأس الخيمة', slug: 'ras-al-khaimah' },
  'fujairah': { name: 'Fujairah', nameAr: 'الفجيرة', slug: 'fujairah' },
  'umm-al-quwain': { name: 'Umm Al Quwain', nameAr: 'أم القيوين', slug: 'umm-al-quwain' },
};

// Dubai Areas
export const DUBAI_AREAS = [
  { name: 'Downtown Dubai', slug: 'downtown' },
  { name: 'Dubai Marina', slug: 'marina' },
  { name: 'Business Bay', slug: 'business-bay' },
  { name: 'Jumeirah', slug: 'jumeirah' },
  { name: 'Deira', slug: 'deira' },
  { name: 'Bur Dubai', slug: 'bur-dubai' },
  { name: 'Al Barsha', slug: 'al-barsha' },
  { name: 'JLT - Jumeirah Lake Towers', slug: 'jlt' },
  { name: 'DIFC', slug: 'difc' },
  { name: 'Palm Jumeirah', slug: 'palm-jumeirah' },
  { name: 'JBR - Jumeirah Beach Residence', slug: 'jbr' },
  { name: 'Al Quoz', slug: 'al-quoz' },
  { name: 'Al Karama', slug: 'al-karama' },
  { name: 'Satwa', slug: 'satwa' },
  { name: 'Mirdif', slug: 'mirdif' },
  { name: 'Dubai Hills', slug: 'dubai-hills' },
  { name: 'Arabian Ranches', slug: 'arabian-ranches' },
  { name: 'Dubai Silicon Oasis', slug: 'silicon-oasis' },
  { name: 'International City', slug: 'international-city' },
  { name: 'Discovery Gardens', slug: 'discovery-gardens' },
  { name: 'Dubai Sports City', slug: 'sports-city' },
  { name: 'Motor City', slug: 'motor-city' },
  { name: 'Al Nahda', slug: 'al-nahda' },
  { name: 'Oud Metha', slug: 'oud-metha' },
  { name: 'Garhoud', slug: 'garhoud' },
];

// Dubai Free Zones
export const DUBAI_FREE_ZONES = [
  { name: 'DIFC - Dubai International Financial Centre', slug: 'difc', code: 'difc' as FreeZone },
  { name: 'JAFZA - Jebel Ali Free Zone', slug: 'jafza', code: 'jafza' as FreeZone },
  { name: 'DMCC - Dubai Multi Commodities Centre', slug: 'dmcc', code: 'dmcc' as FreeZone },
  { name: 'Dubai Internet City', slug: 'dic', code: 'dic' as FreeZone },
  { name: 'Dubai Media City', slug: 'dmc', code: 'dmc' as FreeZone },
  { name: 'Dubai Knowledge Park', slug: 'dkp', code: 'dkp' as FreeZone },
  { name: 'Dubai Healthcare City', slug: 'dhcc', code: 'dhcc' as FreeZone },
  { name: 'Dubai Design District - d3', slug: 'd3', code: 'd3' as FreeZone },
  { name: 'Dubai Airport Free Zone - DAFZA', slug: 'dafza', code: 'dafza' as FreeZone },
  { name: 'Dubai South', slug: 'dubai-south', code: 'dubai_south' as FreeZone },
  { name: 'Dubai CommerCity', slug: 'commercity', code: 'mainland' as FreeZone },
  { name: 'Dubai Studio City', slug: 'studio-city', code: 'mainland' as FreeZone },
  { name: 'Dubai Outsource City', slug: 'outsource-city', code: 'mainland' as FreeZone },
  { name: 'Dubai Science Park', slug: 'science-park', code: 'mainland' as FreeZone },
  { name: 'International Humanitarian City', slug: 'ihc', code: 'mainland' as FreeZone },
  { name: 'Dubai Textile City', slug: 'textile-city', code: 'mainland' as FreeZone },
  { name: 'Gold & Diamond Park', slug: 'gold-diamond-park', code: 'mainland' as FreeZone },
  { name: 'Dubai Cars & Automotive Zone - DUCAMZ', slug: 'ducamz', code: 'mainland' as FreeZone },
];

// Dubai Landmarks
export const DUBAI_LANDMARKS = [
  { name: 'Burj Khalifa Area', slug: 'burj-khalifa' },
  { name: 'Dubai Mall Area', slug: 'dubai-mall' },
  { name: 'Mall of the Emirates Area', slug: 'mall-of-emirates' },
  { name: 'Dubai Creek', slug: 'dubai-creek' },
  { name: 'Dubai Frame', slug: 'dubai-frame' },
  { name: 'Global Village', slug: 'global-village' },
  { name: 'Expo City Dubai', slug: 'expo-city' },
];

// Abu Dhabi Areas
export const ABU_DHABI_AREAS = [
  { name: 'Abu Dhabi City', slug: 'city' },
  { name: 'Al Reem Island', slug: 'reem-island' },
  { name: 'Yas Island', slug: 'yas-island' },
  { name: 'Saadiyat Island', slug: 'saadiyat-island' },
  { name: 'Khalifa City', slug: 'khalifa-city' },
  { name: 'Mohamed Bin Zayed City', slug: 'mbz-city' },
  { name: 'Al Mushrif', slug: 'mushrif' },
  { name: 'Al Nahyan', slug: 'al-nahyan' },
  { name: 'Tourist Club Area', slug: 'tourist-club' },
  { name: 'Corniche', slug: 'corniche' },
  { name: 'Mussafah', slug: 'mussafah' },
  { name: 'Al Ain', slug: 'al-ain' },
  { name: 'Al Dhafra', slug: 'al-dhafra' },
  { name: 'Madinat Zayed', slug: 'madinat-zayed' },
  { name: 'Al Shamkha', slug: 'al-shamkha' },
  { name: 'Baniyas', slug: 'baniyas' },
  { name: 'Al Wathba', slug: 'al-wathba' },
  { name: 'Al Raha Beach', slug: 'al-raha-beach' },
  { name: 'Al Maryah Island', slug: 'al-maryah-island' },
];

// Abu Dhabi Free Zones
export const ABU_DHABI_FREE_ZONES = [
  { name: 'ADGM - Abu Dhabi Global Market', slug: 'adgm', code: 'adgm' as FreeZone },
  { name: 'Masdar City Free Zone', slug: 'masdar', code: 'masdar' as FreeZone },
  { name: 'KIZAD - Khalifa Industrial Zone', slug: 'kizad', code: 'kizad' as FreeZone },
  { name: 'twofour54', slug: 'twofour54', code: 'twofour54' as FreeZone },
  { name: 'Abu Dhabi Airport Free Zone', slug: 'aafz', code: 'mainland' as FreeZone },
  { name: 'Industrial City of Abu Dhabi - ICAD', slug: 'icad', code: 'mainland' as FreeZone },
  { name: 'ZonesCorp', slug: 'zonescorp', code: 'mainland' as FreeZone },
  { name: 'Abu Dhabi Ports Free Zone', slug: 'ad-ports', code: 'mainland' as FreeZone },
  { name: 'Ghantoot Free Zone', slug: 'ghantoot', code: 'mainland' as FreeZone },
];

// Abu Dhabi Landmarks
export const ABU_DHABI_LANDMARKS = [
  { name: 'Louvre Abu Dhabi Area', slug: 'louvre' },
  { name: 'Sheikh Zayed Grand Mosque Area', slug: 'grand-mosque' },
  { name: 'Yas Marina Circuit', slug: 'yas-marina' },
  { name: 'Ferrari World Area', slug: 'ferrari-world' },
  { name: 'Emirates Palace Area', slug: 'emirates-palace' },
];

// Sharjah Areas
export const SHARJAH_AREAS = [
  { name: 'Sharjah City Center', slug: 'city-center' },
  { name: 'Al Nahda Sharjah', slug: 'al-nahda' },
  { name: 'Al Majaz', slug: 'al-majaz' },
  { name: 'Al Khan', slug: 'al-khan' },
  { name: 'Al Qasimia', slug: 'al-qasimia' },
  { name: 'Muwaileh', slug: 'muwaileh' },
  { name: 'Al Taawun', slug: 'al-taawun' },
  { name: 'Industrial Area', slug: 'industrial-area' },
  { name: 'University City', slug: 'university-city' },
  { name: 'Al Mamzar', slug: 'al-mamzar' },
  { name: 'Kalba', slug: 'kalba' },
  { name: 'Khor Fakkan', slug: 'khor-fakkan' },
  { name: 'Dibba Al-Hisn', slug: 'dibba' },
];

// Sharjah Free Zones
export const SHARJAH_FREE_ZONES = [
  { name: 'SAIF Zone - Sharjah Airport Free Zone', slug: 'saif', code: 'saif' as FreeZone },
  { name: 'Hamriyah Free Zone', slug: 'hamriyah', code: 'hamriyah' as FreeZone },
  { name: 'Sharjah Media City - Shams', slug: 'shams', code: 'shams' as FreeZone },
  { name: 'Sharjah Publishing City', slug: 'publishing-city', code: 'mainland' as FreeZone },
  { name: 'Sharjah Research Technology Park', slug: 'srtp', code: 'mainland' as FreeZone },
  { name: 'American University of Sharjah Free Zone', slug: 'aus', code: 'mainland' as FreeZone },
];

// Sharjah Landmarks
export const SHARJAH_LANDMARKS = [
  { name: 'Sharjah Corniche', slug: 'corniche' },
  { name: 'Al Noor Island', slug: 'al-noor-island' },
  { name: 'Sharjah Aquarium Area', slug: 'aquarium' },
];

// Ajman Areas
export const AJMAN_AREAS = [
  { name: 'Ajman City', slug: 'city' },
  { name: 'Al Nuaimiya', slug: 'al-nuaimiya' },
  { name: 'Al Rashidiya', slug: 'al-rashidiya' },
  { name: 'Al Jurf', slug: 'al-jurf' },
  { name: 'Emirates City', slug: 'emirates-city' },
  { name: 'Al Zorah', slug: 'al-zorah' },
  { name: 'Masfout', slug: 'masfout' },
  { name: 'Manama', slug: 'manama' },
];

// Ajman Free Zones
export const AJMAN_FREE_ZONES = [
  { name: 'Ajman Free Zone', slug: 'afz', code: 'ajman_fz' as FreeZone },
  { name: 'Ajman Media City Free Zone', slug: 'amcfz', code: 'mainland' as FreeZone },
];

// RAK Areas
export const RAK_AREAS = [
  { name: 'RAK City', slug: 'city' },
  { name: 'Al Nakheel', slug: 'al-nakheel' },
  { name: 'Al Hamra', slug: 'al-hamra' },
  { name: 'Mina Al Arab', slug: 'mina-al-arab' },
  { name: 'Al Marjan Island', slug: 'al-marjan-island' },
  { name: 'Khuzam', slug: 'khuzam' },
  { name: 'Al Dhait', slug: 'al-dhait' },
  { name: 'Jebel Jais Area', slug: 'jebel-jais' },
  { name: 'Al Jazirah Al Hamra', slug: 'jazirah-hamra' },
];

// RAK Free Zones
export const RAK_FREE_ZONES = [
  { name: 'RAK Free Trade Zone', slug: 'rak-ftz', code: 'rak_ftz' as FreeZone },
  { name: 'RAK Investment Authority Free Zone', slug: 'rakia', code: 'mainland' as FreeZone },
  { name: 'RAK Maritime City', slug: 'maritime', code: 'mainland' as FreeZone },
  { name: 'RAK Media City', slug: 'media-city', code: 'mainland' as FreeZone },
  { name: 'Academic Zone', slug: 'academic', code: 'mainland' as FreeZone },
];

// Fujairah Areas
export const FUJAIRAH_AREAS = [
  { name: 'Fujairah City', slug: 'city' },
  { name: 'Dibba Al Fujairah', slug: 'dibba' },
  { name: 'Al Faseel', slug: 'al-faseel' },
  { name: 'Mirbah', slug: 'mirbah' },
  { name: 'Qidfa', slug: 'qidfa' },
  { name: 'Masafi', slug: 'masafi' },
  { name: 'Al Bidya', slug: 'al-bidya' },
];

// Fujairah Free Zones
export const FUJAIRAH_FREE_ZONES = [
  { name: 'Fujairah Free Zone', slug: 'ffz', code: 'fujairah_fz' as FreeZone },
  { name: 'Fujairah Creative City', slug: 'creative-city', code: 'mainland' as FreeZone },
  { name: 'International Free Zone Authority Fujairah', slug: 'ifza', code: 'mainland' as FreeZone },
];

// Fujairah Landmarks
export const FUJAIRAH_LANDMARKS = [
  { name: 'Fujairah Fort Area', slug: 'fort' },
  { name: 'Al Bidya Mosque Area', slug: 'bidya-mosque' },
];

// UAQ Areas
export const UAQ_AREAS = [
  { name: 'UAQ City', slug: 'city' },
  { name: 'Old Town', slug: 'old-town' },
  { name: 'Al Salamah', slug: 'al-salamah' },
  { name: 'Al Raas', slug: 'al-raas' },
  { name: 'Falaj Al Mualla', slug: 'falaj-al-mualla' },
];

// UAQ Free Zones
export const UAQ_FREE_ZONES = [
  { name: 'Umm Al Quwain Free Trade Zone', slug: 'uaq-ftz', code: 'uaq_ftz' as FreeZone },
  { name: 'Ahmed Bin Rashid Free Zone', slug: 'abrfz', code: 'mainland' as FreeZone },
];

// Gratuity Calculation Constants
export const GRATUITY_CONSTANTS = {
  DAYS_FIRST_5_YEARS: 21,
  DAYS_AFTER_5_YEARS: 30,
  DAYS_PER_MONTH: 30,
  MAX_GRATUITY_YEARS: 2,
  MIN_SERVICE_YEARS: 1,
};

// Resignation Entitlement Percentages (for unlimited contracts)
export const RESIGNATION_ENTITLEMENT = {
  LESS_THAN_1_YEAR: 0,
  BETWEEN_1_AND_3_YEARS: 0.3333,
  BETWEEN_3_AND_5_YEARS: 0.6667,
  MORE_THAN_5_YEARS: 1,
};

// Free Zone Special Rules
export const FREE_ZONE_RULES: Record<string, { name: string; hasSpecialRules: boolean; notes: string }> = {
  difc: {
    name: 'DIFC',
    hasSpecialRules: true,
    notes: 'DIFC has its own employment law (DIFC Employment Law No. 2 of 2019). Gratuity is calculated differently.',
  },
  adgm: {
    name: 'ADGM',
    hasSpecialRules: true,
    notes: 'ADGM follows English common law principles. Employment regulations may differ from UAE Labor Law.',
  },
  jafza: {
    name: 'JAFZA',
    hasSpecialRules: false,
    notes: 'Follows standard UAE Labor Law gratuity calculations.',
  },
  dmcc: {
    name: 'DMCC',
    hasSpecialRules: false,
    notes: 'Follows standard UAE Labor Law gratuity calculations.',
  },
  mainland: {
    name: 'UAE Mainland',
    hasSpecialRules: false,
    notes: 'Follows standard UAE Labor Law (Federal Decree-Law No. 33 of 2021).',
  },
};

// Legal References
export const LEGAL_REFERENCES = {
  UAE_LABOR_LAW: 'UAE Labor Law (Federal Decree-Law No. 33 of 2021)',
  DIFC_EMPLOYMENT_LAW: 'DIFC Employment Law No. 2 of 2019',
  ADGM_EMPLOYMENT_REGULATIONS: 'ADGM Employment Regulations 2019',
  ARTICLE_51: 'Article 51 - End of Service Gratuity',
  ARTICLE_52: 'Article 52 - Calculation of Gratuity',
  ARTICLE_53: 'Article 53 - Gratuity Upon Resignation',
};

// SEO Constants
export const SEO_DEFAULTS = {
  TITLE_SEPARATOR: ' | ',
  TITLE_SUFFIX: 'Gratuity Calculator UAE',
  TITLE_MAX_LENGTH: 60,
  DESCRIPTION_MAX_LENGTH: 160,
  DEFAULT_OG_IMAGE: '/images/og-default.jpg',
};

// Site Configuration
export const SITE_CONFIG = {
  name: 'Gratuity Calculator UAE',
  description: 'Calculate your UAE gratuity instantly with our free MOHRE-compliant calculator.',
  url: 'https://gratuitycalculator.ae',
  locale: 'en_AE',
  email: 'info@gratuitycalculator.ae',
};
