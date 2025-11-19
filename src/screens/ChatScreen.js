import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';

const CHAT_STORAGE_KEY = '@snagit_chat_messages';

export default function ChatScreen({ navigation, route }) {
  const { user } = useUser();
  const isSeller = user?.role === 'rentee';

  const toolId = route.params?.toolId;
  const [inputText, setInputText] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  // Load saved messages from AsyncStorage on mount
  useEffect(() => {
    loadSavedMessages();
  }, []);

  // Save messages whenever they change
  useEffect(() => {
    if (selectedChat) {
      saveChatMessages();
    }
  }, [chatMessages, selectedChat]);

  const loadSavedMessages = async () => {
    try {
      const savedData = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Update conversations with saved messages
        // This will be handled when a chat is opened
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveChatMessages = async () => {
    try {
      const savedData = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
      const allChats = savedData ? JSON.parse(savedData) : {};

      // Save messages for the current chat
      allChats[selectedChat.id] = chatMessages;

      await AsyncStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(allChats));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  // Generate mock conversations based on user role
  const conversations = useMemo(() => {
    if (isSeller) {
      // Seller conversations
      return [
        {
          id: 1,
          userName: 'Sarah M.',
          userAvatar: '👩',
          lastMessage: 'Thank you! The drill worked perfectly.',
          time: '10 min ago',
          unread: 0,
          messages: [
            { id: 1, sender: 'them', text: 'Hi! Is the drill still available for rent this weekend?', time: '2:15 PM', isSystem: false },
            { id: 2, sender: 'me', text: 'Yes, it is! Would you like to book it through the app?', time: '2:18 PM', isSystem: false },
            { id: 3, sender: 'them', text: 'Perfect! I just submitted a booking request for Saturday-Sunday.', time: '2:20 PM', isSystem: false },
            { id: 4, sender: 'me', text: 'Great! I approved your booking. See you Saturday!', time: '2:22 PM', isSystem: false },
            { id: 5, sender: 'them', text: 'Thank you! The drill worked perfectly.', time: '4:30 PM', isSystem: false },
          ],
        },
        {
          id: 2,
          userName: 'Snag-It System',
          userAvatar: '🤖',
          lastMessage: 'Please confirm the return condition',
          time: '1 hour ago',
          unread: 1,
          messages: [
            { id: 1, sender: 'system', text: 'Your renter has marked the item "Power Drill Set" as returned. Please confirm the condition of the returned item.', time: '3:45 PM', isSystem: true },
            { id: 2, sender: 'system', text: 'Select one of the following:\n\n✅ Returned (Good condition)\n⚠️ Damaged (Minor issues)\n🚨 Broken (Not functional)\n🔴 Not Returned', time: '3:45 PM', isSystem: true, hasActions: true, actionType: 'return_condition' },
          ],
        },
        {
          id: 3,
          userName: 'Mike J.',
          userAvatar: '👨',
          lastMessage: 'How many times has this been rented?',
          time: '3 hours ago',
          unread: 1,
          messages: [
            { id: 1, sender: 'them', text: 'Hey! I saw your tent on the dashboard. How many times have you rented it out?', time: '1:30 PM', isSystem: false },
            { id: 2, sender: 'them', text: 'Also, does it come with stakes and poles?', time: '1:31 PM', isSystem: false },
          ],
        },
        {
          id: 4,
          userName: 'Snag-It System',
          userAvatar: '🤖',
          lastMessage: 'Please confirm return condition',
          time: '5 hours ago',
          unread: 0,
          messages: [
            { id: 1, sender: 'system', text: 'Your renter has marked the item "Camping Tent" as returned. Please confirm the condition of the returned item.', time: '10:30 AM', isSystem: true },
            { id: 2, sender: 'system', text: 'Select one of the following:\n\n✅ Returned (Good condition)\n⚠️ Damaged (Minor issues)\n🚨 Broken (Not functional)\n🔴 Not Returned', time: '10:30 AM', isSystem: true, hasActions: true, actionType: 'return_condition' },
          ],
        },
        {
          id: 5,
          userName: 'Snag-It System',
          userAvatar: '🤖',
          lastMessage: 'New booking request received!',
          time: 'Yesterday',
          unread: 0,
          messages: [
            { id: 1, sender: 'system', text: '🎉 You have a new booking request!\n\nItem: Camera Lens\nRenter: Emily R.\nDates: Dec 15-17\nTotal: $75.00\n\nPlease respond within 24 hours.', time: 'Yesterday 5:20 PM', isSystem: true, hasActions: true, actionType: 'booking_request' },
            { id: 2, sender: 'system', text: '✅ You approved the booking request. Payment has been processed.', time: 'Yesterday 6:15 PM', isSystem: true },
          ],
        },
      ];
    } else {
      // Buyer conversations
      return [
        {
          id: 1,
          userName: 'John (Drill Owner)',
          userAvatar: '👨‍🔧',
          lastMessage: 'Sure! It comes with all the bits.',
          time: '5 min ago',
          unread: 1,
          messages: [
            { id: 1, sender: 'me', text: 'Hi! I saw this drill on my dashboard. How many times have you rented it out?', time: '3:45 PM', isSystem: false },
            { id: 2, sender: 'them', text: 'Hey! I\'ve rented it about 8 times. It\'s in great condition!', time: '3:47 PM', isSystem: false },
            { id: 3, sender: 'me', text: 'Perfect! Does it come with drill bits?', time: '3:48 PM', isSystem: false },
            { id: 4, sender: 'them', text: 'Sure! It comes with all the bits. Feel free to book it through the app!', time: '3:50 PM', isSystem: false },
          ],
        },
        {
          id: 2,
          userName: 'Snag-It System',
          userAvatar: '🤖',
          lastMessage: 'Your booking has been approved!',
          time: '1 hour ago',
          unread: 0,
          messages: [
            { id: 1, sender: 'system', text: '✅ Your booking request has been approved!\n\nItem: Power Drill Set\nOwner: John D.\nDates: Dec 10-12\nTotal: $45.00\n\nPayment will be processed now.', time: '2:30 PM', isSystem: true },
            { id: 2, sender: 'system', text: '💳 Payment confirmed! You can pick up the item at the agreed location.', time: '2:31 PM', isSystem: true },
          ],
        },
        {
          id: 3,
          userName: 'Lisa (Camera Owner)',
          userAvatar: '📸',
          lastMessage: 'It has image stabilization!',
          time: '2 hours ago',
          unread: 0,
          messages: [
            { id: 1, sender: 'me', text: 'Hi! Does your camera have image stabilization?', time: '12:15 PM', isSystem: false },
            { id: 2, sender: 'them', text: 'Yes! It has image stabilization. Perfect for video work.', time: '12:20 PM', isSystem: false },
            { id: 3, sender: 'me', text: 'Awesome! I\'ll send a booking request shortly.', time: '12:22 PM', isSystem: false },
          ],
        },
        {
          id: 4,
          userName: 'Snag-It System',
          userAvatar: '🤖',
          lastMessage: 'Please rate your rental experience',
          time: 'Yesterday',
          unread: 1,
          messages: [
            { id: 1, sender: 'system', text: '📦 Your rental period has ended.\n\nItem: Camping Tent\nOwner: David M.\n\nPlease confirm that you have returned the item and rate your experience.', time: 'Yesterday 6:00 PM', isSystem: true, hasActions: true, actionType: 'rate_return' },
          ],
        },
        {
          id: 5,
          userName: 'David (Tent Owner)',
          userAvatar: '⛺',
          lastMessage: 'Great! Looking forward to it.',
          time: '2 days ago',
          unread: 0,
          messages: [
            { id: 1, sender: 'me', text: 'Hey! I saw your tent listing. Is it waterproof?', time: '2 days ago', isSystem: false },
            { id: 2, sender: 'them', text: 'Yes, it\'s completely waterproof. Used it in heavy rain many times!', time: '2 days ago', isSystem: false },
            { id: 3, sender: 'me', text: 'Perfect! I\'ll book it for next weekend through the app.', time: '2 days ago', isSystem: false },
            { id: 4, sender: 'them', text: 'Great! Looking forward to it.', time: '2 days ago', isSystem: false },
          ],
        },
      ];
    }
  }, [isSeller]);

  const openChat = async (conversation) => {
    setSelectedChat(conversation);

    // Try to load saved messages for this conversation
    try {
      const savedData = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
      if (savedData) {
        const allChats = JSON.parse(savedData);
        if (allChats[conversation.id]) {
          setChatMessages(allChats[conversation.id]);
          return;
        }
      }
    } catch (error) {
      console.error('Error loading chat messages:', error);
    }

    // If no saved messages, use default
    setChatMessages(conversation.messages);
  };

  const sendMessage = () => {
    if (inputText.trim() && selectedChat) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'me',
          text: inputText,
          time: timeString,
          isSystem: false,
        },
      ]);
      setInputText('');

      // Mock auto-response
      setTimeout(() => {
        const responseTime = new Date(now.getTime() + 30000).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        });
        setChatMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'them',
            text: 'Thanks for your message! I\'ll get back to you soon.',
            time: responseTime,
            isSystem: false,
          },
        ]);
      }, 2000);
    }
  };

  const handleSystemAction = (action, messageId) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });

    let systemResponse = '';

    if (action === 'returned') {
      systemResponse = '✅ Thank you for confirming!\n\nThank you for using Snag-It! We\'re happy that this rental went smoothly for you. Your professionalism helps build trust in our community. 🎉';
    } else if (action === 'damaged') {
      systemResponse = '⚠️ Report received.\n\nPlease wait while we verify the situation. Our support team will review the damage report and protect your rights. We\'ll contact you within 24 hours with next steps.';
    } else if (action === 'broken') {
      systemResponse = '🚨 Urgent report received.\n\nPlease wait while we verify the situation. Our team will investigate immediately to protect your item and rights. You\'ll hear from us within 12 hours. We take this seriously.';
    } else if (action === 'not_returned') {
      systemResponse = '🔴 Critical report received.\n\nPlease wait while we verify the situation. Our security team has been notified and will work to protect your rights and recover your item. We will contact you immediately.';
    } else if (action === 'approve') {
      systemResponse = '✅ Booking approved! Payment has been processed and both parties have been notified.';
    } else if (action === 'rate') {
      systemResponse = '⭐ Thank you for your feedback! Your rating helps our community.';
    }

    if (systemResponse) {
      // Remove the action buttons from the message
      setChatMessages((prev) =>
          prev.map((msg) =>
              msg.id === messageId ? { ...msg, hasActions: false, actionTaken: true } : msg
          )
      );

      // Add system response
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'system',
            text: systemResponse,
            time: timeString,
            isSystem: true,
            isResponse: true,
          },
        ]);
      }, 500);
    }
  };

  const renderMessage = ({ item }) => {
    if (item.isSystem) {
      return (
          <View style={styles.systemMessageWrapper}>
            <View style={[styles.systemMessage, item.isResponse && styles.systemMessageResponse]}>
              <Ionicons
                  name="information-circle"
                  size={20}
                  color={item.isResponse ? "#6BAA38" : "#4A90E2"}
                  style={styles.systemIcon}
              />
              <Text style={styles.systemMessageText}>{item.text}</Text>
            </View>

            {/* Return condition buttons */}
            {item.hasActions && !item.actionTaken && item.actionType === 'return_condition' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                      style={[styles.actionButton, styles.actionButtonGreen]}
                      onPress={() => handleSystemAction('returned', item.id)}
                  >
                    <Text style={styles.actionButtonText}>✅ Good</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={[styles.actionButton, styles.actionButtonYellow]}
                      onPress={() => handleSystemAction('damaged', item.id)}
                  >
                    <Text style={styles.actionButtonText}>⚠️ Damaged</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={[styles.actionButton, styles.actionButtonRed]}
                      onPress={() => handleSystemAction('broken', item.id)}
                  >
                    <Text style={styles.actionButtonText}>🚨 Broken</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={[styles.actionButton, styles.actionButtonDark]}
                      onPress={() => handleSystemAction('not_returned', item.id)}
                  >
                    <Text style={styles.actionButtonText}>🔴 Not Returned</Text>
                  </TouchableOpacity>
                </View>
            )}

            {/* Booking request button */}
            {item.hasActions && !item.actionTaken && item.actionType === 'booking_request' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                      style={[styles.actionButton, styles.actionButtonGreen]}
                      onPress={() => handleSystemAction('approve', item.id)}
                  >
                    <Text style={styles.actionButtonText}>Approve Booking</Text>
                  </TouchableOpacity>
                </View>
            )}

            {/* Rate and return button */}
            {item.hasActions && !item.actionTaken && item.actionType === 'rate_return' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                      style={[styles.actionButton, styles.actionButtonBlue]}
                      onPress={() => handleSystemAction('rate', item.id)}
                  >
                    <Text style={styles.actionButtonText}>⭐ Rate & Confirm Return</Text>
                  </TouchableOpacity>
                </View>
            )}

            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
      );
    }

    return (
        <View
            style={[
              styles.messageWrapper,
              item.sender === 'me' && styles.messageWrapperUser,
            ]}
        >
          <View
              style={[
                styles.message,
                item.sender === 'me' ? styles.messageUser : styles.messageOwner,
              ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );
  };

  // Show chat list when no conversation is selected
  if (!selectedChat) {
    return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />

          <View style={styles.header}>
            <Text style={styles.title}>Messages</Text>
            <Text style={styles.subtitle}>
              {isSeller ? 'Manage your rentals' : 'Chat with owners'}
            </Text>
          </View>

          <FlatList
              data={conversations}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                  <TouchableOpacity
                      style={styles.conversationItem}
                      onPress={() => openChat(item)}
                      activeOpacity={0.7}
                  >
                    <View style={styles.avatarContainer}>
                      <Text style={styles.avatar}>{item.userAvatar}</Text>
                      {item.unread > 0 && (
                          <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>{item.unread}</Text>
                          </View>
                      )}
                    </View>
                    <View style={styles.conversationContent}>
                      <View style={styles.conversationHeader}>
                        <Text style={styles.conversationName}>{item.userName}</Text>
                        <Text style={styles.conversationTime}>{item.time}</Text>
                      </View>
                      <Text
                          style={[
                            styles.conversationMessage,
                            item.unread > 0 && styles.conversationMessageUnread,
                          ]}
                          numberOfLines={1}
                      >
                        {item.lastMessage}
                      </Text>
                    </View>
                  </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </SafeAreaView>
    );
  }

  // Show individual chat
  return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.chatHeader}>
          <TouchableOpacity
              onPress={() => setSelectedChat(null)}
              style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatHeaderName}>{selectedChat.userName}</Text>
            <Text style={styles.chatHeaderStatus}>Active now</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={90}
        >
          <FlatList
              data={chatMessages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderMessage}
              contentContainerStyle={styles.chatBodyContent}
              showsVerticalScrollIndicator={false}
          />

          <View style={styles.chatFooter}>
            <View style={styles.inputWrapper}>
              <TextInput
                  style={styles.input}
                  placeholder="Type a message..."
                  placeholderTextColor="#6B6B6B"
                  value={inputText}
                  onChangeText={setInputText}
                  onSubmitEditing={sendMessage}
                  returnKeyType="send"
                  multiline
              />
            </View>
            <TouchableOpacity
                style={styles.sendButton}
                onPress={sendMessage}
                disabled={!inputText.trim()}
            >
              <Ionicons
                  name="send"
                  size={20}
                  color={inputText.trim() ? '#FFFFFF' : '#A0A0A0'}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F6',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    fontSize: 40,
    width: 56,
    height: 56,
    textAlign: 'center',
    lineHeight: 56,
    backgroundColor: '#F0F7E8',
    borderRadius: 28,
    overflow: 'hidden',
  },
  unreadBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  conversationTime: {
    fontSize: 12,
    color: '#9B9B9B',
  },
  conversationMessage: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  conversationMessageUnread: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 84,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  backButton: {
    padding: 8,
  },
  chatHeaderInfo: {
    flex: 1,
    alignItems: 'center',
  },
  chatHeaderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  chatHeaderStatus: {
    fontSize: 12,
    color: '#6BAA38',
  },
  placeholder: {
    width: 40,
  },
  keyboardView: {
    flex: 1,
  },
  chatBodyContent: {
    padding: 16,
    gap: 12,
  },
  messageWrapper: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  messageWrapperUser: {
    alignItems: 'flex-end',
  },
  message: {
    maxWidth: '75%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  messageUser: {
    backgroundColor: '#C4C9A0',
    borderBottomRightRadius: 4,
  },
  messageOwner: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#1A1A1A',
  },
  messageTime: {
    fontSize: 11,
    color: '#9B9B9B',
    marginTop: 4,
    paddingHorizontal: 8,
  },
  systemMessageWrapper: {
    alignItems: 'center',
    marginVertical: 8,
  },
  systemMessage: {
    flexDirection: 'row',
    backgroundColor: '#E8F4FD',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    maxWidth: '90%',
    borderWidth: 1,
    borderColor: '#B3D9F2',
  },
  systemMessageResponse: {
    backgroundColor: '#E8F5E9',
    borderColor: '#A5D6A7',
  },
  systemIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  systemMessageText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#1A1A1A',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonGreen: {
    backgroundColor: '#6BAA38',
  },
  actionButtonYellow: {
    backgroundColor: '#FFA500',
  },
  actionButtonRed: {
    backgroundColor: '#FF4444',
  },
  actionButtonDark: {
    backgroundColor: '#8B0000',
  },
  actionButtonBlue: {
    backgroundColor: '#4A90E2',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  chatFooter: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    gap: 8,
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
  },
  input: {
    fontSize: 15,
    color: '#1A1A1A',
    maxHeight: 80,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6BAA38',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});