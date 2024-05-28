const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner2(splitedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlsSplits = url.split('/');
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      action: urlsSplits[3] || null,
    };
  },

  _urlCombiner(splitedUrl) {
    return (splitedUrl.resource ? `/${splitedUrl.resource}` : '/')
      + (splitedUrl.id ? '/:id' : '')
      + (splitedUrl.action ? `/${splitedUrl.action}` : '');
  },
  _urlCombiner2(splitedUrl) {
    let resource = '';
    if (splitedUrl.resource) {
      if ((splitedUrl.resource).includes('?')) {
        resource = `/${(splitedUrl.resource).split('?')[0]}?`;
      } else {
        resource = `/${splitedUrl.resource}`;
      }
    } else {
      resource = '/';
    }
    console.log((resource + (splitedUrl.id ? '/:id' : '') + (splitedUrl.action ? `/${splitedUrl.action}` : '')));
    return resource + (splitedUrl.id ? '/:id' : '') + (splitedUrl.action ? `/${splitedUrl.action}` : '');
  },
};

export default UrlParser;
