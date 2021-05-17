const ipInfo = document.querySelectorAll('.ipData');
const botao = document.querySelector('.btnGo');
const ip = document.querySelector('.ip')
let map = L.map('mapid').setView([0, 0], 25);


document.addEventListener('click', (event) => {
    if(event.target.className === 'btnGo'){
    if(validateIPaddress(ip.value)) {
        const fetchObject = {
            method: 'GET'
        }
        const url = `https://geo.ipify.org/api/v1?apiKey=at_mdcwBe4HwyJ3agF1hAdY8PJwHRPlB&ipAddress=${ip.value}` 
        fetch(url, fetchObject)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            ipInfo[0].innerText = response.ip
            ipInfo[1].innerText = `${response.location.city}, ${response.location.region} ${response.location.geonameId}`
            ipInfo[2].innerText = `UTC ${response.location.timezone}`
            ipInfo[3].innerText = response.isp
            mapRender(response.location.lat, response.location.lng);
            })
        } else {
            alert("You have entered an invalid IP address!")  
        }
    }
})
const mapRender = (lat, long) => {
    map.setView([lat, long], 25)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([lat, long]).addTo(map)
        .bindPopup('Localização do IP')
        .openPopup();
}

function validateIPaddress(ipaddress) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
      return (true)  
    }  
    return (false)  
}  

const defaultIp = () => {
    const fetchObject = {
        method: 'GET'
    }
    const url = `https://geo.ipify.org/api/v1?apiKey=at_mdcwBe4HwyJ3agF1hAdY8PJwHRPlB` 
    fetch(url, fetchObject)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        ipInfo[0].innerText = response.ip
        ipInfo[1].innerText = `${response.location.city}, ${response.location.region} ${response.location.geonameId}`
        ipInfo[2].innerText = `UTC ${response.location.timezone}`
        ipInfo[3].innerText = response.isp
        mapRender(response.location.lat, response.location.lng);
        })
    } 

window.onload(defaultIp())