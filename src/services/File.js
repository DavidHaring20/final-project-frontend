
import axios from 'axios';
import {filePondServer} from '@/utilities/FilePondAsync.js';
import {uploadFile} from '@/utilities/File.js';

export default {

  service: 'file',

  state: () => ({
    files: {},
  }),

  created: function () {
    this.filePondServer = this.createFilePondServer();
  },

  actions: {

    createFilePondServer: function () {
      return filePondServer({

        process: async (fieldName, file, metadata, progressCallback, abortEvent) => {

          let response = await this.$service.nimoteAPI.get('/file/presign-upload-url');

          let uploader = await uploadFile(
            response.data.upload_url,
            file,
            (loaded, total) => { progressCallback(total !== undefined, loaded, total); },
            abortEvent,
          );

          this.files[response.data.id] = response.data;

          return response.data.id;

        },

        revert: async (id) => {
          await axios.delete(this.files[id].delete_url);
        },

      });
    },

  },

};
