/**
 * Custom hook that keeps Admin in-progress edits safe in sessionStorage
 * across accidental reloads, plus attaches a beforeunload warning when dirty.
 */
import { useState, useEffect, useCallback, useRef } from 'react';

const DRAFT_PREFIX = 'sportsaal_admin_draft_';

export function useDraftState(draftKey, serverData) {
  const storageKey = `${DRAFT_PREFIX}${draftKey}`;
  const initializedKeyRef = useRef('');

  const [value, setValue] = useState(serverData);
  const [hasRecoveredDraft, setHasRecoveredDraft] = useState(false);

  // Sync from serverData or recover existing draft when draftKey / serverData changes
  useEffect(() => {
    if (serverData === undefined || serverData === null) return;

    const fullId = `${storageKey}`;
    const serializedServer = JSON.stringify(serverData);

    try {
      const savedRaw = sessionStorage.getItem(storageKey);
      if (savedRaw) {
        const parsed = JSON.parse(savedRaw);
        if (JSON.stringify(parsed) !== serializedServer) {
          setValue(parsed);
          setHasRecoveredDraft(true);
          initializedKeyRef.current = fullId;
          return;
        } else {
          sessionStorage.removeItem(storageKey);
        }
      }
    } catch {
      // Ignore storage parse issues
    }

    setValue(serverData);
    setHasRecoveredDraft(false);
    initializedKeyRef.current = fullId;
  }, [storageKey, serverData]);

  const isDirty =
    serverData !== undefined &&
    serverData !== null &&
    JSON.stringify(value) !== JSON.stringify(serverData);

  // Persist dirty edits in sessionStorage immediately
  useEffect(() => {
    if (!storageKey || serverData === undefined || serverData === null) return;
    try {
      if (isDirty) {
        sessionStorage.setItem(storageKey, JSON.stringify(value));
      } else {
        sessionStorage.removeItem(storageKey);
        setHasRecoveredDraft(false);
      }
    } catch {
      // Ignore quota errors
    }
  }, [storageKey, value, isDirty, serverData]);

  // Warn user on accidental reload / close if unsaved changes exist
  useEffect(() => {
    if (!isDirty) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const discardDraft = useCallback(() => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    setValue(serverData);
    setHasRecoveredDraft(false);
  }, [storageKey, serverData]);

  const clearDraft = useCallback(() => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    setHasRecoveredDraft(false);
  }, [storageKey]);

  return {
    value,
    setValue,
    isDirty,
    hasRecoveredDraft,
    discardDraft,
    clearDraft,
  };
}
