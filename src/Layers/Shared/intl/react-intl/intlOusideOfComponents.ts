import { createIntl, createIntlCache } from 'react-intl';

import { intlConfig } from '../../../App/config/intlConfig';

const cache = createIntlCache();

export const intlOutsideOfComponents = createIntl(
  {
    locale: intlConfig.locale,
    messages: intlConfig.messages,
  },
  cache
);
