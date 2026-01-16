
import { User } from './auth';

export interface ProfileLink {
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface ProfilePreferences {
  role?: string;
  openToWork: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export interface UserProfile {
  userId: string;
  avatar?: string; // Base64 string
  headline?: string; // "Data Scientist @ X"
  location?: string;
  links: ProfileLink;
  preferences: ProfilePreferences;
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
}

const PROFILE_KEY = 'datasphere_user_profile_v1';

export const profileAPI = {
  // Get profile for a specific user ID
  getProfile: (userId: string): UserProfile => {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      const allProfiles: Record<string, UserProfile> = raw ? JSON.parse(raw) : {};
      
      // Return existing or default empty profile
      return allProfiles[userId] || {
        userId,
        links: {},
        preferences: { openToWork: true, role: 'Data Scientist (Entry-level)' },
        experiences: [],
        educations: [],
        projects: []
      };
    } catch (e) {
      console.error("Error loading profile", e);
      return { userId, links: {}, preferences: { openToWork: true }, experiences: [], educations: [], projects: [] };
    }
  },

  // Save or Update profile
  saveProfile: (profile: UserProfile) => {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      const allProfiles: Record<string, UserProfile> = raw ? JSON.parse(raw) : {};
      
      allProfiles[profile.userId] = profile;
      localStorage.setItem(PROFILE_KEY, JSON.stringify(allProfiles));
      return profile;
    } catch (e) {
      console.error("Error saving profile", e);
      return null;
    }
  },

  // Helper to generate IDs
  generateId: () => Math.random().toString(36).substr(2, 9)
};
