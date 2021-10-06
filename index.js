fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=norway")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `Photo By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://unsplash.com/photos/lE5-z4nTCTQ)`
		document.getElementById("author").textContent = `Photo By: Michael Fousert`
    })

    // still working on getting the data properly from mlb stats


fetch("https://mlb-data.p.rapidapi.com/json/named.leader_hitting_repeater.bam?game_type='R'&results='5'&sort_column='hr'&sports_code='mlb'&season='2021'&leader_hitting_repeater.col_in=hr", {
	"method": "GET",
    "body": JSON.stringify(),
	"headers": {
		"x-rapidapi-host": "mlb-data.p.rapidapi.com",
		"x-rapidapi-key": "ea912f5cafmsh62a4cbd70905e31p165c87jsn2591959dc408"
	}
})
    .then(res => 
        res.json())
    .then(data => {
        document.getElementById("baseball-top").textContent = `${data.leader_hitting_repeater.leader_hitting_mux.queryResults.row[0].hr}`
        document.getElementById("baseball-middle").textContent = `${data.leader_hitting_repeater.leader_hitting_mux.queryResults.row[1].hr}`
        document.getElementById("baseball-bottom").textContent = `${data.leader_hitting_repeater.leader_hitting_mux.queryResults.row[2].hr}`
        console.log(data)
})
    .catch(err => {
	    console.error(err);
});


function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)


fetch("https://stoicquotesapi.com/v1/api/quotes/random")
    .then(res => res.json())
    .then(data => {
        document.getElementById("quote").textContent = `${data.body}`
        document.getElementById("quote-author").textContent = `- ${data.author}`
        console.log(data)
    })
    .catch(err => console.error(err))


navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});