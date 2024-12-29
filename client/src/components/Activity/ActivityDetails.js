import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ActivityDetails = () => {
    const { id } = useParams(); // Get the activity ID from the URL
    const [activity, setActivity] = useState(null);
    const [sessionData, setSessionData] = useState({ distance: '', weight: '', duration: '' });

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(`/api/activities/${id}`);
                setActivity(response.data); // Store activity data
            } catch (error) {
                console.error('Error fetching activity:', error);
            }
        };
        fetchActivity();
    }, [id]);

    const handleSessionSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/activities/${id}/session`, { metrics: sessionData });
            alert('Session logged successfully!');
        } catch (error) {
            console.error('Error logging session:', error);
        }
    };

    return (
        <div>
            {activity ? (
                <div>
                    <h2>{activity.name}</h2>
                    <p>{activity.description}</p>
                    
                    <form onSubmit={handleSessionSubmit}>
                        <label>Distance:</label>
                        <input type="number" value={sessionData.distance} onChange={(e) => setSessionData({ ...sessionData, distance: e.target.value })} />

                        <label>Weight:</label>
                        <input type="number" value={sessionData.weight} onChange={(e) => setSessionData({ ...sessionData, weight: e.target.value })} />

                        <label>Duration:</label>
                        <input type="number" value={sessionData.duration} onChange={(e) => setSessionData({ ...sessionData, duration: e.target.value })} />

                        <button type="submit">Log Session</button>
                    </form>
                </div>
            ) : (
                <p>Loading activity...</p>
            )}
        </div>
    );
};

export default ActivityDetails;
