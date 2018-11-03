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


$("#trainName").on("click", function (event) {
    event.preventDefault();
})
$("#trainDestination").on("click", function (event) {
    event.preventDefault();
})
$("#nextArrival").on("click", function (event) {
    event.preventDefault();
})
$("#frequency").on("click", function (event) {
    event.preventDefault();
})
$("#submit").on("click", function (event) {
    event.preventDefault();


    trainName = $("#trainName").val().trim();
    trainDestination = $("#trainDestination").val().trim();
    firstTrain = $("#nextArrival").val().trim();
    frequency = $("#frequency").val().trim();


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

    $("tbody").append("<tr>" + "<td>" +
        childSnapshot.val().trainName + "</td>" + "<td>" + childSnapshot.val().trainDestination + "</td>"
        + "<td>" + childSnapshot.val().firstTrain + "</td>" + "<td>" +
        childSnapshot.val().frequency + "</td>" + "</tr>");
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});