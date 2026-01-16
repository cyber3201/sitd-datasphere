
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ScrollToTop } from './components/ScrollToTop';

// Public Pages
import { Home } from './pages/Home';
import { Overview } from './pages/Overview';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Contact } from './pages/Contact';

// Protected Pages
import { SqlMastery } from './pages/SqlMastery';
import { SqlLesson } from './pages/SqlLesson';
import { DbDesign } from './pages/DbDesign';
import { DbDesignLesson } from './pages/DbDesignLesson';
import { DataManagement } from './pages/DataManagement';
import { DataManagementLesson } from './pages/DataManagementLesson';
import { DataGovernance } from './pages/DataGovernance';
import { DataGovernanceLesson } from './pages/DataGovernanceLesson';
import { DataGovernanceRaci } from './pages/DataGovernanceRaci';
import { DataProducts } from './pages/DataProducts';
import { DataProductsLesson } from './pages/DataProductsLesson';
import { DataProductCardTemplate } from './pages/DataProductCardTemplate';
import { OperatingModel } from './pages/OperatingModel';
import { OperatingModelLesson } from './pages/OperatingModelLesson';
import { PgPlayground } from './pages/PgPlayground';
import { ResourcesPage } from './pages/ResourcesPage';
import { Profile } from './pages/Profile';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected Routes */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            
            <Route path="/sql-mastery" element={<ProtectedRoute><SqlMastery /></ProtectedRoute>} />
            <Route path="/sql-mastery/:lessonSlug" element={<ProtectedRoute><SqlLesson /></ProtectedRoute>} />

            <Route path="/db-design" element={<ProtectedRoute><DbDesign /></ProtectedRoute>} />
            <Route path="/db-design/:lessonSlug" element={<ProtectedRoute><DbDesignLesson /></ProtectedRoute>} />
            
            <Route path="/data-management" element={<ProtectedRoute><DataManagement /></ProtectedRoute>} />
            <Route path="/data-management/:lessonSlug" element={<ProtectedRoute><DataManagementLesson /></ProtectedRoute>} />

            <Route path="/data-governance" element={<ProtectedRoute><DataGovernance /></ProtectedRoute>} />
            <Route path="/data-governance/templates/raci" element={<ProtectedRoute><DataGovernanceRaci /></ProtectedRoute>} />
            <Route path="/data-governance/:lessonSlug" element={<ProtectedRoute><DataGovernanceLesson /></ProtectedRoute>} />

            <Route path="/data-products" element={<ProtectedRoute><DataProducts /></ProtectedRoute>} />
            <Route path="/data-products/templates/data-product-card" element={<ProtectedRoute><DataProductCardTemplate /></ProtectedRoute>} />
            <Route path="/data-products/:lessonSlug" element={<ProtectedRoute><DataProductsLesson /></ProtectedRoute>} />

            <Route path="/operating-model" element={<ProtectedRoute><OperatingModel /></ProtectedRoute>} />
            <Route path="/operating-model/:lessonSlug" element={<ProtectedRoute><OperatingModelLesson /></ProtectedRoute>} />

            <Route path="/pg-playground" element={<ProtectedRoute><PgPlayground /></ProtectedRoute>} />
            <Route path="/ressources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
