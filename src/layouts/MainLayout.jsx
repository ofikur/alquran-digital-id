import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import BackToTopButton from '../components/BackToTopButton.jsx';

const MainLayout = ({ children }) => {
  return (
    <div className="bg-background min-h-screen text-foreground font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default MainLayout;