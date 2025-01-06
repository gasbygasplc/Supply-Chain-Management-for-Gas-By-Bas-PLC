import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Welcome to the App</h1>} />
                <Route path="/register" element={<Registration />} />
            </Routes>
        </Router>
    );
};

export default App;