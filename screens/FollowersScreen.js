import { Card, ListItem } from 'react-native-elements'
import { View, Button, ActivityIndicator, FlatList, Text, Image, StatusBar,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
function FollowersScreen({ route, navigation }) {
    const searchQuery = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const apiUrl = 'https://api.github.com/users/'
    console.log('data', data)

    const getUsers = async () => {
        let users = [];
        try {
            const response = await fetch(apiUrl + searchQuery + '/followers', {
                headers: {
                    'Authorization': 'token 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',
                }
            });
            const currentUsers = await response.json()
            await Promise.all(currentUsers.map(async (element) => {
                const followers = await fetch(element.followers_url, {
                    headers: {
                        'Authorization': 'token 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',
                    }
                });
                const repositories = await fetch(element.repos_url, {
                    headers: {
                        'Authorization': 'token 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',
                    }
                });
                const followersJson = await followers.json();
                const repositoriesJson = await repositories.json();
                users.push({
                    login: element.login,
                    countFollowers: followersJson.length,
                    countRepositories: repositoriesJson.length,
                    avatar_url: element.avatar_url
                })
            }));

            setData(users);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: StatusBar.currentHeight, }}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>

                        <Card>
                            <Card.Image source={{ uri: item.avatar_url }} style={{ width: 300, height: 300 }} />
                            <Card.Title>UserName: {item.login}</Card.Title>
                            <Card.Divider />
                            <Card.Title>Followers: {item.countFollowers} Followers</Card.Title>
                            <Card.Title>Public Repositories: {item.countRepositories} Repositories</Card.Title>
                        </Card>
                        </TouchableOpacity>
                    )}
                />
            )}


        </View>
    );
}
export default FollowersScreen;