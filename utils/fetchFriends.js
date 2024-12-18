import axios from 'axios';

const API_BASE_URL = 'https://sanquin-api.onrender.com';

export async function fetchFriends(userId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/friends`);
        return response.data.friends;
    } catch (error) {
        console.error("Error fetching friends:", error);
        throw error;
    }
}
