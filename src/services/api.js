import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://media243-backend.vercel.app/api';
const AUTH_TOKEN_KEY = '@media243_auth_token';

const getHeaders = async () => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        throw new Error(error);
    }
    return data;
};

export const api = {
    // Auth
    login: async (email, password) => {
        const response = await fetch(`${BASE_URL}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login', email, password }),
        });
        return handleResponse(response);
    },

    signup: async (email, password) => {
        const response = await fetch(`${BASE_URL}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'signup', email, password }),
        });
        return handleResponse(response);
    },

    // Movies
    getAllMovies: async () => {
        const response = await fetch(`${BASE_URL}/movies`, {
            method: 'GET',
            headers: await getHeaders(),
        });
        return handleResponse(response);
    },

    getMovieById: async (id) => {
        const response = await fetch(`${BASE_URL}/movies/${id}`, {
            method: 'GET',
            headers: await getHeaders(),
        });
        return handleResponse(response);
    },

    // Articles
    getAllArticles: async () => {
        const response = await fetch(`${BASE_URL}/articles`, {
            method: 'GET',
            headers: await getHeaders(),
        });
        return handleResponse(response);
    },

    // Categories
    getAllCategories: async () => {
        const response = await fetch(`${BASE_URL}/categories`, {
            method: 'GET',
            headers: await getHeaders(),
        });
        return handleResponse(response);
    },

    // Search
    searchContent: async (query, type = 'all') => {
        const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&type=${type}`, {
            method: 'GET',
            headers: await getHeaders(),
        });
        return handleResponse(response);
    },

    // Profile
    getProfile: async (userId) => {
        const response = await fetch(`${BASE_URL}/profiles?userId=${userId}`, {
            method: 'GET',
            headers: await getHeaders(),
        });
        return handleResponse(response);
    },

    updateProfile: async (profileData) => {
        const response = await fetch(`${BASE_URL}/profiles`, {
            method: 'PUT',
            headers: await getHeaders(),
            body: JSON.stringify(profileData),
        });
        return handleResponse(response);
    },

    // Watchlist
    getWatchlist: async (userId) => {
        const response = await fetch(`${BASE_URL}/watchlist?userId=${userId}`, {
            method: 'GET',
            headers: await getHeaders(),
        });
        return handleResponse(response);
    },

    addToWatchlist: async (userId, item) => {
        const response = await fetch(`${BASE_URL}/watchlist`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify({
                userId,
                itemId: item.id,
                itemType: 'movie', // Defaulting to movie for now
                title: item.title,
            }),
        });
        return handleResponse(response);
    },

    removeFromWatchlist: async (userId, itemId) => {
        const response = await fetch(`${BASE_URL}/watchlist?userId=${userId}&itemId=${itemId}&itemType=movie`, {
            method: 'DELETE',
            headers: await getHeaders(),
        });
        return handleResponse(response);
    },
};
