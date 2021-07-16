
export default {

  data: function () {
    let data = {
      _asyncData: {
        $active: false,
        $any: {
          loading: false,
          loaded: false,
          updating: false,
          updated: false,
          syncing: false,
          synced: false,
          failed: false,
        },
        $all: {
          loading: false,
          loaded: false,
          updating: false,
          updated: false,
          syncing: false,
          synced: false,
          failed: false,
        },
      },
    };
    if (typeof(this.$options.asyncData) !== 'undefined') {
      Object.keys(this.$options.asyncData).forEach((key) => {
        data[key] = this.$options.asyncData[key].default;
        data._asyncData[key] = {
          loading: false,
          loaded: false,
          awaitLoaded: () => {
            return new Promise((resolve, reject) => {
              //if (this.$asyncData[key].loaded === true) {
              //  resolve();
              //  return;
              //}
              //let unwatch = undefined;
              let unwatch = this.$watch(
                '$asyncData.' + key + '.loaded',
                (value) => {
                  if (value !== true)
                    return;
                  if (unwatch)
                    unwatch();
                  resolve();
                },
                {immediate: true},
              );
            });
          },
          updating: false,
          updated: false,
          awaitUpdated: () => {
            return new Promise((resolve, reject) => {
              //if (this.$asyncData[key].updated === true) {
              //  resolve();
              //  return;
              //}
              //let unwatch = undefined;
              let unwatch = this.$watch(
                '$asyncData.' + key + '.updated',
                (value) => {
                  if (value !== true)
                    return;
                  if (unwatch)
                    unwatch();
                  resolve();
                },
                {immediate: true},
              );
            });
          },
          syncing: false,
          synced: false,
          awaitSynced: () => {
            return new Promise((resolve, reject) => {
              //if (this.$asyncData[key].synced === true) {
              //  resolve();
              //  return;
              //}
              //let unwatch = undefined;
              let unwatch = this.$watch(
                '$asyncData.' + key + '.synced',
                (value) => {
                  if (value !== true)
                    return;
                  if (unwatch)
                    unwatch();
                  resolve();
                },
                {immediate: true},
              );
            });
          },
          failed: false,
          failure: undefined,
          awaitFailed: () => {
            return new Promise((resolve, reject) => {
              //if (this.$asyncData[key].failed === true) {
              //  resolve();
              //  return;
              //}
              //let unwatch = undefined;
              let unwatch = this.$watch(
                '$asyncData.' + key + '.failed',
                (value) => {
                  if (value !== true)
                    return;
                  if (unwatch)
                    unwatch();
                  resolve();
                },
                {immediate: true},
              );
            });
          },
          cache: {},
          sync: async () => {
            //this.$data[key] = await this.$options.asyncData[key].sync.apply(this, []);

            let stateCount = (state) => {
              return Object.keys(this.$asyncData)
                .filter((key) => !['$any', '$all'].includes(key))
                .map((key) => this.$asyncData[key][state])
                .filter((value) => value === true)
                .length
              ;
            };

            if (!this.$asyncData[key].loaded && this.$options.asyncData[key].loadFn) {
              this.$asyncData[key].loading = true;
              this.$asyncData.$any.loading = stateCount('loading') > 0;
              this.$asyncData.$all.loading = stateCount('loading') === Object.keys(this.$options.asyncData).length;
              this.$asyncData[key].syncing = true;
              this.$asyncData.$any.syncing = stateCount('syncing') > 0;
              this.$asyncData.$all.syncing = stateCount('syncing') === Object.keys(this.$options.asyncData).length;
              try {
                if (process.env.NODE_ENV !== 'production')
                  console.log('AsyncDataMixin load:', this);
                let loadFn = this.$options.asyncData[key].loadFn;
                if (!(loadFn && {}.toString.call(loadFn) === '[object Function]'))
                  throw 'AsyncDataMixin: No compatible `loadFn` found.';
                //Promise.resolve(loadFn.apply(this)).then(resolve).catch(reject);
                this.$data[key] = await loadFn.apply(this);
                this.$asyncData[key].loaded = true;
                this.$asyncData[key].updated = true;
                this.$asyncData[key].synced = true;
                this.$asyncData[key].failed = false;
              } catch (error) {
                //this.$data[key] = error;
                this.$asyncData[key].failure = error;
                this.$asyncData[key].loaded = false;
                this.$asyncData[key].updated = false;
                this.$asyncData[key].synced = false;
                this.$asyncData[key].failed = true;
                //throw error;
              } finally {
                this.$asyncData[key].loading = false;
                this.$asyncData[key].updating = false;
                this.$asyncData[key].syncing = false;
                this.$asyncData.$any.loading = stateCount('loading') > 0;
                this.$asyncData.$all.loading = stateCount('loading') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.loaded = stateCount('loaded') > 0;
                this.$asyncData.$all.loaded = stateCount('loaded') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.updating = stateCount('updating') > 0;
                this.$asyncData.$all.updating = stateCount('updating') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.updated = stateCount('updated') > 0;
                this.$asyncData.$all.updated = stateCount('updated') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.syncing = stateCount('syncing') > 0;
                this.$asyncData.$all.syncing = stateCount('syncing') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.synced = stateCount('synced') > 0;
                this.$asyncData.$all.synced = stateCount('synced') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.failed = stateCount('failed') > 0;
                this.$asyncData.$all.failed = stateCount('failed') === Object.keys(this.$options.asyncData).length;
              }
              return;
            }

            if (this.$asyncData[key].loaded && this.$options.asyncData[key].updateFn) {
              this.$asyncData[key].updating = true;
              this.$asyncData.$any.updating = stateCount('updating') > 0;
              this.$asyncData.$all.updating = stateCount('updating') === Object.keys(this.$options.asyncData).length;
              this.$asyncData[key].syncing = true;
              this.$asyncData.$any.syncing = stateCount('syncing') > 0;
              this.$asyncData.$all.syncing = stateCount('syncing') === Object.keys(this.$options.asyncData).length;
              try {
                if (process.env.NODE_ENV !== 'production')
                  console.log('AsyncDataMixin update:', this);
                let updateFn = this.$options.asyncData[key].updateFn;
                if (!(updateFn && {}.toString.call(updateFn) === '[object Function]'))
                  throw 'AsyncDataMixin: No compatible `updateFn` found.';
                //Promise.resolve(updateFn.apply(this)).then(resolve).catch(reject);
                //this.$data[key] = await updateFn.apply(this, [this.$data[key], this.$asyncData[key].cache]);
                this.$data[key] = await updateFn.apply(this);
                this.$asyncData[key].loaded = true;
                this.$asyncData[key].updated = true;
                this.$asyncData[key].synced = true;
                this.$asyncData[key].failed = false;
              } catch (error) {
                //this.$data[key] = error;
                this.$asyncData[key].failure = error;
                this.$asyncData[key].updated = false;
                this.$asyncData[key].synced = false;
                this.$asyncData[key].failed = true;
                //throw error;
              } finally {
                this.$asyncData[key].loading = false;
                this.$asyncData[key].updating = false;
                this.$asyncData[key].syncing = false;
                this.$asyncData.$any.loading = stateCount('loading') > 0;
                this.$asyncData.$all.loading = stateCount('loading') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.loaded = stateCount('loaded') > 0;
                this.$asyncData.$all.loaded = stateCount('loaded') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.updating = stateCount('updating') > 0;
                this.$asyncData.$all.updating = stateCount('updating') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.updated = stateCount('updated') > 0;
                this.$asyncData.$all.updated = stateCount('updated') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.syncing = stateCount('syncing') > 0;
                this.$asyncData.$all.syncing = stateCount('syncing') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.synced = stateCount('synced') > 0;
                this.$asyncData.$all.synced = stateCount('synced') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.failed = stateCount('failed') > 0;
                this.$asyncData.$all.failed = stateCount('failed') === Object.keys(this.$options.asyncData).length;
              }
              return;
            }

            if (this.$options.asyncData[key].syncFn) {
              this.$asyncData[key][!this.$asyncData[key].loaded ? 'loading' : 'updating'] = true;
              this.$asyncData.$any.loading = stateCount('loading') > 0;
              this.$asyncData.$all.loading = stateCount('loading') === Object.keys(this.$options.asyncData).length;
              this.$asyncData.$any.updating = stateCount('updating') > 0;
              this.$asyncData.$all.updating = stateCount('updating') === Object.keys(this.$options.asyncData).length;
              this.$asyncData[key].syncing = true;
              this.$asyncData.$any.syncing = stateCount('syncing') > 0;
              this.$asyncData.$all.syncing = stateCount('syncing') === Object.keys(this.$options.asyncData).length;
              try {
                if (process.env.NODE_ENV !== 'production')
                  console.log('AsyncDataMixin sync:', this);
                let syncFn = this.$options.asyncData[key].syncFn;
                if (!(syncFn && {}.toString.call(syncFn) === '[object Function]'))
                  throw 'AsyncDataMixin: No compatible `syncFn` found.';
                //Promise.resolve(syncFn.apply(this)).then(resolve).catch(reject);
                //this.$data[key] = await syncFn.apply(this, [this.$data[key], this.$asyncData[key].cache]);
                this.$data[key] = await syncFn.apply(this);
                this.$asyncData[key].loaded = true;
                this.$asyncData[key].updated = true;
                this.$asyncData[key].synced = true;
                this.$asyncData[key].failed = false;
              } catch (error) {
                //this.$data[key] = error;
                this.$asyncData[key].failure = error;
                this.$asyncData[key].synced = false;
                this.$asyncData[key].failed = true;
                //throw error;
              } finally {
                this.$asyncData[key].loading = false;
                this.$asyncData[key].updating = false;
                this.$asyncData[key].syncing = false;
                this.$asyncData.$any.loading = stateCount('loading') > 0;
                this.$asyncData.$all.loading = stateCount('loading') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.loaded = stateCount('loaded') > 0;
                this.$asyncData.$all.loaded = stateCount('loaded') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.updating = stateCount('updating') > 0;
                this.$asyncData.$all.updating = stateCount('updating') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.updated = stateCount('updated') > 0;
                this.$asyncData.$all.updated = stateCount('updated') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.syncing = stateCount('syncing') > 0;
                this.$asyncData.$all.syncing = stateCount('syncing') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.synced = stateCount('synced') > 0;
                this.$asyncData.$all.synced = stateCount('synced') === Object.keys(this.$options.asyncData).length;
                this.$asyncData.$any.failed = stateCount('failed') > 0;
                this.$asyncData.$all.failed = stateCount('failed') === Object.keys(this.$options.asyncData).length;
              }
              return;
            }

            throw 'AsyncDataMixin: Unable to sync, either provide `syncFn` or `loadFn` / `updateFn` combination.';

          },
          async: () => {
            return new Promise((resolve, reject) => {
              //if (this.$asyncData[key].synced === true) {
              //  resolve();
              //  return;
              //}
              //let unwatch = undefined;
              let unwatch = this.$watch(
                '$asyncData.' + key + '.synced',
                (value) => {
                  if (value !== true)
                    return;
                  if (unwatch)
                    unwatch();
                  resolve(this.$data[key]);
                },
                {immediate: true},
              );
            });
          },
        };
        Object.defineProperty(data._asyncData[key], 'value', {
          get: () => {
            return this.$data[key];
          },
        });
        /*
        data._asyncData[key] = {
          value: {
            get: () => data[key],
          },
          loading: false,
          sync: async () => {
            this.$data[key] = await this.$options.asyncData[key].sync.apply(this, []);
          },
        };
        /**/
      });
    }
    return data;
  },

  beforeCreate: function () {

    Object.defineProperty(this, '$asyncData', {
      get: function () {
        //return this.$data._asyncData;
        return this.$data._asyncData;
      },
    });

    return;

    let asyncData = {};

    if (typeof(this.$options.asyncData) !== 'undefined') {
      Object.keys(this.$options.asyncData).forEach((key) => {
        //data[key] = this.$options.asyncData[key].default;
        asyncData[key] = {
          //value: {
          //  get: () => this.$data[key],
          //},
          loading: false,
          loaded: false,
          updating: false,
          updated: false,
          syncing: false,
          synced: false,
          failed: false,
          sync: async () => {

            //this.$data[key] = await this.$options.asyncData[key].sync.apply(this, []);

            if (this.$options.asyncData[key].sync) {
              this[!asyncData[key].loaded ? 'isLoading' : 'isUpdating'] = true;
              this.isSyncing = true;
              await (new Promise((resolve, reject) => {
                try {
                  if (process.env.NODE_ENV !== 'production')
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

          },
        };
        Object.defineProperty(asyncData[key], 'value', {
          get: () => {
            return this.$data[key];
          },
        });
      });
    }

    Object.defineProperty(this, '$asyncData', {
      get: function () {
        //return this.$data._asyncData;
        return asyncData;
      },
    });
  },

  created: function () {
    if (this.$asyncData.$active)
      return;
    this.$asyncData.$active = true;
    if (typeof(this.$options.asyncData) !== 'undefined') {
      Object.keys(this.$options.asyncData).forEach((key) => {
        if (typeof(this.$options.asyncData[key].autoload) !== 'undefined' && !this.$options.asyncData[key].autoload)
          return;
        if (typeof(this.$options.asyncData[key].autosync) !== 'undefined' && !this.$options.asyncData[key].autosync)
          return;
        this.$nextTick(() => { this.$asyncData[key].sync(); });
      });
    }
  },

  deactivated: function () {
    console.log('AsyncDataMixin deactivated:', this);
    if (!this.$asyncData.$active)
      return;
    this.$asyncData.$active = false;
    //if (typeof(this.autosync) != 'undefined' && !this.autosync)
    //  return;
    //this.deactivationTimer = setTimeout(() => {
    //  this[!this.isLoaded ? 'isLoading' : 'isUpdating'] = true;
    //  this.isSyncing = true;
    //}, 300);
  },

  activated: function () {
    console.log('AsyncDataMixin activated:', this);
    if (this.$asyncData.$active)
      return;
    this.$asyncData.$active = true;
    //if (typeof(this.autosync) != 'undefined' && !this.autosync)
    //  return;
    //clearTimeout(this.deactivationTimer);
    //this.sync();
    if (typeof(this.$options.asyncData) !== 'undefined') {
      Object.keys(this.$options.asyncData).forEach((key) => {
        if (typeof(this.$options.asyncData[key].autosync) !== 'undefined' && !this.$options.asyncData[key].autosync)
          return;
        //clearTimeout(this.$asyncData[key].deactivationTimer);
        this.$asyncData[key].sync();
      });
    }
  },

};
