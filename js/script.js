window.addEventListener('load', () => {
    let long;
    let lat;
    const content = document.getElementById('content');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C%20${long}?unitGroup=us&key=ERGNE3UJ5A6YSYLLZBYXRL87C&contentType=json`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temp, humidity, cloudcover } = data.currentConditions;
                const description = data.description;
                const timezone = data.timezone;

                content.innerHTML = `
                <div class="card mx-auto mt-5" style="width: 18rem;">
                <div class="card-body justify-content-center">
                    <h5 class="card-title">${timezone}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Temperature of ${temp}&#8457; with a cloud cover of ${cloudcover}% and a humidity of ${humidity}%.</h6>
                    <p class="card-text ">Weather conditions are described as: "${description}"</p>
                    
                </div>
            </div>
            `;
            })
        });
    }
});