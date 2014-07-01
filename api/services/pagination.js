/**
 *  Pagination service
 *
 *  This service helps you achieve a SEO friendly pagination.
 *  It should be used along the `{{pagination}}` HBS helper.
 *
 *
 *  How to use:
 *    var pagination = new PaginationService({
 *      pageParam: this.param('page'),
 *      total: totalItems,
 *      offset: itemsPerPage
 *    });
 *    res.links(pagination.getRelLinks(''));
 *    // etc…
 *
 *  Constructor params object (all properties are mandatory):
 *  - pageParam {string|undefined} should be `this.param('page')` directly from Express/Locomotive
 *  - total {number} the total of elements you are working with (in the database)
 *  - offset {number} how many of these elements you are displaying on a page
 *
 */

function PaginationService(params) {

  var options = {};

  if (params) {
    if (!('pageParam' in params) || typeof params.total !== 'number' || typeof params.offset !== 'number') {
      throw new TypeError('PaginationService: instanciation params are not complete or are invalid');
    }

    // Will get an undefined `pageParam` if it is the first page (as it redirects ?page=1, see `getStatusCode`)
    // `Number(undefined) === NaN` and `typeof isNaN === number`, but it needs a real number
    // So it sets `pageNumber` to 1 if it is a NaN
    params.pageNumber = isNaN(+params.pageParam) ? 1 : +params.pageParam;

    options = params;
  }

  this.options = options;
}

/**
 *  'getPaginatedUrl'
 *
 *  @summary Create a paginated URL following SEO rules
 *
 *  @param baseUrl {string} the URL to which append the page param in the querystring
 *  @param pageNumber {number} the page number to add to URL
 *
 *  @return {string} URL with the 'page' param in querystring
 */

PaginationService.prototype.getPaginatedUrl = function (baseUrl, pageNumber) {

  if (typeof baseUrl !== 'string' || typeof pageNumber !== 'number') {
    throw new TypeError('Pagination.getPaginatedUrl: all arguments are mandatory and should respect format');
  }

  if (/\?.*page=.*/.test(baseUrl)) {
    throw new Error('Pagination.getPaginatedUrl: baseUrl already have a page param in its querystring');
  }

  var path = baseUrl;

  if (pageNumber > 1) {
    path += (path.indexOf('?') === -1) ? '?' : '&';
    path += 'page=' + pageNumber;
  }

  return path;
};

/**
 *  'getLastPageNumber'
 *
 *  @summary Give the number of the last page of the pagination
 *
 *  @param total {number} (optional) total number of items
 *  @param offset {number} (optional) number of items displayed on a page
 *
 *  @return {number} the number of the last pagination page
 */

PaginationService.prototype.getLastPageNumber = function (total, offset) {

  // Use instance params if arguments are not provided
  offset = (typeof offset === 'undefined') ? this.options.offset : offset;
  total = (typeof total === 'undefined') ? this.options.total : total;

  if (typeof total !== 'number' || typeof offset !== 'number') {
    throw new TypeError('Pagination.getLastPage: all arguments are mandatory and should be numbers');
  }

  return Math.ceil(total / offset);
};

/**
 *  'getRelLinks'
 *
 *  @summary Create an object of paginated rel links ready for Express' res.links() method
 *
 *  @param absUrl {string} the absolute canonical URL to use as the paginated links
 *  @param currentPage {number} (optional) the current page being prepared for render
 *  @param total {number} (optional) total number of items
 *  @param offset {number} (optional) number of items displayed on a page
 *
 *  @return {object} object formatted for Express' res.links() method
 */

PaginationService.prototype.getRelLinks = function (absUrl, currentPage, total, offset) {

  // Use instance params if arguments are not provided
  offset = (typeof offset === 'undefined') ? this.options.offset : offset;
  total = (typeof total === 'undefined') ? this.options.total : total;
  currentPage = (typeof currentPage === 'undefined') ? this.options.pageNumber : currentPage;

  if (typeof currentPage !== 'number' || typeof total !== 'number' || typeof offset !== 'number' || typeof absUrl !== 'string' || !/^http/.test(absUrl)) {
    throw new TypeError('Pagination.getRelLinks: all arguments are mandatory and should respect format');
  }

  var relLinks = {},
    lastPage = this.getLastPageNumber(total, offset),
    previousPage = currentPage - 1,
    nextPage = currentPage + 1;

  if (currentPage > 1) {
    relLinks.prev = this.getPaginatedUrl(absUrl, previousPage);
  }

  if (currentPage > 0 && currentPage < lastPage) {
    relLinks.next = this.getPaginatedUrl(absUrl, nextPage);
  }

  if (lastPage > 1) {
    relLinks.last = this.getPaginatedUrl(absUrl, lastPage);
    relLinks.first = this.getPaginatedUrl(absUrl, 1);
  }

  return relLinks;
};

/**
 *  'getStatusCode'
 *
 *  @summary Give the SEO compliant status code for the current pagination page
 *
 *  The 'pageParam' argument of this method is a little different from the others.
 *  'getStatusCode' expects the value of the 'page' param for this 'pageParam' argument.
 *
 *  @param pageParam {number|string|undefined} (optional) the value of the page param from the querystring
 *  @param total {number} (optional) total number of items
 *  @param offset {number} (optional) number of items displayed on a page
 *
 *  @return {number} the HTTP status code
 */

PaginationService.prototype.getStatusCode = function (pageParam, total, offset) {

  // Use instance params if arguments are not provided
  offset = (typeof offset === 'undefined') ? this.options.offset : offset;
  total = (typeof total === 'undefined') ? this.options.total : total;
  pageParam = (typeof pageParam === 'undefined') ? this.options.pageParam : pageParam;

  if (typeof total !== 'number' || typeof offset !== 'number') {
    throw new TypeError('Pagination.getStatusCode: \'total\' and \'offset\' are mandatory and should be numbers');
  }

  var httpStatus = {
    ok: 200,
    notFound: 404,
    permRedirect: 301
  };

  if (typeof pageParam === 'undefined') {
    return httpStatus.ok;
  }

  var lastPage = this.getLastPageNumber(total, offset);

  // convert currentPage to a number
  pageParam = +pageParam;

  if (pageParam === 1) {
    return httpStatus.permRedirect;
  } else if (!pageParam || pageParam <= 0 || pageParam > lastPage) {
    return httpStatus.notFound;
  }

  return httpStatus.ok;
};

/**
 *  'getViewData'
 *
 *  @summary gives an object with all the values needed for the `{{pagination}}` HBS helper, ready to be merged in `res.locals`
 *
 *  @param baseUrl {string} the URL for the pagination navigation links (shouldn't have `page` in querystring)
 *  @param currentPage {number} (optional) the current page being prepared for render
 *  @param total {number} (optional) total number of items
 *  @param offset {number} (optional) number of items displayed on a page
 *
 *  @return {object} values for the `{{pagination}}` HBS helper
 */

PaginationService.prototype.getViewData = function (baseUrl, currentPage, total, offset) {

  // Use instance params if arguments are not provided
  offset = (typeof offset === 'undefined') ? this.options.offset : offset;
  total = (typeof total === 'undefined') ? this.options.total : total;
  currentPage = (typeof currentPage === 'undefined') ? this.options.pageNumber : currentPage;

  var viewData = {};

  if (typeof baseUrl !== 'string' || typeof currentPage !== 'number' || typeof total !== 'number' || typeof offset !== 'number') {
    throw new TypeError('Pagination.setView: all arguments are mandatory and should respect format');
  }

  if (/\?.*page=.*/.test(baseUrl)) {
    throw new Error('Pagination.setView: baseUrl should not have a `page` param in its querystring');
  }

  viewData.paginationBaseUrl = baseUrl;
  viewData.paginationCurrentPage = currentPage;
  viewData.paginationTotal = total;
  viewData.paginationOffset = offset;

  return viewData;
};

module.exports = PaginationService;
