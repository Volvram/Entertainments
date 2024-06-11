import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { setupStore } from '@/Store/store.ts';

import App from './App.tsx';

import './index.scss';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
