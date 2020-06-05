$(document).ready(function () {
  var id = "1"
  var paramsString = window.location.search.toString()
  var searchParams = new URLSearchParams(paramsString)
  id = searchParams.get("event-id")
  $.get("https://agirpourlenvironnement.herokuapp.com/v1/event", function (
    response
  ) {
    response.forEach((item) => {
      var li = document.createElement("li")
      var div = document.createElement("div")
      div.className = "row p-3"

      var img = document.createElement("img")
      img.src = "/assets/image/" + item.photo_description + ".jpg"
      img.className = "col-3 d-none d-md-block"

      var divtext = document.createElement("div")
      divtext.className = "col-9 align-self-center"

      var a = document.createElement("a")
      a.textContent = item.name
      a.href = "/pages/event.html?event-id=" + item.id

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
  })
})
