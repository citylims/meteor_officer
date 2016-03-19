Actions = new Mongo.Collection('actions');

//reset collection on refresh - called from Template.window.onCreated
Meteor.methods({
  'resetActions': function() {
    return Actions.remove({});
  },
  'welcome': function() {
    return Actions.insert({text: 'Welcome'});
  },
  'actionInsert': function(actionObj) {
    var user = Meteor.user();
    var action = _.extend(actionObj, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    Actions.insert(action);
  }
});
