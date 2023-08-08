import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import Api from '../../hooks/api';

export const initialState = {
  message: [],
  error: null,
};

export const fetchMessage = createAsyncThunk(
  'message/fetch-message',
  async (familyId: number | null) => {
    const { data: message } = await Api.axios.get(`message/family/${familyId}`);
    return message.data.results;
  }
);

export const postMessage = createAsyncThunk(
  'messages/post-messages',
  async (json: unknown) => {
    const { data: messages } = await Api.axios.post(`message/add`, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newMessage = messages.data.result;

    const rename = {
      message_id: newMessage.message_id,
      message_content: newMessage.message_content,
      pseudo: newMessage.pseudo,
    };
    return rename;
  }
);

export const deleteMessage = createAsyncThunk(
  'messages/delete-message',
  async (messageId) => {
    await Api.axios.delete(`message/${messageId}/delete`);
    return messageId;
  }
);

export const clearErrorMessage = createAction('messages/clear-error-message');

const messageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMessage.fulfilled, (state, action) => {
      state.messages = action.payload;
    })
    .addCase(fetchMessage.rejected, (state, action) => {
      state.error = action.error.message;
    })
    .addCase(postMessage.fulfilled, (state, action) => {
      const newMessage = action.payload;
      const newState = {
        ...state,
        messages: [...state.messages, newMessage],
      };
      return newState;
    })
    .addCase(postMessage.rejected, (state, action) => {
      state.error = "Nous n'avons pas pu envoyer votre message";
    })
    .addCase(deleteMessage.fulfilled, (state, action) => {
      const deletedMessageId = action.payload;
      const updatedMessages = state.messages.filter(
        (message) => message.message_id !== deletedMessageId
      );
      state.messages = updatedMessages;
    })
    .addCase(deleteMessage.rejected, (state, action) => {
      state.error = "Nous n'avons pas pu supprimer votre message";
    })
    .addCase(clearErrorMessage, (state) => {
      state.error = null;
    });
});

export default messageReducer;
