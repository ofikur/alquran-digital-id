import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, ChevronDownIcon, TagIcon } from '@heroicons/react/24/outline';

const DaftarDoa = () => {
  const [semuaDoa, setSemuaDoa] = useState([]);
  const [doaTampil, setDoaTampil] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Semua Kategori');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchDoa = async () => {
      try {
        const response = await axios.get('/api/doa');
        setSemuaDoa(response.data.data);
        setDoaTampil(response.data.data);
      } catch (err) {
        console.error("Gagal memuat data doa", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoa();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const groups = useMemo(() => {
    const groupSet = new Set(semuaDoa.map(d => d.grup));
    return ['Semua Kategori', ...Array.from(groupSet)];
  }, [semuaDoa]);

  useEffect(() => {
    let filteredDoa = semuaDoa;
    if (selectedGroup !== 'Semua Kategori') {
      filteredDoa = filteredDoa.filter(d => d.grup === selectedGroup);
    }
    if (searchTerm) {
      filteredDoa = filteredDoa.filter(d =>
        d.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.idn.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setDoaTampil(filteredDoa);
  }, [searchTerm, selectedGroup, semuaDoa]);

  if (loading) return <div className="text-center py-20">Memuat Kumpulan Doa...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Kumpulan Doa Harian</h1>
        <p className="text-muted-foreground mt-2">Temukan doa untuk setiap kesempatan dalam hidupmu.</p>
        <div className="mt-4 max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Cari doa..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative w-full md:w-64" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex justify-between items-center py-2 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span className="text-foreground">{selectedGroup}</span>
              <ChevronDownIcon className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {groups.map(g => (
                  <button
                    key={g}
                    onClick={() => {
                      setSelectedGroup(g);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent"
                  >
                    {g}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doaTampil.map((d) => (
          <Link to={`/doa/${d.id}`} key={d.id} className="block group bg-card border border-border rounded-lg p-6 flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg">
            <div className="flex-grow">
              <p className="text-xs text-primary font-semibold mb-1">{d.grup}</p>
              <h3 className="font-bold text-lg text-foreground mb-3">{d.nama}</h3>
              <p className="text-sm text-muted-foreground italic line-clamp-3">
                &quot;{d.idn}&quot;
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <TagIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="flex items-center gap-1.5">
                        {d.tag.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
                <span className="text-sm text-primary font-semibold group-hover:underline">
                    Baca &rarr;
                </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default DaftarDoa;