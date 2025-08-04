import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpenIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const DetailDoa = () => {
  const { id } = useParams();
  const [doa, setDoa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetailDoa = async () => {
      setLoading(true);
      document.documentElement.scrollTo(0, 0);
      try {
        const response = await axios.get(`/api/doa/${id}`);
        setDoa(response.data.data);
      } catch (err) {
        setError('Gagal memuat detail doa.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetailDoa();
  }, [id]);

  if (loading) return <div className="text-center py-20">Memuat Doa...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!doa) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <p className="text-primary font-semibold">{doa.grup}</p>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mt-1">{doa.nama}</h1>
      </div>

      <div className="space-y-6">
        
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-semibold text-lg mb-4 text-center text-muted-foreground">Teks Arab</h2>
          <p className="text-center text-4xl font-arabic leading-loose text-foreground">{doa.ar}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-semibold text-lg mb-4 text-center text-muted-foreground">Transliterasi</h2>
          <p className="text-center italic text-muted-foreground">{doa.tr}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-semibold text-lg mb-4 text-center text-muted-foreground">Terjemahan</h2>
          <p className="text-center text-foreground leading-relaxed">{doa.idn}</p>
        </div>

        {doa.tentang && (
          <div className="bg-card border border-border rounded-lg p-6">
             <div className="flex items-center gap-3 mb-4">
                <InformationCircleIcon className="h-6 w-6 text-primary"/>
                <h2 className="font-semibold text-lg text-foreground">Keterangan & Sumber</h2>
            </div>
            <div className="text-sm text-muted-foreground whitespace-pre-line border-l-2 border-primary pl-4">
                {doa.tentang}
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <Link to="/doa" className="text-primary hover:underline">&larr; Kembali ke Daftar Doa</Link>
      </div>
    </div>
  );
};

export default DetailDoa;