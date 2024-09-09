import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import BottomNav from './components/BottomNav';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} /> {/* Добавляем маршрут */}
                </Routes>
                <BottomNav />
            </div>
        </Router>
    );
}

export default App;

function Profile() {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const apiKey = event.target.apiKey.value;
        const apiSecret = event.target.apiSecret.value;

        const response = await fetch("http://localhost:5000/api/check-api-keys", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiKey: apiKey,
                apiSecret: apiSecret
            }),
        });

        const data = await response.json();

        if (data.success) {
            navigate("/dashboard"); // Перенаправление на страницу с информацией
        } else {
            alert(data.message); // Вывод сообщения об ошибке
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="apiKey" placeholder="API Key" required />
            <input type="text" name="apiSecret" placeholder="API Secret" required />
            <button type="submit">Далее</button>
        </form>
    );
}

function Dashboard() {
    return (
        <div>
            <h2>Информация по вашему аккаунту</h2>
            {/* Здесь можно вывести информацию о балансе и других данных */}
        </div>
    );
}
