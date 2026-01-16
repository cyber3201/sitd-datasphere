
export interface User {
  id: string;
  fullName: string;
  email: string;
  school?: string;
  city?: string;
  password?: string; // Stored insecurely for frontend-demo only
}

export interface HistoryItem {
  title: string;
  slug: string;
  path: string;
  timestamp: number;
}

const USER_KEY = 'datasphere_user'; // Registered user data
const SESSION_KEY = 'datasphere_session'; // Active session flag
const HISTORY_KEY = 'datasphere_history';

export const authAPI = {
  register: (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: crypto.randomUUID() };
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    // Auto login after register
    localStorage.setItem(SESSION_KEY, 'true');
    return newUser;
  },

  login: (email: string, password: string): User | null => {
    const stored = localStorage.getItem(USER_KEY);
    if (!stored) return null;
    
    const user = JSON.parse(stored) as User;
    if (user.email === email && user.password === password) {
      localStorage.setItem(SESSION_KEY, 'true');
      return user;
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser: (): User | null => {
    const isSessionActive = localStorage.getItem(SESSION_KEY) === 'true';
    if (!isSessionActive) return null;
    
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  updateUser: (updatedData: Partial<User>): User | null => {
    const currentUser = authAPI.getCurrentUser();
    if (!currentUser) return null;

    const newUser = { ...currentUser, ...updatedData };
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    return newUser;
  },

  addToHistory: (item: HistoryItem) => {
    const raw = localStorage.getItem(HISTORY_KEY);
    let history: HistoryItem[] = raw ? JSON.parse(raw) : [];
    
    // Remove duplicate if exists (move to top)
    history = history.filter(h => h.path !== item.path);
    
    // Add to top
    history.unshift(item);
    
    // Keep last 20
    if (history.length > 20) history = history.slice(0, 20);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  },

  getHistory: (): HistoryItem[] => {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  }
};
