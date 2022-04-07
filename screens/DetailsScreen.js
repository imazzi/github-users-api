import { Card } from 'react-native-elements'
import { View, Button} from 'react-native';

function DetailsScreen({ route, navigation }) {
    const { login } = route.params;
    const { avatar_url } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
        <Card>
          <Card.Title>{login}</Card.Title>
          <Card.Divider />
          <Card.Image source={{ uri: avatar_url }} style={{ width: 400, height: 400 }} />
          <Card.Divider />
          <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
          <Card.Divider />
          <Button title="Go to Search" onPress={() => navigation.navigate('Search')} />

        </Card>
  
  
      </View>
    );
  }
  export default DetailsScreen;