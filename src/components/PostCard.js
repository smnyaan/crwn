import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const examplePost = {
    id: '1',
    image: 'placeholder.jpg',
    description: 'Natural curls styled for everyday elegance ✨',
    stylist: 'CurlSpecialist',
    likes: 245,
    comments: 42
  };

  const { image, description, stylist, likes, comments, imageSource } = post || examplePost;

  return (
    <View style={styles.container}>
      {/* Post Image */}
      <View style={styles.imageContainer}>
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.stylist}>Stylist: <Text style={styles.stylistName}>{stylist}</Text></Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setLiked(!liked)}
        >
          <Ionicons 
            name={liked ? "heart" : "heart-outline"} 
            size={22} 
            color={liked ? "#ef4444" : "#6b7280"} 
          />
          <Text style={styles.actionText}>{liked ? likes + 1 : likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={22} color="#6b7280" />
          <Text style={styles.actionText}>{comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.bookmarkButton]}
          onPress={() => setBookmarked(!bookmarked)}
        >
          <Ionicons 
            name={bookmarked ? "bookmark" : "bookmark-outline"} 
            size={22} 
            color={bookmarked ? "#3b82f6" : "#6b7280"} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 0,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: 400
  },
  imagePlaceholder: {
    backgroundColor: '#e5e7eb',
    width: '100%',
    height: '100%'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  content: {
    padding: 16,
    paddingBottom: 12
  },
  description: {
    fontSize: 15,
    marginBottom: 8,
    color: '#111827',
    lineHeight: 20
  },
  stylist: {
    fontSize: 14,
    color: '#6b7280'
  },
  stylistName: {
    color: '#3b82f6',
    fontWeight: '500'
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: 'center'
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20
  },
  bookmarkButton: {
    marginLeft: 'auto',
    marginRight: 0
  },
  actionText: {
    marginLeft: 6,
    color: '#6b7280',
    fontSize: 14
  }
});
