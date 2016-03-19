Appointments = new Mongo.Collection('appointments');

Meteor.methods({
  appointmentInsert: function(appt) {
    var user = Meteor.user();
    var appointment = _.extend(appt, {
      userId: user._id,
      author: user.username,
      createdAt: new Date()
    });
    Appointments.insert(appointment);
  }
});
