var apiUrl = 'http://api.giphy.com/';
var publicKey = '?api_key=dc6zaTOxFJmzC';

Meteor.methods({
  'setGifs': function() {
    var response = HTTP.get(apiUrl + '/v1/gifs/trending' + publicKey);
    return response;
  }
});

Meteor.call('setGifs', function(err, res) {
  var gifs = res.data.data;
  Gifs.insert({
    list: gifs
  });
});
