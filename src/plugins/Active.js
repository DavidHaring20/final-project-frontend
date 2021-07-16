
export default {
  install: (app, options) => {

    app.mixin({
      beforeCreate: function () {
        let self = this;
        self.$env = process.env;
        if (!this.$options.computed)
          this.$options.computed = {};
        this.$options.computed.$active = () => {
          return this.$data.$active;
        }
      },
      data: () => ({
        '$active': false,
      }),
      mounted: function () {
        this.$data.$active = true;
        let component = this;
        while (component) {
          if (component.$vnode && component.$vnode.elm.parentNode.dataset.devFakeKeepAlive) {
            this.$options.activated.forEach((callback) => {
              callback.apply(this);
            });
          }
          component = component.$parent;
        }
      },
      beforeDestroy: function () {
        if (this.$data.$active) {
          this.$options.deactivated.forEach((callback) => {
            callback.apply(this);
          });
        }
        this.$data.$active = false;
      },
      activated: function () {
        this.$data.$active = true;
      },
      deactivated: function () {
        this.$data.$active = false;
      },
    });

  },
};

