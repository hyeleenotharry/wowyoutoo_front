$(document).ready(function(){
    cartList();

    $("#updateCart").click(function(){
      updateCart();
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
    let totalPriceEntire = 0

    productList.forEach((product, index)=>{
      const productDiv = $("<div>").css({"display": "flex"});
      const productNameLi = $("<li>").text(product.product_name).addClass("products products_li").attr("id", `product_name_${index + 1}`);
      const quantityLi = $("<li>").addClass("products").attr("id", `quantity_${index + 1}`).append($("<div>").addClass("form-group").append($("<label>").text("Quantity: "), $("<input>").attr("type", "text").addClass("form-control quantityInput")));

      const totalPriceProduct = product.price * product.quantity;
      totalPriceEntire += totalPriceProduct;
      
      const priceLi = $("<li>").text(`${totalPriceProduct}원`).addClass("price").attr("id", `price_${index + 1}`);

      productDiv.append(productNameLi, quantityLi, priceLi);
      productDiv.append($("<hr>").css("width", "98%"));
      productListContainer.append(productDiv);

      $(`#quantity_${index + 1} .quantityInput`).val(product.quantity);
    });

    $("#totalPriceEntire").text(`${totalPriceEntire}원`);
  })
}


async function updateCart(){
  const updatedProducts = [];

  $(".products_li").each(function(index){
    const product_name = $(`#product_name_${index + 1}`).text();
    const quantity = $(`#quantity_${index + 1} .quantityInput`).val();

    if(product_name && quantity){
      updatedProducts.push({product_name, quantity});
    }
  });
  console.log(updatedProducts)
  await axios({
      url: "http://127.0.0.1:8000/payments/cart/update/",
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`
      },
      data: {
          updatedProducts: updatedProducts
      }
  }).then((res)=>{
      // console.log("response data: ", res.data)
  })
}