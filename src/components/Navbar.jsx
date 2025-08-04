import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { SunIcon, MoonIcon, HomeIcon, BookOpenIcon, SpeakerWaveIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const desktopLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
    }`;

  const mobileLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
    }`;

  return (
    <>
      <nav className="bg-background/80 backdrop-blur-lg sticky top-0 z-50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-foreground">Qur'an Digital ID</span>
            </NavLink>

            <div className="hidden md:flex items-center space-x-2">
              <NavLink to="/" className={desktopLinkStyle}><HomeIcon className="h-5 w-5" /><span>Beranda</span></NavLink>
              <NavLink to="/doa" className={desktopLinkStyle}><BookOpenIcon className="h-5 w-5" /><span>Doa</span></NavLink>
              <NavLink to="/audio-player" className={desktopLinkStyle}><SpeakerWaveIcon className="h-5 w-5" /><span>Audio Player</span></NavLink>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-accent" aria-label="Toggle theme">
                {theme === 'dark' ? <SunIcon className="h-6 w-6 text-muted-foreground" /> : <MoonIcon className="h-6 w-6 text-muted-foreground" />}
              </button>
              
              <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-full hover:bg-accent md:hidden" aria-label="Buka menu">
                <Bars3Icon className="h-6 w-6 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        <div className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-card shadow-lg p-6 flex flex-col`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-lg">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full hover:bg-accent" aria-label="Tutup menu">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-3">
            <NavLink to="/" className={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}><HomeIcon className="h-5 w-5" /><span>Beranda</span></NavLink>
            <NavLink to="/doa" className={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}><BookOpenIcon className="h-5 w-5" /><span>Doa</span></NavLink>
            <NavLink to="/audio-player" className={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}><SpeakerWaveIcon className="h-5 w-5" /><span>Audio Player</span></NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;