'use client'

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addMessage,
  getAllChats,
  loadHistoryMessages,
  removeChat,
  toggleMinimizedState,
} from '../../redux/fratures/chat/chatSlice'
import socketIOClient from 'socket.io-client'
import styles from './Chat.module.scss'
import { ChatWindow } from './ChatWindow.jsx'
import { selectCurrentUser } from '../../redux/fratures/auth/authSlice.js'

export function Chat() {
  const [chatInputs, setChatInputs] = useState({})
  const [socket, setSocket] = useState(null)
  const allChats = useSelector(getAllChats)
  console.log('🚀 ~ Chat ~ allChats:', allChats)
  const dispatch = useDispatch()
  const currentUser = JSON.parse(localStorage.getItem('user_detail'))

  useEffect(() => {
    const initialInputs = {}
    allChats.forEach((chat) => {
      if (!chatInputs[chat.chatId]) {
        initialInputs[chat.chatId] = ''
      }
    })
    if (Object.keys(initialInputs).length > 0) {
      setChatInputs((prev) => ({ ...prev, ...initialInputs }))
    }
  }, [allChats])

  useEffect(() => {
    if (currentUser) {
      const newSocket = socketIOClient('http://localhost:5500')
      setSocket(newSocket)
      newSocket.emit('join', currentUser.id)

      return () => {
        if (newSocket) {
          newSocket.emit('leave', currentUser.id)
          newSocket.disconnect()
        }
      }
    }
  }, [])
  useEffect(() => {
    if (socket && currentUser) {
      allChats.forEach((chat) => {
        if (chat.chatOpenState && chat.messages.length === 0) {
          socket.emit('fetch_chat_history', { chatId: chat.chatId, userId: currentUser.id })
        }
      })
    }
  }, [socket, allChats, currentUser])

  const toggleChat = (chatId) => {
    dispatch(toggleMinimizedState({ chatId }))
  }

  const closeChat = (chatId) => {
    if (socket) {
      socket.emit('leave_chat', { chatId, userId: currentUser.id })
    }
    dispatch(removeChat({ chatId }))
  }

  const handleInputChange = (chatId, value) => {
    setChatInputs((prev) => ({
      ...prev,
      [chatId]: value,
    }))
  }

  const sendMessage = (e, chat) => {
    console.log('🚀 ~ sendMessage ~ chat:', chat)
    e.preventDefault()
    const message = chatInputs[chat.chatId]
    if (message.trim() && socket) {
      const messageData = {
        chatId: chat.chatId,
        senderId: currentUser.id,
        recipientId: chat.recipientId,
        message: message,
      }
      socket.emit('private_message', messageData)
      dispatch(
        addMessage({
          chatId: chat.chatId,
          senderId: currentUser.id,
          message: message,
          timestamp: new Date().toISOString(),
          isSenderMessage: true,
        }),
      )
      handleInputChange(chat.chatId, '')
    }
  }
  return (
    <div className={styles.chatContainer}>
      {allChats.map((chat) => (
        <ChatWindow
          key={chat.chatId}
          chat={chat}
          chatInput={chatInputs[chat.chatId] || ''}
          handleInputChange={handleInputChange}
          toggleChat={toggleChat}
          closeChat={closeChat}
          currentUserId={currentUser.id}
          socket={socket}
        />
      ))}
    </div>
  )
}
