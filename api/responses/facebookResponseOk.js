/**
 * 200 (OK) Response For Facebook Login
 * Set client variables from facebook login.
 *
 * Usage:
 * return res.facebookResponseOk(data);
 *
 * @param  {Object} data
 */

module.exports = function facebookResponseOk (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log.silly('res.facebookResponseOk() :: Render Facebook Login Success');

  // Set status code
  res.status(200);

  if (options && options.responseJson) {
    return req.jsonx(data);
  }

  return res.view('v1/auth/facebook_callback', { data: data, layout: 'layout_v1' });
};
