let _ = require('lodash'),
  loaderUtils = require('loader-utils');

module.exports = function(source,map){
    let env = loaderUtils.getOptions(this).env;

    function removeComments (str) {

      let blockComments = /\/\*[\s\S]*?\*\//g;

      return str.replace(blockComments, '');
    }

    function getEvnSetting (obj, evn) {

      let resObj = _.cloneDeep(obj);

      function recursion(oObj, nObj) {
        _.forOwn(oObj, function(value, key) {

          if (_.isObject(value) && !_.isArray(value)) {

            if (_.isUndefined(value[evn])) {

              recursion(value, nObj[key]);
            } else {

              nObj[key] = value[evn];
            }
          } else {

            nObj[key] = value;
          }
        })
      }

      recursion(obj, resObj);

      return resObj;
    }

    source = getEvnSetting(JSON.parse(removeComments(source)), env.toUpperCase());

    let jsonStr = JSON.stringify(source);

    return `module.exports = ${jsonStr}`;
}
