var apiUrl = 'https://api.imgflip.com/get_memes';

Meteor.methods({
  'setMemes': function() {
    var response = HTTP.get(apiUrl);
    return response.data;
  }
});

Meteor.call('setMemes', function(err, res) {
  var memes = res.data.memes
  Memes.insert({
    list: memes
  });
});
