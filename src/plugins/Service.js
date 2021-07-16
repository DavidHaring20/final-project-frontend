
export default {
  install: (app, options) => {

    const files = require.context('@/', true, /\.(vue|js)$/i);

    Object.defineProperty(app.prototype, '$service', {
      get: function () {
        if (!this.$root)
          throw '`$root` not found';
        if (!this.$root._service) {
          this.$root._service = {
            _loaded: {},
          };
          files.keys().map(path => {
            if (!files(path).default || !files(path).default.service)
              return;
            let serviceSource = files(path).default || files(path);
            if (serviceSource.state)
              serviceSource.data = serviceSource.state;
            if (serviceSource.actions)
              serviceSource.methods = serviceSource.actions;
            let serviceClass = serviceSource.construct ? serviceSource.construct : app.extend(serviceSource);
            let serviceKey = files(path).default.service;
            Object.defineProperty(this.$root._service, serviceKey, {get: () => {
              if (!this.$root._service._loaded[serviceKey]) {
                this.$root._service._loaded[serviceKey] = new serviceClass({
                  '$root': this.$root,
                  '_routerRoot': this.$root,
                });
              }
              return this.$root._service._loaded[serviceKey];
            }});
          });
          if (process.env.NODE_ENV != 'production')
            console.log('Vue services:', this.$root._service);
        }
        return this.$root._service;
      },
    });

    app.mixin({
      beforeCreate: function () {
        if (this.$options && this.$options.$root)
          this.$root = this.$options.$root;
        if (this.$options && this.$options._routerRoot)
          this._routerRoot = this.$options._routerRoot;
      },
    });

  },
};

