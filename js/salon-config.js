/**
 * ====================================================================
 * CONFIGURATION DU SALON : NAYA HAIR & BEAUTY STUDIO
 * Abomey-Calavi, Bénin | Démonstration commerciale Afro Luxe & Beauté
 * ====================================================================
 * Fichier centralisé pour personnaliser le salon, les prestations,
 * les prix en FCFA, les images, le numéro WhatsApp et les horaires.
 * ====================================================================
 */

const SALON_CONFIG = {
  identity: {
    name: "NAYA HAIR & BEAUTY STUDIO",
    signature: "L'art de la beauté africaine • Vos cheveux, votre signature.",
    tagline: "Des tresses aux soins capillaires et à la manucure, découvrez un univers où chaque détail compte.",
    activity: "Coiffure féminine, tresses africaines, soins capillaires, manucure, pédicure et coiffures événementielles.",
    location: "Abomey-Calavi, Bénin",
    isDemonstration: true,
    demoNotice: "Concept de démonstration. Contenu et informations à personnaliser pour votre salon."
  },

  contact: {
    phoneDisplay: "+229 01 46 34 79 88",
    phoneCall: "+2290146347988",
    whatsappNumber: "2290146347988",
    whatsappDisplay: "01 46 34 79 88",
    email: "contact@nayahair.bj",
    address: {
      quarter: "Quartier Arconville, Carrefour Kpota",
      city: "Abomey-Calavi",
      country: "Bénin",
      accessDetails: "À 200 m du grand carrefour Kpota, voie pavée calme et accessible."
    }
  },

  whatsappTemplates: {
    general: "Bonjour NAYA HAIR & BEAUTY STUDIO, je souhaite me renseigner sur vos prestations et disponibilités.",
    serviceBooking: (serviceName) => 
      `Bonjour, je souhaite avoir des informations sur la prestation ${serviceName}. J'aimerais connaître le tarif exact et les disponibilités.`
  },

  openingHours: [
    { day: "Lundi", hours: "Fermé (Entretien de l'institut & réapprovisionnement)" },
    { day: "Mardi", hours: "08:30 – 19:30" },
    { day: "Mercredi", hours: "08:30 – 19:30" },
    { day: "Jeudi", hours: "08:30 – 19:30" },
    { day: "Vendredi", hours: "08:30 – 20:00" },
    { day: "Samedi", hours: "08:00 – 20:30" },
    { day: "Dimanche", hours: "13:00 – 19:00 (Sur rendez-vous prioritaire)" }
  ],

  // Prestations complètes
  services: [
    {
      id: "tresses-knotless",
      category: "Tresses & Nattes",
      categorySlug: "tresses",
      name: "Tresses Africaines & Knotless Braids",
      shortDescription: "Tresses sans nœuds légères, respect des tempes et liberté de mouvement immédiate.",
      duration: "3h30 à 5h00",
      priceFcfa: "15 000 – 28 000 FCFA",
      image: "assets/images/hero_naya.jpg"
    },
    {
      id: "nattes-collees",
      category: "Tresses & Nattes",
      categorySlug: "tresses",
      name: "Nattes Collées Artistiques (Cornrows)",
      shortDescription: "Tracés géométriques précis, design contemporain et hydratation profonde des bordures.",
      duration: "1h30 à 2h30",
      priceFcfa: "7 000 – 15 000 FCFA",
      image: "assets/images/nattes_collees.jpg"
    },
    {
      id: "pose-perruque",
      category: "Perruques & Tissages",
      categorySlug: "perruques",
      name: "Pose & Personnalisation Lace Wig HD",
      shortDescription: "Customisation de la dentelle, découpe invisible, pose fondue et coiffage soyeux.",
      duration: "1h30 à 2h30",
      priceFcfa: "12 000 – 25 000 FCFA",
      image: "assets/images/pose_perruque.jpg"
    },
    {
      id: "soins-capillaires",
      category: "Soins capillaires",
      categorySlug: "soins",
      name: "Soin Profond Botanique & Vapeur Chaude",
      shortDescription: "Bain d'huiles végétales (karité, ricin, coco), massage crânien et infusion hydratante.",
      duration: "1h15 à 1h45",
      priceFcfa: "8 000 – 16 000 FCFA",
      image: "assets/images/salon_care.jpg"
    },
    {
      id: "manucure-ongles",
      category: "Manucure & Pédicure",
      categorySlug: "manucure",
      name: "Manucure Spa & Pose Vernis Semi-Permanent",
      shortDescription: "Soin minutieux des cuticules, limage harmonieux, gommage doux et vernis longue tenue.",
      duration: "1h00 à 1h30",
      priceFcfa: "6 000 – 14 000 FCFA",
      image: "assets/images/nattes_collees.jpg" // image avec textures et détails raffinés
    },
    {
      id: "pedicure-spa",
      category: "Manucure & Pédicure",
      categorySlug: "manucure",
      name: "Pédicure Spa Relaxante & Bain Floral",
      shortDescription: "Bain de pieds aux sels marins, élimination des callosités, massage relaxant et pose vernis.",
      duration: "1h15 à 1h45",
      priceFcfa: "8 000 – 18 000 FCFA",
      image: "assets/images/salon_care.jpg"
    },
    {
      id: "coiffure-evenement",
      category: "Événements & Mariages",
      categorySlug: "evenements",
      name: "Chignon Sculpté de Fête & Mariée Royale",
      shortDescription: "Création d'exception pour mariages traditionnels, dots, galas et cérémonies.",
      duration: "2h00 à 3h00",
      priceFcfa: "20 000 – 45 000 FCFA",
      image: "assets/images/coiffure_evenement.jpg"
    }
  ],

  pricingNotes: "Note sur les tarifs : Les montants indiqués sont indicatifs. Le prix définitif dépend de la longueur des cheveux, du volume, de la fourniture des mèches et du degré de finition demandé."
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = SALON_CONFIG;
}
