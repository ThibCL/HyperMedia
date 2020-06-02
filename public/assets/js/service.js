$(document).ready(function () {
  set_content()
  set_navigation()
})

async function set_content() {
  var searchParams = new URLSearchParams(location.search)
  var id = searchParams.get("service-id")

  $.get("http://localhost:8080/v1/service/" + id, function (response) {
    set_serviceName(response.name)
    set_presentation(response.presentation)
    set_practicalInfo(response["pratical-info"])
    set_photos(response.photo)
  })

  $("#involves").attr("href", "/pages/involves.html?service-id=" + id)
  $("#events-related").attr("href", "/pages/present.html?service-id=" + id)
}

function set_presentation(pres) {
  var p = document.createElement("p")
  p.innerText = pres
  $("#presentation").after(p)
}

function set_practicalInfo(infos) {
  var ul = document.createElement("ul")
  infos.forEach((item) => {
    var li = document.createElement("li")
    li.innerText = item
    ul.appendChild(li)
  })
  $("#practicalInfo").after(ul)
}

function set_photos(photos) {
  photos.forEach((item) => {
    var div = document.createElement("div")
    div.className = "carousel-item"

    var img = document.createElement("img")
    img.className = "d-block w-100"
    img.src = "/assets/image/" + item + ".jpg"

    div.appendChild(img)
    $("#carousel").append(div)
  })

  $(".carousel-item:first-child").addClass("active")
}

function set_serviceName(name) {
  $("#service-name").text(name)
  $(".breadcrumb-item.active").text(name)
}

function set_navigation() {
  var searchParams = new URLSearchParams(location.search)
  var id = searchParams.get("service-id")

  $.get("http://localhost:8080/v1/service", function (response) {
    response.forEach((item) => {
      var li = document.createElement("li")
      li.className = "nav-item"

      var a = document.createElement("a")
      a.className = "nav-link"
      a.href = "/pages/service.html?service-id=" + item["service-id"]
      a.text = item.name

      li.appendChild(a)
      $("#services").append(li)
    })
  })
}
