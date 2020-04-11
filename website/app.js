/* Global Variables */
let baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
let apiKey = '&appid=d38a934f798f5d08a463eba5bba143cb';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(evt) {
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    getWeather(baseUrl, zipCode, apiKey)
        //Post Data
        .then(function (data) {
            postData('/add', {
                temperature: data.main.temp, date: newDate, response: feelings
            });
        })
        //update UI
        .then(function (res) { updateUI('/all') });
}


// /* Function to GET Web API Data*/
const getWeather = async (baseUrl, zipCode, apiKey) => {
    let url = baseUrl + zipCode + apiKey;
    const res = await fetch(url)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('error', error)
    }
}


// Async POST
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        console.log(newData)
        return newData
    } catch (error) {
        console.log("error", error);
    }
}


// /* Function to GET Project Data */

const updateUI = async (url='/all') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        console.log(allData)
        document.getElementById('date').textContent = allData[0].date;
        document.getElementById('temp').textContent = allData[0].temperature;
        document.getElementById('content').textContent = allData[0].response;

    } catch (error) {
        console.log("error", error);
    }
}


// /* Function to POST data */


