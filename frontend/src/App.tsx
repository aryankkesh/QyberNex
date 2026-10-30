import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { apiService, ReadinessResponse, RegisteredService } from './services/api';

export const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('cyberdesk');
  const [systemStatus, setSystemStatus] = useState<'healthy' | 'degraded' | 'unavailable' | 'loading'>('loading');
  const [readiness, setReadiness] = useState<ReadinessResponse | null>(null);
  const [services, setServices] = useState<RegisteredService[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchPlatformMetrics = useCallback(async () => {
    try {
      setSystemStatus((prev) => (prev === 'loading' ? 'loading' : prev));

      const [readinessData, servicesData] = await Promise.all([
        apiService.getReadiness().catch(() => null),
        apiService.getServices().catch(() => ({ total: 0, services: [] }))
      ]);

      if (readinessData) {
        setReadiness(readinessData);
        setSystemStatus(readinessData.status === 'ready' ? 'healthy' : 'degraded');
      } else {
        setSystemStatus('unavailable');
      }

      if (servicesData && servicesData.services) {
        setServices(servicesData.services);
      }

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching platform status:', error);
      setSystemStatus('unavailable');
    }
  }, []);

  useEffect(() => {
    fetchPlatformMetrics();
    const interval = setInterval(fetchPlatformMetrics, 30000); // 30s auto refresh
    return () => clearInterval(interval);
  }, [fetchPlatformMetrics]);

  return (
    <div className="flex h-screen bg-[#0A0E1A] overflow-hidden text-slate-100 font-sans">
      {/* Navigation Sidebar */}
      <Sidebar
        activeModule={activeModule}
        onSelectModule={(id) => setActiveModule(id)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          systemStatus={systemStatus}
          lastUpdated={lastUpdated}
          onRefresh={fetchPlatformMetrics}
        />

        <main className="flex-1">
          <Dashboard
            readiness={readiness}
            services={services}
            activeModule={activeModule}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
