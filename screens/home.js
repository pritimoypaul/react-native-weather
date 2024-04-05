import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Card from "../components/card";
import { apiKey, conditionIcons } from "../utils";
import axios from "axios";
import { useStore } from "../store";

const HomeScreen = () => {
  const key = apiKey;
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();
  const { city, setCity } = useStore();
  const getCurrentWeather = async () => {
    try {
      const data = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
      );
      setWeather(data.data);
    } catch (e) {
      console.log("not working : " + e);
    }
  };

  const getWeatherForecast = async () => {
    try {
      const data = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=1&aqi=no&alerts=no`
      );
      setForecast(data.data);
    } catch (e) {
      console.log("not working : " + e);
    }
  };

  useEffect(() => {
    getCurrentWeather();
    getWeatherForecast();
  }, [city]);

  useEffect(() => {
    console.log(forecast?.forecast?.forecastday[0]?.hour);
  }, []);

  return (
    <View className="flex flex-1 justify-between mt-[40] mx-[24] mb-4">
      <Text className="font-bold">
        {weather?.location?.name}, {weather?.location?.country}
      </Text>
      <View className="flex-row justify-center items-center my-4">
        {weather?.current?.condition?.code != null ? (
          <Image
            style={{ height: 150, width: 150 }}
            source={
              conditionIcons.find(
                (condition) =>
                  condition.code == weather?.current?.condition?.code
              ).icon || require("../assets/images/sun.png")
            }
            height={50}
          />
        ) : (
          <Image
            style={{ height: 150, width: 150 }}
            source={require("../assets/images/sun.png")}
            height={50}
          />
        )}
      </View>
      <View className="flex items-center justify-center">
        <Text className="mt-3 font-bold text-lg">
          {weather?.current?.condition?.text}
        </Text>
        <View className="mt-2">
          <Text className="text-4xl font-bold">
            {weather?.current?.temp_c} °
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {forecast?.forecast?.forecastday[0]?.hour?.map((data) => (
            <Card
              key={data?.time_epoch}
              time={data?.time}
              condition={data?.condition?.text}
              temp={data?.temp_c}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
