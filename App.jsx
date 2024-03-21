import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'

export default App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setweatherData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = '0cb2ffc8164945e2ad4234711241902';
  
  const getWeather = async()=>{
    try{
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=no`)
      const data = await res.json();
      if(res.status === 200){
        setweatherData(data);
        setError(null);
      }else{
        setError(`Error finding weather data!`)
      }
    }catch(err){
      setError(`Error finding weather data!`)
    }
  }


  useEffect(()=>{
    city ? getWeather : setweatherData(null);
  }, [city]);

  return[
    <View style={ (weatherData === null) ? styles.baseContainer : (weatherData.current.condition.text === "Sunny") ? styles.sunnyContainer: (weatherData.current.condition.text.includes("rain")) ? styles.rainContainer: (weatherData.current.condition.text.includes("cloudy")) ? styles.cloudyContainer: styles.baseContainer }>
    <ImageBackground source={{uri: 'https://cdn.pixabay.com/photo/2021/01/09/23/33/sky-5903732_1280.jpg'}} style={styles.baseContainer}></ImageBackground>
      <Text style={styles.title}>Welcome to Weather App!</Text>
      <TextInput
      style={styles.textInput}
      placeholder='Enter city name'
      value={city}
      onChangeText= {(text) => setCity(text)}
      />
      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>
      {error && <Text>{error}</Text>}
      {weatherData && (
        <View style = {styles.dataContainer}>
          <Text style={styles.dataText}>City: {weatherData.location.name}</Text>
          <Text style={styles.dataText}>Country: {weatherData.location.country}</Text>
          <Text style={styles.dataText}>Temperature: {weatherData.current.temp_c}</Text>
          <Text style={styles.dataText}>Condition: {weatherData.current.condition.text}</Text>
        </View>
      )}
    </View>
  ]
}

const styles = StyleSheet.create({
  baseContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize: 30,
    marginBottom:20,
    fontWeight: "bold"
  },
  textInput:{
    borderWidth:1,
    borderColor:'gray',
    width:'80%',
    padding:10,
    margin:20,
    borderRadius: 5
  },
  button:{
    backgroundColor:'#9AD0C2',
    padding:10,
    borderRadius:5,
  },
  buttonText:{
    color: "black"
  },
  sunnyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightyellow',
    //url: 'https://cdn.pixabay.com/photo/2021/01/09/23/33/sky-5903732_1280.jpg',
    //backgroundImage: 'https://cdn.pixabay.com/photo/2021/01/09/23/33/sky-5903732_1280.jpg'
  },
  rainContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue'
  },
  cloudyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey'
  },
  dataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  dataText:{
    fontSize: 20
  }

})