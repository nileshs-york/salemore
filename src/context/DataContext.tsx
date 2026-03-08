/// <reference types="vite/client" />
import React, { useState, useEffect, ReactNode } from 'react';
import { Product, Category } from '../types';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { DataContext, Contact } from './useData';

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

    const lastSyncedProducts = React.useRef<string>('');
    const lastSyncedCategories = React.useRef<string>('');
    const lastSyncedContacts = React.useRef<string>('');

    // Shared sync function
    const syncToFile = (fileName: string, data: any) => {
        if (import.meta.env.DEV) {
            console.log(`Syncing ${fileName}...`);
            fetch('/api/save-local-json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileName, data })
            })
                .then(r => r.json())
                .then(res => console.log(`Sync result for ${fileName}:`, res))
                .catch(err => console.error(`File sync failed for ${fileName}:`, err));
        }
    };

    // Sync Products
    useEffect(() => {
        if (isInitialized) {
            const currentData = JSON.stringify(products);
            localStorage.setItem('adminProducts', currentData);

            if (currentData !== lastSyncedProducts.current) {
                syncToFile('products.json', products);
                lastSyncedProducts.current = currentData;
            }
        }
    }, [products, isInitialized]);

    // Sync Categories
    useEffect(() => {
        if (isInitialized) {
            const currentData = JSON.stringify(categories);
            localStorage.setItem('adminCategories', currentData);

            if (currentData !== lastSyncedCategories.current) {
                syncToFile('categories.json', categories);
                lastSyncedCategories.current = currentData;
            }
        }
    }, [categories, isInitialized]);

    // Sync Contacts
    useEffect(() => {
        if (isInitialized) {
            const currentData = JSON.stringify(contacts);
            localStorage.setItem('adminContacts', currentData);

            if (currentData !== lastSyncedContacts.current) {
                syncToFile('contacts.json', contacts);
                lastSyncedContacts.current = currentData;
            }
        }
    }, [contacts, isInitialized]);

    const refreshData = () => {
        // This can be used to manually reload if needed, but the state sync handles it.
    };

    return (
        <DataContext.Provider value={{ products, categories, contacts, setProducts, setCategories, setContacts, refreshData }}>
            {children}
        </DataContext.Provider>
    );
}
