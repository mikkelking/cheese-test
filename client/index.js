
Template.cheese.rendered = function() {
  var camOptions = { 
    audio: false, 
    widths: [320],      // Desired image widths, height is calculated from aspect ratio
  };
  sayCheese = new SayCheese('#say-cheese-container', camOptions );

// Fade in the control buttons
  sayCheese.on('start', function() {
    $('#action-buttons').fadeIn('slow');
  });

// Handle any errors
  sayCheese.on('error', function(error) {
    var $alert = $('<div>');
    $alert.addClass('alert alert-error').css('margin-top', '20px');

    if (error === 'NOT_SUPPORTED') {
      $alert.html("<strong>:(</strong> your browser doesn't support video yet!");
    } else if (error === 'AUDIO_NOT_SUPPORTED') {
      $alert.html("<strong>:(</strong> your browser doesn't support audio yet!");
    } else {
      $alert.html("<strong>:(</strong> you have to click 'allow' to try me out!"); 
    }

    $('.say-cheese').prepend($alert);
  });

// This callback event is triggered from within the takeSnapshot function
  sayCheese.on('snapshot', function(snapshot) {
console.log(snapshot);
    if ((typeof snapshot === 'Array' ) || (typeof snapshot === 'object' )) {
      Blaze.renderWithData(Template.snap, {imgData: _.last(snapshot)}, document.getElementById('say-cheese-snapshots'));
    } else {
      Blaze.renderWithData(Template.snap, {imgData: snapshot}, document.getElementById('say-cheese-snapshots'));
    }
  });
	sayCheese.start();
} // End of Template.cheese.rendered

// Take the snapshot
Template.cheese.events({
  'click #take-snapshot': function () {
	sayCheese.takeSnapshot();
  }
});

