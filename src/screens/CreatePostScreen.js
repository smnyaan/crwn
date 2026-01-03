import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function CreatePostScreen() {
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  
  const pickImage = async () => {
    Alert.alert(
      'Add Photo',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: takePhoto
        },
        {
          text: 'Choose from Library',
          onPress: chooseFromLibrary
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow camera access to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const chooseFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (!imageUri) {
      Alert.alert('No image', 'Please add a photo to your post.');
      return;
    }

    if (!description.trim()) {
      Alert.alert('No description', 'Please add a description to your post.');
      return;
    }

    // Here you would upload the post to your backend
    Alert.alert('Success', 'Post created!', [
      {
        text: 'OK',
        onPress: () => {
          // Reset form
          setImageUri(null);
          setDescription('');
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Image Upload Section */}
      <TouchableOpacity style={styles.uploadSection} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
        ) : (
          <View style={styles.uploadPlaceholder}>
            <Ionicons name="camera" size={48} color="#9ca3af" />
            <Text style={styles.uploadText}>Tap to add photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Change Photo Button (if image is selected) */}
      {imageUri && (
        <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
          <Ionicons name="images-outline" size={20} color="#3b82f6" />
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      )}

      {/* Description Input */}
      <TextInput
        style={styles.input}
        placeholder="Write a description..."
        placeholderTextColor="#9ca3af"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      {/* Tag Stylist Section */}
      <TouchableOpacity style={styles.tagSection}>
        <Ionicons name="person-add-outline" size={24} color="#3b82f6" />
        <Text style={styles.tagText}>Tag your stylist</Text>
      </TouchableOpacity>

      {/* Post Button */}
      <TouchableOpacity 
        style={[styles.postButton, (!imageUri || !description.trim()) && styles.postButtonDisabled]} 
        onPress={handlePost}
        disabled={!imageUri || !description.trim()}
      >
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  uploadSection: {
    aspectRatio: 4/5,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden'
  },
  uploadPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadedImage: {
    width: '100%',
    height: '100%'
  },
  uploadText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280'
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: 12
  },
  changePhotoText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500'
  },
  input: {
    height: 80,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    textAlignVertical: 'top'
  },
  tagSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },
  tagText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#3b82f6'
  },
  postButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto'
  },
  postButtonDisabled: {
    backgroundColor: '#9ca3af',
    opacity: 0.5
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});