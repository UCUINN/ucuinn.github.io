import { Suspense, useLayoutEffect, lazy } from 'react';
import Header from './components/Header';
const Hero = lazy(() => import('./components/Hero'));
import Location from './components/Location';
const Gallery = lazy(() => import('./components/Gallery'));
const Room = lazy(() => import('./components/Room'));
const PriceList = lazy(() => import('./components/PriceList'));
const Additional = lazy(() => import('./components/Additional'));
const Booking = lazy(() => import('./components/Booking'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

import ErrorBoundary from './components/ErrorBoundary';
import { usePreventScroll } from './hooks/usePreventScroll';
import './index.css'

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600" />
  </div>
);

const App = () => {
  usePreventScroll();
  useLayoutEffect(() => {
    // Add effect logic here if needed
  }, []); // Added empty dependency array

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
        <main className="min-h-screen pt-16">
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>
          <ErrorBoundary>
            <Room />
          </ErrorBoundary>
          <ErrorBoundary>
            <Location />
          </ErrorBoundary>
          <ErrorBoundary>
            <Gallery />
          </ErrorBoundary>
          <ErrorBoundary>
            <PriceList />
          </ErrorBoundary>
          <ErrorBoundary>
            <Additional />
          </ErrorBoundary>
          <ErrorBoundary>
            <Booking />
          </ErrorBoundary>
          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        </main>
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;