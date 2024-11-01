import { ELocales } from '../../Shared/intl/Locales.types';
import { messages } from '../../Shared/intl/react-intl/messages';

export const intlConfig = {
  messages: messages[ELocales.RUSSIAN],
  locale: ELocales.RUSSIAN,
  defaultLocale: ELocales.RUSSIAN,
};
