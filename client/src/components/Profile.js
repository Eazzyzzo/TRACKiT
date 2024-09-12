import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Redirect to login if no token
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Send token in headers
                }
            };

            try {
                const response = await axios.get('/api/user/profile', config);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                // If token is invalid or there's an error, redirect to login
                navigate('/login');
            }
        };

        fetchProfile();
    }, [navigate]);

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome, {profile.name}</h1>
            <p>Email: {profile.email}</p>
        </div>
    );
};

export default Profile;
