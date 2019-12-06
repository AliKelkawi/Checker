var arr = [];
var done = [];

$(document).ready(function () {
    loadFromLocalStorage();
});

function loadFromLocalStorage() {

    $('#tasklist').empty();
    $('#doneList').empty();
    if (localStorage.getItem("items")) {
        arr = JSON.parse(localStorage.getItem("items"));
        console.log(arr);
        arr.forEach(function (item) {
            $("#taskList").prepend("<li><span><i class='fa fa-trash'></i></span>" + item + "</li>");
        });
    }

    if (localStorage.getItem("doneItems")) {
        done = JSON.parse(localStorage.getItem("doneItems"));
        console.log(done);
        done.forEach(function (item) {
            $("#doneList").append("<li class='completed'><span><i class='fa fa-trash'></i></span>" + item + "</li>");
        });
    }
}

//Check off specific todos by clicking
$("#taskList").on("click", "li", function () {
    $(this).toggleClass("completed");

    var doneTask = $(this).text();

    console.log("Finished task: " + doneTask);

    // remove item from to do list
    $(this).fadeOut(500, function () {
        console.log("Removing " + $(this).text());
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === $(this).text()) {
                arr.splice(i, 1);
            }
        }

        done.push(doneTask);
        $(this).remove();

        console.log("new array " + arr);
        localStorage.setItem("items", JSON.stringify(arr));

        console.log("Adding done Item list" + done);
        localStorage.setItem("doneItems", JSON.stringify(done));

        $("#taskList").empty();
        $("#doneList").empty();
        loadFromLocalStorage();
    });
});

// UNCHECKING A TASK
$("#doneList").on("click", "li", function () {
    $(this).toggleClass("completed");

    var doneTask = $(this).text();

    console.log("Unfinished task: " + doneTask);

    // remove item from to do list
    $(this).fadeOut(500, function () {
        console.log("Removing " + $(this).text());
        for (var i = 0; i < done.length; i++) {
            if (done[i] === $(this).text()) {
                done.splice(i, 1);
            }
        }

        arr.push(doneTask);
        $(this).remove();

        console.log("new array " + arr);
        localStorage.setItem("items", JSON.stringify(arr));

        console.log("Adding done Item list" + done);
        localStorage.setItem("doneItems", JSON.stringify(done));

        $("#taskList").empty();
        $("#doneList").empty();
        loadFromLocalStorage();
    });
});


//Click on X to delete ToDo
$("#taskList").on("click", "span", function (event) {
    $(this).parent().fadeOut(500, function () {
        console.log("Removing " + $(this).text());
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === $(this).text()) {
                arr.splice(i, 1);
            }
        }

        $(this).remove();

        console.log("new array " + arr);
        localStorage.setItem("items", JSON.stringify(arr));
    });

    event.stopPropagation();
});

// Click x to remove from done list
$("#doneList").on("click", "span", function (event) {
    $(this).parent().fadeOut(500, function () {
        console.log("Removing " + $(this).text());
        for (var i = 0; i < done.length; i++) {
            if (done[i] === $(this).text()) {
                done.splice(i, 1);
            }
        }

        $(this).remove();

        console.log("new array " + done);
        localStorage.setItem("doneItems", JSON.stringify(done));
    });

    event.stopPropagation();
});


$("input[type = 'text']").keypress(function (event) {
    if (event.which === 13) {
        //Grab new todo text from input
        var todoText = $(this).val();
        $(this).val("");

        //Create a new li and add to #taskList
        $("#taskList").prepend("<li><span><i class='fa fa-trash'></i></span>" + todoText + "</li>");
        arr.push(todoText);
        console.log(arr);
        localStorage.setItem("items", JSON.stringify(arr));
    }
});

$(".fa-plus").click(function () {
    // $("input[type='text']").fadeToggle();

    if ($('input[type = "text"]').val() != "") {
        var todoText = $('input[type = "text"]').val();
        $('input[type = "text"]').val("");

        //Create a new li and add to #taskList
        $("#taskList").prepend("<li><span><i class='fa fa-trash'></i></span>" + todoText + "</li>");
        arr.push(todoText);
        console.log(arr);
        localStorage.setItem("items", JSON.stringify(arr));
    }
});

function deleteAll() {
    done = [];
    localStorage.setItem("doneItems", JSON.stringify(done));
    $("#taskList").empty();
    $("#doneList").empty();
    loadFromLocalStorage();
}