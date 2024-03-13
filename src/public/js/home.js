fetch('/api/current', {
    method:'GET',
    headers: {
        authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
}).then(res=>{
    if(res.status === 403 || res.status === 401){
        window.location.replace('/login')
    }else{
        return res.json();
    }
}).then(res=>{
    const p = document.getElementById('result')
    p.innerHTML = `Data: ${res.payload.email}, ${res.payload.first_name}`
})