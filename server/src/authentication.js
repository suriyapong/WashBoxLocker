// const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
// const { LocalStrategy } = require('@feathersjs/authentication-local');
// const { expressOauth } = require('@feathersjs/authentication-oauth');

// module.exports = app => {
//   const authentication = new AuthenticationService(app);

//   authentication.register('jwt', new JWTStrategy());
//   authentication.register('local', new LocalStrategy());

//   app.use('/authentication', authentication);
//   app.configure(expressOauth());
// };


const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');


module.exports = function (app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // The authentication service is used to create a JWT.
  // The before create hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });
};