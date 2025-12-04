import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const MediaContext = createContext();

const WATCHLIST_KEY = '@media243_watchlist';

export const useMedia = () => {
    return useContext(MediaContext);
};

export const MediaProvider = ({ children }) => {
    const { user } = useAuth();
    const [mediaCatalogue, setMediaCatalogue] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCatalogue();
    }, []);

    useEffect(() => {
        if (user) {
            loadWatchlist();
        } else {
            setWatchlist([]);
        }
    }, [user]);

    const loadWatchlist = async () => {
        if (!user) return;
        try {
            const response = await api.getWatchlist(user.id);
            if (response.status === 'success') {
                setWatchlist(response.data);
            }
        } catch (error) {
            console.error('Error loading watchlist:', error);
        }
    };

    const fetchCatalogue = async () => {
        setLoading(true);
        try {
            const response = await api.getAllMovies();
            if (response.status === 'success') {
                setMediaCatalogue(response.data);
            }
        } catch (error) {
            console.error('Error fetching catalogue:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToWatchlist = async (media) => {
        if (!user) return { success: false, message: 'User not logged in' };

        try {
            const isAlreadyInList = watchlist.some(item => item.itemId === media.id || item.id === media.id);

            if (!isAlreadyInList) {
                const response = await api.addToWatchlist(user.id, media);
                if (response.status === 'success') {
                    // Refresh watchlist to get the correct structure from backend
                    await loadWatchlist();
                    return { success: true, message: 'Added to watchlist' };
                } else {
                    return { success: false, message: response.message || 'Failed to add to watchlist' };
                }
            } else {
                return { success: false, message: 'Already in watchlist' };
            }
        } catch (error) {
            console.error('Error adding to watchlist:', error);
            return { success: false, error: error.message };
        }
    };

    const removeFromWatchlist = async (mediaId) => {
        if (!user) return { success: false, message: 'User not logged in' };

        try {
            const response = await api.removeFromWatchlist(user.id, mediaId);
            if (response.status === 'success') {
                // Refresh watchlist
                await loadWatchlist();
                return { success: true, message: 'Removed from watchlist' };
            } else {
                return { success: false, message: response.message || 'Failed to remove from watchlist' };
            }
        } catch (error) {
            console.error('Error removing from watchlist:', error);
            return { success: false, error: error.message };
        }
    };

    const isInWatchlist = (mediaId) => {
        // Check both ID formats (backend might return different structure)
        return watchlist.some(item => item.itemId === mediaId || item.id === mediaId);
    };

    const clearWatchlist = async () => {
        // This might not be supported by API directly as "clear all", 
        // but we can clear local state or implement loop deletion if needed.
        // For now, we just clear local state.
        setWatchlist([]);
        return { success: true };
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