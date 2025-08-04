import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import DaftarSurat from './components/DaftarSurat.jsx';
import DetailSurat from './components/DetailSurat.jsx';
import DaftarDoa from './components/DaftarDoa.jsx';
import DetailDoa from './components/DetailDoa.jsx';
import AudioPlayer from './components/AudioPlayer.jsx';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DaftarSurat />} />
          <Route path="/surat/:nomor" element={<DetailSurat />} />
          <Route path="/doa" element={<DaftarDoa />} />
          <Route path="/doa/:id" element={<DetailDoa />} />
          <Route path="/audio-player" element={<AudioPlayer />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;