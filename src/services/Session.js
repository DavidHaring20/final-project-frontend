
export default {

  service: 'session',

  data: () => ({
    isEmailSubmitted: false,
    requestedEmail: '',
    isActive: false,
    auth_token: '',
    user_id: 0,
  }),

  mixins: [
    require('@/mixins/AsyncDataMixin.js').default,
  ],

  /*
  asyncData: {
    privileges: {
      default: [],
      autosync: true,
      syncFn: async function() {
        let roles = [];
        try {
          let response = await this.$service.nimoteAPI.get('/user/check?token=' + encodeURIComponent(localStorage.session_token));
          roles = response.data.roles;
          this.user_id = response.data.user_id;
        }catch(e) {
          roles = [];
        }
        return roles;
      },
    },
  },
  /**/

  created: function () {
    if (localStorage.auth_token) {
      this.auth_token = localStorage.auth_token;
      this.$service.nimoteAPI.defaults.headers.common['Authorization'] = `Bearer ${this.auth_token}`;
    }
    this.isActive = !!this.auth_token;

    if (process.env.NODE_ENV != 'production')
      console.log(`Session created with auth_token '${this.auth_token}'`);
  },

  beforeEachRoute: async function (to, from, next) {
    /*
    await this.$asyncData.privileges.awaitSynced();

    let allowed = true;
    if (to.matched.length > 0 && to.matched[0].components.default.needsAnyPrivilege)
      allowed = this.privileges.some(priv => to.matched[0].components.default.needsAnyPrivilege.includes(priv));
    if (!allowed && to.name != 'Login') {
      let resolved = this.$router.resolve({name: 'NoPermissionDefault'});
      while (to.matched.length > 0)
        to.matched.pop();
      resolved.resolved.matched.forEach((match) => {
        to.matched.push(match);
      });
    }
    /**/
    if (!this.isActive && to.name !== 'Login') {
      let resolved = this.$router.resolve({name: 'Login'});
      while (to.matched.length > 0)
        to.matched.pop();
      resolved.resolved.matched.forEach((match) => {
        to.matched.push(match);
      });
    }
    next();
  },

  actions: {
    loginEmail: function (email) {

      let self = this;

      return new Promise(function (resolve, reject) {

        self.$service.nimoteAPI
          .post('/user/register', {
            email: email,
          })
          .then(function (response) {
            self.isEmailSubmitted = true;
            self.requestedEmail = email;
            resolve();
          })
          .catch(function (error) {
            if (error.response) {
              reject(error.response.data.message);
              return;
            }
            reject('Error logging in.');
          })
        ;

      });
    },
    loginPin: function (pin) {

      let self = this;

      return new Promise(function (resolve, reject) {

        self.$service.nimoteAPI
          .post('/user/verify', {
            email: self.requestedEmail,
            pin: pin,
          })
          .then(function (response) {
            self.auth_token = response.data.auth_token;
            self.$service.nimoteAPI.defaults.headers.common['Authorization'] = `Bearer ${self.auth_token}`;
            self.isActive = true;
            self.privileges = response.data.roles;
            self.$service.user_id = response.data.user_id;

            localStorage.auth_token = response.data.auth_token;
            if (process.env.NODE_ENV != 'production')
              console.log(`Session activated with auth_token '${self.auth_token}'`);
            resolve();
          })
          .catch(function (error) {
            reject(error);
            return;

            if (error.response) {
              reject(error.response.data.message, error);
              return;
            }
            reject('Error logging in.');
          })
        ;

      });
    },

    logout () {
      this.$nextTick(() => {
        delete localStorage.auth_token;
        this.isActive = false;
        this.privileges = [];
        this.auth_token = '';
        this.isEmailSubmitted = false;
        this.$service.nimoteAPI.defaults.headers.common['Authorization'] = '';
        this.$router.push({name: 'Login'});
      });
    },

    /*
    hasAnyPrivilege: function (privileges) {
      return this.privileges.some(priv => privileges.includes(priv));
    },
    /**/

  },

};
