// Set the beginning hour to be 9AM
const hourBeginning = moment().startOf('day').add(8,'h');
// totalHours = 9AM to 7PM = 10 hours
const totalHours = 10;
// Get current hour
const currentHour = moment().format('H');

// Display today's date and time
const displayToday = () => {
  $('#currentDay').text(moment().format("dddd, MMMM Do, HH:mm A"));
};

// Create time blocks for each hour of the day
const fillTimeTable = () => {
  for (let hour = 9; hour < 19; hour++) { 
    // add one hour while iterating for loop
    const timeTableElement = hourBeginning.add(1,'h').format('HH:mm A');

    // Determine the currentState based on the conditions
    let currentState = 'future';
    if (currentHour == hour) {
        currentState = 'present';
    } else if (currentHour > hour) {
        currentState = 'past';
    }

    // Append the time block to the container
    const appendBlock = 
      `<div id="hour-${hour}" class="row time-block ${currentState}">
        <div class="col-md-1 hour">${timeTableElement}</div>
        <textarea class="col-md-10 description ${hour}"></textarea>
        <button class="btn saveBtn col-md-1">
          <i class="fas fa-save"></i>
        </button>
      </div>`;
    $(".container").append(appendBlock);
  }
  loadSchedule();
};

// Save schedule to local storage
const saveSchedule = function() {
  const keyName = $(this).parent().attr('id');
  const keyValue = $(this).parent().children().eq(1).val();
  localStorage.setItem(keyName, keyValue);
};

// Load schedule from local storage and print it out in the textarea attribute
const loadSchedule = () => {
  for (let hour = 9; hour < 19; hour++) {
    const loadedSchedule = localStorage.getItem(`hour-${hour}`);
    $(`.${hour}`).val(loadedSchedule);
  }
};

// Function calls
displayToday();
fillTimeTable();

// Save schedule on button click
$('.saveBtn').on('click', function() {
  alert("Appointment has been saved in local storage");
  saveSchedule.call(this);
});

// Update date and time every 1 minute
setInterval(displayToday, 60000);

// Update time table every 20 minutes
setInterval(fillTimeTable, 1200000);
