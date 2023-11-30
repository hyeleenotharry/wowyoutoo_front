(()=>{"use strict";$(document).ready((function(){!async function(t){await axios({url:"http://127.0.0.1:8000/payments/cart/",method:"get",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("access")}`}}).then((t=>{const a=t.data,e=$("#productListContainer");let n=0;a.forEach(((t,a)=>{const o=$("<div>").css({display:"flex"}),i=$("<li>").text(t.product_name).addClass("products products_li").attr("id",`product_name_${a+1}`),p=$("<li>").addClass("products").attr("id",`quantity_${a+1}`).append($("<div>").addClass("form-group").append($("<label>").text("Quantity: "),$("<input>").attr("type","text").addClass("form-control quantityInput"))),c=t.price*t.quantity;n+=c;const d=$("<li>").text(`${c}원`).addClass("price").attr("id",`price_${a+1}`);o.append(i,p,d),o.append($("<hr>").css("width","98%")),e.append(o),$(`#quantity_${a+1} .quantityInput`).val(t.quantity)})),$("#totalPriceEntire").text(`${n}원`)}))}(),$("#updateCart").click((function(){!async function(){const t=[];$(".products_li").each((function(a){const e=$(`#product_name_${a+1}`).text(),n=$(`#quantity_${a+1} .quantityInput`).val();e&&n&&t.push({product_name:e,quantity:n})})),console.log(t),await axios({url:"http://127.0.0.1:8000/payments/cart/update/",method:"put",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("access")}`},data:{updatedProducts:t}}).then((t=>{const a=t.data,e=$("#productListContainer");e.empty();let n=0;a.forEach(((t,a)=>{const o=$("<div>").css({display:"flex"}),i=$("<li>").text(t.product_name).addClass("products products_li").attr("id",`product_name_${a+1}`),p=$("<li>").addClass("products").attr("id",`quantity_${a+1}`).append($("<div>").addClass("form-group").append($("<label>").text("Quantity: "),$("<input>").attr("type","text").addClass("form-control quantityInput"))),c=t.price*t.quantity;n+=c;const d=$("<li>").text(`${c}원`).addClass("price").attr("id",`price_${a+1}`);o.append(i,p,d),o.append($("<hr>").css("width","98%")),e.append(o),$(`#quantity_${a+1} .quantityInput`).val(t.quantity)})),$("#totalPriceEntire").text(`${n}원`)}))}()})),$("#goToCheckPage").click((function(){!async function(t){window.location.href="../templates/checkPage.html"}()})),$("#importPayment").click((function(){!async function(t){IMP.init("imp83886631");let a=crypto.randomUUID();await axios({url:"http://127.0.0.1:8000/payments/prepare/",method:"post",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("access")}`},data:{merchant_uid:a,amount:100,product_name:"Coins"}}).then((t=>{t.data&&IMP.request_pay({pg:"uplus",pay_method:"card",merchant_uid:t.data.merchant_uid,amount:t.data.amount,name:t.data.product_name},(function(t){t.success?axios({url:"http://127.0.0.1:8000/payments/complete/",method:"post",headers:{"Content-Type":"application/json"},data:{imp_uid:t.imp_uid,merchant_uid:t.merchant_uid,paid_amount:t.paid_amount,status:t.status,name:t.name,buyer_name:t.buyer_name}}).then((t=>{alert("Payment successful! Thank you for your purchase."),window.location.href="../templates/main.html"})):alert(`결제에 실패하였습니다. 에러 내용: ${t.error_msg}`)}))}))}()}))}))})();