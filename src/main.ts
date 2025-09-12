/*
Scegli un esercizio tra Il compleanno dello chef e Dashboard della città del Modulo 1 – Advanced JavaScript e riscrivilo utilizzando TypeScript.

Tipizza tutte le variabili, funzioni e strutture dati in modo esplicito, e verifica che il comportamento finale sia identico alla versione in JavaScript.

✨ Puoi partire da un nuovo progetto Vite oppure aggiungere TypeScript a un progetto esistente.
*/

// dashboard delle città

import axios from "axios";

async function getDashboardData(query: string): Promise<{ city: string; country: string; airport: string; temperature: number; weather: string }> {

  const [destination, airports, weather] = await Promise.all([
    axios.get(`http://localhost:3333/destinations?search=${query}`),
    axios.get(`http://localhost:3333/airports?search=${query}`),
    axios.get(`http://localhost:3333/weathers?search=${query}`),
  ])

  console.log("Destinazioni trovate:", destination.data);
  console.log("Aeroporti trovati:", airports.data);
  console.log("Meteo trovato:", weather.data);

  return {
    city: destination.data[0].name,
    country: destination.data[0].country,
    airport: airports.data[0].name,
    temperature: weather.data[0].temperature,
    weather: weather.data[0].weather_description

  }

  // city = nome che scelgo io per la chiave dell’oggetto finale
  // destination = indica da quale API sto prendendo i dati 
  // data = proprietà aggiunta da axios che contiene SOLO i dati grezzi dell’API escludendo cose come lo status della chiamata
  // name = campo reale restituito dall’API, cioè la stringa che voglio estrarre e mostrare in pagina, per esempio estraendo weather_description mostro: "cloudy"

  // quindi se volessi aggiungere i cibi che sono strutturati così: local_dishes:  (3) ['Fish and Chips', 'Full English Breakfast', 'Sunday Roast'] 
} // dovrei aggiungere al return: foods: destination.data[0].local_dishes

(async () => {

  try {

    const data = await getDashboardData("London")
    console.log(
      `${data.city} is in ${data.country}
            Today there are ${data.temperature} degrees 
            and the the weather is ${data.weather}.
            the main airport is ${data.airport}.`

    )
  }

  catch (err) {
    console.error("errore nel recupero delle capitali", err)
  }

  finally {
    console.log("operazione terminata")
  }
}

)();