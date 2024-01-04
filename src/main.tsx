import React from 'react';
import ReactDOM from 'react-dom/client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { BooksProvider } from 'context/Books/index.tsx';
import { ModalProvider } from 'context/Modal/index.tsx';

import AppRouter from 'routes';

import 'styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BooksProvider>
            <ModalProvider>
                <AppRouter/>

                <ToastContainer
                    position='top-right'
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme='light'
                />
            </ModalProvider>
        </BooksProvider>
    </React.StrictMode>,
);
