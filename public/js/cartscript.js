// addNewProduct = (item, parentDiv) => {
//   console.log(item);

//   var div = document.createElement('div');
//   var id = document.createElement('p');
//   var name = document.createElement('p');
//   var price = document.createElement('p');

//   // var img = document.createElement('img');
//   // img.src(img);

//   $(id).text(item._id);
//   $(name).text(item.name);
//   $(price).text(item.price);
//   // $(img).text(item.img);

//   div.append(id);
//   div.append(name);
//   div.append(price);
//   // div.append(img);

//   parentDiv.append(div);
// }

// $(document).ready(() => {
//   $('#deleteitemcartnavbar').on('click', () => {
//     let item = $('#itemid').text();
//     console.log(item);

//     $.post('/delete-product-confirmation', {id: item}, (data, status) => {
//       let parentDiv = $('#delete-confirm-div');
//       parentDiv.empty();

//       console.log(data);
      
//       addNewProduct(data, parentDiv);
//     });
//   });

//   $('#carticon').hover( () => {
//     console.log("this is working"); //testing

//     let user = $('#userid').text();
//     console.log(user); //testing

//     $('/', {user: user}, (data, status) => {
//       console.log(data);    
//     })
//   });
// });