const form = document.getElementById("registerForm");

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const data = new FormData(form);
    const payload = {}

    data.forEach((value, key)=>payload[key] = value)

    fetch('/api/register',{
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res=>res.json()).then(res=>{
        console.log(res)
    })

})