import React from 'react';
import Animated, { useAnimatedGestureHandler, useSharedValue, withSpring } from 'react-native-reanimated';
import { PinchGestureHandler } from 'react-native-gesture-handler';

export default function ZoomableImage({ uri }) {
  const scale = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event, context) => {
      event.scale >= 1 ? scale.value = withSpring(event?.scale) : scale.value = 1;
    },
    // onEnd: () => {
    //   scale.value = withSpring(1);
    // },
  });

  return (
    <PinchGestureHandler onGestureEvent={gestureHandler}>
      <Animated.Image
        source={{ uri }}
        style={{
          width: "100%",
          height: "100%",
          transform: [{ scale: scale }]
        }}
        resizeMode="cover"
      />
    </PinchGestureHandler>
  );
}
