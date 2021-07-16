import path from 'path';
import Vuex from 'vuex'

export default {
    install: (app, options) => {
        app.use(Vuex);

        if (!Object.prototype.hasOwnProperty.call(app, '$store')) {
            const _modules = {}
            const requireContext = require.context('@/store/modules', false, /\.js$/i)

            requireContext
            .keys().forEach(file => {
                const _baseName = path.basename(file, '.js')
                Object.assign(_modules, {
                    [_baseName]: requireContext(file).default
                })
            })

            app.prototype.$store = new Vuex.Store({
                modules: _modules,
                strict: process.env.NODE_ENV !== 'production',
                mutations: {
                    initialiseStore(state) {
                        // Check if the ID exists
                        if(localStorage.getItem('store')) {
                            // Replace the state object with the stored item
                            this.replaceState(
                                Object.assign(state, JSON.parse(localStorage.getItem('store')))
                            );
                        }
                    }
                },
            })

            app.prototype.$store.subscribe((mutation, state) => {
                // Store the state object as a JSON string
                localStorage.setItem('store', JSON.stringify(state));
            });
        }
    },
};