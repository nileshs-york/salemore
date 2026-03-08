import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { Product, Category } from '../types';

export interface Contact {
    id: number;
    name: string;
    email: string;
    company: string;
    subject: string;
    message: string;
    created_at: string;
}

export interface DataContextType {
    products: Product[];
    categories: Category[];
    contacts: Contact[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
    setCategories: Dispatch<SetStateAction<Category[]>>;
    setContacts: Dispatch<SetStateAction<Contact[]>>;
    refreshData: () => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
