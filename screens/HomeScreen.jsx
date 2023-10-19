import { Alert, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import Sizes from '../constants/Sizes';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import ZoomableImage from '../components/ZoomableImage';
import MapView, { Marker } from 'react-native-maps';
import CustomMarker from '../components/CustomMarker';
import { useImageGallery } from '../Providers/ImageGallery';

export default function HomeScreen({navigation}) {
  const { images, removeImage } = useImageGallery();
  const [previewImage, setPreviewImage] = useState(null);

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const handlePreviewImage = (image) => {
    bottomSheetRef.current?.expand();
    setPreviewImage(image);
  }

  const handleDeletePhoto = () => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to perform this action?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            removeImage(previewImage?.id);
            setPreviewImage(null);
            bottomSheetRef.current.close();
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={images.reverse()}
        style={styles.flatlist}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePreviewImage(item)}>
            <Image
              style={styles.gridImage}  
              source={{uri: item.uri}} 
            />
          </TouchableOpacity>
        )}
        columnWrapperStyle={{
          gap: 15,
        }}
        contentContainerStyle={{
          gap: 15,
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
        <View style={{flex: 1}}>
          <ZoomableImage 
            uri={previewImage?.uri} 
            style={styles.modalImage}
          />
          <TouchableOpacity 
            style={styles.deleteBtn}
            onPress={handleDeletePhoto}
          >
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <MapView 
          style={{height: Sizes.height * 0.30, width: Sizes.w}}
          region={{
            latitude: previewImage?.latitude || 25.276987,
            longitude: previewImage?.longitude || 55.296249,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {previewImage && <CustomMarker
            uri={previewImage?.uri}
            latitude={previewImage?.latitude}
            longitude={previewImage?.longitude}
          />}
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
    paddingTop: 32,
    width: '100%'
  },
  gridImage: {
    width: (Sizes.width - (Sizes.padding * 2)) * .305,
    aspectRatio: 1,
    borderRadius: Sizes.radius
  },
  cameraBtn: {
    height: Sizes.height * 0.08,
    width: Sizes.height * 0.08,
    borderRadius: 1000,
    backgroundColor: '#0c72d8',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: Sizes.height * 0.1,
    right: Sizes.padding
  },
  modalImage: {
    flex: 0.7
  },
  deleteBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Sizes.height * .07,
    width: Sizes.height * .07,
    borderRadius: 1000,
    backgroundColor: '#00000021',
    position: 'absolute',
    bottom: Sizes.padding,
    right: Sizes.padding
  }
});
