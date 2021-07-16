
export const request = function (filters, sort, range) {

  let params = {};

  Object.keys(filters).forEach(name => {
    params['criteria[' + encodeURIComponent(name) + '^]'] = encodeURIComponent(filters[name]);
  });

  if (sort.column)
    params.sort = sort.column + ' ' + (sort.asc ? 'asc' : 'desc');

  return {
    params: params,
    headers: {
      'X-Limit' : range.limit,
      'X-Offset': range.offset,
      'X-Count-Results': true,
    },
  };

};

export const response = function (response) {
  response.data.totalCount = response.headers['x-total-count'];
  return response.data;
};
