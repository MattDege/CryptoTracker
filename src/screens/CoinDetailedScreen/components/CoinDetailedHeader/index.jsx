import React from "react";
import { View, Text, Image } from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import styles from './styles';
import { useNavigation } from "@react-navigation/native";


const CoinDetailedHeader = (props) => {
  const { image, symbol, marketCapRank } = props; 
  const navigator = useNavigation();
    return (
    <View style={styles.headerContainer}>
    <AntDesign name="left" size={30} color="white" onPress={() => navigator.goBack()}
    />
    <View style={styles.tickerContainer}>
          <Image source={{uri: image }} style={{width:25, height: 25}}/>
          <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
          <View style={styles.rankContainer}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15 }}>
              #{marketCapRank}
              </Text>
        </View>
     </View>
    <EvilIcons name="user" size={30} color="white" />
  </View>
    );
    
};

export default CoinDetailedHeader;