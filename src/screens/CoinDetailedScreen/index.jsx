import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TextInput } from 'react-native';
import Coin from '../../../assets/data/crypto.json';
import CoinDetailedHeader from "./components/CoinDetailedHeader";
import styles from './components/styles';
import { AntDesign } from '@expo/vector-icons';
import { LineChart, LineChartDatetimeText, LineChartPriceText } from 'react-native-wagmi-charts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';




const CoinDeatiledScreen = () => {
  const {
    image: { small },
    name,
    symbol,
    prices,
    market_data: { 
      market_cap_rank,
      current_price,
      price_change_percentage_24h 
    },
  } = Coin;

  

  const [coinValue, setCoinValue] = useState('1');
  const [usdValue, setUsdValue] = useState(current_price.usd.toString());

  const route = useRoute();

  const {params: {coinId}} = route;
  

  const percentageColor = price_change_percentage_24h < 0 ? '#ea3943' : '#16c784';

  const screenWidth = Dimensions.get('window').width;

  const chartColor = current_price.usd > prices[0][1] ? '#16c784' : "#ea3943";

  const formatCurrency = (value) => {
      "worklet";
      if (value === ""){
        return `$${current_price.usd.toFixed(2)}`
      } 
      return `$${parseFloat(value).toFixed(2)}`
    }

  const changeCoinValue = (value) => {
      setCoinValue(value)
      const floatValue = parseFloat(value.replace(',','.')) || 0 
      setUsdValue((floatValue * current_price.usd).toString())
  };

  const changeUsdValue = (value) => {
    setUsdValue(value)
    const floatValue = parseFloat(value.replace(',','.')) || 0 
    setCoinValue((floatValue / current_price.usd).toString())
  };
  
    

  return (
    <View style={{ paddingHorizontal: 10 }}>
    <GestureHandlerRootView> 
    <LineChart.Provider
      data={prices.map((price) => ({timestamp: price[0], value: price[1] }))}
    >
      <CoinDetailedHeader
        image={small}
        name={name}
        symbol={symbol}
        marketCapRank={market_cap_rank}
      />
      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.currentPrice}>
                {formatCurrency(current_price.usd)}
              </Text>
        </View>
        <View
          style={{
            backgroundColor: percentageColor,
            paddingHorizontal: 3,
            paddingVertical: 7,
            borderRadius: 5,
            flexDirection: 'row',
          }}
        >
          <AntDesign
            name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup'}
            size={12}
            color={'white'}
            style={{ alignSelf: 'center', marginRight: 5 }}
          />
          <Text style={styles.priceChange}>
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
        <View>
         <LineChart width={screenWidth} height={screenWidth / 2}>
         <LineChart.Path color={chartColor} >
         
         </LineChart.Path>
         <LineChart.CursorCrosshair color='white' />
         </LineChart>
      </View>
        <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Text style={{color: 'white', alignSelf: 'center'}}>{symbol.toUpperCase()} </Text>
                <TextInput style={styles.input} value={coinValue}
                 keyboardType='numeric'
                 onChangeText={changeCoinValue}
               />
            </View>

            <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={{color: 'white', alignSelf: 'center'}}>USD</Text>
                <TextInput style={styles.input} 
                value={usdValue}
                keyboardType='numeric'
                onChangeText={changeUsdValue}
                
                />
            </View>
        </View>
      </LineChart.Provider>
      </GestureHandlerRootView>
    </View>
  );
};

export default CoinDeatiledScreen;
