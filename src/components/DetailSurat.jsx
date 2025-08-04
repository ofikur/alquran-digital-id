import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { PlayCircleIcon, ChevronDownIcon, PlayIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const DAFTAR_QARI = [
    { id: '01', name: 'Abdullah Al-Juhany' },
    { id: '02', name: 'Abdul Muhsin Al-Qasim' },
    { id: '03', name: 'Abdurrahman as-Sudais' },
    { id: '04', name: 'Ibrahim Al-Dossari' },
    { id: '05', name: 'Misyari Rasyid Al-Afasi' },
];

const DetailSurat = () => {
  const { nomor } = useParams();
  const [detail, setDetail] = useState(null);
  const [tafsir, setTafsir] = useState(null);
  const [semuaSourat, setSemuaSurat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQari, setSelectedQari] = useState(DAFTAR_QARI[4]);
  const [playingAudio, setPlayingAudio] = useState(null);
  
  const [sidebarSearch, setSidebarSearch] = useState('');

  useEffect(() => {
    if (!nomor) {
      setLoading(false);
      return;
    }

    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      setPlayingAudio(null);
      document.documentElement.scrollTo(0, 0);
      try {
        const [resDetail, resTafsir, resSemuaSurat] = await Promise.all([
          axios.get(`/api/v2/surat/${nomor}`),
          axios.get(`/api/v2/tafsir/${nomor}`),
          axios.get('/api/v2/surat'),
        ]);
        setDetail(resDetail.data.data);
        setTafsir(resTafsir.data.data);
        setSemuaSurat(resSemuaSurat.data.data);
      } catch (err) {
        setError('Gagal mengambil data surat.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [nomor]);

  const filteredSuratSidebar = semuaSourat.filter(s => 
    s.namaLatin.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    s.nomor.toString().includes(sidebarSearch)
  );

  const handlePlayAyat = (ayat) => {
    const audioUrl = ayat.audio[selectedQari.id];
    setPlayingAudio({ title: `${detail.namaLatin} : Ayat ${ayat.nomorAyat}`, url: audioUrl });
  };

  const handlePlayFullSurah = () => {
    const audioUrl = detail.audioFull[selectedQari.id];
    setPlayingAudio({ title: `Full Surah ${detail.namaLatin}`, url: audioUrl });
  };
  
  if (loading) return <div className="flex justify-center items-center h-screen"><p>Memuat detail surat...</p></div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!detail || !tafsir) return <div className="text-center py-20 text-muted-foreground">Silakan pilih surat dari daftar untuk ditampilkan.</div>;

  return (
    <>
      <div className="container mx-auto px-4 py-8 pb-32">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="hidden lg:block w-full lg:w-1/3 lg:sticky lg:top-24 self-start">
            <div className="bg-card border border-border rounded-lg p-4 h-auto lg:max-h-[80vh] flex flex-col">
              <h2 className="font-semibold mb-4 text-foreground">Daftar Surat</h2>
              
              <div className="relative mb-4">
                <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari surat..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              
              <div className="space-y-2 overflow-y-auto">
                {filteredSuratSidebar.map(s => (
                  <Link to={`/surat/${s.nomor}`} key={s.nomor} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${ s.nomor == nomor ? 'bg-primary text-primary-foreground' : 'hover:bg-accent' }`}>
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm w-6 text-center ${s.nomor == nomor ? '' : 'text-muted-foreground'}`}>{s.nomor}</span>
                      <div>
                        <p className="font-medium">{s.namaLatin}</p>
                        <p className={`text-xs ${s.nomor == nomor ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{s.arti}</p>
                      </div>
                    </div>
                    <p className="font-arabic text-lg">{s.nama}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <main className="w-full lg:w-2/3">
            <div className="bg-card border border-border rounded-lg p-6 mb-6 text-center">
              <h1 className="text-3xl font-bold">{detail.namaLatin}</h1>
              <p className="text-xl font-arabic text-primary my-2">{detail.nama}</p>
              <p className="text-muted-foreground">{detail.arti}</p>
              <div className="text-sm text-muted-foreground my-4 flex justify-center items-center gap-4">
                <span>{detail.tempatTurun}</span>
                <span>&bull;</span>
                <span>{detail.jumlahAyat} Ayat</span>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
                <select 
                  value={selectedQari.id} 
                  onChange={(e) => setSelectedQari(DAFTAR_QARI.find(q => q.id === e.target.value))}
                  className="py-2 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  {DAFTAR_QARI.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
                </select>
                <button onClick={handlePlayFullSurah} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    <PlayCircleIcon className="h-5 w-5" />
                    <span>Putar Full Audio</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {detail.ayat.map((ayat) => (
                <div key={ayat.nomorAyat} className="bg-card border border-border p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="ayat-number font-bold text-sm">
                      {ayat.nomorAyat}
                    </span>
                    <button onClick={() => handlePlayAyat(ayat)} className="p-2 rounded-full hover:bg-accent transition-colors" aria-label="Putar audio ayat">
                        <PlayIcon className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </div>
                  <p className="text-right text-3xl font-arabic leading-loose mb-4">{ayat.teksArab}</p>
                  <p className="text-left text-primary/80 italic mb-2 text-sm">{ayat.teksLatin}</p>
                  <p className="text-left">{ayat.teksIndonesia}</p>
                  <details className="mt-4 group">
                      <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground list-none flex items-center gap-1">
                          Tafsir
                          <ChevronDownIcon className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="mt-2 text-sm text-muted-foreground border-l-2 border-primary pl-4">
                          {tafsir.tafsir.find(t => t.ayat === ayat.nomorAyat)?.teks || 'Tafsir tidak tersedia.'}
                      </div>
                  </details>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
                <Link to="/" className="text-primary hover:underline inline-block">&larr; Kembali ke Beranda</Link>
            </div>
          </main>
        </div>
      </div>
      
      {playingAudio && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
           <div className="container mx-auto">
             <div className="bg-card border border-border rounded-lg p-4 shadow-2xl flex items-center gap-4">
                <div>
                    <p className="text-sm font-semibold">{playingAudio.title}</p>
                    <p className="text-xs text-muted-foreground">Qari: {selectedQari.name}</p>
                </div>
                <audio key={playingAudio.url} controls autoPlay className="w-full">
                    <source src={playingAudio.url} type="audio/mpeg" />
                </audio>
                <button onClick={() => setPlayingAudio(null)} className="p-2 rounded-full hover:bg-accent transition-colors" aria-label="Tutup pemutar audio">
                    <XMarkIcon className="h-5 w-5 text-muted-foreground" />
                </button>
             </div>
           </div>
        </div>
      )}
    </>
  );
};

export default DetailSurat;