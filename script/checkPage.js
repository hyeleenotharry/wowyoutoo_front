import '../css/checkPage.css'

$(document).ready(function () {
    productList();

    $(".buyBtn").click(function () {
        const product_id = $(this).data("product-id");
        addToCart(product_id);
    });

    $("#goto-bag").click(function () {
        handleGoToBag();
    });
})


async function productList(data) {
    await axios({
        url: "http://127.0.0.1:8000/payments/products/",
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`
        }
    }).then((res) => {
        const productName1 = res.data[0].product_name;
        const productName2 = res.data[1].product_name;
        const productName3 = res.data[2].product_name;
        const productName4 = res.data[3].product_name;

        const productPrice1 = res.data[0].price;
        const productPrice2 = res.data[1].price;
        const productPrice3 = res.data[2].price;
        const productPrice4 = res.data[3].price;

        const productDesc1 = res.data[0].description;
        const productDesc2 = res.data[1].description;
        const productDesc3 = res.data[2].description;
        const productDesc4 = res.data[3].description;


        $("#product_name_1").text(productName1);
        $("#product_name_2").text(productName2);
        $("#product_name_3").text(productName3);
        $("#product_name_4").text(productName4);

        $("#product_price_1").text(productPrice1);
        $("#product_price_2").text(productPrice2);
        $("#product_price_3").text(productPrice3);
        $("#product_price_4").text(productPrice4);

        $("#product_desc_1").text(productDesc1);
        $("#product_desc_2").text(productDesc2);
        $("#product_desc_3").text(productDesc3);
        $("#product_desc_4").text(productDesc4);


    })
}


async function addToCart(product_id) {
    await axios({
        url: `http://127.0.0.1:8000/payments/cart/${product_id}/`,
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`
        },
        data: {
            "quantity": 1
        }
    }).then((res) => {
        console.log("response data: ", res.data)
        alert("선택한 상품이 장바구니에 담겼습니다.");
    })
}


async function handleGoToBag(data) {
    window.location.href = "../templates/BuyingPage.html";
}