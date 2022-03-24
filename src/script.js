import http from "k6/http";

export default function () {
  const url = "http://api.yourplatform.com/login";
  const payload = JSON.stringify({
    email: "johndoe@example.com",
    password: "PASSWORD",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  http.post(url, payload, params);
}
