// buyTicket.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Event card component
const EventCard = ({ event, onBuyClick }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
    <h3 className="text-xl font-bold mb-2">{event.eventName}</h3>
    <div className="space-y-2 mb-4">
      <p className="text-gray-600">
        <span className="font-semibold">Symbol:</span> {event.eventSymbol}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Price:</span> {event.price} SOL
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Available Tickets:</span> {event.numTickets}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Resale:</span> {event.canBeResold ? 'Allowed' : 'Not Allowed'}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Royalty:</span> {event.royaltyPercent}%
      </p>
    </div>
    <button
      onClick={() => onBuyClick(event)}
      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
    >
      Buy Ticket
    </button>
  </div>
);

export default function BuyTicket({ onBuyClick }) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Simulating fetching events - replace with your actual data fetching logic
  useEffect(() => {
    // This would typically come from your blockchain/backend
    const fetchedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(fetchedEvents);
  }, []);

  const handleBuyClick = async (event) => {
    setIsProcessing(true);
    setSelectedEvent(event);

    try {
      // Prepare the transaction data matching the format in the image
      const transactionData = {
        _OWNER: event.owner,
        _NUMTICKETS: event.numTickets,
        _PRICE: event.price,
        _CANBERESOLD: event.canBeResold,
        _ROYALTYPERCENT: event.royaltyPercent,
        _eventName: event.eventName,
        _EVENTSYMBOL: event.eventSymbol
      };

      console.log('Transaction data ready for Solana:', transactionData);
      // Here you'll add your Solana integration code later
      
      alert('Ticket purchase initiated! Ready for Solana integration.');
      // Optionally update the local state to reflect the purchase
      const updatedEvents = events.map(e => {
        if (e.eventName === event.eventName) {
          return { ...e, numTickets: e.numTickets - 1 };
        }
        return e;
      });
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    } catch (error) {
      console.error('Error processing purchase:', error);
      alert('Failed to process purchase. Please try again.');
    } finally {
      setIsProcessing(false);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Events</h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No events available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              onBuyClick={handleBuyClick}
            />
          ))}
        </div>
      )}

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Processing Purchase</h3>
            <p>Please wait while we process your ticket purchase...</p>
          </div>
        </div>
      )}
    </div>
  );
}
