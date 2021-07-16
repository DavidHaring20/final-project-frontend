
export default {

  props: [
    'autoload',
    'autosync',
    'loadFn',
    'updateFn',
    'syncFn',
  ],

  data: function () {
    return {
      _asyncComponentIsActive: false,
      isLoading: false,
      isLoaded: false,
      isUpdating: false,
      isUpdated: false,
      isSyncing: false,
      isSynced: false,
      isFailed: false,
      failureMessage: '',
    };
  },

  created: function () {
    if (typeof(this.$options.autoload) != 'undefined' && !this.$options.autoload)
      return;
    if (typeof(this.autoload) != 'undefined' && !this.autoload)
      return;
    if (this.$data._asyncComponentIsActive)
      return;
    this.$data._asyncComponentIsActive = true;
    this.$nextTick(this.sync);
  },

  deactivated: function () {
    console.log('AsyncComponentMixin deactivated:', this);
    if (typeof(this.autosync) != 'undefined' && !this.autosync)
      return;
    this.deactivationTimer = setTimeout(() => {
      this[!this.isLoaded ? 'isLoading' : 'isUpdating'] = true;
      this.isSyncing = true;
    }, 300);
    this.$data._asyncComponentIsActive = false;
  },

  activated: function () {
    console.log('AsyncComponentMixin activated:', this);
    if (typeof(this.autosync) != 'undefined' && !this.autosync)
      return;
    clearTimeout(this.deactivationTimer);
    if (this.$data._asyncComponentIsActive)
      return;
    this.$data._asyncComponentIsActive = true;
    this.sync();
  },

  methods: {

    sync: async function () {

      if (!this.isLoaded && ((this.$options && this.$options.loadFn) || this.loadFn)) {
        if (!!(this.$options && this.$options.loadFn) == !!this.loadFn)
          throw 'AsyncComponentMixin: `loadFn` provided both as an option and as a prop.';
        this.isLoading = true;
        this.isSyncing = true;
        await (new Promise((resolve, reject) => {
          try {
            if (process.env.NODE_ENV != 'production')
              console.log('AsyncComponentMixin load:', this);
            let loadFn = this.$options && this.$options.loadFn ? this.$options.loadFn : this.loadFn;
            if (!(loadFn && {}.toString.call(loadFn) === '[object Function]'))
              throw 'AsyncComponentMixin: No compatible `loadFn` found.';
            Promise.resolve(loadFn.apply(this)).then(resolve).catch(reject);
          } catch (error) {
            reject(error);
          }
        }))
          .then(() => {
            this.isLoading = false;
            this.isLoaded = true;
            this.isUpdating = false;
            this.isUpdated = true;
            this.isSyncing = false;
            this.isSynced = true;
            this.isFailed = false;
          })
          .catch((error) => {
            this.isLoading = false;
            this.isLoaded = false;
            this.isUpdating = false;
            this.isUpdated = false;
            this.isSyncing = false;
            this.isSynced = false;
            this.isFailed = true;
            this.failureMessage = error;
          })
        ;
        return;
      }

      if (this.isLoaded && ((this.$options && this.$options.updateFn) || this.updateFn)) {
        if (!!(this.$options && this.$options.updateFn) == !!this.updateFn)
          throw 'AsyncComponentMixin: `updateFn` provided both as an option and as a prop.';
        this.isUpdating = true;
        this.isSyncing = true;
        await (new Promise((resolve, reject) => {
          try {
            if (process.env.NODE_ENV != 'production')
              console.log('AsyncComponentMixin update:', this);
            let updateFn = this.$options && this.$options.updateFn ? this.$options.updateFn : this.updateFn;
            if (!(updateFn && {}.toString.call(updateFn) === '[object Function]'))
              throw 'AsyncComponentMixin: No compatible `updateFn` found.';
            Promise.resolve(updateFn.apply(this)).then(resolve).catch(reject);
          } catch (error) {
            reject(error);
          }
        }))
          .then(() => {
            this.isLoading = false;
            this.isLoaded = true;
            this.isUpdating = false;
            this.isUpdated = true;
            this.isSyncing = false;
            this.isSynced = true;
            this.isFailed = false;
          })
          .catch((error) => {
            this.isLoading = false;
            this.isUpdating = false;
            this.isUpdated = false;
            this.isSyncing = false;
            this.isSynced = false;
            this.isFailed = true;
            this.failureMessage = error;
          })
        ;
        return;
      }

      if ((this.$options && this.$options.syncFn) || this.syncFn) {
        if (!!(this.$options && this.$options.syncFn) == !!this.syncFn)
          throw 'AsyncComponentMixin: `syncFn` provided both as an option and as a prop.';
        this[!this.isLoaded ? 'isLoading' : 'isUpdating'] = true;
        this.isSyncing = true;
        await (new Promise((resolve, reject) => {
          try {
            if (process.env.NODE_ENV != 'production')
              console.log('AsyncComponentMixin sync:', this);
            let syncFn = this.$options && this.$options.syncFn ? this.$options.syncFn : this.syncFn;
            if (!(syncFn && {}.toString.call(syncFn) === '[object Function]'))
              throw 'AsyncComponentMixin: No compatible `syncFn` found.';
            Promise.resolve(syncFn.apply(this)).then(resolve).catch(reject);
          } catch (error) {
            reject(error);
          }
        }))
          .then(() => {
            this.isLoading = false;
            this.isLoaded = true;
            this.isUpdating = false;
            this.isUpdated = true;
            this.isSyncing = false;
            this.isSynced = true;
            this.isFailed = false;
          })
          .catch((error) => {
            this.isLoading = false;
            this.isUpdating = false;
            this.isSyncing = false;
            this.isSynced = false;
            this.isFailed = true;
            this.failureMessage = error;
          })
        ;
        return;
      }

      throw 'AsyncComponentMixin: Unable to sync, either provide `$options.syncFn` or '
        + '`$options.loadFn` / `$options.updateFn` combination.';

    },

  },

};
