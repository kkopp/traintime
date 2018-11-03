$(document).ready(function () {
    $('#tableBox').DataTable();

});

var config = {
    apiKey: "AIzaSyCU76PJ7d50qr5fWiEiqpn_DG3N1U07_DE",
    authDomain: "traintimes-e5ae7.firebaseapp.com",
    databaseURL: "https://traintimes-e5ae7.firebaseio.com",
    projectId: "traintimes-e5ae7",
    storageBucket: "traintimes-e5ae7.appspot.com",
    messagingSenderId: "126925222352"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var trainDestination = "";
var firstTrain = "";
var frequency = "";

$("#addNew").on("click", function (event) {
    event.preventDefault();


    trainName = $("#tname").val().trim();
    trainDestination = $("#dest").val().trim();
    firstTrain = $("#first").val().trim();
    frequency = $("#freq").val().trim();

    // console.log("Train name: " + trainName);
    // console.log("Destination: " + trainDestination);
    // console.log("First time: " + firstTrain);
    // console.log("Frequency: " + frequency);

    $("#tname").val("");
    $("#dest").val("");
    $("#first").val("");
    $("#freq").val("");


    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDestination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);

    trainName = childSnapshot.val().trainName;
    trainDestination = childSnapshot.val().trainDestination
    firstTrain = childSnapshot.val().firstTrain;
    frequency = childSnapshot.val().frequency;

    var firstTrainMoment = moment(firstTrain, "HH:mm");

    var currenttime = moment();

    var minuteArrival = currenttime.diff(firstTrainMoment, 'minutes');
    var minuteLast = minuteArrival % frequency;
    var awayTrain = frequency - minuteLast;

    var nextArrival = currenttime.add(awayTrain, 'minutes');
    var arrivaltime = nextArrival.format("HH:mm");

    $("tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

