$(document).ready(function () {
  set_content()
})

function set_content() {
  $.get("http://localhost:8080/v1/event", function (response) {
    set_elem(response)
  })
}

function set_elem(events) {
  for (i = 0; i < events.length / 4; i++) {
    var li = document.createElement("li")
    li["data-target"] = "#carouselExampleIndicators"
    li["data-slide-to"] = i
    $(".carousel-indicators").append(li)

    var div = document.createElement("div")
    div.className = "carousel-item"

    var sub = events.slice(4 * i, 4 * (i + 1))
    console.log(sub)
    for (j = 0; j < sub.length; j++) {
      var card = create_card(events[4 * i + j])
      div.appendChild(card)
    }

    $("#carousel").append(div)
  }

  $(".carousel-item:first-child").addClass("active")
}

function create_card(event) {
  var div = document.createElement("div")
  div.className = "card col-3 p-3"
  div.style = "width: 18rem; float:left;"

  var img = document.createElement("img")
  img.src = "/assets/image/" + event["photo-description"] + ".jpg"
  img.className = "card-img-top"

  var body = document.createElement("div")
  body.className = "card-body"

  var p = document.createElement("p")
  p.className = "card-text"
  p.innerText = event.description

  var a = document.createElement("a")
  a.href = "/pages/event.html?event-id=" + event["event-id"]
  a.innerText = event.name
  body.append(a)
  body.append(p)

  div.append(img)
  div.append(body)

  return div
}
