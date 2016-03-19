Template.window.onCreated(function(){
    Meteor.call('resetActions');
    Meteor.call('welcome');
    Session.set('actionOfficer', '');
    // Meteor.subscribe("appointments");
});

Template.window.helpers({
  actions: function() {
    var actions = Actions.find();
    return actions;
  }
});

var actionCursor = Actions.find();

actionCursor.observe({
  added: function() {
    refreshUI()
  }
});

function refreshUI() {
  Session.set('datePreview', false);
  $('#commandInput').val('');
  setTimeout(function() {
    var feed = document.getElementById('feedScroll');
    if (feed)
      feed.scrollTop = feed.scrollHeight;
  }, 1000);
}
