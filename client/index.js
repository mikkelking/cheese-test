
Template.cheese.rendered = function() {
  var camOptions = { 
    audio: false, 
    video: { 
      width: 320 
    } 
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

  // sayCheese.on('snapshot', function(snapshot) {
  //   var img = document.createElement('img');

  //   $(img).on('load', function() {
  //     $('#say-cheese-snapshots').prepend(img);
  //   });
  //   img.src = snapshot.toDataURL('image/png');
  // });

// Paint the image into the page, although we'll change this
  sayCheese.on('snapshot', function(snapshot) {
    Blaze.renderWithData(Template.snap, {imgData: snapshot.toDataURL('image/png')}, document.getElementById('say-cheese-snapshots'));
//          UI.insert(UI.renderWithData(Template.snap,{imgData: snapshot.toDataURL('image/png')}), $('#say-cheese-snapshots'),$('#say-cheese-snapshots')ß );
    });
	sayCheese.start();
} // End of Template.cheese.rendered

// Take the snapshot
Template.cheese.events({
  'click #take-snapshot': function () {
	sayCheese.takeSnapshot();
  }
});

