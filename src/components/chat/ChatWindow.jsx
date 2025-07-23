/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import styles from './Chat.module.scss'
import { useDispatch } from 'react-redux'
import socketIOClient from 'socket.io-client'
import { addMessage, loadHistoryMessages } from '../../redux/fratures/chat/chatSlice'

export const ChatWindow = ({
  chat,
  chatInput,
  handleInputChange,
  sendMessage,
  toggleChat,
  closeChat,
  currentUserId,
  socket,
}) => {
  const { chatId, isMinimized, messages, socketStatus } = chat
  const dispatch = useDispatch()

  useEffect(() => {
    if (socket && currentUserId) {
      socket.on('receive_message', ({ chatId: receivedChatId, senderId, message }) => {
        if (senderId !== currentUserId && receivedChatId === chatId) {
          dispatch(
            addMessage({
              chatId: chatId,
              recipientId: senderId,
              message: message,
              timestamp: new Date().toISOString(),
              isSenderMessage: false,
            }),
          )
        }
      })

      socket.on('chat_history', (messages) => {
        if (messages.length > 0 && messages[0].chatId === chatId) {
          dispatch(loadHistoryMessages({ chatId, messages }))
        }
      })

      return () => {
        socket.off('receive_message')
        socket.off('chat_history')
      }
    }
  }, [socket, currentUserId, chatId, dispatch])

  useEffect(() => {
    if (socket && currentUserId && chat.chatOpenState && messages.length === 0) {
      socket.emit('fetch_chat_history', { chatId, userId: currentUserId })
    }
  }, [socket, currentUserId, chat.chatOpenState, messages.length, chatId])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (chatInput.trim() && socket) {
      const messageData = {
        chatId: chatId,
        senderId: currentUserId,
        recipientId: chat.recipientId,
        message: chatInput,
        senderType: 'CLIENT',
      }
      socket.emit('private_message', messageData)
      dispatch(
        addMessage({
          chatId: chatId,
          senderId: currentUserId,
          message: chatInput,
          timestamp: new Date().toISOString(),
          isSenderMessage: true,
        }),
      )
      handleInputChange(chatId, '')
    }
  }

  return (
    <div className={`${styles.chatWindow} ${isMinimized ? styles.minimizedChat : ''}`}>
      <div className={styles.chatHeader}>
        <div className={styles.chatInfo}>
          <h3>{isMinimized ? `Chat ${chatId} (Minimized)` : `Chat ${chatId}`}</h3>
          <span className={styles.socketStatus}>{socketStatus}</span>
        </div>
        <button onClick={() => toggleChat(chatId)} className={styles.minimizeButton}>
          {isMinimized ? '⬆' : '⬇'}
        </button>
        <button onClick={() => closeChat(chatId)} className={styles.closeButton}>
          ✖
        </button>
      </div>
      {!isMinimized && (
        <>
          <div className={styles.chatMessages}>
            {messages?.map((message, index) => (
              <div
                key={`${message.timestamp}-${index}`}
                className={`${styles.message} ${message.senderType == 'CLIENT' ? styles.userMessage : styles.botMessage}`}
              >
                <div className={styles.messageContent}>{message.message}</div>
                <div className={styles.messageTime}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className={styles.chatInputContainer}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => handleInputChange(chatId, e.target.value)}
              placeholder="Type a message..."
              className={styles.chatInput}
            />
            <button type="submit" className={styles.sendButton} disabled={!chatInput.trim()}>
              Send
            </button>
          </form>
        </>
      )}
    </div>
  )
}
