const API_URL = 'https://sua-api.com';

export const fetchActivities = async () => {
  const response = await fetch(`${API_URL}/activities`);
  return await response.json();
};

export const saveActivity = async (activity) => {
  const response = await fetch(`${API_URL}/activities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(activity)
  });
  return await response.json();
};