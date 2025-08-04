import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-foreground">QuranDigital</h3>
            <p className="text-sm text-muted-foreground">
              Jelajahi keindahan Al-Quran melalui platform digital yang intuitif. Dilengkapi dengan terjemahan Indonesia, tafsir mendalam, audio murottal dari qari pilihan, dan kumpulan doa harian untuk menemani ibadah Anda.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Navigasi</h3>
            <ul className="space-y-1">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Beranda</Link></li>
              <li><Link to="/doa" className="text-sm text-muted-foreground hover:text-primary transition-colors">Doa</Link></li>
              <li><Link to="/audio-player" className="text-sm text-muted-foreground hover:text-primary transition-colors">Audio Player</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Sumber</h3>
            <ul className="space-y-1">
              <li>
                <a 
                  href="https://equran.id" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  API by equran.id
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p className="text-center md:text-left mb-2 md:mb-0">
            &copy; 2025 Quran Digital ID ── Dibuat dengan ❤️ untuk Muslim Indonesia.
          </p>
          <p className="font-medium">
            Web Version 1.0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;