export type WeddingConfig = typeof weddingConfig;

export const weddingConfig = {
  bride: {
    name: 'PUSHPA',
    scriptName: 'Pushpa',
    fullName: 'చి. లా. సౌ. పుష్ప',
    parents: ['Sri Devara Chinnarao', 'Smt. Srinamma'],
  },

  groom: {
    name: 'SRIKANTH',
    scriptName: 'Srikanth',
    fullName: 'చి. శ్రీకాంత్',
    parents: ['Sri Akaramani Pydiraju', 'Smt. Narasayyamma'],
    familyVillage: 'Sangivalasa Village',
  },

  wedding: {
    day: 'Saturday',
    date: '12 December 2026',
    shortDate: '12 · 12 · 2026',
    time: '8:26 PM',
    time24: '20:26',
    nakshatra: 'Uttarashada Nakshatram',
    lagnam: 'Karkataka Lagnam',
    // 12 December 2026, 20:26 IST (Asia/Kolkata)
    sumuhurthamIso: '2026-12-12T20:26:00+05:30',
    calendarTitle: 'Pushpa & Srikanth — Wedding',
  },

  venue: {
    name: 'Bridegroom Residence',
    village: 'Sangivalasa Village',
    mandal: 'Bheemunipatnam Mandal',
    district: 'Visakhapatnam District',
    // Replace with the real Google Maps link when available
    mapsUrl: '',
  },

  dinner: {
    time: '7:00 PM onwards',
    venue: 'At the Marriage Venue',
  },

  gallery: [
    { src: '/1.jpeg' },
    { src: '/2.jpeg'},
    { src: '/3.jpeg' },
    { src: '/4.jpeg' },
    { src: '/5.jpeg' },
  ],

  // Optional couple photo used as the emotional focal point of the opening scene.
  // Leave empty to use the original cinematic heritage artwork.
  coupleImage: '',

  // Background music — replace with your own track.
  music: '/pelli.mpeg',

  hashtag: '#PushpaWedsSrikanth',

  // Optional engagement section — kept configurable, disabled by default
  engagement: {
    enabled: false,
    date: '',
    time: '',
    venue: '',
  },
} as const;
