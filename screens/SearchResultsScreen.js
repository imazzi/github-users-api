import { Card ,ListItem } from 'react-native-elements'
import { View, Button, ActivityIndicator, FlatList, Text, Image ,StatusBar} from 'react-native';
import React, { useEffect, useState } from 'react';
function SearchResults({ route, navigation }) {
    const searchQuery = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const apiUrl = 'https://api.github.com/users/'
    console.log('data', data)

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
        <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center',paddingTop: StatusBar.currentHeight,}}>
            <Card >
                <Card.Image source={{ uri: data.avatar_url }} style={{ width: 300, height: 300 }}  />
                <Card.Title>{data.login}</Card.Title>
                <Card.Divider />
                <Card.Title>Full name: {data.name ? data.name : data.login} </Card.Title>
                <Card.Title>Followers: {data.followers} </Card.Title>
                <Card.Title>Public Repositories: {data.public_repos} </Card.Title>
                <Button title="Go to Search" onPress={() => navigation.navigate('Search')} />
                <Card.Divider />
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                <Card.Divider />
                <Button title="Go to Followers" onPress={() => navigation.navigate('Followers',searchQuery)} />
            </Card>


        </View>
    );
}
export default SearchResults;