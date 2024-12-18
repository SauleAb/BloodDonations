import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import CommonBackground from "@/components/common/CommonBackground";
import CommonText from "@/components/common/CommonText";
import commonStyles from './styles/CommonStyles';
import CommonButton from '@/components/common/CommonButton';
import defaultUser from '@/components/user';

export default function UserListScreen() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const amountOfUsers = 100;
            const userPromises = [];

            for (let i = 1; i <= amountOfUsers; i++) {
                userPromises.push(
                    fetch(`https://sanquin-api.onrender.com/users/${i}`)
                        .then(response => {
                            if (!response.ok) {
                                return null; // Ignore errors
                            }
                            return response.json();
                        })
                        .then(data => {
                            if (!data || !data.data) {
                                return null;
                            }
                            // Merge defaultUser with all data fields returned by the API
                            return { ...defaultUser, ...data.data };
                        })
                        .catch(() => null) // Ignore errors
                );
            }

            const fetchedUsers = await Promise.all(userPromises);
            setUsers(fetchedUsers.filter(user => user !== null));
        } catch {
            // Ignore any errors
        } finally {
            setLoading(false);
        }
    };

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
                                {/* Show all user data */}
                                <Text>{JSON.stringify(item, null, 2)}</Text>
                            </View>
                        )}
                    />
                )}

                <CommonButton href="/" style={{ marginTop: 20 }}>
                    Go Back
                </CommonButton>
            </CommonBackground>
        </View>
    );
}
