import React from 'react';
import ReactDOM from 'react-dom/client';
import { BooksProvider } from 'context/Books/index.tsx';
import AppRouter from './routes.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BooksProvider>
            <AppRouter/>
        </BooksProvider>
    </React.StrictMode>,
);
