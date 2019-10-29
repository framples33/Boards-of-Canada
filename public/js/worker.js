$(document).ready(function() {
  // Our new Jobs will go inside the containerTaskList
  var $containerTaskListJobs = $("#employee-table");

  // Our initial tasktype and jobs array
  var jobs = [];

  // get jobs and output data
  // Getting tasks from database when page loads
  getJobs();

  $(document).on("click", ".complete", getComplete);

  function getComplete() {
    $.get("/api/jobs", function(data) {
      jobs = data;
      initializeRowsJobs();
    });
  }

  // This function resets the todos displayed with new todos from the database
  function initializeRowsJobs() {
    $containerTaskListJobs.empty();
    var rowsToAdd = [];
    for (var i = 0; i < jobs.length; i++) {
      rowsToAdd.push(createNewRowJobs(jobs[i]));
    }
    $containerTaskListJobs.prepend(rowsToAdd);
  }

  // This function grabs todos from the database and updates the view
  function getJobs() {
    $.get("/api/jobs", function(data) {
      jobs = data;
      initializeRowsJobs();
    });
  }

  // This function constructs a jobs row
  function createNewRowJobs(jobs) {
    var $newInputRow = $(
      [
        "<tr>",
        "<td>" + jobs.id + "</td>",
        "<td>" + jobs.location + "</td>",
        "<td>" + jobs.job_desc + "</td>",
        "<td>" + jobs.job_status + "</td>",
        "<td><button class='complete btn btn-primary' data =" +
          jobs.job_status +
          " data2 =" +
          jobs.id +
          ">✓</button></td>",
        "</tr>"
      ].join("")
    );
    return $newInputRow;
  }
});
