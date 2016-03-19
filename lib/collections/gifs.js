Gifs = new Mongo.Collection('gifs');

randomGif = function() {
  var obj = Gifs.findOne();
  var randomGif = randomIndex(obj.list);
  return randomGif;
}
