import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import OrganizationProfile from './pages/OrganizationProfile';
import ScenarioDetail from './pages/ScenarioDetail';
import TeamMemberDetail from './pages/TeamMemberDetail';
import Victory from './pages/Victory';
import { GameProvider } from './context/GameContext';

// Connect Activities
import ActivityPhishing from './pages/ActivityPhishing';
import ActivityPassword from './pages/ActivityPassword';
import ActivityDevice from './pages/ActivityDevice';

// Absorb Activities
import ActivityAbsorbSlideshow from './pages/ActivityAbsorbSlideshow';
import ActivityAbsorbVideo from './pages/ActivityAbsorbVideo';
import ActivityAbsorbScenarios from './pages/ActivityAbsorbScenarios';

// Do Activities
import ActivityDoFlashcards from './pages/ActivityDoFlashcards';
import ActivityDoSimulation from './pages/ActivityDoSimulation';
import ActivityDoSorting from './pages/ActivityDoSorting';

const App: React.FC = () => {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="org-profile" element={<OrganizationProfile />} />
            <Route path="scenario/:id" element={<ScenarioDetail />} />
            <Route path="team/:id" element={<TeamMemberDetail />} />
            <Route path="victory" element={<Victory />} />
            
            {/* Absorb Routes */}
            <Route path="demo/onboarding-slides" element={<ActivityAbsorbSlideshow />} />
            <Route path="demo/roleplay-video" element={<ActivityAbsorbVideo />} />
            <Route path="demo/written-scenarios" element={<ActivityAbsorbScenarios />} />
            
            {/* Do Routes */}
            <Route path="demo/flashcards" element={<ActivityDoFlashcards />} />
            <Route path="demo/conversation-sim" element={<ActivityDoSimulation />} />
            <Route path="demo/scenario-sorting" element={<ActivityDoSorting />} />

            {/* Connect Routes */}
            <Route path="demo/phishing" element={<ActivityPhishing />} />
            <Route path="demo/password" element={<ActivityPassword />} />
            <Route path="demo/device" element={<ActivityDevice />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </GameProvider>
  );
};

export default App;