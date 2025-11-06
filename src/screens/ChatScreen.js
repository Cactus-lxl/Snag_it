import React, { useState } from 'react';
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
} from 'react-native';
import tools from '../data/tool';

export default function ChatScreen({ navigation, route }) {
  const { toolId } = route.params;
  const tool = tools.find((t) => t.id === Number(toolId));

  const [messages, setMessages] = useState([
    { sender: 'user', text: 'Hi! Can I rent this tomorrow?', time: '10:30 AM' },
    { sender: 'owner', text: 'Sure! Where should we meet?', time: '10:32 AM' },
  ]);

  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
      });
      
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: inputText, time: timeString },
      ]);
      setInputText('');

      // Mock response
      setTimeout(() => {
        const responseTime = new Date(now.getTime() + 60000).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        });
        setMessages((prev) => [
          ...prev,
          { sender: 'owner', text: "Sounds good! I'll bring it.", time: responseTime },
        ]);
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{tool?.name || 'Chat'}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Chat Body */}
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView 
          style={styles.chatBody}
          contentContainerStyle={styles.chatBodyContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, idx) => (
            <View
              key={idx}
              style={[
                styles.messageWrapper,
                msg.sender === 'user' && styles.messageWrapperUser,
              ]}
            >
              <View
                style={[
                  styles.message,
                  msg.sender === 'user' ? styles.messageUser : styles.messageOwner,
                ]}
              >
                <Text style={styles.messageText}>{msg.text}</Text>
              </View>
              <Text style={styles.messageTime}>{msg.time}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Chat Footer */}
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
            />
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => alert('Rental Confirmed!')}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F3',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#C4C9A0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 28,
    color: '#1A1A1A',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 38,
  },
  keyboardView: {
    flex: 1,
  },
  chatBody: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatBodyContent: {
    paddingVertical: 20,
    gap: 15,
  },
  messageWrapper: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  messageWrapperUser: {
    alignItems: 'flex-end',
  },
  message: {
    maxWidth: '70%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  messageUser: {
    backgroundColor: '#C4C9A0',
    borderBottomRightRadius: 6,
  },
  messageOwner: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1A1A1A',
  },
  messageTime: {
    fontSize: 12,
    color: '#6B6B6B',
    marginTop: 5,
    paddingHorizontal: 8,
  },
  chatFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#FAF8F3',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  sendButton: {
    backgroundColor: '#C4C9A0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  confirmButton: {
    backgroundColor: '#6B9BD1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
