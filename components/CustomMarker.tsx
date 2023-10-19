import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CustomMarker = ({
  uri,
  latitude,
  longitude
}: any) => {
  return (
    <Marker
      coordinate={{
        latitude,
        longitude
      }}
    >
      <TouchableOpacity>
        <View
          style={styles.marker}
        >
          <Image
            source={{uri}}
            style={styles.markerImage}
          />
        </View>
      </TouchableOpacity>
    </Marker>
  )
}

export default CustomMarker

const styles = StyleSheet.create({
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
})