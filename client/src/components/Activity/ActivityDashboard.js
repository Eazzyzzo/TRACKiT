import React, { useEffect, useState } from 'react';
import API from '../../services/api';  // Import the pre-configured Axios instance

const ActivityDashboard = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Fetch activities from backend using the pre-configured Axios instance
        const fetchActivities = async () => {
            try {
                const response = await API.get('/activities');  // Automatically includes the token
                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };
        fetchActivities();
    }, []);

    return (
        <div className="activity-dashboard">
            <h2>Your Activities</h2>
            {activities.length > 0 ? (
                <ul>
                    {activities.map((activity) => (
                        <li key={activity._id}>
                            <h3>{activity.name}</h3>
                            <p>{activity.description}</p>
                            <strong>Metrics:</strong>
                            <ul>
                                {activity.metrics.map((metric, index) => (
                                    <li key={index}>{metric}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No activities yet.</p>
            )}
        </div>
    );
};

export default ActivityDashboard;
