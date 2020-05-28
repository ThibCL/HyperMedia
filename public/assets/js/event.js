var event = document.getElementById("event")
var id = "1"
var paramsString = window.location.search.toString()
console.log(paramsString)
var searchParams = new URLSearchParams(paramsString)
id = searchParams.get("event-id")

console.log(id)
$.get("http://localhost:8080/v1/event/".concat(id), function (response) {
  console.log(response["pratical-info"])
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
  var startdate = document.createElement("li")
  var enddate = document.createElement("li")
  startdate.textContent = "start date : ".concat(response["start-date"])
  enddate.textContent = "end date : ".concat(response["end-date"])
  document.getElementById("info").appendChild(startdate)
  document.getElementById("info").appendChild(enddate)
})

$.get("http://localhost:8080/v1/person/contact", function (response) {
  var contactInfo = document.createElement("a")
  contactInfo.textContent = contact["first-name"].concat(contact["last-name"])
  contactInfo.href = "../../pages/person.html"
  document.getElementById("lienDeContact").appendChild(contactInfo)
})
