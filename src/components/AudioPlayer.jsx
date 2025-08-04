import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ChevronDownIcon, MusicalNoteIcon, SignalIcon } from '@heroicons/react/24/outline';

const QARI_LIST = [
  { id: 'Abdullah-Al-Juhany', name: 'Abdullah Al-Juhany', image: '/images/Abdullah-Al-Juhany.png' },
  { id: 'Abdul-Muhsin-Al-Qasim', name: 'Abdul Muhsin Al-Qasim', image: '/images/Abdul-Muhsin-Al-Qasim.png' },
  { id: 'Abdurrahman-as-Sudais', name: 'Abdurrahman as-Sudais', image: '/images/Abdurrahman-as-Sudais.png' },
  { id: 'Ibrahim-Al-Dossari', name: 'Ibrahim Al-Dossari', image: '/images/Ibrahim-Al-Dossari.png' },
  { id: 'Misyari-Rasyid-Al-Afasi', name: 'Misyari Rasyid Al-Afasi', image: '/images/Misyari-Rasyid-Al-Afasi.png' },
];

const AudioPlayer = () => {
  const [semuaSourat, setSemuaSurat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQari, setSelectedQari] = useState(QARI_LIST[4]);
  const [playingSurah, setPlayingSurah] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const response = await axios.get('/api/v2/surat');
        setSemuaSurat(response.data.data);
      } catch (error) {
        console.error("Gagal memuat daftar surat", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurat();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatSurahNumber = (num) => num.toString().padStart(3, '0');

  const audioUrl = playingSurah
    ? `https://equran.nos.wjv-1.neo.id/audio-full/${selectedQari.id}/${formatSurahNumber(playingSurah.nomor)}.mp3`
    : '';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Audio Player</h1>
        <p className="text-muted-foreground mt-2">Dengarkan tilawah Al-Quran dari 5 qari terbaik dunia.</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/3">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <img 
              src={selectedQari.image} 
              alt={selectedQari.name} 
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary"
            />
            <p className="font-semibold text-xl mt-4">{selectedQari.name}</p>
            <div className="border-t border-border my-6"></div>
            <h3 className="font-semibold text-lg mb-4">Ganti Qari</h3>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex justify-between items-center py-2 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <span className="text-foreground">{selectedQari.name}</span>
                <ChevronDownIcon className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute bottom-full mb-2 w-full bg-card border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {QARI_LIST.map(qari => (
                    <button
                      key={qari.id}
                      onClick={() => {
                        setSelectedQari(qari);
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent"
                    >
                      {qari.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        <main className="w-full lg:w-2/3">
          <div className="bg-card border border-border rounded-lg p-4">
            {playingSurah && (
              <div className="mb-6 p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Sedang Memutar:</p>
                <h2 className="text-xl font-semibold">{playingSurah.namaLatin}</h2>
                <p className="text-sm text-muted-foreground">Qari: {selectedQari.name}</p>
                <audio key={audioUrl} controls autoPlay className="w-full mt-4">
                  <source src={audioUrl} type="audio/mpeg" />
                  Browser Anda tidak mendukung elemen audio.
                </audio>
              </div>
            )}
            
            <div className="px-2 pb-4 mb-2 border-b border-border">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-semibold text-foreground">Daftar Surat Al-Quran</h2>
                    </div>
                    <div className="bg-muted text-muted-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <SignalIcon className="h-3 w-3" />
                        <span>114 Surat</span>
                    </div>
                </div>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto space-y-3 p-2">
              {loading ? <p className="text-center p-4">Memuat daftar surat...</p> : semuaSourat.map(surah => (
                <button
                  key={surah.nomor}
                  onClick={() => setPlayingSurah(surah)}
                  className="w-full block group"
                >
                  <div className="bg-card border border-border rounded-lg p-4 transition-all duration-300 hover:border-primary hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-muted text-muted-foreground rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {surah.nomor}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-left">{surah.namaLatin}</p>
                          <p className="text-sm text-muted-foreground text-left">{surah.arti}</p>
                        </div>
                      </div>
                      <p className="text-2xl font-arabic text-primary">{surah.nama}</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border flex items-center space-x-4">
                      <span>{surah.tempatTurun}</span>
                      <span>&bull;</span>
                      <span>{surah.jumlahAyat} Ayat</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default AudioPlayer;