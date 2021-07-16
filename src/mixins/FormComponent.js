
export default {

  created: function () {

    //console.log('self', this);
    //console.log('data', this.constructor.options.data());

    //this.$options.isForm = true;

    return;

    let expandFields = (fields, collection) => {

      Object.keys(fields).forEach((field) => {

        this.$set(collection[field], '$valid', null);

        //if (false)
        this.$watch(() => { return collection[field].$dirty; }, (newValue, oldValue) => {
          //console.log('x');
          if (!this.reactive && !collection[field].reactive)
            return;
          //console.log('waat', this.reactive, field, collection[field].reactive);
          collection[field].$valid = !collection[field].$error;
          this.$forceUpdate();
        });

        collection[field].invalidFeedback = (messages) => {
          let result = '';
          Object.keys(messages).forEach((validator) => {
            if (!collection[field][validator])
              result += "\n" + messages[validator];
          });
          return result.trim();
        };

        if (collection[field].$each) {
          //console.log('collection[field].$each.$iter', Object.keys(collection[field].$each.$iter));
          Object.keys(collection[field].$each.$iter).forEach((index) => {
            expandFields(fields[field].$each, collection[field].$each.$iter[index]);
          });
        }

      });

    };

    expandFields(this.$options.validations, this.$v);

  },

  mounted: function () {
    this.$el.addEventListener('input', () => {
      this.isChanged = true;
      this.isSubmitted = false;
    });
  },

  data: function () {
    return {
      isChanged: false,
      isSubmitting: false,
      isSubmitted: false,
      isFailed: false,
      failureMessage: '',
      reactive: false,
    };
  },

  computed: {
    isReady: function () {
      //return (!this.isSubmitted || this.isChanged) && !this.isSubmitting;
      return !this.isSubmitted && !this.isSubmitting;
    },
  },

  watch: {
    $route: {
      handler: function (to, from) {
        if (from.path === to.path)
          return;
        this.isChanged = false;
        this.isSubmitting = false;
        this.isSubmitted = false;
        this.isFailed = false;
        this.failureMessage = '';
        this.reactive = false;
      }
    },
  },

  methods: {

    submitForm: function (event) {
      let self = this;

      event.preventDefault();

      let submit = self.$options.submit;
      if (!(submit && {}.toString.call(submit) === '[object Function]'))
        throw '$options.submit is not a function';

      self.reactive = true;
      if (self.$v)
        self.$v.$touch();
      self.failureMessage = '';

      (new Promise(function (resolve, reject) {
        if (self.$v && self.$v.$invalid) {
          reject('Invalid form');
          return;
        }
        self.isSubmitting = true;
        try {
          Promise.resolve(submit.apply(self, [self.$data])).then(resolve).catch(reject);
        } catch (error) {
          reject(error);
        }
      }))
        .then(function () {
          self.isChanged = false;
          self.isSubmitting = false;
          self.isSubmitted = true;
          self.isFailed = false;
        })
        .catch(function (error) {
          self.isSubmitting = false;
          self.isSubmitted = false;
          self.isFailed = true;
          self.failureMessage = error;
        })
      ;
    },

    validField: function (field) {
      //if (!field.reactive) this.$set(field, 'reactive', false);
      if (!this.reactive && !field.$reactive)
        return null;
      return !field.$invalid;
    },

    reactiveField: function (field) {
      this.isChanged = true;
      this.isSubmitted = false;
      if (typeof(field) === 'object' && field !== null && '$model' in field)
        this.$set(field, '$reactive', true);
      //field.$touch();
      this.$forceUpdate();
      //binding.value.reactive = true;
      //binding.value.$touch();
    },

    invalidFeedback: function (field, messages) {
      let result = '';
      Object.keys(messages).forEach((validator) => {
        if (!field[validator])
          result += "\n" + messages[validator];
      });
      return result.trim();
    },

  },

  render: function (createElement, context) {
    return createElement(
      'form',
      {
        class: 'is-invalid',
        on: {
          submit: this.submitForm,
        },
      },
      [
        context,
      ],
    );
  },

};
