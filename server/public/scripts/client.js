console.log('Hello from Javascript');

$(document).ready(function () {
    console.log('jQuery up & runnin\'');

    //Establish Click Listeners
    clickListener();

    // Load existing tasks on page load
    getTasks();

});  // end doc ready

function clickListener() {
    $('#addButton').on('click', function () {
        console.log('in addButton on click');
        // get user input and put in an object
        let taskToSend = {
            task: 'testTask',
            estimatedTime: 'testTime',
            assignedTo: 'testAssign',
            notes: 'testNotes',
            completed: 'testCompletion',
        };
        saveTask(taskToSend);
    });
    // call saveTask with new object
    $('#viewTasks').on('click', '.readyButton', readyTaskHandler);
    $('#viewTasks').on('click', '.deleteButton', deleteTaskHandler);
}


function getTasks() {
    console.log('in getTask');
    // ajax call to server to get tasks
    $('#viewTasks').empty();
    $.ajax({
        type: 'GET',
        url: '/weekend'
    })
    .then(function (response) {
        console.log('Getting response', response);
        renderTasks(response);
    })
} // end getTasks

function renderTasks(response) {
    for (let i = 0; i < response.length; i++) {
        if (response[i].completed == true) {
            $('#viewTasks').append(`
            <tr>
                <td>${response[i].task}</td>
                <td>${response[i].estimated_time}</td>
                <td>${response[i].assigned_to}</td>
                <td>${response[i].notes}</td>
                <td>${response[i].completed}</td>
                <td> </td>
                <td><button class="deleteButton" data-id=${response[i].id}>Delete</button></td>
            </tr>
            `);
        } else {
            $('#viewTasks').append(`
            <tr>
                <td>${response[i].task}</td>
                <td>${response[i].estimated_time}</td>
                <td>${response[i].assigned_to}</td>
                <td>${response[i].notes}</td>
                <td>${response[i].completed}</td>
                <td><button class="completedButton" data-id=${response[i].id}>Mark Completed</button></td>
                <td><button class="deleteButton" data-id=${response[i].id}>Delete</button></td>
            </tr>
            `);
        }
    }
}

function saveTask(newTask) {
    console.log('in saveTask', newTask);
    // ajax call to server to POST tasks
    let taskToSend = {
            task: $('#taskIn').val(),
            estimatedTime: $('#timeIn').val(),
            assignedTo: $('#assignedTo').val(),
            notes: $('#notesIn').val(),
            completed: $('#completedIn').val(),
    }
    $.ajax({
        type: 'POST',
        url: '/weekend',
        data: taskToSend
    })
    .then(function (response) {
        $('#taskIn').val(''),
        $('#timeIn').val(''),
        $('#assignedTo').val(''),
        $('#notesIn').val(''),
        $('#completedIn').val(''),
        getTasks();
    });
}

function readyTaskHandler() {
    console.log('clicked');
    readyTask($(this).data("id"));
}

function readyTask(readyId) {
    $.ajax({
        method: 'PUT',
        url: `/weekend/${readyId}`,
    })
    .then(function (response) {
        getTasks();
    })
    .catch(function (error) {
        alert('error on put route client', error);
    })
}

function deleteTaskHandler() {
    deleteTask($(this).data("id"));
}

function deleteTask(weekendId) {
    $.ajax({
        method: 'DELETE',
        url: `/weekend/${weekendId}`,
    })
    .then(function (response) {
        getTasks();
    })
    .catch(function (error) {
        alert('Error on deleting task.', error);
    });
}