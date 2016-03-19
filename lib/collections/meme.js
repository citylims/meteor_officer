Memes = new Mongo.Collection('memes');

randomMeme = function() {
  var obj = Memes.findOne();
  var randomMeme = randomIndex(obj.list);
  return randomMeme;
}
