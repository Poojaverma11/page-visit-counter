import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisitCounter = () => {
    const [visitCount, setVisitCount] = useState(0);
    const [newCount, setNewCount] = useState(0);

    // Fetch the current visit count from backend
    const fetchVisitCount = async () => {
        try {
            const response = await axios.get('https://my-page-counter-adfd8ffc998a.herokuapp.com/api/visit');
            setVisitCount(response.data);
        } catch (error) {
            console.error('Error fetching visit count:', error);
        }
    };

    // Increment the visit count
    const incrementVisitCount = async () => {
        try {
            await axios.post('https://my-page-counter-adfd8ffc998a.herokuapp.com/api/increment');
            fetchVisitCount();  // Refresh the count after incrementing
        } catch (error) {
            console.error('Error incrementing visit count:', error);
        }
    };

    // Update the visit count to a specific value
    const updateVisitCount = async () => {
        try {
            // Convert newCount to a number before sending
            const updatedCount = Number(newCount);
            if (!isNaN(updatedCount)) {
                await axios.post('https://my-page-counter-adfd8ffc998a.herokuapp.com/api/visit', updatedCount);
                fetchVisitCount();  // Refresh the count after updating
            } else {
                console.error('Invalid count value');
            }
        } catch (error) {
            console.error('Error updating visit count:', error);
        }
    };

    useEffect(() => {
        fetchVisitCount(); // Fetch visit count when the component mounts
    }, []);

    return (
        <div>
            <h1>Page Visit Counter</h1>
            <p>Current Visit Count: {visitCount}</p>
            <button onClick={incrementVisitCount}>Increment Visit Count</button>
            <hr />
            <h3>Update Visit Count</h3>
            <input
                type="number"
                value={newCount}
                onChange={(e) => setNewCount(e.target.value)}
                placeholder="Enter new visit count"
            />
            <button onClick={updateVisitCount}>Update Count</button>
        </div>
    );
};

export default VisitCounter;
