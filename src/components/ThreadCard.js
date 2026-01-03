import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ThreadCard({ thread }) {
  const [voted, setVoted] = useState(null); // 'up', 'down', or null
  const [bookmarked, setBookmarked] = useState(false);

  const exampleThread = {
    id: '1',
    title: 'Best products for low porosity hair?',
    author: 'CurlyGirl123',
    upvotes: 43,
    downvotes: 0,
    comments: 18,
    timeAgo: '2h'
  };

  const { title, author, upvotes, downvotes, comments, timeAgo } = thread || exampleThread;
  
  let displayVotes = upvotes - downvotes;
  if (voted === 'up') displayVotes += 1;
  if (voted === 'down') displayVotes -= 1;

  return (
    <View style={styles.container}>
      {/* Voting Section */}
      <View style={styles.voting}>
        <TouchableOpacity onPress={() => setVoted(voted === 'up' ? null : 'up')}>
          <Ionicons 
            name="chevron-up-outline" 
            size={24} 
            color={voted === 'up' ? "#3b82f6" : "#9ca3af"} 
          />
        </TouchableOpacity>
        <Text style={[styles.voteCount, voted && styles.voteCountActive]}>
          {displayVotes}
        </Text>
        <TouchableOpacity onPress={() => setVoted(voted === 'down' ? null : 'down')}>
          <Ionicons 
            name="chevron-down-outline" 
            size={24} 
            color={voted === 'down' ? "#ef4444" : "#9ca3af"} 
          />
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.metadata}>
          Posted by {author} · {timeAgo}
        </Text>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action}>
            <Ionicons name="chatbubble-outline" size={18} color="#6b7280" />
            <Text style={styles.actionText}>{comments} comments</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.action}
            onPress={() => setBookmarked(!bookmarked)}
          >
            <Ionicons 
              name={bookmarked ? 'bookmark' : 'bookmark-outline'} 
              size={18} 
              color={bookmarked ? "#3b82f6" : "#6b7280"} 
            />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  voting: {
    alignItems: 'center',
    marginRight: 12,
    width: 32
  },
  voteCount: {
    fontSize: 15,
    fontWeight: '700',
    marginVertical: 4,
    color: '#111827'
  },
  voteCountActive: {
    color: '#3b82f6'
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#111827',
    lineHeight: 22
  },
  metadata: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 10
  },
  actions: {
    flexDirection: 'row'
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20
  },
  actionText: {
    marginLeft: 6,
    color: '#6b7280',
    fontSize: 13
  }
});