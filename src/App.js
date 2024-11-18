import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [visitCount, setVisitCount] = useState(0);
    const [newCount, setNewCount] = useState(0);

    // Fetch the current visit count when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8070/api/visit')
            .then(response => {
                setVisitCount(response.data);
            })
            .catch(error => console.error('Error fetching visit count:', error));

        // Increment the visit count when the page loads
        axios.post('http://localhost:8070/api/increment')
            .catch(error => console.error('Error incrementing visit count:', error));
    }, []);

    // Update the page visit count in the backend
    const handleChangeCount = () => {
        // Send the new count to the backend with the correct Content-Type header
        axios.post('http://localhost:8070/api/visit', newCount, {
            headers: {
                'Content-Type': 'application/json'  // Specify that we're sending JSON data
            }
        })
            .then(() => {
                setVisitCount(newCount);  // Update the visit count in the frontend
            })
            .catch(error => console.error('Error updating visit count:', error));
    };

    return (
        <div className="App">
            <h1>Page Visit Counter</h1>
            <p>Current visit count: {visitCount}</p>

            <div>
                <input
                    type="number"
                    value={newCount}
                    onChange={(e) => setNewCount(Number(e.target.value))}
                />
                <button onClick={handleChangeCount}>Update Count</button>
            </div>
        </div>
    );
};

export default App;
