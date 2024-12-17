import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import CommonBackground from "@/components/common/CommonBackground";
import CommonText from "@/components/common/CommonText";
import commonStyles from './styles/CommonStyles';
import CommonButton from '@/components/common/CommonButton';
import defaultUser from '@/components/user';

export default function UserListScreen() {
    const [users, setUsers] = useState<any[]>([]); // Specify the state as an array of User
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const amountOfUsers = 50;
            const userPromises = [];

            // Create fetch promises for all user IDs
            for (let i = 1; i <= amountOfUsers; i++) {
                userPromises.push(
                    fetch(`https://sanquin-api.onrender.com/users/${i}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Network response was not ok for user ${i}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            const email = data.data.email;
                            const password = data.data.password;
                            const rewardPoints = data.data.points;

                            return {
                                ...defaultUser, // Use the default structure
                                email,
                                password,
                                rewardPoints,
                            };
                        })
                        .catch(error => {
                            console.error(`Error fetching user ${i}:`, error);
                            return null;
                        })
                );
            }

            // Resolve all promises
            const fetchedUsers = await Promise.all(userPromises);

            // Filter out any failed fetches (null values)
            setUsers(fetchedUsers.filter(user => user !== null));
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <View style={commonStyles.container}>
            <CommonBackground>
                <CommonText style={{ fontSize: 24, marginVertical: 10 }}>
                    User List
                </CommonText>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={users}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ padding: 10, borderBottomWidth: 1 }}>
                                <Text>Name: {item.name || "N/A"}</Text>
                                <Text>Email: {item.email}</Text>
                            </View>
                        )}
                    />
                )}

                {/* Go Back Button */}
                <CommonButton href="/" style={{ marginTop: 20 }}>
                    Go Back
                </CommonButton>
            </CommonBackground>
        </View>
    );
}
