$(document).ready(function () {
  set_list()
})

function set_list() {
  $.get("http://localhost:8080/v1/person", function (response) {
    var set = new Set(response.map((x) => x.last_name[0].toUpperCase()))
    var index = [...set]
    create_lists(index)
    create_index(index)
    response.forEach((item) => {
      create_item(item)
    })
  })
}

function create_index(index) {
  var p = document.createElement("p")

  for (j = 0; j < index.length; j++) {
    var a = document.createElement("a")
    a.href = "#h" + index[j]
    a.textContent = index[j] + " "

    p.append(a)
  }
  $("#index").append(p)
}

function create_lists(index) {
  for (i = 0; i < index.length; i++) {
    var h2 = document.createElement("h3")
    h2.textContent = index[i]
    h2.id = "h" + index[i]

    var ul = document.createElement("ul")
    ul.id = index[i]

    $("#listPersons").append(h2)
    $("#listPersons").append(ul)
  }
}

function create_item(item) {
  var li = document.createElement("li")
  li.className = "m-3"

  var div = document.createElement("div")
  div.className = "row"

  var a = document.createElement("a")
  a.href = "/pages/person.html?person-id=" + item.id
  a.text = item.last_name + " " + item.first_name

  div.appendChild(a)

  li.appendChild(div)

  $("#" + item.last_name[0].toUpperCase()).append(li)
}
