import I18n from 'react-native-i18n';


const language = I18n.locale.substr(0, 2);

I18n.fallbacks = true;
I18n.translations = {
  en: require('./en.json')
};

switch (language) {
  case "zh":
    I18n.translations.zh = require('./zh.json');
    break;
}
