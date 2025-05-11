import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface Journal {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface JournalContextType {
  journals: Journal[];
  loading: boolean;
  refreshing: boolean;
  fetchJournals: (forceRefresh?: boolean) => Promise<void>;
  refreshJournals: () => Promise<void>;
}

const CACHED_JOURNALS_KEY = '@cached_journals';

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const saveJournalsToStorage = async (journalsToSave: Journal[]) => {
    try {
      await AsyncStorage.setItem(CACHED_JOURNALS_KEY, JSON.stringify(journalsToSave));
    } catch (error) {
      console.error('Error saving journals to storage:', error);
    }
  };

  const loadJournalsFromStorage = async () => {
    try {
      const cachedJournals = await AsyncStorage.getItem(CACHED_JOURNALS_KEY);
      if (cachedJournals) {
        return JSON.parse(cachedJournals) as Journal[];
      }
    } catch (error) {
      console.error('Error loading journals from storage:', error);
    }
    return [];
  };

  const fetchJournals = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(!forceRefresh);
      setRefreshing(forceRefresh);

      // If not forcing refresh, try to load from cache first
      if (!forceRefresh) {
        const cachedJournals = await loadJournalsFromStorage();
        if (cachedJournals.length > 0) {
          setJournals(cachedJournals);
          setLoading(false);
        }
      }

      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await axios.get('https://journal-app-backend-kxqs.onrender.com/journal', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedJournals = response.data;
      setJournals(fetchedJournals);
      await saveJournalsToStorage(fetchedJournals);
    } catch (error) {
      console.error('Error fetching journals:', error);
      // If fetch fails, try to load from cache
      const cachedJournals = await loadJournalsFromStorage();
      setJournals(cachedJournals);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const refreshJournals = useCallback(async () => {
    await fetchJournals(true);
  }, [fetchJournals]);

  // Load cached journals on mount
  useEffect(() => {
    const loadInitialJournals = async () => {
      const cachedJournals = await loadJournalsFromStorage();
      if (cachedJournals.length > 0) {
        setJournals(cachedJournals);
      }
      fetchJournals();
    };
    loadInitialJournals();
  }, [fetchJournals]);

  return (
    <JournalContext.Provider value={{ journals, loading, refreshing, fetchJournals, refreshJournals }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournals = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournals must be used within a JournalProvider');
  }
  return context;
};