import { Card } from 'react-native-elements'
import { View, Button} from 'react-native';

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
  export default DetailsScreen;