import { Card } from 'react-native-elements'
import { View, Button, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
function SearchResults({ route, navigation }) {
    const searchQuery = route.params;
    console.log(route.params)
    console.log(searchQuery)
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const apiUrl = 'https://api.github.com/users/'
    console.log('data', data)
    console.log('url', apiUrl + searchQuery)
    const getUsers = async () => {
        try {
            const response = await fetch(apiUrl + searchQuery, {
                headers: {
                    'Authorization': 'token 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',
                }
            });
            const json = await response.json();
            setData(json);
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card>
                <Card.Image source={{ uri: data.avatar_url }} style={{ width: 400, height: 400 }} />
                <Card.Title>{data.login}</Card.Title>
                <Card.Divider />
                <Card.Title>Full name : {data.name ? data.name : data.login} </Card.Title>
                <Card.Title>Followers : {data.followers} </Card.Title>
                <Card.Title>Public Repositories : {data.public_repos} </Card.Title>
                <Button title="Go to Search" onPress={() => navigation.navigate('Search')} />
            </Card>
        </View>
    );
}
export default SearchResults;