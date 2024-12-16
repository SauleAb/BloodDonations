import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage key for storing the user list
const USER_LIST_KEY = 'user_list';

// Function to get the list of users
export const getUsers = async (): Promise<any[]> => {
    try {
        const users = await AsyncStorage.getItem(USER_LIST_KEY);
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return [];
    }
};

export const addUser = async (user: any): Promise<void> => {
    try {
        const users = await getUsers();
        users.push(user);
        await AsyncStorage.setItem(USER_LIST_KEY, JSON.stringify(users));
    } catch (error) {
        console.error('Failed to add user:', error);
    }
};
