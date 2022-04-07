import React, {  useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { View} from 'react-native';
const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => setSearchQuery(query)}
        onIconPress={() => navigation.navigate('SearchResult', searchQuery)}
        value={searchQuery}
      />
    </View>
  );
};

export default SearchScreen;
