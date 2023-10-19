// ImageGalleryProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImageGalleryContext = createContext();

export function useImageGallery() {
  return useContext(ImageGalleryContext);
}

export function ImageGalleryProvider({ children }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Load images from AsyncStorage when the app initializes
    AsyncStorage.getItem('imageGallery')
      .then((storedImages) => {
        if (storedImages) {
          setImages(JSON.parse(storedImages));
        }
      });
  }, []);

  const saveImage = async (image: any) => {
    // Save the new image path to AsyncStorage and update the state
    const newImages = [...images, image];
    setImages(newImages);
    await AsyncStorage.setItem('imageGallery', JSON.stringify(newImages));
  };

  const removeImage = async (image) => {
    // Remove the image path from AsyncStorage and update the state
    const updatedImages = images.filter((image) => image?.id !== image?.id);
    setImages(updatedImages);
    await AsyncStorage.setItem('imageGallery', JSON.stringify(updatedImages));
  };

  return (
    <ImageGalleryContext.Provider value={{ images, saveImage, removeImage }}>
      {children}
    </ImageGalleryContext.Provider>
  );
}
