var apiUrl = 'https://api.nasa.gov';
var key = 'Iwko8aFjq9Mw7nQL4Ou7cVEPCvByXKt9kGafWAwD';

Meteor.methods({

  mars: function() {
    var query = '/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=' + key;
    var res = HTTP.get(apiUrl + query);
    var photo = randomIndex(res.data.photos);
    var details = photo.rover.name + ' ' + photo.camera.name + ''
    var obj = {
      date: photo.earth_date,
      img: photo.img_src,
      text: details
    }
    return obj;
  },

  asteroids: function() {
    var dates = processDate();
    var query = '/neo/rest/v1/feed?start_date=' + dates[0] + '&end_date=' + dates[1] +'&api_key=' + key;
    var res = HTTP.get(apiUrl + query);
    if (res.data) {
      var msg = defineAsteroid(res.data);
      console.log(msg);
      return {text: msg};
    }
  },

  apod: function() {
    var query = '/planetary/apod?api_key=' + key;
    var res = HTTP.get(apiUrl + query);
    var src = res.data.url;
    var title = res.data.title;
    if (res.data) {
      if (checkYoutube(src)) {
        return {
          text: title,
          youtubeSrc: src
        }
      } else {
        return {
          text: title,
          img: src
        }
      }
    }
  }
});

function checkYoutube(src) {
  if (src.indexOf('https://www.youtube.com/embed') === -1) {
    return false;
  } else {
    return true;
  }
}


function processDate(){
  var date = new Date();
  var formatted = moment(date).format('MM/DD/YYYY');
  var arr = [];
  var parts = formatted.split('/');
  var day = parseInt(parts[1]);
  var month = parts[0];
  var year = parts[2];
  console.log(day);
  if (day === 1) {
    day = 2;
  }
  arr[0] = year + '-' + month + '-' + (day - 1);
  arr[1] = year + '-' + month + '-' + day;
  return arr;
}

function defineAsteroid(data) {
  var asteroids= data.near_earth_objects;
  var today = asteroids[Object.keys(asteroids)[Object.keys(asteroids).length - 1]];
  var asteroid = today.pop();
  var magnitude  = Math.round(asteroid.absolute_magnitude_h);
  var approach = asteroid.close_approach_data.pop();
  var velocity = Math.round(approach.relative_velocity.miles_per_hour);
  var missDistance = Math.round(approach.miss_distance.miles);
  var msg = data.element_count + ' near earth objects have been recorded in the past 24 hours. Most recently ' + asteroid.name + ' which has an absolute magnitude of ' + magnitude + 'h, is traveling at ' + velocity + 'mph, and is ' + missDistance + 'mi. away from Earth.';
  return msg;
}
