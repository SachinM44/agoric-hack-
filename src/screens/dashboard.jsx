// dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BuyTicket from './buyTicket.jsx';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleBuyTicket = (event) => {
        // Your handleBuyTicket logic here
        console.log('Buying ticket for event:', event);
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <BuyTicket onBuyClick={handleBuyTicket} />
        </div>
    );
};

export default Dashboard;
