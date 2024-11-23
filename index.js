const req = new XMLHttpRequest()
// req.open("GET", "https://catfact.ninja/facts")
// req.send()
// console.log(req.response);

// req.responseType = "json"
// req.onload =() => console.log(req.response);

const getFacts = new Promise ((resolve, reject) =>{
    req.open("GET", "https://catfact.ninja/facts?limit=15&max_length=60")
    req.send()
    console.log(req.response);
    
    req.responseType = "json"
    req.onload = () => resolve (req.response);
    req.onerror = () => reject (req.statusText);
})


getFacts
.then(result => result.data
)
.then(result => console.log(result)
).catch(error => console.log(error))