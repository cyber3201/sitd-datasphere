
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { NavItem } from '../types';
import { SearchBar } from './SearchBar';
import { useAuth } from '../contexts/AuthContext';

const NAV_ITEMS: NavItem[] = [
  { label: 'SQL Mastery', path: '/sql-mastery' },
  { 
    label: 'Data', 
    path: '#', // Abstract parent path
    children: [
      { label: 'DB Design', path: '/db-design' },
      { label: 'Management', path: '/data-management' },
      { label: 'Governance', path: '/data-governance' },
      { label: 'Products', path: '/data-products' },
      { label: 'Op Model', path: '/operating-model' },
    ]
  },
  { label: 'Practise SQL', path: '/pg-playground' },
  { label: 'Ressources', path: '/ressources' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  
  // Desktop Dropdown State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // User Menu State
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Mobile Accordion State
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setIsUserMenuOpen(false);
  }, [location]);

  // Global Keyboard shortcut for Esc to close dropdowns
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsUserMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Desktop Dropdown Handlers
  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const isParentActive = (item: NavItem) => {
    if (item.children) {
      return item.children.some(child => location.pathname.startsWith(child.path));
    }
    return location.pathname.startsWith(item.path) || (item.path === '/' && location.pathname === '/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dg-cream border-b border-dg-blue/10 shadow-sm h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo Area */}
        <NavLink to="/" className="flex items-center mr-6 hover:opacity-80 transition-opacity" aria-label="DataSphere Home">
          <img 
            src="https://i.postimg.cc/jjDJcspx/datasphere.png" 
            alt="DataSphere logo" 
            className="h-10 w-auto object-contain" 
          />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 flex-grow">
          {NAV_ITEMS.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isActive = isParentActive(item);

            if (hasChildren) {
              return (
                <div 
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md
                      ${isActive 
                        ? 'text-dg-blue font-semibold bg-dg-blue/5' 
                        : 'text-gray-600 hover:text-dg-blue hover:bg-dg-blue/5'
                      }
                    `}
                    aria-expanded={activeDropdown === item.label}
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown 
                      size={14} 
                      className={`ml-1 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {/* Desktop Dropdown Menu */}
                  {activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-dg-blue/10 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.children?.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 text-sm transition-colors hover:bg-dg-blue/5
                            ${isActive 
                              ? 'text-dg-blue font-semibold bg-dg-blue/5' 
                              : 'text-gray-700'
                            }`
                          }
                          onClick={() => setActiveDropdown(null)}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'} 
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors rounded-md relative whitespace-nowrap
                  ${isActive 
                    ? 'text-dg-blue font-semibold bg-dg-blue/5' 
                    : 'text-gray-600 hover:text-dg-blue hover:bg-dg-blue/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Desktop Search Bar (Inline) */}
          <div className="hidden lg:block w-48 xl:w-64">
            <SearchBar />
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3 pl-2 border-l border-dg-blue/10">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-dg-blue/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-dg-mint text-dg-blue font-bold flex items-center justify-center text-sm border border-dg-blue/10">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={14} className="text-dg-muted" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-dg-blue/10 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-bold text-dg-blue truncate">{user.fullName}</p>
                      <p className="text-xs text-dg-muted truncate">{user.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-dg-blue/5 hover:text-dg-blue transition-colors">
                      <LayoutDashboard size={16} className="mr-2" /> Profil
                    </Link>
                    <button 
                      onClick={logout}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={16} className="mr-2" /> Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-dg-blue hover:bg-dg-blue/5 rounded-lg transition-colors">
                  Se connecter
                </Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-bold text-white bg-dg-blue hover:bg-blue-900 rounded-lg transition-colors shadow-sm">
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-dg-blue hover:bg-dg-blue/5 rounded-md focus:outline-none focus:ring-2 focus:ring-dg-blue"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-dg-cream border-b border-dg-blue/10 shadow-lg animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col py-4 px-4 space-y-1">
            
            {/* Mobile Auth (Top) */}
            <div className="mb-4 pb-4 border-b border-dg-blue/5">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-dg-mint text-dg-blue font-bold flex items-center justify-center text-lg border border-dg-blue/10">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dg-blue">{user.fullName}</p>
                      <p className="text-xs text-dg-muted">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/profile" className="flex items-center w-full px-4 py-3 bg-dg-blue/5 rounded-lg text-dg-blue font-semibold">
                    <LayoutDashboard size={18} className="mr-2" /> Mon Profil
                  </Link>
                  <button onClick={logout} className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium">
                    <LogOut size={18} className="mr-2" /> Déconnexion
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/login" className="flex justify-center items-center px-4 py-3 text-sm font-semibold text-dg-blue bg-white border border-dg-blue/10 rounded-lg">
                    Se connecter
                  </Link>
                  <Link to="/signup" className="flex justify-center items-center px-4 py-3 text-sm font-bold text-white bg-dg-blue rounded-lg">
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Search */}
            <div className="mb-4 pb-4 border-b border-dg-blue/5">
              <SearchBar 
                placeholder="Rechercher..." 
                onNavigate={() => setIsMenuOpen(false)}
              />
            </div>

            {NAV_ITEMS.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedMobileItem === item.label;
              const isActiveParent = isParentActive(item);

              if (hasChildren) {
                return (
                  <div key={item.label} className="border-b border-dg-blue/5 last:border-0">
                    <button
                      onClick={() => setExpandedMobileItem(isExpanded ? null : item.label)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-md text-base font-medium transition-colors
                        ${isActiveParent ? 'text-dg-blue' : 'text-gray-700'}
                      `}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        size={18} 
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    
                    {isExpanded && (
                      <div className="bg-white/50 rounded-lg mb-2 overflow-hidden animate-in slide-in-from-top-2">
                        {item.children?.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              `flex items-center px-8 py-3 text-sm font-medium transition-colors border-l-2
                              ${isActive 
                                ? 'text-dg-blue border-dg-blue bg-dg-blue/5' 
                                : 'text-gray-600 border-transparent hover:text-dg-blue'
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-md text-base font-medium transition-colors border-b border-dg-blue/5 last:border-0
                    ${isActive 
                      ? 'bg-dg-blue/10 text-dg-blue border-l-4 border-dg-blue border-b-0' 
                      : 'text-gray-700 hover:bg-black/5'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
