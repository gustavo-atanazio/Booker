import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';

import Home from 'pages/Home';
import NewBook from 'pages/NewBook';
import NotFound from 'pages/NotFound';

function AppRouter() {
    return (
        <BrowserRouter>
            <Header/>

            <main>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/novo-livro' element={<NewBook/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </main>

            <Footer/>
        </BrowserRouter>
    );
}

export default AppRouter;