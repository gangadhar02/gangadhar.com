export const getPersonJsonLd = () => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    url: 'https://gangadhar.com/',
    affiliation: [
      {
        '@type': 'Organization',
        '@id': '',
        url: 'https://freelancer.com/',
        name: 'Freelancer',
      },
    ],
    description:
      'Gangadhar S is a passionate Creative Strategist and Performance Marketer. He specializes in turning ideas into high-impact marketing campaigns that drive growth and engagement.',
    image: 'https://gangadhar.com/static/images/home-opt.jpg',
    name: 'Gangadhar S',
    givenName: 'Gangadhar',
    familyName: 'S',
    gender: 'Male',
    birthPlace: 'India',
    jobTitle: 'Creative Strategist & Performance Marketer',
    sameAs: [
      'https://www.linkedin.com/in/gangadhar02',
      'https://twitter.com/gangadhar02',
      'https://www.instagram.com/gangadhar__s/',
      'https://github.com/gangadhar02',
    ],
    knowsAbout: [
      {
        '@type': 'Thing',
        '@id': 'https://www.wikidata.org/wiki/Q49773',
        name: 'Marketing',
      },
      {
        '@type': 'Thing',
        '@id': 'https://www.wikidata.org/wiki/Q1643932',
        name: 'Digital Marketing',
      },
      {
        '@type': 'Thing',
        '@id': 'https://www.wikidata.org/wiki/Q386724',
        name: 'Creative Strategy',
      },
      {
        '@type': 'Thing',
        '@id': 'https://www.wikidata.org/wiki/Q80993',
        name: 'AI Assisted Coding',
      },
    ],
    knowsLanguage: [
      {
        '@type': 'Language',
        '@id': 'https://www.wikidata.org/wiki/Q1860',
        name: 'English',
      },
      {
        '@type': 'Language',
        '@id': 'https://www.wikidata.org/wiki/Q1568',
        name: 'Hindi',
      },
    ],
    nationality: [
      {
        '@type': 'Country',
        '@id': 'https://www.wikidata.org/wiki/Q668',
        name: 'India',
      },
    ],
  }
}