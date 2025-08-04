import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, MapPinIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const DaftarSurat = () => {
  const [semuaSourat, setSemuaSurat] = useState([]);
  const [suratTampil, setSuratTampil] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const response = await axios.get('/api/v2/surat');
        setSemuaSurat(response.data.data);
        setSuratTampil(response.data.data);
      } catch (err) {
        setError('Gagal memuat data surat.');
      } finally {
        setLoading(false);
      }
    };
    fetchSurat();
  }, []);

  useEffect(() => {
    const hasilFilter = semuaSourat.filter(surat =>
      surat.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surat.arti.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surat.nomor.toString().includes(searchTerm)
    );
    setSuratTampil(hasilFilter);
  }, [searchTerm, semuaSourat]);

  if (loading) return <div className="text-center py-20">Memuat data...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">114 Surat Al-Qur'an</h1>
        <p className="text-muted-foreground mt-2">Baca, dengar, dan pelajari Al-Qur'an dengan mudah.</p>
        <div className="relative mt-4 max-w-lg mx-auto">
          <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari surat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {suratTampil.map((s) => (
          <Link to={`/surat/${s.nomor}`} key={s.nomor} className="block group">
            <div className="bg-card border border-border rounded-lg p-5 h-full flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg">
              <div className="flex-grow flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 relative w-12 h-12">
                      <svg viewBox="0 0 100 100" className="w-full h-full transition-colors duration-300 fill-muted group-hover:fill-primary stroke-primary">
                        <path d="M50 0 L85.35 14.65 L100 50 L85.35 85.35 L50 100 L14.65 85.35 L0 50 L14.65 14.65 Z" strokeWidth="3"/>
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-lg text-foreground transition-colors duration-300 group-hover:text-primary-foreground">{s.nomor}</span>
                    </div>
                  <div>
                    <p className="font-semibold text-lg text-foreground">{s.namaLatin}</p>
                    <p className="text-sm text-muted-foreground">{s.arti}</p>
                  </div>
                </div>
                <p className="text-2xl font-arabic text-primary self-start">{s.nama}</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{s.tempatTurun}</span>
                </div>
                <div className="flex items-center gap-2 text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                    <DocumentTextIcon className="h-4 w-4" />
                    <span>{s.jumlahAyat} Ayat</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DaftarSurat;