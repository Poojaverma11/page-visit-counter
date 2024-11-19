import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Importing custom CSS for styling

const App = () => {
    const [visitCount, setVisitCount] = useState(0);
    const [newCount, setNewCount] = useState(0);

    // Fetch the current visit count when the component mounts
    useEffect(() => {
        axios.get('https://my-page-counter-adfd8ffc998a.herokuapp.com/api/visit')
            .then(response => {
                setVisitCount(response.data);
            })
            .catch(error => console.error('Error fetching visit count:', error));

        // Increment the visit count when the page loads
        axios.post('https://my-page-counter-adfd8ffc998a.herokuapp.com/api/increment')
            .catch(error => console.error('Error incrementing visit count:', error));
    }, []);

    // Update the page visit count in the backend
    const handleChangeCount = () => {
        axios.post('https://my-page-counter-adfd8ffc998a.herokuapp.com/api/visit', newCount, {
            headers: {
                'Content-Type': 'application/json'  // Specify that we're sending JSON data
            }
        })
            .then(() => {
                setVisitCount(newCount);  // Update the visit count in the frontend
            })
            .catch(error => console.error('Error updating visit count:', error));
    };

    // Get the current hour of the day for dynamic greeting
    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Good Morning';
        } else if (currentHour < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    };

    return (
        <div className="App">
            <div className="container">
                <h1 className="header">{getGreeting()}, User!</h1>  {/* Greet the user */}
                <p className="visit-count">Current visit count: {visitCount}</p>

                <div className="input-container">
                    <input
                        type="number"
                        className="count-input"
                        value={newCount}
                        onChange={(e) => setNewCount(Number(e.target.value))}
                        placeholder="Enter new visit count"
                    />
                    <button className="update-btn" onClick={handleChangeCount}>Update Count</button>
                </div>
            </div>
        </div>
    );
};

export default App;
