import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import `useNavigate`
import axios from 'axios';
import CreateActivityForm from './Activity/CreateActivityForm';

const Dashboard = ({ activities: initialActivities }) => {
  const [activities, setActivities] = useState(Array.isArray(initialActivities) ? initialActivities : []);
  const [refreshActivities, setRefreshActivities] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigating to the login page after logout

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/api/activities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setActivities(response.data);
        } else {
          console.error('Unexpected API response:', response.data);
          setActivities([]);
        }

        setError(null);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialActivities || refreshActivities) {
      fetchActivities();
    }
  }, [refreshActivities, initialActivities]);

  const handleDeleteActivity = async (activityId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`/api/activities/${activityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities((prev) => prev.filter((activity) => activity._id !== activityId));
      alert('Activity deleted successfully!');
    } catch (error) {
      console.error('Error deleting activity:', error.response?.data || error.message);
      alert('Failed to delete activity.');
    }
  };

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="dashboard" style={styles.container}>
     <div style={styles.content}>
      <h1>Welcome to Your Dashboard</h1>
      <p>Track your daily activities and monitor progress.</p>

      {/* Buttons Section */}
      <div style={styles.buttonContainer}>
	  {/*<button style={styles.button} onClick={() => navigate('/create-activity')}>Create Activity</button>*/}
	  {/*<button style={styles.button} onClick={() => navigate('/metrics')}>Metrics</button>*/}
	  {/*<button style={styles.button} onClick={handleLogout}>Logout</button>*/}
      </div>

	{/* Create Activity Form */}
      <CreateActivityForm onActivityCreated={() => setRefreshActivities((prev) => !prev)} />

	  {/* Activities Section */}
      {isLoading ? (
        <p>Loading activities...</p>
      ) : error ? (
        <p>Error fetching activities: {error.message}</p>
      ) : (
        <div className="activities-section" style={styles.activitiesSection}>
          <h2>Your Activities</h2>
          {Array.isArray(activities) && activities.length > 0 ? (
            <div className="activity-list" style={styles.activityList}>
              {activities.map((activity) => (
                <div key={activity._id} className="activity-card" style={styles.activityCard}>
                  <h2>{activity.name}</h2>
                  <p>{activity.description}</p>
                  <div style={styles.buttonContainer}>
                    <Link to={`/activities/${activity._id}`}>
                      <button style={styles.button}>Log Session</button>
                    </Link>
                    <Link to={`/activities/${activity._id}/summary`}>
                      <button style={styles.button}>View Summary</button>
                    </Link>
                    <button style={styles.deleteButton} onClick={() => handleDeleteActivity(activity._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No activities yet. Start by creating one!</p>
          )}
        </div>
      )}
    </div>

    {/* Navigation Section at the Bottom */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <button onClick={handleLogout} style={styles.logoutLink}>Logout</button>
      </nav>
    </div>
  );
};

// Styles for the Dashboard
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between', //ensures content is spread out with navigation at the bottom
    height: '100vh', //takes the full height of the viewpoint
  },
  content: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  nav: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column', // Stack links vertically
    alignItems: 'flex-start',
    marginBottom: '20px',
    backgroundColor: '#f1f1f1',
    padding: '10px 0',
  },
  link: {
    fontSize: '18px',
    color: '#3498db',
    textDecoration: 'none',
    marginBottom: '10px', // Add spacing between links
    cursor: 'pointer',
  },
  logoutLink: {
    fontSize: '16px',
    color: '#e74c3c',
    background: 'none',
    border: 'none',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px', // Spacing between buttons
    marginBottom: '20px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    backgroundColor: '#3498db',
    color: '#fff',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    backgroundColor: '#e74c3c',
    color: '#fff',
    transition: 'background-color 0.3s',
  },
  activitiesSection: {
    width: '100%',
    marginTop: '20px',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // Spacing between activity cards
  },
  activityCard: {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
};

export default Dashboard;
