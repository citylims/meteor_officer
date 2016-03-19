var displayManual = new ReactiveVar(false);

Template.commandArea.events({
  //on enter set session cmd
  'keypress #commandInput': function(e) {
    if (e.keyCode === 13) {
      Session.set('cmd', e.currentTarget.value);
      submitCmd();
      return false;
    }
  },
  //input observer
  'keyup #commandInput': function(e) {
    var command = e.currentTarget.value;
    Session.set('actionOfficer', command);
    readCommand(command);
  }
});

Template.commandArea.helpers({
  'displayManual': function() {
    return displayManual.get();
  }
});

function validateCommand(cmd) {
  let cursor = Commands.find().fetch();
  if (cursor[0].cmds.indexOf(cmd) >= 0) {
    return true;
  } else {
    return false;
  }
}

function submitCmd() {
  var cmd = Session.get('cmd');
  var valid = validateCommand(cmd);
  if (valid) {
    //match
    handleCommand(cmd);
  }
  else {
    //apply text input
    Actions.insert({
      text: cmd
    });
  }
}

//observer
function readCommand(cmd) {
  if (!validateCommand(cmd)) {
    displayManual.set(false);
    Session.set('datePreview', false);
  }
  switch(cmd) {
    case '/': {
      displayManual.set(true);
    }
    break;
    case '/gif': {
      var gif = randomGif();
      var gifUrl = gif.images.downsized.url;
      Session.set('selectedImg', gifUrl);
    }
    break;
    case '/meme': {
      var meme = randomMeme();
      var memeUrl = meme.url;
      Session.set('selectedImg', memeUrl);
    }
    break;
    case '/date': {
      Session.set('datePreview', true);
    }
  }
}

function handleCommand(command) {
  console.log('cmd: ' + command);
  if (command === '/lorem') {
    var lorem = getLorem();
    Actions.insert({text: lorem});
  }
  if (command === '/gif') {
    var gifUrl = Session.get('selectedImg');
    Actions.insert({img: gifUrl});
  }
  if (command === '/meme') {
    var memeUrl = Session.get('selectedImg');
    Actions.insert({img: memeUrl});
  }
  if (command.substr(0, 5) === '/nasa') {
    handleNasa(command);
  }
  if (command === '/clear') {
    Actions.insert({log: 'clear terminal'});
    Meteor.call('resetActions');
  }
  if (command === '/logout') {
    Meteor.logout()
  }
}

function handleNasa(command) {
  $('#commandInput').val('');
  var query = command.split('-');
  var key = query[1];
  if (key) {
    if (key === 'mars') {
      Meteor.call('mars', function(err, res) {
        Actions.insert(res);
      });
    }
    if (key === 'asteroids') {
      Meteor.call('asteroids', function(err, res){
        Actions.insert(res);
      });
    }
    if (key === 'apod') {
      Meteor.call('apod', function(err, res) {
        Actions.insert(res);
      });
    }
  } else {
    // no args - show instructions
  }
}
