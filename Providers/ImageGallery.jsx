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

  // const saveImage = async (image) => {
  //   // Save the new image path to AsyncStorage and update the state
  //   const newImages = [...images, image];
  //   setImages(newImages);
  //   await AsyncStorage.setItem('imageGallery', JSON.stringify(newImages));
  // };

  const saveImage = async (image, callback) => {
    callback(true);
    try {
      const newImages = [...images, image];
      setImages(newImages);
      await AsyncStorage.setItem('imageGallery', JSON.stringify(newImages));
    } catch (error) {
      console.error('Error saving image:', error);
    } finally {
      callback(false);
    }
  };

  const removeImage = async (id) => {
    // Remove the image path from AsyncStorage and update the state
    const updatedImages = images.filter((img) => img?.id !== id);
    setImages(updatedImages);
    await AsyncStorage.setItem('imageGallery', JSON.stringify(updatedImages));

    // const updatedImages = images.every((img) => img?.id == id);
    // console.log(updatedImages)
  };

  return (
    <ImageGalleryContext.Provider value={{ images, saveImage, removeImage }}>
      {children}
    </ImageGalleryContext.Provider>
  );
}
