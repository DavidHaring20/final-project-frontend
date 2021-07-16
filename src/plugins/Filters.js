export default {
  install: (app, options) => {

    app.filter('uppercase', val => val ? `${val.toString().toUpperCase()}` : '')
    
    app.filter('capitalize', val => val ? `${val.toString().charAt(0).toUpperCase()}${val.slice(1)}` : '')

  },
};