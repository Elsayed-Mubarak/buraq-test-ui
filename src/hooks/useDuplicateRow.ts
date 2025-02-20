import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

type Row<T> = {
    id: string;
    data: T;
    files?: File[];
}

type RowStoreState<T> = {
    rows: Row<T>[];
    data: T[];
    handleAddRow: (defaultValue: T) => void;
    handleDeleteRow: (id: string) => void;
    handleUpdateRow: (id: string, newValue: T) => void;
    handleFileUpdate: (id: string, newFiles: File[]) => void;
};

export const createRowStore = <T,>(defaultValue: T) =>
    create<RowStoreState<T>>((set, get) => ({
        rows: [{ id: uuidv4(), data: defaultValue, files: [] }],
        data: [defaultValue],
        handleAddRow: (value: T) => {
            const { rows } = get();
            set({
                rows: [...rows, { id: uuidv4(), data: value, files: [] }],
            });
        },
        handleDeleteRow: (id: string) => {
            const { rows } = get();
            set({
                rows: rows.filter((row) => row.id !== id),
            });
        },
        handleUpdateRow: (id: string, newValue: T) => {
            const { rows } = get();
            set({
                rows: rows.map((row) =>
                    row.id == id ? { ...row, data: newValue } : row
                ),
            })
        },
        handleFileUpdate: (id: string, newFiles: File[]) => {
            const { rows } = get();
            set({
                rows: rows.map((row) =>
                    row.id === id ? { ...row, files: newFiles } : row
                ),
            });
        },
    }));



export const useTextRowStore = createRowStore<string>("Hi there! My name is...");
export const useFileRowStore = createRowStore<File[]>([]);






