
import {createEvent} from '@/utilities/Event.js';

export const filePondServer = function (options) {

  return {

    process: function (fieldName, file, metadata, load, error, progress, abort) {

      let abortEvent = createEvent();

      options
        .process(fieldName, file, metadata, progress, abortEvent)
        .then(load)
        .catch(error)
      ;

      return {
        abort: () => {
          abortEvent.emit();
          abort();
        },
      };

    },

    revert: (uniqueFileId, load, error) => {
      options
        .revert(uniqueFileId)
        .then(load)
        .catch(error)
      ;
    },

  };

};
