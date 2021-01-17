addText = (item, parentDiv) => {
  var text = document.createElement('p');
  $(type).text(item);
  parentDiv.append(type);
}

$(document).ready(() => {
  $('#carticon').hover( () => {
    console.log("this is working");
  });
});