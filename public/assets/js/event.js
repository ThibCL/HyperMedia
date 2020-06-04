$(document).ready(function () {
  var id = "1"
  var paramsString = window.location.search.toString()
  var searchParams = new URLSearchParams(paramsString)
  id = searchParams.get("event-id")

  var hasService = searchParams.has("service-id")

  if (hasService) {
    var serviceId = searchParams.get("service-id")

    $.get("http://localhost:8080/v1/service/".concat(serviceId), function (
      response
    ) {
      var li = document.createElement("li")
      li.className = "breadcrumb-item"

      var a = document.createElement("a")
      a.href = "/pages/service.html?service-id=" + serviceId
      a.textContent = response.name
      li.appendChild(a)
      $("#home").after(li)

      console.log($("#eventlink"))
      $("#eventlink")[0].href = "/pages/present.html?service-id=" + serviceId
    })

    $.get(
      "http://localhost:8080/v1/event/"
        .concat(id)
        .concat("/nextPresents?service-id=")
        .concat(serviceId),
      function (response) {
        var next_button = document.getElementById("next")
        if (response.id == 0) {
          next_button.className += " disabled"
        } else {
          next_button.href = "http://localhost:8080/pages/event.html?event-id=".concat(
            response.id + "&service-id=" + serviceId
          )
        }
      }
    )

    $.get(
      "http://localhost:8080/v1/event/"
        .concat(id)
        .concat("/previousPresents?service-id=")
        .concat(serviceId),
      function (response) {
        var previous_button = document.getElementById("previous")
        if (response.id == 0) {
          previous_button.className += " disabled"
        } else {
          previous_button.href = "http://localhost:8080/pages/event.html?event-id=".concat(
            response.id + "&service-id=" + serviceId
          )
        }
      }
    )
  } else {
    $.get(
      "http://localhost:8080/v1/event/".concat(id).concat("/next"),
      function (response) {
        var next_button = document.getElementById("next")
        if (response.id == 0) {
          next_button.className += " disabled"
        } else {
          next_button.href = "http://localhost:8080/pages/event.html?event-id=".concat(
            response.id
          )
        }
      }
    )

    $.get(
      "http://localhost:8080/v1/event/".concat(id).concat("/previous"),
      function (response) {
        var previous_button = document.getElementById("previous")
        if (response.id == 0) {
          previous_button.className += " disabled"
        } else {
          previous_button.href = "http://localhost:8080/pages/event.html?event-id=".concat(
            response.id
          )
        }
      }
    )
  }

  $.get("http://localhost:8080/v1/event/".concat(id), function (response) {
    var eventname = document.getElementById("eventName")
    eventname.textContent = response.name
    var presentation = document.createElement("p")
    presentation.textContent = response.presentation
    document
      .getElementById("presentation")
      .insertAdjacentElement("afterend", presentation)
    response["practical-info"].forEach((element) => {
      var info = document.createElement("li")
      info.textContent = element.info
      document.getElementById("info").appendChild(info)
    })
    var i = 0
    response["photos"].forEach((element) => {
      var li = document.createElement("li")
      li["data-target"] = "#carouselExampleIndicators"
      li["data-slide-to"] = i++
      $(".carousel-indicators").append(li)

      var div = document.createElement("div")
      div.className = "carousel-item"

      var img = document.createElement("img")
      img.className = "d-block w-100"
      img.src = "/assets/image/" + element + ".jpg"

      div.appendChild(img)
      $("#carousel").append(div)
    })
    $(".carousel-item:first-child").addClass("active")

    var startdate = document.createElement("li")
    var enddate = document.createElement("li")
    startdate.textContent = "start date : ".concat(response["start-date"])
    enddate.textContent = "end date : ".concat(response["end-date"])
    document.getElementById("info").appendChild(startdate)
    document.getElementById("info").appendChild(enddate)

    $.get(
      "http://localhost:8080/v1/person/".concat(response.contact),
      function (response) {
        var contact = document.getElementById("contact")
        contact.textContent = response["first-name"]
          .concat(" ")
          .concat(response["last-name"])
        contact.href = "http://localhost:8080/pages/person.html?person-id=".concat(
          response["person-id"]
        )
      }
    )
    $.get(
      "http://localhost:8080/v1/service/presented-in?event-id=".concat(
        response["event-id"]
      ),
      function (response) {
        response.forEach((element) => {
          var li = document.createElement("li")
          var a = document.createElement("a")
          a.className = "nav-link"
          a.href = "/pages/service.html?service-id=" + element["id"]
          a.text = element.name

          li.appendChild(a)
          $("#service-presented").append(li)
        })
      }
    )
  })
})
