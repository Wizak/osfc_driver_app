import { I18n } from 'i18n-js';

import { Locales } from '../constants/enums';
import enTranslations from './lang/en.json';

const i18n = new I18n({
    [Locales.en]: enTranslations,
});
i18n.enableFallback = true;

export default i18n;
