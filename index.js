const catQuote = document.getElementById("cat-quote");
const quoteButton = document.getElementById("new-quote-button");

const req = new XMLHttpRequest();
// req.open("GET", "https://catfact.ninja/facts")
// req.send()
// console.log(req.response);

// req.responseType = "json"
// req.onload =() => console.log(req.response);

const getFacts = () => {
  return new Promise((resolve, reject) => {
    req.open("GET", "https://catfact.ninja/facts?limit=35&max_length=100");

    console.log(req.response);
    req.responseType = "json";
    req.onload = () => {
      if (req.status === 200) {
        resolve(req.response);
        
      } else reject(`Error: ${req.statusText}`);
    };

    req.onerror = () => reject("Network Error");
    req.send();
  });
};
quoteButton.addEventListener("click", () => {
    const randomQuote = Math.floor(Math.random()*35)

    quoteButton.disabled = true;
  quoteButton.textContent = "...Loading...";
 

  getFacts()
    .then((result) => {
      catQuote.textContent = "";
      
      const fact = result.data[randomQuote];
        catQuote.textContent = `"${fact.fact}"`;
    })
    .catch((error) => {
    catQuote.textContent = `Failed to fetch facts. Error: ${error}`;
    console.error("Error fetching facts: ", error);
    })
    .finally(() => {
    quoteButton.disabled = false;
    quoteButton.textContent = "Get new quote";
    });

});
