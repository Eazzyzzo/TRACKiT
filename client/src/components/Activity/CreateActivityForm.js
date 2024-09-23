import React, { useState } from 'react';
import axios from 'axios';

const CreateActivityForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [metrics, setMetrics] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Assuming token is stored here
        const metricsArray = metrics.split(',').map(metric => metric.trim());
        try {
            const response = await axios.post('/api/activities/create', {
                name,
                description,
                metrics: metricsArray,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Activity created:', response.data);
            setName('');
            setDescription('');
            setMetrics('');
        } catch (error) {
            console.error('Error creating activity:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Activity</h2>
            <div>
                <label>Activity Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Metrics (comma-separated):</label>
                <input
                    type="text"
                    value={metrics}
                    onChange={(e) => setMetrics(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Activity</button>
        </form>
    );
};

export default CreateActivityForm;
