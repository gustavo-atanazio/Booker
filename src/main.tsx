import React from 'react';
import ReactDOM from 'react-dom/client';

import { BooksProvider } from 'context/Books/index.tsx';
import { ModalProvider } from 'context/Modal/index.tsx';

import AppRouter from 'routes';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BooksProvider>
            <ModalProvider>
                <AppRouter/>
            </ModalProvider>
        </BooksProvider>
    </React.StrictMode>,
);
