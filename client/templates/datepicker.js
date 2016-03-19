var selectedDate = new ReactiveVar();

Template.datepicker.rendered = function() {
	//http://bootstrap-datepicker.readthedocs.org/en/stable/events.html
	$('#datepicker').datepicker().on('changeDate', function(e) {
		console.log(e.date);
		selectedDate.set(e.date);
	});;
}

Template.datepicker.helpers({
	'selectedDate': function() {
		return selectedDate.get();
	}
});

Template.datepicker.events({
	'click #submitAppointment': function() {
		var note = ($('#appointmentInput').val());
		var date = selectedDate.get();
		var date = moment(date).format('MM/DD/YYYY')
		var appointment = {
			text: note,
			date: date
		}
		Meteor.call('actionInsert', appointment);
		Meteor.call('appointmentInsert', appointment);
		Session.set('datePreview', false);
	}
})
