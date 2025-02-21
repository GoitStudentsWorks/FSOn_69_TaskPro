import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './utils/index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from 'store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Loader } from 'components/Loader';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <BrowserRouter basename="/FSOn_69_TaskPro">
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
