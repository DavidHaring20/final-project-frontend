import path from 'path';
import VueI18n from 'vue-i18n';

export default {
    install: (app, options) => {
        app.use(VueI18n);
        if (!Object.prototype.hasOwnProperty.call(app, '$i18n')) {
            const _locales = {}
            const _files = require.context('@/locales', true, /\.json$/i)
            _files.keys().map(file => Object.assign(_locales, {
                [path.basename(file, '.json')]: _files(file)
            }))

            const _fallbackLocale = 'en'
            const _navigatorLocale = navigator.language.split('-')[0] || _fallbackLocale
            let _locale = localStorage.getItem('locale')

            if(!_locale) _locale = Object.keys(_locales).includes(_navigatorLocale) ? _navigatorLocale : _fallbackLocale

            app.prototype._i18n = new VueI18n({
                locale: _locale,
                messages: _locales,
                fallbackLocale: _fallbackLocale,
                silentTranslationWarn: true,
                formatFallbackMessages: true
            });
        }
    },
};

