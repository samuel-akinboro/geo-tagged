import { Text, View } from "../components/Themed";
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Sizes from "../constants/Sizes";
import { Ionicons } from "@expo/vector-icons";

export default function() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return (
      <SafeAreaView>
        <Text>Loading camera permission request...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView 
        style={[
          styles.container, {
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
      >
        <Text>Please grant camera permission to use this app.</Text>
        <Button title="Grant Permission" onPress={() => requestPermission()} />
      </SafeAreaView>
    );
  }

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }


  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.controlBox}>
          <View style={styles.sides} />
          <TouchableOpacity>
            <View style={styles.snapBtn}>
              <View style={styles.snapBtnCircle}/>
            </View>
          </TouchableOpacity>
          <View style={styles.sides}>
            <TouchableOpacity>
              <Ionicons name="ios-camera-outline" size={Sizes.height * 0.05} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
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
  }
})