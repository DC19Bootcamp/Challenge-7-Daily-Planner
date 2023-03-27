$(document).ready(function() {
  // Get events from local storage if they exist
  var events = JSON.parse(localStorage.getItem("events")) || {};

  // Display the current date
  var currentDate = moment().format("dddd, MMMM Do YYYY");
  $("#currentDay").text(currentDate);

  // Add event listeners to all save buttons
  $(".saveBtn").on("click", function() {
    // Get the text and time of the associated textarea
    var text = $(this).siblings(".description").val();
    var time = $(this).siblings(".hour").text();

    // Save the event in local storage
    events[time] = text;
    localStorage.setItem("events", JSON.stringify(events));

    // Display message to user
    displayMessage("Event saved to local storage.");
  });

  // Load saved events into textareas
  $.each(events, function(time, text) {
    $("#" + time.replace(/[^a-zA-Z0-9]/g, "")).val(text);
  });

  // Function to display message to user
  function displayMessage(message) {
    $("#message").text(message);
  }
});
