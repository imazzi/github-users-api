import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, Button, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-web';
import { Card } from 'react-native-elements';
const { getUsers, getUserByLogin, getUserFollowers } = require('./src/services/userService')

function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);


  
  const getUsersFromApi = async () => {
    try {
      const users = await getUsers()
      setUsers(users.data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersFromApi();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
              <Card>
                <Card.Title>{item.login}</Card.Title>
                <Card.Divider />
                <Card.Title> {  
                }
                  followers</Card.Title>
                <Card.Title> {item.repos_url.length} repositories</Card.Title>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
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

const styles = StyleSheet.create({
  card: {
    margin: 2,
    padding: 10,
    width: '15%',
    textAlign: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 5,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});

export default App;
