import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'
import DetailsScreen from './screens/DetailsScreen'
import SearchScreen from './screens/SearchScreen';
import SearchResultsScreen from './screens/SearchResultsScreen'
import FollowersScreen from './screens/FollowersScreen'
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SearchResult" component={SearchResultsScreen} />
        <Stack.Screen name="Followers" component={FollowersScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  
  );
}

export default App;
