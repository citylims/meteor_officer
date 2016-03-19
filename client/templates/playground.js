var validPreviews = ['/gif', '/meme'];

Template.playground.onCreated(function(){
  this.imgPreview = new ReactiveVar(false);
  this.datePreview = new ReactiveVar(false);
});

Template.playground.helpers({
  'cmd': function() {
    return Session.get('actionOfficer');
  },
  'imgPreview': function() {
    var cmd = Session.get('actionOfficer');
    if (validPreviews.indexOf(cmd) >= 0) {
      //show img preview
      Template.instance().imgPreview.set(true)
    } else {
      Template.instance().imgPreview.set(false);
    }
    return Template.instance().imgPreview.get();
  },
  'selectedImg': function() {
    //scope preview image url to template
    var url = Session.get('selectedImg');
    return url;
  },
  'datePreview': function() {
    return Session.get('datePreview');
  }
});
