const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner(splitedUrl);
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
    let resource = '/';
    if (splitedUrl.resource) {
      resource = `/${splitedUrl.resource}`;
      if (splitedUrl.resource.includes('?')) {
        resource = `${resource.split('?')[0]}?`;
      }
    }
    let idSegment = '';
    if (splitedUrl.id) {
      if (isNaN(splitedUrl.id)) {
        idSegment = `/${splitedUrl.id}`;
      } else {
        idSegment = '/:id';
      }
    }
    let actionSegment = '';
    if (splitedUrl.action) {
      actionSegment = `/${splitedUrl.action}`;
    }
    return resource + idSegment + actionSegment;
  },
};

export default UrlParser;
