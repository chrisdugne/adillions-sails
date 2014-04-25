/**
 * Handlebars Pagination helpers
 */
var _ = require('lodash'),
  util = require('util'),
  hbs = require('hbs');

/**
 * Options (default options and validation method)
 */
var options;
var defaultOptions = {
  defaultPageNumber: 1,
  defaultPageSize: 20,
  defaultDisplayLimit: 3,
  defaultHtmlClass: '',
  defaultBtnHtmlClass: '',
  defaultBtnType: 'next'
};

var validateOptions = function (opts) {
  options = _.merge({}, defaultOptions, opts);

  // sanity check
  if (typeof options.defaultPageNumber !== 'number') {
    throw new Error('Option "defaultPageNumber" is mandatory and must be a number');
  }
  if (typeof options.defaultPageSize !== 'number') {
    throw new Error('Option defaultPageSize is mandatory and must be a number');
  }
  if (typeof options.defaultDisplayLimit !== 'number') {
    throw new Error('Option defaultDisplayLimit is mandatory and must be a number');
  }
  if (typeof options.defaultHtmlClass !== 'string') {
    throw new Error('Option defaultHtmlClass is mandatory and must be a string');
  }
  if (typeof options.defaultBtnHtmlClass !== 'string') {
    throw new Error('Option defaultBtnHtmlClass is mandatory and must be a string');
  }
  if (options.defaultBtnType !== 'next' && options.defaultBtnType !== 'prev') {
    throw new Error('Option defaultBtnType is mandatory and must be \'prev\' or \'next\'');
  }
};

// Calculate total number of pages for a pagination
var getTotalPageCount = function (total, offset) {
  return Math.ceil(total / offset);
};

// Helper to compute page url from pageNumber
var createPageUrl = function (baseUrl, pageNumber) {
  var path = baseUrl;

  if (pageNumber > 1) {
    path += (baseUrl.indexOf('?') === -1) ? '?' : '&';
    path += 'page=' + pageNumber;
  }

  return path;
};

/**
 * Helpers
 */
var helpers = {

  /**
   *  'pagination'
   *  ============
   *
   *  Description
   *  -----------
   *
   *  This helpers creates a pagination following Tetra UI guidelines.
   *
   *  Usage
   *  -----
   *
   *  {{pagination total=83 currentPage=2 pageSize=10 baseUrl='/foo/bar'}}
   *
   *  @param total {int} total number of items
   *  @param baseUrl {string} the base URL to use when creating pagination links
   *  @param currentPage {int} current page (optional, will use options.defaultPageNumber)
   *  @param pageSize {int} number of items per page (optional, will use options.defaultPageSize)
   *  @param htmlClass {string} css classes in addition of 'paginator' (optional, will use options.defaulthtmlClass)
   *  @param displayLimit {int} number of pages to show before and after the current page (optional, will use options.defaultDisplayLimit)
   *
   *  @return {SafeString} html paginator
   */
  pagination: function (params) {

    var total = params.hash.total,
      currentPage = params.hash.currentPage || options.defaultPageNumber,
      pageSize = params.hash.nbPerPage || options.defaultPageSize,
      htmlClass = params.hash.htmlClass || options.defaultHtmlClass,
      displayLimit = params.hash.displayLimit || options.defaultDisplayLimit,
      baseUrl = params.hash.baseUrl;

    // sanity check
    if (typeof total !== 'number') {
      throw new Error('Pagination Helper: total argument is mandatory and expect a number');
    }
    if (typeof pageSize !== 'number') {
      throw new Error('Pagination Helper: nbPerPage argument must be a number');
    }
    if (typeof currentPage !== 'number') {
      throw new Error('Pagination Helper: currentPage argument must be a number');
    }
    if (typeof htmlClass !== 'string') {
      throw new Error('Pagination Helper: htmlClass argument must be a string');
    }
    if (typeof displayLimit !== 'number') {
      throw new Error('Pagination Helper: displayLimit argument must be a number');
    }
    if (typeof baseUrl !== 'string' || !baseUrl.length) {
      throw new Error('Pagination Helper: baseUrl argument is mandatory and must be a non-empty string');
    }

    // returns nothing if Pagination is not needed
    if (total <= pageSize) {
      return '';
    }

    var totalPage = getTotalPageCount(total, pageSize);

    // Calculate the number page of page we should display before and after the current page
    var displayLimitMax = (currentPage === 1) ? currentPage + (displayLimit + 1) : (currentPage + displayLimit);
    var displayLimitMin = (currentPage === totalPage) ? currentPage - (displayLimit + 1) : (currentPage - displayLimit);

    // render html paginator
    var finalClass = (htmlClass) ? ('paginator ' + htmlClass) : 'paginator';
    var html = util.format('<ul class="%s">\n', finalClass);
    var relAttribute = '';
    for (var pageNumber = 1, ellipsis = true; pageNumber <= totalPage; pageNumber++) {

      // Should we add a rel attribute?
      // SEO rules are very strict, we should only add rel="prev" for links going to the immediately previous page
      // and rel="next" to the immediately next page
      if (pageNumber === (currentPage - 1)) {
        relAttribute = ' rel="prev"';
      } else if (pageNumber === (currentPage + 1)) {
        relAttribute = ' rel="next"';
      } else {
        relAttribute = '';
      }

      if (pageNumber === totalPage || pageNumber === 1 || (pageNumber <= displayLimitMax && pageNumber >= displayLimitMin)) {
        html += util.format(
          '<li%s><a href="%s"%s>%s</a></li>\n', (currentPage === pageNumber) ? ' class="active"' : '',
          createPageUrl(baseUrl, pageNumber),
          relAttribute,
          pageNumber);

        // We get ready to create an ellipsis if needed.
        ellipsis = true;

        // If we didn't returned a link we might need to show an ellipsis
      } else if (ellipsis) {
        html += '<li class="ellipsis"><span>…</span></li>\n';

        // Avoid created multiple ellipsis following each others
        ellipsis = false;
      }

    }
    html += '</ul>\n';

    return new hbs.SafeString(html);
  },

  /**
   *  'paginationBtn'
   *  ============
   *
   *  Description
   *  -----------
   *
   *  This helpers creates a pagination button, for the next or previous page, following Tetra UI guidelines.
   *
   *  Usage
   *  -----
   *
   *  {{#paginationBtn type='next' total=28 baseUrl='/foo/bar'}}Button text{{/paginationBtn}}
   *
   *  @param total {int} total number of items
   *  @param baseUrl {string} the base URL to use when creating pagination links
   *  @param currentPage {int} current page (optional, will use options.defaultPageNumber)
   *  @param pageSize {int} number of items per page (optional, will use options.defaultPageSize)
   *  @param type {string} only 'prev' or 'next', will change button design (optional, will use options.defaultBtnType)
   *  @param htmlClass {string} css classes in addition of 'btn btn-pagination' (optional, will use options.defaultBtnHtmlClass)
   *
   *  @return {SafeString} html btn-pagination
   */
  paginationBtn: function (params) {

    var total = params.hash.total,
      pageSize = params.hash.nbPerPage || options.defaultPageSize,
      htmlClass = params.hash.htmlClass || options.defaultBtnHtmlClass,
      currentPage = params.hash.currentPage || options.defaultPageNumber,
      type = params.hash.type || options.defaultBtnType,
      baseUrl = params.hash.baseUrl;

    // sanity check
    if (typeof total !== 'number') {
      throw new Error('PaginationBtn Helper: total argument is mandatory and expect a number');
    }
    if (typeof pageSize !== 'number') {
      throw new Error('PaginationBtn Helper: nbPerPage argument must be a number');
    }
    if (typeof currentPage !== 'number') {
      throw new Error('PaginationBtn Helper: currentPage argument must be a number');
    }
    if (typeof htmlClass !== 'string') {
      throw new Error('PaginationBtn Helper: htmlClass argument must be a string');
    }
    if (type !== 'next' && type !== 'prev') {
      throw new Error('PaginationBtn Helper: type argument must be a string with value as "next" or "prev"');
    }
    if (typeof baseUrl !== 'string' || !baseUrl.length) {
      throw new Error('Pagination Helper: baseUrl argument is mandatory and must be a non-empty string');
    }

    // returns nothing if Pagination is not needed
    if (total <= pageSize) {
      return '';
    }

    // Don't show the prev button if we are on the first page
    if (currentPage === 1 && type === 'prev') {
      return '';
    }

    var pageCount = getTotalPageCount(total, pageSize);

    // Don't show the next button if we are on the last page
    if (currentPage === pageCount && type === 'next') {
      return '';
    }

    var destPageNumber = (type === 'prev') ? currentPage - 1 : currentPage + 1;
    var finalClass = (htmlClass) ? ('btn btn-pagination ' + htmlClass) : 'btn btn-pagination';

    // Create HTML code for the button
    var html = util.format(
      '<a href="%s" class="%s" rel="%s">',
      createPageUrl(baseUrl, destPageNumber),
      finalClass,
      type);
    html += (type === 'prev') ? '<i class="vicon btn-icon-before">‹</i> ' : '';
    html += params.fn(this);
    html += (type === 'next') ? ' <i class="vicon btn-icon-after">›</i>' : '';
    html += '</a>';

    return new hbs.SafeString(html);
  }

};

/**
 * Register helpers in handlebars
 *
 * @param {Handlebars} Instance from require('hbs')
 * @param {Object} Options (will be merge with default options)
 */
module.exports.register = function (hbs, options) {

  // sanity check on options
  validateOptions(options);

  // register helpers in handlebars
  _.forEach(helpers, function (helper, name) {
    hbs.registerHelper(name, helper);
  });
};
