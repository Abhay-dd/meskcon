export interface CloudinaryImage {
  public_id: string;
  url: string;
}

export interface Speaker {
  _id?: string;
  name: string;
  designation?: string;
  institution?: string;
  role?: string;
  organization?: string;
  country?: string;
  countryCode?: string;
  topic?: string;
  bio?: string;
  photo?: string;
  photoUrl?: string;
  image?: CloudinaryImage;
  order?: number;
  isKeynote?: boolean;
  category?: string;
  speakerType?: "international" | "national";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommitteeMember {
  _id?: string;
  name: string;
  role: string;
  designation?: string;
  institution?: string;
  category: string;
  photo?: string;
  photoUrl?: string;
  image?: CloudinaryImage;
  order?: number;
  email?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ImportantDate {
  _id?: string;
  title: string;
  date: Date | string;
  deadline?: string;
  description?: string;
  status: "active" | "upcoming" | "completed" | "closed";
  order?: number;
  isActive?: boolean;
  icon?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MediaItem {
  _id?: string;
  title: string;
  mediaType: "image" | "video";
  url: string;
  public_id: string;
  thumbnailUrl?: string;
  category: string;
  eventYear: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  affiliation?: string;
  subject: string;
  message: string;
  status: "new" | "replied" | "archived";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SiteSettings {
  _id?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTheme: string;
  conferenceDate: string;
  conferenceVenue: string;
  conferenceMode: string;
  aboutText: string;
  contactEmail: string;
  contactAddress: string;
  registrationLink: string;
  brochureUrl?: string;
  countdownDate: string;
  showCountdown: boolean;
  updatedAt?: Date;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
