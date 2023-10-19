import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import MapView, { Marker } from 'react-native-maps';

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
        <Marker
          coordinate={{
            latitude: 6.527730,
            longitude: 3.134468
          }}
        >
          <TouchableOpacity>
            <View
              style={styles.marker}
            >
              <Image
                source={{uri: "https://media.istockphoto.com/id/1041174316/photo/european-telecommunication-network-connected-over-europe-france-germany-uk-italy-concept.jpg?s=612x612&w=0&k=20&c=rrqIaHQDZajRhFTLijbSdTz4JfV2bZVLtPtGRHuvk6o="}}
                style={styles.markerImage}
              />
            </View>
          </TouchableOpacity>
        </Marker>
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
  },
  marker: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black'
  },
  markerImage: {
    height: '70%',
    width: '70%',
    borderRadius: 1000
  }
});
