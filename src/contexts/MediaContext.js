import { createContext, useContext, useState } from 'react';

// Création du Context
const MediaContext = createContext();

// Hook personnalisé
export const useMedia = () => {
    return useContext(MediaContext);
};

// Fournisseur de Contexte (Le "Provider")
export const MediaProvider = ({ children }) => {
    // État pour stocker le catalogue complet (mock initial)
    const [mediaCatalogue, setMediaCatalogue] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fonction pour simuler la récupération des données
    const fetchCatalogue = async () => {
        setLoading(true);
        // En vrai : effectuer l'appel à votre API backend ici
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("MEDIA MOCK : Catalogue chargé.");
        setLoading(false);
    };

    const value = {
        mediaCatalogue,
        loading,
        fetchCatalogue,
        // Plus tard : filtrage, recherche, etc.
    };

    return (
        <MediaContext.Provider value={value}>
            {children}
        </MediaContext.Provider>
    );
};