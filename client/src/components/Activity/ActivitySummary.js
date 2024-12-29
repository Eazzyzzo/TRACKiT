import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

const ActivitySummary = () => {
    const { id } = useParams(); // Get the activity ID from the URL
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get(`/api/activities/${id}/summary`);
                setSessions(response.data); // Store session data
            } catch (error) {
                console.error('Error fetching summary:', error);
            }
        };
        fetchSessions();
    }, [id]);

    // Chart data
    const data = {
        labels: sessions.map(session => new Date(session.date).toLocaleDateString()), // Dates for each session
        datasets: [
            {
                label: 'Distance',
                data: sessions.map(session => session.metrics.distance),
                fill: false,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'Weight',
                data: sessions.map(session => session.metrics.weight),
                fill: false,
                backgroundColor: 'rgba(153,102,255,1)',
                borderColor: 'rgba(153,102,255,1)',
            },
            {
                label: 'Duration',
                data: sessions.map(session => session.metrics.duration),
                fill: false,
                backgroundColor: 'rgba(255,159,64,1)',
                borderColor: 'rgba(255,159,64,1)',
            }
        ]
    };

    return (
        <div>
            <h2>Activity Summary</h2>
            <Line data={data} />
        </div>
    );
};

export default ActivitySummary;
