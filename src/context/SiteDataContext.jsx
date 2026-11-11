import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { publicApi } from '../lib/api';
import { FALLBACK_SECTIONS, FALLBACK_SERVICES } from '../data/fallbackSiteData';

const SiteDataContext = createContext({
  sections: FALLBACK_SECTIONS,
  services: FALLBACK_SERVICES,
  isBackendConnected: false,
  isHydrated: false,
  refreshSiteData: async () => {},
});

export function SiteDataProvider({ children }) {
  const [sections, setSections] = useState(FALLBACK_SECTIONS);
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const refreshSiteData = useCallback(async () => {
    try {
      const data = await publicApi.getBootstrap();
      if (data?.sections && Object.keys(data.sections).length > 0) {
        setSections((prev) => ({ ...prev, ...data.sections }));
      }
      if (Array.isArray(data?.services)) {
        setServices(data.services);
      }
      setIsBackendConnected(true);
    } catch {
      // Keep fallback data silently if PostgreSQL/API isn't started yet
      setIsBackendConnected(false);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    refreshSiteData();
  }, [refreshSiteData]);

  return (
    <SiteDataContext.Provider
      value={{
        sections,
        services,
        isBackendConnected,
        isHydrated,
        refreshSiteData,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
