dragula([document.getElementById("widget-todo-list")], {
  moves: function (e, a, t) {
    return t.classList.contains("cursor-move")
  },
})
