// Dubai Free Zones Data
export interface FreeZone {
    slug: string;
    name: string;
    fullName: string;
    description: string;
    gratuityRules: string[];
    keyFeatures: string[];
    established: string;
    authority: string;
    employees: string;
    companies: string;
}

export const DUBAI_FREE_ZONES: FreeZone[] = [
    {
        slug: 'difc',
        name: 'DIFC',
        fullName: 'Dubai International Financial Centre',
        description: 'DIFC operates under its own employment law (DIFC Employment Law No. 2 of 2019) which differs from UAE Labour Law. Gratuity calculations follow DIFC-specific rules with different caps and calculations.',
        gratuityRules: [
            'Gratuity calculated at 21 days basic salary per year for first 5 years',
            'After 5 years: 30 days basic salary per year',
            'Maximum gratuity capped at 2 years total basic salary',
            'Pro-rata calculation for incomplete years',
            'No gratuity if employment less than 1 year'
        ],
        keyFeatures: [
            'Independent legal jurisdiction',
            'Common law framework',
            'Own employment tribunal',
            'Different visa categories'
        ],
        established: '2004',
        authority: 'DIFC Authority',
        employees: '30,000+',
        companies: '3,600+'
    },
    {
        slug: 'jafza',
        name: 'JAFZA',
        fullName: 'Jebel Ali Free Zone',
        description: 'JAFZA is one of the largest and oldest free zones in Dubai. Employment follows UAE Labour Law with standard gratuity calculations. Special provisions may apply for maritime and logistics workers.',
        gratuityRules: [
            '21 days basic salary per year for first 5 years',
            '30 days basic salary per year after 5 years',
            'Standard UAE Labour Law provisions apply',
            'End of service benefits per federal law',
            'Pro-rata for incomplete years'
        ],
        keyFeatures: [
            'Largest free zone in the region',
            '100% foreign ownership',
            'Strategic port location',
            'Integrated logistics hub'
        ],
        established: '1985',
        authority: 'JAFZA Authority',
        employees: '145,000+',
        companies: '8,000+'
    },
    {
        slug: 'dmcc',
        name: 'DMCC',
        fullName: 'Dubai Multi Commodities Centre',
        description: 'DMCC follows UAE Labour Law for employment and gratuity matters. As the world\'s flagship free zone, it provides comprehensive business services while maintaining standard employment regulations.',
        gratuityRules: [
            'Standard UAE Labour Law gratuity applies',
            '21 days per year for first 5 years',
            '30 days per year after 5 years',
            'Basic salary used for calculation',
            'Full entitlement after 1 year of service'
        ],
        keyFeatures: [
            'World\'s #1 Free Zone (9 years running)',
            'JLT location premium',
            'Commodity trading hub',
            'Flexi-desk options available'
        ],
        established: '2002',
        authority: 'DMCC Authority',
        employees: '100,000+',
        companies: '22,000+'
    },
    {
        slug: 'dic',
        name: 'Dubai Internet City',
        fullName: 'Dubai Internet City',
        description: 'Dubai Internet City is the Middle East\'s largest ICT hub. Employment follows standard UAE Labour Law provisions with gratuity calculated according to federal regulations.',
        gratuityRules: [
            'UAE Labour Law gratuity provisions',
            '21 days basic salary per year (first 5 years)',
            '30 days basic salary per year (after 5 years)',
            'Standard end of service calculations',
            'Pro-rata for partial years'
        ],
        keyFeatures: [
            'Tech industry cluster',
            'Home to global tech giants',
            'Innovation-focused ecosystem',
            'Part of TECOM Group'
        ],
        established: '1999',
        authority: 'TECOM Group',
        employees: '25,000+',
        companies: '1,600+'
    },
    {
        slug: 'dmc',
        name: 'Dubai Media City',
        fullName: 'Dubai Media City',
        description: 'Dubai Media City hosts regional headquarters of major media organizations. Standard UAE Labour Law applies for gratuity calculations with no special provisions.',
        gratuityRules: [
            'Standard UAE Labour Law applies',
            '21 days per year for first 5 years',
            '30 days per year thereafter',
            'Based on last drawn basic salary',
            'Minimum 1 year service required'
        ],
        keyFeatures: [
            'Media industry hub',
            'Broadcasting facilities',
            'Creative cluster',
            'Part of TECOM Group'
        ],
        established: '2001',
        authority: 'TECOM Group',
        employees: '15,000+',
        companies: '1,500+'
    },
    {
        slug: 'dkp',
        name: 'Dubai Knowledge Park',
        fullName: 'Dubai Knowledge Park',
        description: 'Dubai Knowledge Park focuses on human resource management, education, and training industries. Employment follows UAE Labour Law with standard gratuity provisions.',
        gratuityRules: [
            'UAE Labour Law gratuity rules',
            '21 days salary per year (years 1-5)',
            '30 days salary per year (5+ years)',
            'Basic salary basis for calculation',
            'Full benefits after 1 year'
        ],
        keyFeatures: [
            'Education sector focus',
            'HR & training hub',
            'Professional development center',
            'Part of TECOM Group'
        ],
        established: '2003',
        authority: 'TECOM Group',
        employees: '8,000+',
        companies: '500+'
    },
    {
        slug: 'dhcc',
        name: 'Dubai Healthcare City',
        fullName: 'Dubai Healthcare City',
        description: 'Dubai Healthcare City is a healthcare free zone with its own regulatory framework. While following UAE Labour Law for gratuity, healthcare professionals may have specific contract terms.',
        gratuityRules: [
            'UAE Labour Law provisions apply',
            'Standard 21/30 day calculation',
            'Healthcare sector contract variations possible',
            'End of service per federal regulations',
            'Professional licensing requirements'
        ],
        keyFeatures: [
            'Healthcare focused free zone',
            'Medical tourism hub',
            'Specialized facilities',
            'Regulatory excellence'
        ],
        established: '2002',
        authority: 'DHCC Authority',
        employees: '12,000+',
        companies: '400+'
    },
    {
        slug: 'd3',
        name: 'd3',
        fullName: 'Dubai Design District',
        description: 'Dubai Design District (d3) caters to the design, fashion, and creative industries. Standard UAE Labour Law applies for employment and gratuity calculations.',
        gratuityRules: [
            'Standard UAE Labour Law',
            '21 days per year (first 5 years)',
            '30 days per year (after 5 years)',
            'Creative industry standard contracts',
            'Pro-rata calculations apply'
        ],
        keyFeatures: [
            'Design & fashion hub',
            'Creative industries cluster',
            'Modern architecture',
            'Part of TECOM Group'
        ],
        established: '2013',
        authority: 'TECOM Group',
        employees: '5,000+',
        companies: '600+'
    },
    {
        slug: 'dafza',
        name: 'DAFZA',
        fullName: 'Dubai Airport Free Zone',
        description: 'DAFZA offers strategic location near Dubai International Airport. Employment follows UAE Labour Law with standard gratuity calculations for all employees.',
        gratuityRules: [
            'UAE Labour Law compliance',
            '21 days basic salary (years 1-5)',
            '30 days basic salary (5+ years)',
            'Aviation sector standards',
            'Standard end of service benefits'
        ],
        keyFeatures: [
            'Airport proximity',
            'Logistics advantage',
            'Trade hub',
            'Quick customs clearance'
        ],
        established: '1996',
        authority: 'DAFZA Authority',
        employees: '20,000+',
        companies: '1,800+'
    },
    {
        slug: 'dubai-south',
        name: 'Dubai South',
        fullName: 'Dubai South (formerly Dubai World Central)',
        description: 'Dubai South is a master-planned city development with multiple free zones. Standard UAE Labour Law applies, with logistics and aviation sectors following industry-specific guidelines.',
        gratuityRules: [
            'UAE Labour Law provisions',
            'Standard 21/30 day formula',
            'Aviation sector considerations',
            'Logistics industry standards',
            'Pro-rata for incomplete years'
        ],
        keyFeatures: [
            'Al Maktoum Airport location',
            'Expo 2020 legacy',
            'Residential & commercial',
            'Future city development'
        ],
        established: '2006',
        authority: 'Dubai South',
        employees: '30,000+',
        companies: '2,500+'
    },
    {
        slug: 'commercity',
        name: 'Dubai CommerCity',
        fullName: 'Dubai CommerCity',
        description: 'Dubai CommerCity is the region\'s first free zone dedicated to e-commerce. Employment follows UAE Labour Law with standard gratuity provisions.',
        gratuityRules: [
            'Standard UAE Labour Law',
            '21 days per year (first 5 years)',
            '30 days per year thereafter',
            'E-commerce sector focus',
            'Full gratuity after 1 year'
        ],
        keyFeatures: [
            'E-commerce dedicated zone',
            'Fulfillment centers',
            'Last-mile logistics',
            'Digital economy hub'
        ],
        established: '2018',
        authority: 'DAFZA Authority',
        employees: '3,000+',
        companies: '200+'
    },
    {
        slug: 'studio-city',
        name: 'Dubai Studio City',
        fullName: 'Dubai Studio City',
        description: 'Dubai Studio City serves the film, TV, and broadcasting industry. Standard UAE Labour Law applies for employment contracts and gratuity calculations.',
        gratuityRules: [
            'UAE Labour Law compliance',
            'Standard gratuity formula',
            'Entertainment industry contracts',
            '21/30 day calculation basis',
            'Pro-rata for partial service'
        ],
        keyFeatures: [
            'Film & TV production hub',
            'World-class studios',
            'Post-production facilities',
            'Part of TECOM Group'
        ],
        established: '2005',
        authority: 'TECOM Group',
        employees: '4,000+',
        companies: '300+'
    },
    {
        slug: 'outsource-city',
        name: 'Dubai Outsource City',
        fullName: 'Dubai Outsource City',
        description: 'Dubai Outsource City focuses on business process outsourcing services. Employment follows UAE Labour Law with standard gratuity provisions.',
        gratuityRules: [
            'Standard UAE Labour Law',
            '21 days (first 5 years)',
            '30 days (after 5 years)',
            'BPO industry standards',
            'Basic salary calculations'
        ],
        keyFeatures: [
            'BPO industry hub',
            'Customer service centers',
            'Shared services focus',
            'Part of TECOM Group'
        ],
        established: '2007',
        authority: 'TECOM Group',
        employees: '6,000+',
        companies: '150+'
    },
    {
        slug: 'science-park',
        name: 'Dubai Science Park',
        fullName: 'Dubai Science Park',
        description: 'Dubai Science Park supports life sciences, energy, and environment sectors. Standard UAE Labour Law applies with gratuity calculated per federal regulations.',
        gratuityRules: [
            'UAE Labour Law provisions',
            'Standard 21/30 day formula',
            'Scientific sector contracts',
            'Research facility standards',
            'Full benefits after 1 year'
        ],
        keyFeatures: [
            'Life sciences cluster',
            'R&D facilities',
            'Laboratory spaces',
            'Part of TECOM Group'
        ],
        established: '2005',
        authority: 'TECOM Group',
        employees: '3,500+',
        companies: '350+'
    },
    {
        slug: 'ihc',
        name: 'IHC',
        fullName: 'International Humanitarian City',
        description: 'International Humanitarian City hosts UN agencies and humanitarian organizations. Employment may follow specific international organization rules, but private sector follows UAE Labour Law.',
        gratuityRules: [
            'UAE Labour Law for private sector',
            'UN agencies: separate regulations',
            'NGO-specific contracts possible',
            'Standard formula for local hires',
            'International staff: varies'
        ],
        keyFeatures: [
            'Humanitarian hub',
            'UN agency presence',
            'Logistics center',
            'Emergency response base'
        ],
        established: '2003',
        authority: 'IHC Authority',
        employees: '2,000+',
        companies: '80+'
    },
    {
        slug: 'textile-city',
        name: 'Dubai Textile City',
        fullName: 'Dubai Textile City',
        description: 'Dubai Textile City is dedicated to the textile and garment industry. Employment follows UAE Labour Law with standard gratuity provisions for all workers.',
        gratuityRules: [
            'Standard UAE Labour Law',
            '21 days per year (years 1-5)',
            '30 days per year (5+ years)',
            'Manufacturing sector standards',
            'Full gratuity entitlements'
        ],
        keyFeatures: [
            'Textile industry focus',
            'Manufacturing facilities',
            'Garment production hub',
            'Trade center'
        ],
        established: '2007',
        authority: 'Dubai Textile City Authority',
        employees: '8,000+',
        companies: '400+'
    },
    {
        slug: 'gold-diamond-park',
        name: 'Gold & Diamond Park',
        fullName: 'Gold & Diamond Park',
        description: 'Gold & Diamond Park is a specialized free zone for gold and jewelry manufacturing. Standard UAE Labour Law applies for employment and gratuity.',
        gratuityRules: [
            'UAE Labour Law compliance',
            'Standard gratuity formula',
            '21/30 day calculation',
            'Manufacturing standards',
            'Pro-rata calculations'
        ],
        keyFeatures: [
            'Jewelry manufacturing hub',
            'Gold trading center',
            'Diamond processing',
            'Retail outlets'
        ],
        established: '2001',
        authority: 'DMCC oversight',
        employees: '3,000+',
        companies: '120+'
    },
    {
        slug: 'ducamz',
        name: 'DUCAMZ',
        fullName: 'Dubai Cars & Automotive Zone',
        description: 'Dubai Cars & Automotive Zone (DUCAMZ) serves the automotive industry. Employment follows UAE Labour Law with standard gratuity calculations.',
        gratuityRules: [
            'Standard UAE Labour Law',
            '21 days (first 5 years)',
            '30 days (after 5 years)',
            'Automotive sector standards',
            'Basic salary basis'
        ],
        keyFeatures: [
            'Automotive industry hub',
            'Vehicle trading center',
            'After-market services',
            'Auction facilities'
        ],
        established: '2000',
        authority: 'DUCAMZ Authority',
        employees: '5,000+',
        companies: '500+'
    }
];

export function getFreeZoneBySlug(slug: string): FreeZone | undefined {
    return DUBAI_FREE_ZONES.find(zone => zone.slug === slug);
}

export function getRelatedZones(currentSlug: string, limit: number = 6): FreeZone[] {
    return DUBAI_FREE_ZONES.filter(zone => zone.slug !== currentSlug).slice(0, limit);
}
