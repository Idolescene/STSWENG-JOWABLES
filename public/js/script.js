addNewRow = (item, parentDiv) => {
  var img = document.createElement('img');
  var name = document.createElement('p');
  var size = document.createElement('p');
  var qty = document.createElement('p');
  var price = document.createElement('p');

  $(img).text(item.img);
  $(name).text(item.name);
  $(size).text(item.size);
  $(qty).text(item.qty);
  $(price).text(item.price);

  row.append(img);
  row.append(name);
  row.append(size);
  row.append(qty);
  row.append(price);

  parentDiv.append(row);
};

$(document).ready(() => {
  $('#add-to-cart').on('click', () => {
    console.log("ADD TO CART WORKS");
    let id = $('#product-desc').val();
    console.log(id);

    $.post('/add-to-cart', {_id: id}, (data, status) => {
      let results = $('#cart-item-div');
      results.empty();

      data.forEach((item, i) => {
        if (err) throw err;
        addNewRow(item, results);
      });
    });
  });
});
