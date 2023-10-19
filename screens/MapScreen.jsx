import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import MapView, { Marker } from 'react-native-maps';
import CustomMarker from '../components/CustomMarker';
import { useImageGallery } from '../Providers/ImageGallery';

export default function MapScreen() {
  const { images } = useImageGallery();

  const recentImage = images[images.length - 1];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: recentImage?.latitude || 25.276987,
          longitude: recentImage?.longitude || 55.296249,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {images.map((image) => (
          <CustomMarker
            key={image.id}
            uri={image.uri}
            latitude={image.latitude}
            longitude={image.longitude}
          />
        ))}
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
