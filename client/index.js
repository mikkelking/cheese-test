
  // counter starts at 0
  Session.setDefault('counter', 0);

Template.cheese.rendered = function() {
        sayCheese = new SayCheese('#say-cheese-container', { audio: true, video: { width: { facingMode: { exact: "environment" } } } } );

        sayCheese.on('start', function() {
          $('#action-buttons').fadeIn('slow');

        });

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

        sayCheese.on('snapshot', function(snapshot) {
          Blaze.renderWithData(Template.snap, {imgData: snapshot.toDataURL('image/png')}, document.getElementById('say-cheese-snapshots'));
//          UI.insert(UI.renderWithData(Template.snap,{imgData: snapshot.toDataURL('image/png')}), $('#say-cheese-snapshots'),$('#say-cheese-snapshots')ß );
          });
	sayCheese.start();
}
  Template.cheese.events({
    'click #take-snapshot': function () {
		sayCheese.takeSnapshot();
    }
  });

