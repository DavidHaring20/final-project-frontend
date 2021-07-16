
import {promiseEachOrdered} from '@/utilities/Promise.js';

export const readChunks = function (file, chunkSize) {

  if (chunkSize === undefined)
    chunkSize = 1024 * 1024;

  let promises = [];

  let index = 0;
  let offset = 0;

  while (offset < file.size) {
    let reader = new FileReader();
    reader.offset = offset;
    reader.size = chunkSize;
    promises.push(new Promise((resolve, reject) => {
      reader.onload = (event) => {
        if (event.target.result === '') {
          reject('Size limit');
          return;
        }
        resolve(event.target.result);
      };
    }));
    reader.readAsBinaryString(file.slice(offset, offset + chunkSize));
    offset += chunkSize;
  }

  return promises;

};

export const uploadFile = function (url, file, progressCallback, abortEvent) {
  return new Promise((resolve, reject) => {

    let xhr = new XMLHttpRequest();

    abortEvent.bind(() => {
      xhr.abort();
    });

    xhr.upload.onprogress = function (event) {
      progressCallback(event.loaded, event.lengthComputable ? event.total : undefined);
    };

    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(xhr.responseText);
        return;
      }
      resolve();
    };

    xhr.onerror = () => {
      reject(xhr.responseText);
    };

    /*
    xhr.onabort = () => {
      //abort();
      reject('abort');
    };
    /**/

    xhr.ontimeout = () => {
      return reject('Timeout');
    };

    xhr.open('PUT', url, true);

    // Maximum total upload time
    //xhr.timeout = 2000;

    /*
    if (options.process && options.process.timeout)
      xhr.timeout = options.process.timeout;


    if (options.process && options.process.headers)
      Object.keys(options.process.headers).forEach((key) => {
        xhr.setRequestHeader(key, options.process.headers[key]);
      });
    /**/

    xhr.send(file);

  });
};
