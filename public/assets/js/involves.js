$(document).ready(function () {
  set_content()
})

async function set_content() {
  var searchParams = new URLSearchParams(location.search)
  var id = searchParams.get("service-id")

  $.get(
    "http://localhost:8080/v1/person/involved-in?service-id=" + id,
    function (response) {
      response.forEach(function (item) {
        create_item(item)
      })
    }
  )

  $.get("http://localhost:8080/v1/service/" + id, function (response) {
    set_breadcrum(response.name, id)
  })

  set_backButton(id)
}

function set_breadcrum(name, id) {
  $("#serviceName").attr("href", "/pages/service.html?service-id=" + id)
  $("#serviceName").text(name)
}

function set_backButton(id) {
  $("#back").bind("click", function () {
    window.location.href = "/pages/service.html?service-id=" + id
  })
}

function create_item(item) {
  var li = document.createElement("li")
  li.className = "p-3"

  var div = document.createElement("div")

  var h3 = document.createElement("h3")
  h3.innerText = item.role

  var ul = document.createElement("ul")

  for (i = 0; i < item.persons.length; i++) {
    var lia = document.createElement("li")
    lia.className = "p-3"

    var card = create_card(item.persons[i])

    lia.append(card)
    ul.append(lia)
  }

  div.append(h3)
  div.append(ul)

  li.append(div)

  $("#listperson").append(li)
}

function create_card(person) {
  var div = document.createElement("div")
  div.className = "card"
  div.style = "width: 18rem;"

  var img = document.createElement("img")
  img.src = "/assets/image/" + person.photo[0] + ".jpg"
  img.className = "card-img-top"

  var body = document.createElement("div")
  body.className = "card-body"

  var p = document.createElement("p")
  p.className = "card-text"
  p.innerText = person.description

  var a = document.createElement("a")
  a.href = "/pages/person.html?person-id=" + person.id
  a.innerText = person.last_name + " " + person.first_name

  body.append(a)
  body.append(p)

  div.append(img)
  div.append(body)

  return div
}
