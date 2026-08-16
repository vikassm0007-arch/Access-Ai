import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BackgroundStateProvider } from '@/context/BackgroundStateContext';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { BackgroundSystem } from '@/components/background';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import { LandingPage } from '@/pages/LandingPage';
import { WorkspacePage } from '@/pages/WorkspacePage';
import { AnalyzerPage } from '@/pages/AnalyzerPage';
import { RecommendationsPage } from '@/pages/RecommendationsPage';
import { AccessibilityPage } from '@/pages/AccessibilityPage';
import { InsightsPage } from '@/pages/InsightsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <BackgroundStateProvider>
        <AccessibilityProvider>
          {/* Reactive Backdrop System */}
          <BackgroundSystem />

          {/* Main App Layout Shell */}
          <div className="relative min-h-screen flex flex-col justify-between selection:bg-cyan-500 selection:text-white">
            <div>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/workspace" element={<WorkspacePage />} />
                  <Route path="/analyze" element={<AnalyzerPage />} />
                  <Route path="/recommendations" element={<RecommendationsPage />} />
                  <Route path="/accessibility" element={<AccessibilityPage />} />
                  <Route path="/insights" element={<InsightsPage />} />
                </Routes>
              </main>
            </div>
            <Footer />
          </div>
        </AccessibilityProvider>
      </BackgroundStateProvider>
    </BrowserRouter>
  );
};

export default App;
