import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import ViewImage from './Pages/ViewImage';
import ConfirmImage from './Pages/ConfirmImage';
const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/view/:id' element={<ViewImage />} />
                <Route path='/confirm/:id/:password' element={<ConfirmImage />} />
            </Routes>
        </Layout>
    );
}

export default App;