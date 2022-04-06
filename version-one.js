import React, { useEffect, useState } from 'react';
import { Card} from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, FlatList, Text, View, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
  
  const getUsers = async () => {
    try {
      const response = await fetch('https://api.github.com/users', {
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
    <View style={{}}>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
              <Card>
                <Card.Title>{item.login}</Card.Title>
                <Card.Divider />
                <Card.Title> {item.followers_url} followers</Card.Title>
                <Card.Title> {item.repos_url.length} repositories</Card.Title>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { login } = route.params;
  const { avatar_url } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Card>
        <Card.Title>{JSON.stringify(login)}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: avatar_url }} style={{ width: 400, height: 400 }} />
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      </Card>


    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
