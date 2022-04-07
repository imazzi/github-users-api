import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View>
      <TextInput
        style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, }}
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        placeholder="Search from textInput"
        onSubmitEditing={() => navigation.navigate('SearchResult', searchQuery)}
      />
    </View>
  );

};

export default SearchScreen;
