// import '../css/BuyingPage.css'

$(document).ready(function () {
  cartList();

  $("#updateCart").click(function () {
    updateCart();
  });

  $("#goToCheckPage").click(function () {
    handleGoToCheckPage();
  });

  $("#importPayment").click(function () {
    payment();
  });
})


async function cartList(data) {
  await axios({
    url: "http://127.0.0.1:8000/payments/cart/",
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`
    }
  }).then((res) => {
    const productList = res.data;
    const productListContainer = $("#productListContainer");
    let totalPriceEntire = 0

    productList.forEach((product, index) => {
      const productDiv = $("<div>").css({ "display": "flex" });
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


async function updateCart() {
  const updatedProducts = [];

  $(".products_li").each(function (index) {
    const product_name = $(`#product_name_${index + 1}`).text();
    const quantity = $(`#quantity_${index + 1} .quantityInput`).val();

    if (product_name && quantity) {
      updatedProducts.push({ product_name, quantity });
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
  }).then((res) => {

    const productList = res.data;
    const productListContainer = $("#productListContainer");
    productListContainer.empty();
    let totalPriceEntire = 0

    productList.forEach((product, index) => {
      const productDiv = $("<div>").css({ "display": "flex" });
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


async function payment(data) {
  // var IMP = window.IMP; // 생략 가능
  IMP.init("imp83886631"); //가맹점 식별코드, 객체 초기화 하기

  // let myuuid = `${crypto.randomUUID()}-${Date.now()}`;
  let myuuid = crypto.randomUUID() // 가맹점 주문번호 uniquely 생성

  // DB에 저장할 정보를 백엔드로 보냄
  await axios({
    url: "http://127.0.0.1:8000/payments/prepare/",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`
    },
    data: {
      merchant_uid: myuuid, // 가맹점 주문번호
      amount: 100,          // 결제 예정금액
      product_name: "Coins",
    }
  }).then((res) => {
    if (res.data) {
      // 결제창 호출
      IMP.request_pay({
        pg: "uplus",
        pay_method: "card",
        merchant_uid: res.data.merchant_uid,   // 주문번호, unique, DB에 저장
        amount: res.data.amount,
        name: res.data.product_name,
      }, function (rsp) { // callback, 결제 후

        //rsp.imp_uid 값으로 결제 단건조회 API를 호출하여 결제결과를 판단
        if (rsp.success) {
          // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우 
          axios({
            url: "http://127.0.0.1:8000/payments/complete/",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
              imp_uid: rsp.imp_uid,            // ImPort의 결제 고유번호
              merchant_uid: rsp.merchant_uid,  // 주문번호
              paid_amount: rsp.paid_amount,
              status: rsp.status,
              name: rsp.name,
              buyer_name: rsp.buyer_name
            }
          }).then((data) => {
            // 서버 결제 API 성공시 로직
            alert("Payment successful! Thank you for your purchase.");
            window.location.href = "../templates/main.html";
          })
        } else {
          alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
        }
      });
    }
  })
}


async function handleGoToCheckPage(data) {
  window.location.href = "../templates/checkPage.html";
}