$(document).ready(function () {
  var event = document.getElementById("event")
  var id = "1"
  var paramsString = window.location.search.toString()
  var searchParams = new URLSearchParams(paramsString)
  id = searchParams.get("service-id")
  $.get("http://localhost:8080/v1/event/presents?service-id=" + id, function (
    response
  ) {
    console.log(response)
    response.forEach((item) => {
      var li = document.createElement("li")

      var a = document.createElement("a")
      var p = document.createElement("p")
      var date = new String()
      if (item["start_date"] == item["end_date"]) {
        var tempdate =
          item["start_date"].substring(8) +
          "/" +
          item["start_date"].substring(5, 7) +
          "/" +
          item["start_date"].substring(8).substring(0, 4)
        date = "On " + tempdate
      } else {
        var tempdate =
          item["start_date"].substring(8) +
          "/" +
          item["start_date"].substring(5, 7) +
          "/" +
          item["start_date"].substring(8).substring(0, 4)
        var tempdate2 =
          item["end_date"].substring(8) +
          "/" +
          item["end_date"].substring(5, 7) +
          "/" +
          item["end_date"].substring(8).substring(0, 4)
        date = "From " + tempdate + "to" + tempdate2
      }

      p.textContent = item.description + "<br>" + date
      a.textContent = item.name
      a.href = "/pages/event.html?event-id=" + item.id + "&service-id=" + id
      li.appendChild(a)
      li.appendChild(p)
      document.getElementById("listEvents").appendChild(li)
    })
  })

  $.get("http://localhost:8080/v1/service/" + id, function (response) {
    document.getElementById("service").textContent = response.name
    document.getElementById("service").href =
      "/pages/service.html?service-id=" + id
    document.getElementById("title").textContent =
      "Events that present the" + response.name + "service"
  })
})
