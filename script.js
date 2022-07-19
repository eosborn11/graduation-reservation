function submitReservation() {
    var fullName = document.getElementById("fullName").value;
    var phoneNumber =document.getElementById("phoneNumber").value;
    var numberOfAttendees = document.getElementById("numberOfAttendees");
    var meal = document.getElementById("meal");
    var attendeesValue = '';
    var mealValue = '';

    if (numberOfAttendees.checked) {
        attendeesValue = document.getElementById("numberOfAttendees").value;
    } else {
        attendeesValue = document.getElementById("numberOfAttendees2").value;
    }

    if (meal.checked) {
        mealValue = document.getElementById("meal").value;
    } else {
        mealValue = document.getElementById("meal2").value;
    }

    console.log("fullname", fullName);
    console.log("Phonenumber", phoneNumber);
    console.log("attendees", attendeesValue);
    console.log("meal", mealValue);
    var payload = {
        name: fullName,
        phone_number: phoneNumber,
        attendees: attendeesValue,
        meal_preference: mealValue
    }

    fetch(`http://localhost:2000`,{
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((data) => {
        console.log(data)
        alert("data submitted successfully")
    })
    .catch((err) => {
        console.log(err);
        alert("Error")
    })
}