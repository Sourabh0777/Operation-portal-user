import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chats: [], // Array of chat objects
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addOrUpdateChat: (state, action) => {
      const { chatId, userId, recipientId, isMinimized, chatOpenState, messages } = action.payload
      const existingChatIndex = state.chats.findIndex((chat) => chat.chatId === chatId)

      if (existingChatIndex === -1) {
        // Add a new chat
        state.chats.push({
          userId: userId || null,
          chatId,
          recipientId: recipientId || null,
          chatOpenState: chatOpenState || false,
          isMinimized: isMinimized || false,
          messages: messages || [],
        })
      } else {
        // Update existing chat
        const chat = state.chats[existingChatIndex]
        chat.userId = userId || chat.userId
        chat.recipientId = recipientId || chat.recipientId
        chat.chatOpenState = chatOpenState !== undefined ? chatOpenState : chat.chatOpenState
        chat.isMinimized = isMinimized !== undefined ? isMinimized : chat.isMinimized
        chat.messages = messages || chat.messages
      }
    },
    toggleMinimizedState: (state, action) => {
      const { chatId } = action.payload
      const chat = state.chats.find((chat) => chat.chatId === chatId)
      if (chat) {
        chat.isMinimized = !chat.isMinimized
      }
    },
    toggleChatState: (state, action) => {
      const { chatId } = action.payload
      const chat = state.chats.find((chat) => chat.chatId === chatId)
      if (chat) {
        chat.chatOpenState = !chat.chatOpenState
        if (!chat.chatOpenState) {
          chat.isMinimized = false // Reset minimized state when chat is closed
        }
      }
    },
    addMessage: (state, action) => {
      const { chatId, senderId, recipientId, message, timestamp, isSenderMessage } = action.payload
      const chat = state.chats.find((chat) => {
        return chat.chatId == chatId
      })
      if (!chat) {
        console.error(`Chat with chatId ${chatId} not found.`)
        return
      }
      if (chat) {
        if (senderId) {
          // Message sent by the current user
          chat.messages.push({
            message,
            senderId,
            isSent: true, // Mark the message as sent
            timestamp: timestamp,
            isSenderMessage, // Optional: Timestamp for sorting
          })
        }

        if (recipientId) {
          // Message received by the recipient
          chat.messages.push({
            message,
            recipientId,
            isSent: false, // Mark the message as received
            timestamp: timestamp,
            isSenderMessage, // Optional: Timestamp for sorting
          })
        }
      }
    },
    removeChat: (state, action) => {
      const { chatId } = action.payload
      state.chats = state.chats.filter((chat) => chat.chatId !== chatId)
    },
    loadHistoryMessages: (state, action) => {
      const oldMessages = action.payload
      const chat = state.chats.find((chat) => {
        return chat.chatId == oldMessages.chatId
      })
      chat.messages = oldMessages.messages
    },
  },
})

export const {
  addOrUpdateChat,
  toggleMinimizedState,
  toggleChatState,
  addMessage,
  removeChat,
  loadHistoryMessages,
} = chatSlice.actions

export default chatSlice.reducer

// Selectors
export const getChatById = (state, chatId) =>
  state.chat.chats.find((chat) => chat.chatId === chatId) || null

export const getAllChats = (state) => state.chat.chats

export const getMessagesByChatId = (state, chatId) => {
  const chat = state.chat.chats.find((chat) => chat.chatId === chatId)
  return chat ? chat.messages : []
}

export const getMinimizedStateByChatId = (state, chatId) => {
  const chat = state.chat.chats.find((chat) => chat.chatId === chatId)
  return chat ? chat.isMinimized : false
}

export const getChatOpenStateById = (state, chatId) => {
  const chat = state.chat.chats.find((chat) => chat.chatId === chatId)
  return chat ? chat.chatOpenState : false
}
