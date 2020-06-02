$(document).ready(function () {
  set_content()
})

async function set_content() {
  var searchParams = new URLSearchParams(location.search)
  var id = searchParams.get("person-id")

  $.get("http://localhost:8080/v1/person/" + id, function (response) {
    set_personName(response["last-name"], response["first-name"])
    set_photos(response.photo)
    set_description(response.description)
  })
}

function set_personName(lastName, firstName) {
  $("#person-name").text(lastName + " " + firstName)
  $(".breadcrumb-item.active").text(lastName + " " + firstName)
}

function set_photos(photos) {
  var i = 0
  photos.forEach((item) => {
    var li = document.createElement("li")
    li["data-target"] = "#carouselExampleIndicators"
    li["data-slide-to"] = i++
    $(".carousel-indicators").append(li)

    var div = document.createElement("div")
    div.className = "carousel-item"

    var img = document.createElement("img")
    img.className = "d-block w-100 h-25"
    img.height = img.src = "/assets/image/" + item + ".jpg"

    div.appendChild(img)
    $("#carousel").append(div)
  })

  $(".carousel-item:first-child").addClass("active")
}

function set_description(description) {
  var p = document.createElement("p")
  p.innerText = description
  $("#description").after(p)
}
