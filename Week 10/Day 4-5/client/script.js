const button = document.querySelector("button");
button.addEventListener("click", () => {
  fetch("http://localhost:5000/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
      ],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then(({ message }) => Promise.reject(message));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
