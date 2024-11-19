import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [visitCount, setVisitCount] = useState(0);
    const [newCount, setNewCount] = useState(0);

    // Fetch the current visit count when the component mounts
    useEffect(() => {
        // Fetch the current visit count from the backend
        axios.get('https://my-page-counter-adfd8ffc998a.herokuapp.com/api/visit')
            .then(response => {
                setVisitCount(response.data);
            })
            .catch(error => console.error('Error fetching visit count:', error));

        // Increment the visit count on page load
        axios.post('https://my-page-counter-adfd8ffc998a.herokuapp.com/api/increment')
            .catch(error => console.error('Error incrementing visit count:', error));
    }, []);

    // Update the page visit count in the backend
    const handleChangeCount = () => {
        const updatedCount = Number(newCount); // Ensure newCount is a number
        if (!isNaN(updatedCount)) {
            // Send the new count to the backend with the correct Content-Type header
            axios.post('https://my-page-counter-adfd8ffc998a.herokuapp.com/api/visit', updatedCount, {
                headers: {
                    'Content-Type': 'application/json' // Specify that we're sending JSON data
                }
            })
                .then(() => {
                    setVisitCount(updatedCount);  // Update the visit count in the frontend
                })
                .catch(error => console.error('Error updating visit count:', error));
        } else {
            console.error('Invalid count value');
        }
    };

    return (
        <div className="App">
            <h1>Page Visit Counter</h1>
            <p>Current visit count: {visitCount}</p>

            <div>
                <input
                    type="number"
                    value={newCount}
                    onChange={(e) => setNewCount(e.target.value)}
                    placeholder="Enter new visit count"
                />
                <button onClick={handleChangeCount}>Update Count</button>
            </div>
        </div>
    );
};

export default App;
