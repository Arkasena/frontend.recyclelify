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
      other: urlsSplits[4] || null,
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
    let otherSegment = '';
    if (splitedUrl.other) {
      if (isNaN(splitedUrl.other)) {
        otherSegment = `/${splitedUrl.other}`;
      } else {
        otherSegment = '/:id';
      }
    }
    return resource + idSegment + actionSegment + otherSegment;
  },
};

export default UrlParser;
