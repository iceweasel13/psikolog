// sanity/lib/queries.ts
import { defineQuery } from "next-sanity";

// Tekil belge olduğu için [0] ile ilk eşleşeni obje olarak alıyoruz
export const NAVBAR_QUERY = defineQuery(`
  *[_type == "navbar"][0] {
    title,
    subtitle,
    navItems[] {
      label,
      href
    },
    ctaButtonText,
    ctaButtonLink
  }
`);
export const HERO_QUERY = `
  *[_type == "hero"][0] {
    badgeText,
    titleMain,
    titleHighlight,
    description,
    quote,
    ctaPrimaryText,
    ctaPrimaryLink,
    ctaSecondaryText,
    ctaSecondaryLink,
    stats[] {
      title,
      subtitle
    },
    portraitImage,
    trustBadgeTitle,
    trustBadgeSubtitle
  }
`;

export const ABOUT_QUERY = `
  *[_type == "about"][0] {
    tagline,
    heading,
    aboutImage,
    quote,
    bioParagraph1,
    bioParagraph2,
    highlightCards[] {
      badge,
      title,
      subtitle
    }
  }
`;
export const SERVICES_QUERY = `
  *[_type == "services"][0] {
    tagline,
    heading,
    description,
    items[] {
      icon,
      title,
      description,
      duration,
      frequency
    }
  }
`;
export const REVIEWS_QUERY = `
  *[_type == "reviews"][0] {
    tagline,
    heading,
    description,
    rowOne[] {
      category,
      text
    },
    rowTwo[] {
      category,
      text
    }
  }
`;
export const EDUCATION_QUERY = `
  *[_type == "education"][0] {
    tagline,
    heading,
    description,
    timeline[] {
      badge,
      title,
      institution,
      desc,
      side,
      certificateImage
    },
    skillsTagline,
    skillsHeading,
    skillsDescription,
    technicalSkills
  }
`;
export const CONTACT_QUERY = `
  *[_type == "contact"][0] {
    tagline,
    heading,
    description,
    locationTitle,
    locationDetails,
    onlineTitle,
    onlineDetails,
    whatsappNumber,
    whatsappDisplay,
    phoneRaw,
    phoneDisplay,
    instagramHandle,
    email,
    kvkkText
  }
`;
export const FOOTER_QUERY = `
  {
    "navbar": *[_type == "navbar"][0] {
      title,
      subtitle,
      navItems[] {
        label,
        href
      }
    },
    "services": *[_type == "services"][0] {
      items[] {
        title
      }
    },
    "contact": *[_type == "contact"][0] {
      locationDetails,
      whatsappNumber,
      whatsappDisplay,
      phoneRaw,
      phoneDisplay,
      instagramHandle,
      email
    }
  }
`;