import { Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import PriceList from './components/PriceList';
import Contact from './components/Contact';
import './utils/i18n';

const App = () => {
  return (
    <Suspense fallback="Loading...">
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Gallery />
        <PriceList />
        <Contact />
      </main>
      <footer className="bg-gray-900 text-white py-6 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <p>© {new Date().getFullYear()} UCU INN - Guest Rooms UCU</p>
        </div>
      </footer>
    </Suspense>
  );
};

export default App;
