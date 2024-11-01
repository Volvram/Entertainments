import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import { intlConfig } from './config/intlConfig.ts';
import { store } from './ConfigureRTK/store.ts';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <IntlProvider
    messages={intlConfig.messages}
    locale={intlConfig.locale}
    defaultLocale={intlConfig.defaultLocale}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </IntlProvider>
);
