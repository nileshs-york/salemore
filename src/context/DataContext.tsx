import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category } from '../types';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

interface DataContextType {
    products: Product[];
    categories: Category[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedProducts = localStorage.getItem('adminProducts');
        const savedCategories = localStorage.getItem('adminCategories');

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

        setIsInitialized(true);
    }, []);

    // Sync to localStorage
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('adminProducts', JSON.stringify(products));
            localStorage.setItem('adminCategories', JSON.stringify(categories));
        }
    }, [products, categories, isInitialized]);

    const refreshData = () => {
        // This can be used to manually reload if needed, but the state sync handles it.
    };

    return (
        <DataContext.Provider value={{ products, categories, setProducts, setCategories, refreshData }}>
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
