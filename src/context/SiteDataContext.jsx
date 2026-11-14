import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { publicApi } from '../lib/api';
import { FALLBACK_SECTIONS, FALLBACK_SERVICES } from '../data/fallbackSiteData';

const SYNC_CHANNEL = 'sportsaal_cms_sync';
const SYNC_STORAGE_KEY = 'sportsaal_cms_last_updated';

export function broadcastCmsUpdate() {
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const ch = new BroadcastChannel(SYNC_CHANNEL);
      ch.postMessage({ updatedAt: Date.now() });
      ch.close();
    }
    localStorage.setItem(SYNC_STORAGE_KEY, String(Date.now()));
  } catch {
    // Ignore storage/broadcast unavailability
  }
}

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
  const lastFetchAtRef = useRef(0);

  const refreshSiteData = useCallback(async () => {
    lastFetchAtRef.current = Date.now();
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

  // Keep public site synchronized across browser tabs & when returning focus from Admin
  useEffect(() => {
    let ch = null;
    if (typeof BroadcastChannel !== 'undefined') {
      ch = new BroadcastChannel(SYNC_CHANNEL);
      ch.onmessage = () => refreshSiteData();
    }

    const onStorage = (e) => {
      if (e.key === SYNC_STORAGE_KEY) {
        refreshSiteData();
      }
    };

    const onVisibleOrFocus = () => {
      if (document.visibilityState === 'visible' && Date.now() - lastFetchAtRef.current > 2000) {
        refreshSiteData();
      }
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onVisibleOrFocus);
    document.addEventListener('visibilitychange', onVisibleOrFocus);

    return () => {
      if (ch) ch.close();
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onVisibleOrFocus);
      document.removeEventListener('visibilitychange', onVisibleOrFocus);
    };
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

