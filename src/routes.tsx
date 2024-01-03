import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from 'components/Header';
import Footer from 'components/Footer';

import Home from 'pages/Home';
import NewBook from 'pages/NewBook';

function AppRouter() {
    return (
        <BrowserRouter>
            <Header/>

            <main>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/novo-livro' element={<NewBook/>}/>
                </Routes>
            </main>

            <Footer/>

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
        </BrowserRouter>
    );
}

export default AppRouter;