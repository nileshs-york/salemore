/// <reference types="vite/client" />
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category } from '../types';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

interface Contact {
    id: number;
    name: string;
    email: string;
    company: string;
    subject: string;
    message: string;
    created_at: string;
}

interface DataContextType {
    products: Product[];
    categories: Category[];
    contacts: Contact[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
    refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedProducts = localStorage.getItem('adminProducts');
        const savedCategories = localStorage.getItem('adminCategories');
        const savedContacts = localStorage.getItem('adminContacts');

        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            setProducts(productsData.map((p: any) => ({
                ...p,
                price: typeof p.price === 'number' ? p.price : parseFloat(p.price)
            })) as Product[]);
        }

        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        } else {
            setCategories(categoriesData as Category[]);
        }

        if (savedContacts) {
            setContacts(JSON.parse(savedContacts));
        }

        setIsInitialized(true);
    }, []);

    // Sync to local storage AND local files (dev mode)
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('adminProducts', JSON.stringify(products));
            localStorage.setItem('adminCategories', JSON.stringify(categories));
            localStorage.setItem('adminContacts', JSON.stringify(contacts));

            // Only attempt to save to local files during development
            if (import.meta.env.DEV) {
                const syncFiles = [
                    { fileName: 'products.json', data: products },
                    { fileName: 'categories.json', data: categories },
                    { fileName: 'contacts.json', data: contacts }
                ];

                syncFiles.forEach(file => {
                    fetch('/api/save-local-json', {
                        method: 'POST',
                        body: JSON.stringify(file)
                    }).catch(err => console.log(`File sync not available for ${file.fileName}`));
                });
            }
        }
    }, [products, categories, contacts, isInitialized]);

    const refreshData = () => {
        // This can be used to manually reload if needed, but the state sync handles it.
    };

    return (
        <DataContext.Provider value={{ products, categories, contacts, setProducts, setCategories, setContacts, refreshData }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
