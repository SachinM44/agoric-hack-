// createEvent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        owner: '',
        numTickets: '',
        price: '',
        canBeResold: false,
        royaltyPercent: '',
        eventName: '',
        eventSymbol: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(true);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const eventData = {
                owner: formData.owner,
                numTickets: parseInt(formData.numTickets),
                price: parseInt(formData.price),
                canBeResold: formData.canBeResold,
                royaltyPercent: parseInt(formData.royaltyPercent),
                eventName: formData.eventName,
                eventSymbol: formData.eventSymbol
            };

            // Store the event data in localStorage for now
            const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
            existingEvents.push(eventData);
            localStorage.setItem('events', JSON.stringify(existingEvents));

            console.log('Event Data ready for Solana:', eventData);
            alert('Event created successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setIsFormVisible(false);
    };

    if (!isFormVisible) {
        return null;
    }

    return (
        <div className="relative max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                &times;
            </button>
            <h2 className="text-2xl font-bold mb-6">Create Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="owner">Owner</label>
                    <input type="text" name="owner" value={formData.owner} onChange={handleChange} placeholder="Owner" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="numTickets">Number of Tickets</label>
                    <input type="number" name="numTickets" value={formData.numTickets} onChange={handleChange} placeholder="Number of Tickets" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="canBeResold">Can be resold</label>
                    <input type="checkbox" name="canBeResold" checked={formData.canBeResold} onChange={handleChange} className="mr-2 leading-tight" />
                    <span className="text-gray-700">Allowed</span>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="royaltyPercent">Royalty Percent</label>
                    <input type="number" name="royaltyPercent" value={formData.royaltyPercent} onChange={handleChange} placeholder="Royalty Percent" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="eventName">Event Name</label>
                    <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Event Name" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="eventSymbol">Event Symbol</label>
                    <input type="text" name="eventSymbol" value={formData.eventSymbol} onChange={handleChange} placeholder="Event Symbol" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
