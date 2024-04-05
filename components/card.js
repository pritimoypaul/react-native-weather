import React from "react";
import { Image, Text, View } from "react-native";

const Card = ({ time, condition, temp }) => {
  return (
    <View className="p-2 bg-white rounded-md w-[100] mr-2">
      <View className="flex-row justify-center items-center my-4">
        <Image
          style={{ height: 30, width: 30 }}
          source={require("../assets/images/sun.png")}
          height={50}
        />
      </View>
      <View className="flex items-center justify-center">
        <Text className="text-sm">{time?.split(" ")[1]}</Text>
        <Text className="font-bold">{condition}</Text>
        <View>
          <Text className="font-bold">{temp} °</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
