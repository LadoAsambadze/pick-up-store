import axios from "axios";

export default function Checkout() {
  async function makeRequest() {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      data: {
        method: "justPay",
        apiKey: "25972B9F547148369BD12CF19E5FB1F5",
        apiSecret: "5B2C72EA0BA3416B8034E8B5EA44E18C",
        data: {
          amount: 1,
          currency: "GEL",
          callback: "https://corp.com/success_callback",
          callbackError: "https://corp.com/fail_url",
          preauthorize: true,
          lang: "EN",
          hookUrl: "https://corp.com/payze_hook?authorization_token=token",
          hookUrlV2: "https://corp.com/payze_hook?authorization_token=token",
          hookRefund: true,
        },
      },
    };

    try {
      const response = await axios("https://payze.io/api/v1", options);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2 onClick={makeRequest}>Checkout</h2>
    </div>
  );
}
