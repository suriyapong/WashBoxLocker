module.exports = function (app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged in user from the connection
      const user = connection.user;

      console.log(user);
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);
      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);
      // Channels can be named anything and joined on any condition 

      if (user.RoleId === 1) { app.channel('admin_room').join(connection); }
      if (user.RoleId === 4) { app.channel('flight_room').join(connection); }
      if (user.RoleId === 2) { app.channel('shore_room').join(connection); }
      if (user.RoleId === 5) { app.channel('checkin_room').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));

      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(channel);
      // app.channel(`userIds/$(user.id}`).join(channel);
    }
  });

  // eslint-disable-next-line no-unused-vars
  app.publish((data, hook) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    console.log('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line

    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated');
  });

  app.service('vdo').publish('created', (data, context) => app.channel('checkin_room'));

  app.service('flight').publish('patched', (data, context) => app.channel('checkin_room'));
  app.service('leg').publish('created', 'patched', 'removed', (data, context) => app.channel('checkin_room')); 

  app.service('passengercommand').publish('created', (data, context) => app.channel('checkin_room'));
  app.service('passenger').publish('patched', 'removed', (data, context) =>app.channel('checkin_room'));
 
  app.service('baggage').publish('created', 'patched', 'removed', (data, context) => app.channel('checkin_room'));


  app.service('alcoholstatus').publish('created', 'patched', (data, context) => app.channel('checkin_room'));
  //app.service('vdo').publish('created', (data, context) => app.channel(`checkin_room/${data.Status}`))
};
