$(document).ready(function () {
  var event = document.getElementById("event")
  var id = "1"
  var paramsString = window.location.search.toString()
  var searchParams = new URLSearchParams(paramsString)
  id = searchParams.get("event-id")
  $.get("http://localhost:8080/v1/event", function (response) {
    response.forEach((item) => {
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]
      var h2 = document.createElement("h2")
      h2.textContent =
        months[item.month.substring(5)] + item.month.substring(0, 4)
      document.getElementById("listEvents").appendChild(h2)
      response.elements.forEach((element) => {
        var li = document.createElement("li")

        var a = document.createElement("a")
        var p = document.createElement("p")
        var date = new String()
        if (element["start_date"] == element["end_date"]) {
          var tempdate =
            element["start_date"].substring(8) +
            "/" +
            element["start_date"].substring(5, 7) +
            "/" +
            element["start_date"].substring(8).substring(0, 4)
          date = "On " + tempdate
        } else {
          var tempdate =
            element["start_date"].substring(8) +
            "/" +
            element["start_date"].substring(5, 7) +
            "/" +
            element["start_date"].substring(8).substring(0, 4)
          var tempdate2 =
            element["end_date"].substring(8) +
            "/" +
            element["end_date"].substring(5, 7) +
            "/" +
            element["end_date"].substring(8).substring(0, 4)
          date = "From " + tempdate + "to" + tempdate2
        }

        p.textContent =
          element.description + document.createElement("br") + date
        a.textContent = element.name
        a.href = "/pages/event.html?event-id=" + element.id
        li.appendChild(a)
        li.appendChild(p)
        document.getElementById("listEvents").appendChild(li)
      })
    })
  })
})
