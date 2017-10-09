// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
    myApp.alert('Here comes About page'); //rk
})


$$(".poga1").on('click', function () {toggleSonoff();} );


/* rk
// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page

$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})
*/

//<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script>
//<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>

// <!-- Here is the interesting part -->
    // Connect to MQTT broker
    // Note. this example uses web-sockets (port 1884)
    console.log("inicializēju");
    mqtt = new Paho.MQTT.Client("test.mosquitto.org", Number(8080), "sonoff-example-client");
    mqtt.connect({onSuccess: function() { 
        console.log("connected!"); 
    }});
    
    function toggleSonoff() {
        console.log("toggleSonoff");
        
        // Send 'toggle' message to command topic
        message = new Paho.MQTT.Message("toggle");
        message.destinationName = "cmnd/sonoff1/power";
        mqtt.send(message);
    };
//</script>
