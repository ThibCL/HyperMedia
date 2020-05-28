var event = document.getElementById("event")
var id = "1"
var paramsString = window.location.search.toString()
var searchParams = new URLSearchParams(paramsString)
id = searchParams.get("event-id")
$.get("http://localhost:8080/v1/event/".concat(id), function (response) {
  var eventname = document.getElementById("eventName")
  eventname.textContent = response.name
  var presentation = document.createElement("p")
  presentation.textContent = response.presentation
  document
    .getElementById("pres")
    .insertAdjacentElement("afterend", presentation)
  var practical = document.getElementById("practical")
  response["pratical-info"].forEach((element) => {
    var info = document.createElement("li")
    info.textContent = element
    document.getElementById("info").appendChild(info)
  })

  response["photos"].forEach((element) => {
    var image = document.createElement("img")
    image.src = "../assets/images/".concat(element)
    image.class = "img-thumbnail"
    document.getElementById("images").appendChild(image)
  })

  var startdate = document.createElement("li")
  var enddate = document.createElement("li")
  startdate.textContent = "start date : ".concat(response["start-date"])
  enddate.textContent = "end date : ".concat(response["end-date"])
  document.getElementById("info").appendChild(startdate)
  document.getElementById("info").appendChild(enddate)

  $.get("http://localhost:8080/v1/person/".concat(response.contact), function (
    response
  ) {
    var contact = document.getElementById("contact")
    contact.textContent = response["first-name"]
      .concat(" ")
      .concat(response["last-name"])
    contact.href = "http://localhost:8080/pages/person.html?person-id=".concat(
      response["person-id"]
    )
  })
})

$.get("http://localhost:8080/v1/event/".concat(id).concat("/next"), function (
  response
) {
  document.getElementById(
    "next"
  ).href = "http://localhost:8080/pages/event.html?event-id=".concat(
    response["event-id"]
  )
})

$.get(
  "http://localhost:8080/v1/event/".concat(id).concat("/previous"),
  function (response) {
    document.getElementById(
      "previous"
    ).href = "http://localhost:8080/pages/event.html?event-id=".concat(
      response["event-id"]
    )
  }
)
