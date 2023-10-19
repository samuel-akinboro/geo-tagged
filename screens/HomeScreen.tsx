import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import Sizes from '../constants/Sizes';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import ZoomableImage from '../components/ZoomableImage';

export default function HomeScreen({navigation}: any) {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList 
        data={["", "", "", "", "", "", ""]}
        style={styles.flatlist}
        numColumns={3}
        renderItem={({item}) => (
          <TouchableOpacity>
            <Image
              style={styles.gridImage} 
              source={{uri: "https://media.istockphoto.com/id/1041174316/photo/european-telecommunication-network-connected-over-europe-france-germany-uk-italy-concept.jpg?s=612x612&w=0&k=20&c=rrqIaHQDZajRhFTLijbSdTz4JfV2bZVLtPtGRHuvk6o="}} 
            />
          </TouchableOpacity>
        )}
        columnWrapperStyle={{
          gap: 10
        }}
        contentContainerStyle={{
          gap: 10
        }}
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
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <View style={{flex: 0.70, backgroundColor: 'red'}}>
          <ZoomableImage 
            uri="https://media.istockphoto.com/id/1041174316/photo/european-telecommunication-network-connected-over-europe-france-germany-uk-italy-concept.jpg?s=612x612&w=0&k=20&c=rrqIaHQDZajRhFTLijbSdTz4JfV2bZVLtPtGRHuvk6o=" 
            style={styles.modalImage}
          />
        </View>
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
