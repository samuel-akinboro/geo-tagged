import { Text, View } from "../components/Themed";
import { Camera, CameraType } from 'expo-camera';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Button, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Sizes from "../constants/Sizes";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from '@gorhom/bottom-sheet';
import ZoomableImage from "../components/ZoomableImage";
import { useImageGallery } from "../Providers/ImageGallery";
import * as Location from 'expo-location';
import "react-native-get-random-values"
import { v4 as uuidv4 } from 'uuid';

export default function() {
  const cameraRef = useRef(null);
  const [picture, setPicture] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const { saveImage } = useImageGallery();
  const [loading, setLoading] = useState(false);
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [locationPermission, setLocationPermission] = useState(null);

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // setPicture(null)
  }, []);

  const handleClosePreview = () => bottomSheetRef?.current?.close()

  useEffect(() => {
    (async () => {
      let { status } = await Location?.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
    })();
  }, []);

  if (!cameraPermission || locationPermission === null) {
    return (
      <SafeAreaView>
        <Text>Loading permissions request...</Text>
      </SafeAreaView>
    );
  }

  if (!cameraPermission.granted || !locationPermission) {
    return (
      <SafeAreaView 
        style={[
          styles.container, {
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
      >
        <Text>Please grant camera and location permissions to use this app.</Text>
        <Button title="Grant Permissions" onPress={() => {requestCameraPermission(); Location?.requestForegroundPermissionsAsync();}} />
      </SafeAreaView>
    );
  }

  // use back camera or front camera
  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  // Take picture
  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      setPicture(photo);
      bottomSheetRef?.current?.expand()
    }
  };

  // Save image to gallery
const savePhoto = async () => {
  if(!loading) {
    setLoading(true)
    let location = await Location.getCurrentPositionAsync({});

    const newUuid = uuidv4();

    saveImage({
      id: newUuid,
      uri: picture?.uri,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }, (loadingState) => {
      if(loadingState == false) {
        setLoading(false)
        setPicture(null);
        handleClosePreview()
      }
    });
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type}
        ref={cameraRef}
      >
        <View style={styles.controlBox}>
          <View style={styles.sides} />

          {/* Take Picture Button */}
          <TouchableOpacity onPress={takePicture}>
            <View style={styles.snapBtn}>
              <View style={styles.snapBtnCircle}/>
            </View>
          </TouchableOpacity>

          {/* Toggle Camera type (Back or Front) */}
          <View style={styles.sides}>
            <TouchableOpacity onPress={toggleCameraType}>
              <Ionicons name="ios-camera-outline" size={Sizes.height * 0.05} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>

      {/* Picture Preview */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        detached={true}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
       <View style={styles.imageContainer}>
        <ZoomableImage uri={picture?.uri} />
       </View>

       {/* Actions */}
       <View style={styles.actionBox}>
          <TouchableOpacity 
            style={styles.trashBtn}
            onPress={() => {
              setPicture(null);
              handleClosePreview()
            }}
          >
            <Text style={styles.trashBtnText}>Trash</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.saveBtn}
            onPress={savePhoto}
          >
            {!loading && <Text style={styles.saveBtnText}>Save</Text>}
            {loading && <ActivityIndicator color="#fff" size={13} />}
          </TouchableOpacity>
       </View>
      </BottomSheet>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1,
    padding: Sizes.padding,
    justifyContent: 'flex-end'
  },
  controlBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    bottom: 40
  },
  snapBtn: {
    height: Sizes.height * 0.12,
    width: Sizes.height * 0.12,
    borderRadius: Sizes.height * 0.12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  snapBtnCircle: {
    height: '70%',
    width: '70%',
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: '#000'
  },
  sides: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'flex-end'
  },
  imageContainer: {
    flex: 1
  },
  actionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: Sizes.padding,
    backgroundColor: '#fff',
    paddingVertical: 50
  },
  trashBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d62f0e',
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  trashBtnText: {
    color: '#d62f0e',
    fontWeight: '600'
  },
  saveBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#0b5bb6',
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#0b5bb6',
    justifyContent: 'center'
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600'
  }
})