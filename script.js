/////////////////////----------------------///////////////////////////
///////////-------------- VARIABLES --------------///////////
let lista = [];
let cityChosen = "palermo";
let myButton = document.querySelector("button");
let myInput = document.querySelector("input");



                    /////////////////////----------------------///////////////////////////
//////////////////////////////////// async function to FETCH the API data ////////////////////////////////////
async function goFetch(city, id){
    try{
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=747ca7d8d1441a3cdc4df09582085310&units=metric`);
        const data = await res.json();

        //Prendo i dati principali sul meteo e li infilo nella mia lista
        lista = data.weather.map(x => x.main);
        //Prendo il codice corrispondente all'icona
        let iconId = data.weather.map(x => x.icon)
        //Se l'id dell'immagine consiste in un array di più di un elemento, prendere solo il primo elemento
        if (iconId.length > 0)
        {iconId = iconId[0]}

        let myCard = document.getElementById(id)

        let myLi = document.createElement("li");
        myLi.style.listStyle = "none";
        myLi.textContent = lista + "\n";

        let myCity = document.createElement("h2");
        myCity.textContent = city + "\n";

        //Creo la mia icona usando il codice reperito dall'API poco sopra, e lo inserisco nella card
        let myIcon = document.createElement("img");
        myIcon.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`

        //Vado a recuperare la temperatura minima e massima direttamente dall'oggetto data, e inserisco la voce nella card
        let myTemp = document.createElement("li");
        myTemp.style.listStyle = "none";
        myTemp.innerHTML = `temp min:${data.main.temp_min}°C <br> temp max:${data.main.temp_max}°C`;

        
        myCard.append(myCity);
        let myFlexContainer = document.createElement("div");
        myFlexContainer.style.display = "flex";
        myFlexContainer.style.justifyContent = "center";
        myFlexContainer.append(myLi);
        myFlexContainer.append(myIcon);
        myFlexContainer.append(myTemp);
        myCard.append(myFlexContainer);

    //pulire il campo input
    myInput.value = "";
    } 
    catch {
        alert(`${myInput.value} was not found`)
        //pulire il campo input
        myInput.value = "";
    }
}



            /////////////////////----------------------///////////////////////////
//####################### Device to input the city and push the button #######################//

myButton.addEventListener("click", () => {
document.getElementById("fromInput").textContent = "";
//_-_-_-_-_-_-_// INVOCATION //_-_-_-_-_-_-_//
goFetch(myInput.value, "fromInput");
})




    /////////////////////----------------------///////////////////////////
//_-_-_-_-_-_-_// other INVOCATIONS for the default cities //_-_-_-_-_-_-_//
goFetch("roma", "roma");
goFetch("londra", "londra");
goFetch("madrid", "madrid");
goFetch("new+york", "newyork");
