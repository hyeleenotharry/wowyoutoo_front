$(document).ready(function(){
    $("#importPayment").click(function(){
      payment();
    });
})


async function payment(data){
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
            product_name: "50 Coins",
        }
    }).then((res)=>{
        if(res.data){
            IMP.request_pay({ //결제창 호출
                pg: "uplus",
                pay_method: "card",
                merchant_uid: res.data.merchant_uid,   // 주문번호, unique, DB에 저장
                amount: res.data.amount,               // 숫자 타입
                name: res.data.product_name,            
            }, function (rsp) { // callback, 결제 후

                // axios({ // 요청 금액과 결제 금액 검증
                //   url: `/verifyIamport/${rsp.imp_uid}`, // imp_uid: PortOne 결제고유번호
                //   method: "post"
                // }).then((data) => {
                //   if(rsp.paid_amount === data.response.amount){
                //     alert("결제 및 결제검증완료");
                //   }
                // })

                //rsp.imp_uid 값으로 결제 단건조회 API를 호출하여 결제결과를 판단합니다.
                if (rsp.success) {  
                    // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우 
                    axios({
                      url: "http://127.0.0.1:8000/payments/complete/",
                      method: "post",
                      headers: { "Content-Type": "application/json" },
                      data: {
                        imp_uid: rsp.imp_uid,            // 결제 고유번호
                        merchant_uid: rsp.merchant_uid,   // 주문번호
                        paid_amount: rsp.paid_amount,
                        status: rsp.status,
                        name: rsp.name,
                        buyer_name:rsp.buyer_name
                      }
                    }).then((data) => {
                      // 서버 결제 API 성공시 로직
                    })
                  } else {
                    alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
                  }
            });
        }
    })
}