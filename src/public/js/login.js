const form = document.getElementById("loginForm");

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const data = new FormData(form);
    const payload = {}

    data.forEach((value, key)=>payload[key] = value)

    fetch('/api/login',{
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res=>res.json()).then(res=>{
        localStorage.setItem('access_token', res.access_token)
    })

})