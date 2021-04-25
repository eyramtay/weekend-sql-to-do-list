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
    $('#viewTask').on('click', '.readyButton', readyTaskHandler);
    $('#viewTask').on('click', '.deleteButton', deleteTaskHandler);
}


function getTasks() {
    console.log('in getTask');
    // ajax call to server to get tasks
    $('#viewTask').empty();
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
            $('#viewTask').append(`
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
            $('#viewTask').append(`
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
            task: 'testTask',
            estimatedTime: 'testTime',
            assignedTo: 'testAssign',
            notes: 'testNotes',
            completed: 'testCompletion',
    }
}