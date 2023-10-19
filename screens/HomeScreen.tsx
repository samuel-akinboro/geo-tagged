import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import Sizes from '../constants/Sizes';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import ZoomableImage from '../components/ZoomableImage';
import MapView, { Marker } from 'react-native-maps';
import CustomMarker from '../components/CustomMarker';
import { useImageGallery } from '../Providers/ImageGallery';

export default function HomeScreen({navigation}: any) {
  const { images } = useImageGallery();
  const [previewImage, setPreviewImage] = useState(null);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const handlePreviewImage = (image) => {
    bottomSheetRef.current?.expand();
    setPreviewImage(image);
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={images}
        style={styles.flatlist}
        numColumns={3}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePreviewImage(item)}>
            <Image
              style={styles.gridImage} 
              source={{uri: item.uri}} 
            />
          </TouchableOpacity>
        )}
        columnWrapperStyle={{
          gap: 10
        }}
        contentContainerStyle={{
          gap: 10
        }}
        ListEmptyComponent={(
          <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: Sizes.height * .30}}>
            <Ionicons name="ios-grid-outline" size={64} color="#c3c3c3" />
            <Text style={{marginTop: 10, color: "#5b5b5b"}}>You don't have any photos</Text>
          </View>
        )}
      />

      {/* Add New Photo */}
      <TouchableOpacity 
        style={styles.cameraBtn}
        onPress={() => navigation.navigate('Camera')}
      >
        <Ionicons name="camera-outline" size={Sizes.height * 0.04} color="#fff" />
      </TouchableOpacity>

      {/* Photo details */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <View style={{flex: 0.70}}>
          <ZoomableImage 
            uri={previewImage?.uri} 
            style={styles.modalImage}
          />
        </View>
        <MapView 
          style={{flex: 0.30}}
          initialRegion={{
            latitude: 6.527730,
            longitude: 3.134468,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <CustomMarker
            uri={previewImage?.uri}
            latitude={previewImage?.latitude}
            longitude={previewImage?.longitude}
          />
        </MapView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    padding: Sizes.padding,
    flex: 1,
    paddingTop: 32
  },
  gridImage: {
    width: (Sizes.width - (Sizes.padding * 2)) * .30,
    aspectRatio: 1,
    borderRadius: Sizes.radius
  },
  cameraBtn: {
    height: Sizes.height * 0.08,
    width: Sizes.height * 0.08,
    borderRadius: 1000,
    backgroundColor: '#29b641',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: Sizes.height * 0.1,
    right: Sizes.padding
  },
  modalImage: {
    flex: 0.7
  }
});
