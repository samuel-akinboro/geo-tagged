import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import MapView, { Marker } from 'react-native-maps';
import CustomMarker from '../components/CustomMarker';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.527730,
          longitude: 3.134468,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <CustomMarker
          uri="https://media.istockphoto.com/id/1041174316/photo/european-telecommunication-network-connected-over-europe-france-germany-uk-italy-concept.jpg?s=612x612&w=0&k=20&c=rrqIaHQDZajRhFTLijbSdTz4JfV2bZVLtPtGRHuvk6o="
          latitude={6.527730}
          longitude={3.134468}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%'
  }
});
