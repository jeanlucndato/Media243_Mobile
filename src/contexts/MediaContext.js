import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const MediaContext = createContext();

const WATCHLIST_KEY = '@media243_watchlist';

export const useMedia = () => {
    return useContext(MediaContext);
};

export const MediaProvider = ({ children }) => {
    const [mediaCatalogue, setMediaCatalogue] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadWatchlist();
    }, []);

    const loadWatchlist = async () => {
        try {
            const savedWatchlist = await AsyncStorage.getItem(WATCHLIST_KEY);
            if (savedWatchlist) {
                setWatchlist(JSON.parse(savedWatchlist));
            }
        } catch (error) {
            console.error('Error loading watchlist:', error);
        }
    };

    const saveWatchlist = async (newWatchlist) => {
        try {
            await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
        } catch (error) {
            console.error('Error saving watchlist:', error);
        }
    };

    const fetchCatalogue = async () => {
        setLoading(true);
        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("MEDIA: Catalogue loaded.");
        } catch (error) {
            console.error('Error fetching catalogue:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToWatchlist = async (media) => {
        try {
            const isAlreadyInList = watchlist.some(item => item.id === media.id);

            if (!isAlreadyInList) {
                const newWatchlist = [...watchlist, media];
                setWatchlist(newWatchlist);
                await saveWatchlist(newWatchlist);
                return { success: true, message: 'Added to watchlist' };
            } else {
                return { success: false, message: 'Already in watchlist' };
            }
        } catch (error) {
            console.error('Error adding to watchlist:', error);
            return { success: false, error: error.message };
        }
    };

    const removeFromWatchlist = async (mediaId) => {
        try {
            const newWatchlist = watchlist.filter(item => item.id !== mediaId);
            setWatchlist(newWatchlist);
            await saveWatchlist(newWatchlist);
            return { success: true, message: 'Removed from watchlist' };
        } catch (error) {
            console.error('Error removing from watchlist:', error);
            return { success: false, error: error.message };
        }
    };

    const isInWatchlist = (mediaId) => {
        return watchlist.some(item => item.id === mediaId);
    };

    const clearWatchlist = async () => {
        try {
            setWatchlist([]);
            await AsyncStorage.removeItem(WATCHLIST_KEY);
            return { success: true };
        } catch (error) {
            console.error('Error clearing watchlist:', error);
            return { success: false, error: error.message };
        }
    };

    const value = {
        mediaCatalogue,
        watchlist,
        loading,
        fetchCatalogue,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        clearWatchlist,
    };

    return (
        <MediaContext.Provider value={value}>
            {children}
        </MediaContext.Provider>
    );
};