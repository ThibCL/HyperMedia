$(document).ready(function () {
  set_list()
})

function set_list() {
  $.get("http://localhost:8080/v1/service", function (response) {
    response.forEach((item) => {
      create_item(item)
    })
  })
}

function create_item(item) {
  var li = document.createElement("li")
  li.className = "m-3"

  var div = document.createElement("div")
  div.className = "row justify-content-center"

  var img = document.createElement("img")
  img.src = "/assets/image/" + item.photo_description + ".jpg"
  img.className = "col-3 d-none d-md-block"
  img.onclick = () => {
    window.location.href = "/pages/service.html?service-id=" + item.id
  }

  var a = document.createElement("a")
  a.href = "/pages/service.html?service-id=" + item.id
  a.text = item.name

  var p = document.createElement("p")
  p.textContent = item.description

  var text = document.createElement("div")
  text.className = "col-9 align-self-center"
  text.appendChild(a)
  text.appendChild(p)

  div.appendChild(img)
  div.appendChild(text)

  li.appendChild(div)

  $("#listServices").append(li)
}
