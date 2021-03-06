// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import { configureStore } from '@reduxjs/toolkit';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';
import userDataContext from './lib/context';
import userData from './lib/userData';
import reducers, { actions } from './slices';
import connectSocket from './socket';


export default (gon) => {
  console.log('it works!');
  console.log('gon', gon);
  const preloadedState = {
    channels: {
      entities: gon.channels,
      currentChannelId: gon.currentChannelId,
    },
    messages: {
      entities: gon.messages,
    },
  };

  const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });

  const { dispatch } = store;
  const socket = connectSocket(document.URL);

  socket.on('newMessage', (data) => {
    dispatch(actions.addMessage(data));
  });
  socket.on('newChannel', (data) => {
    dispatch(actions.addChannel(data));
  });
  socket.on('renameChannel', (data) => {
    dispatch(actions.renameChannel(data));
  });
  socket.on('removeChannel', (data) => {
    dispatch(actions.removeChannel(data));
  });

  ReactDOM.render(
    <Provider store={store}>
      <userDataContext.Provider value={userData}>
        <App />
      </userDataContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );

  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }
};
