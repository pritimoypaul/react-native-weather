import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiKey } from "../utils";
import { useStore } from "../store";

const SearchScreen = () => {
  const key = apiKey;
  const [searchVal, setSearchVal] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const { city, setCity } = useStore();
  const [weather, setWeather] = useState();

  const getSuggestion = async () => {
    if (searchVal != "") {
      try {
        const data = await axios.get(
          `http://api.weatherapi.com/v1/search.json?key=${key}&q=${searchVal}`
        );
        setSuggestion(data.data);
      } catch (e) {
        console.log("not working : " + e);
      }
    }
  };

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

  useEffect(() => {
    getSuggestion();
  }, [searchVal]);

  useEffect(() => {
    getCurrentWeather();
  }, [city]);

  return (
    <View className="flex-1 items-center mt-[40] mx-[24] relative">
      <Text className="text-xl">Search for City</Text>
      <View className="p-3 w-full mt-2 bg-slate-200 rounded-full">
        <TextInput
          value={searchVal}
          placeholder="Dhaka"
          onChangeText={(e) => {
            setSearchVal(e);
          }}
        />
      </View>
      {/* search options */}
      {suggestion.length > 0 ? (
        <View className="absolute flex z-50 top-[90] w-full bg-white rounded-md">
          {suggestion?.map((data) => (
            <TouchableOpacity
              key={data?.id}
              onPress={() => {
                setCity(data?.name);
                setSearchVal("");
                setSuggestion([]);
              }}
            >
              <View className="border-b border-gray-100 p-3">
                <Text>
                  {data?.name}, {data?.country}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View></View>
      )}

      <View className="mt-4">
        <Text>
          {weather?.location?.name}, {weather?.location?.country}
        </Text>
        <View className="flex-row justify-center items-center my-4">
          <Image
            style={{ height: 150, width: 150 }}
            source={require("../assets/images/sun.png")}
            height={50}
          />
        </View>
        <View className="flex items-center justify-center">
          <Text className="mt-3 font-bold text-lg">
            {weather?.current?.condition?.text}
          </Text>
          <View>
            <Text className="text-4xl font-bold">
              {weather?.current?.temp_c} °
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-4 p-2 w-full rounded-lg border border-gray-300">
        <Text>Perception: {weather?.current?.precip_in}%</Text>
        <Text>Wind: {weather?.current?.wind_kph}km/h</Text>
        <Text>Humidity: {weather?.current?.humidity}%</Text>
        <Text>Pressure: {weather?.current?.pressure_in} h/pA</Text>
      </View>
    </View>
  );
};

export default SearchScreen;
