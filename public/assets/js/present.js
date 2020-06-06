$(document).ready(function () {
  var id = "1"
  var paramsString = window.location.search.toString()
  var searchParams = new URLSearchParams(paramsString)
  id = searchParams.get("service-id")
  $.get(
    "https://agirpourlenvironnement.herokuapp.com/v1/event/presents?service-id=" +
      id,
    function (response) {
      console.log(response)
      response.forEach((item) => {
        var li = document.createElement("li")
        var div = document.createElement("div")
        div.className = "row p-3"

        var img = document.createElement("img")
        img.src = "/assets/image/" + item.photo_description + ".jpg"
        img.className = "col-3 d-none d-md-block"

        var divtext = document.createElement("div")
        divtext.className = "col-md-9 col-sm-12 align-self-center"

        var a = document.createElement("a")
        a.textContent = item.name
        a.href = "/pages/event.html?event-id=" + item.id + "&service-id=" + id

        var pdes = document.createElement("p")
        pdes.textContent = item.description

        var p = document.createElement("p")
        var start = new Date(item.start_date)
        var end = new Date(item.end_date)
        p.textContent =
          "From " + start.toDateString() + " to " + end.toDateString()

        divtext.append(a)
        divtext.append(pdes)
        divtext.append(p)

        div.append(img)
        div.append(divtext)
        li.append(div)
        document.getElementById("listEvents").appendChild(li)
      })
    }
  )

  console.log(id)
  $.get(
    "https://agirpourlenvironnement.herokuapp.com/v1/service/" + id,
    function (response) {
      document.getElementById("service").textContent = response.name
      document.getElementById("service").href =
        "/pages/service.html?service-id=" + id
      document.getElementById("title").textContent =
        "Events that present the " + response.name + " service"
    }
  )
})
