addText = (item, parentDiv) => {
  var type = document.createElement('p');
  $(type).text(item);
  parentDiv.append(type);
}

$(document).ready(() => {
  $('#carticon').hover( () => {
    console.log("this is working"); //testing

    let user = $('#userid').text();
    console.log(user); //testing

    $('/', {user: user}, (data, status) => {
      console.log(data);    
    })
  });
});