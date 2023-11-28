$(document).ready(function(){
    cartList();

    $("#importPayment").click(function(){
      payment();
    });
})


async function cartList(data){
  await axios({
      url: "http://127.0.0.1:8000/payments/cart/",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
  }).then((res)=>{
    const productList = res.data;

    const productListContainer = $("#productListContainer");

    productList.forEach((product, index)=>{
      const productDiv = $("<div>").css({"display": "flex"});

      const productNameLi = $("<li>").text(product.product_name).addClass("products").attr("id", `product_name_${index + 1}`);

      const quantityLi = $("<li>").addClass("products").attr("id", `quantity_${index + 1}`).append($("<div>").addClass("form-group").append($("<label>").text("Quantity: "), $("<input>").attr("type", "text").addClass("form-control quantityInput")));

      const totalPriceProduct = product.price * product.quantity;
      
      const priceLi = $("<li>").text(`${totalPriceProduct}원`).addClass("price").attr("id", `price_${index + 1}`);

      productDiv.append(productNameLi, quantityLi, priceLi);

      productDiv.append($("<hr>").css("width", "98%"));

      productListContainer.append(productDiv);

      $(`#quantity_${index + 1} .quantityInput`).val(product.quantity);
    })


    const productName1 = res.data[0].product_name;
    const price1 = res.data[0].price;
    const quantity1 = res.data[0].quantity;

    $("#product_name_1").text(productName1);
    $("#price_1").text(price1);
    $("#quantityInput").val(quantity1);
  })
}