
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMask from 'v-mask';
import VueQRCodeComponent from 'vue-qr-generator';
import CountryFlag from 'vue-country-flag'
import VModal from 'vue-js-modal'
import Vuelidate from 'vuelidate'
import VueSimpleAlert from "vue-simple-alert";
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'

window.toastr = require('toastr')

Vue.use(VueToastr2)
import './assets/styles/app.css'

Vue.use(VueMask);
Vue.use(VueRouter);
Vue.use(VModal, {componentName: 'Modal'});
Vue.use(Vuelidate);
Vue.use(VueSimpleAlert);
Vue.component('qr-code', VueQRCodeComponent)
Vue.component('country-flag', CountryFlag)

Vue.prototype.isVisible = false;

Vue.config.productionTip = false;

if (!process.env.API_URL)
  throw 'Missing required environment variable `API_URL`.';

if (process.env.NODE_ENV != 'production')
  console.log('Environment:', process.env);

const files = require.context('@/', true, /\.(vue|js)$/i);

Vue.config.optionMergeStrategies.render = function (toVal, fromVal, context) {
  if (toVal)
    return function render(...args) {
      if (fromVal)
        args.push(fromVal.apply(this, args));
      return toVal.apply(this, args);
    };
  return fromVal;
};

let plugins = [];
files.keys().map(path => {
  if (!files(path).default || !files(path).default.install)
    return;
  plugins.push(files(path).default || files(path));
  (files(path).default || files(path)).install(Vue, {});
});
if (process.env.NODE_ENV != 'production')
  console.log('Vue plugins:', plugins);

let components = {};
files.keys().map(path => {
  if (!files(path).default || !files(path).default.tag)
    return;
  if (components[files(path).default.tag])
    throw `Duplicate component \`${files(path).default.tag}\`.`;
  components[files(path).default.tag] = files(path).default || files(path);
  Vue.component(files(path).default.tag, files(path).default || files(path));
});
if (process.env.NODE_ENV != 'production')
  console.log('Vue components:', components);

let directives = {};
files.keys().map(path => {
  if (!files(path).default || !files(path).default.directive)
    return;
  directives[files(path).default.directive] = files(path).default || files(path);
  Vue.directive(files(path).default.directive, files(path).default || files(path));
});
if (process.env.NODE_ENV != 'production')
  console.log('Vue directives:', directives);

new Vue({
  el: '#app',
  router: (function () {
    let router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes: (function () {
        let routes = [];
        files.keys().map(path => {
          if (!files(path).default || !files(path).default.path)
            return;
          routes.push({
            name: files(path).default.name,
            path: files(path).default.path,
            component: files(path).default || files(path),
          });
        });
        if (process.env.NODE_ENV != 'production')
          console.log('Vue routes:', routes);
        return routes;
      })(),
    });
    files.keys().map(path => {
      if (!files(path).default || !files(path).default.beforeEachRoute)
        return;
      router.beforeEach(async function (to, from, next) {
        let context = undefined;
        if (files(path).default.service)
          context = router.app.$service[files(path).default.service];
        files(path).default.beforeEachRoute.apply(context, arguments);
      });
    });
    return router;
  })(),
  render: function (createElement) {
    if (process.env.NODE_ENV != 'production')
      console.log('Vue render route:', this.$router.currentRoute);
    let render = createElement('keep-alive', {props: {max: 32}}, [
      createElement('router-view', {key: this.$router.currentRoute.path})
    ]);
    //if (process.env.NODE_ENV !== 'production')
    render = createElement('div', {attrs: {'data-dev-fake-keep-alive': true}}, [createElement('router-view')]);
    if (this.$router.currentRoute && this.$router.currentRoute.matched.length > 0) {
      if (process.env.NODE_ENV != 'production')
        console.log('Vue render component:', this.$router.currentRoute.matched[0].components.default);
      let currentComponent = this.$router.currentRoute.matched[0].components.default;
      while (currentComponent && currentComponent.layout) {
        render = createElement(currentComponent.layout, [render]);
        currentComponent = currentComponent.layout;
      }
    }
    return createElement('div', {attrs: {id: 'app'}}, [render]);
  },
});
