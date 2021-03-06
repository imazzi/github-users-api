import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements'
import { ActivityIndicator, FlatList,View,TouchableOpacity} from 'react-native';

 function HomeScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const getUsers = async () => {
      let users = [];
      try {
        const response = await fetch('https://api.github.com/users', {
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
      <View style={{}}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
                <Card>
                  <Card.Title>{item.login}</Card.Title>
                  <Card.Divider />
                  <Card.Title> {item.countFollowers} Followers</Card.Title>
                  <Card.Title> {item.countRepositories} Repositories</Card.Title>
  
                </Card>
              </TouchableOpacity>
            )}
          />
        )}
  
      </View>
    );
  }
  export default HomeScreen;