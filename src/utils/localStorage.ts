import IBook from 'types/IBook';

export function getFromLocalStorage(key: string) {
    const items = localStorage.getItem(key);
    
    if (items) return JSON.parse(items);
    else return [];
}

export function updateLocalStorage(key: string, data: IBook[]) {
    localStorage.setItem(key, JSON.stringify(data));
}