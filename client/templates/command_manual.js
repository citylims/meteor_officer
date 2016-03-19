Template.commandManual.helpers({
  'commands': function() {
    var cursor = Commands.find().fetch()
    var list = cursor[0].cmds.map(function(command, index) {
      var obj = {
        text: command
      }
      return obj
    });
    return list
  }
});
