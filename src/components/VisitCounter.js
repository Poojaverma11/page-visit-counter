import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisitCounter = () => {
    const [visitCount, setVisitCount] = useState(0);
    const [newCount, setNewCount] = useState(0);

    // Fetch the current visit count from backend
    const fetchVisitCount = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/visit-count');
            setVisitCount(response.data);
        } catch (error) {
            console.error('Error fetching visit count:', error);
        }
    };

    // Increment the visit count
    const incrementVisitCount = async () => {
        try {
            await axios.post('http://localhost:8080/api/visit-count/increment');
            fetchVisitCount();  // Refresh the count
        } catch (error) {
            console.error('Error incrementing visit count:', error);
        }
    };

    // Update the visit count to a specific value
    const updateVisitCount = async () => {
        try {
            await axios.post('http://localhost:8080/api/visit-count/update', newCount);
            fetchVisitCount();  // Refresh the count
        } catch (error) {
            console.error('Error updating visit count:', error);
        }
    };

    useEffect(() => {
        fetchVisitCount(); // Fetch visit count on mount
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
