'use strict';

module.exports = function(Appusers) {
  Appusers.observe('after save', function(context, next) {
    if (context.isNewInstance) {
      let instance = context.instance;
      instance.createAccessToken(1209600000, function(error, response) {
        if (error === null) {
          instance["token"] = response.id;
          console.log('response', response);
          next();
        }
      })
    } else {
      next();
    }
  })
};
