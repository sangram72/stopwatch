import  React, { useState, useRef, useCallback } from "react";
import { StyleSheet, SafeAreaView, Text, View, Platform, TouchableOpacity, Alert,Image } from "react-native";
import Constants from "expo-constants";
import Result from "./Result";
import Control from "./Control";
import { StatusBar } from "expo-status-bar";
import { displayTime } from "./util";



export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [results, setResults] = useState([]);
  const timer = useRef(null);
  const handleLeftButtonPress = useCallback(() => {
    if (isRunning) {
      setResults((previousResults) => [time, ...previousResults]);
    } else {
      setResults([]);
      setTime(0);
    }
  }, [isRunning, time]);

  const handleRightButtonPress = useCallback(() => {
    if (!isRunning) {
      const interval = setInterval(() => {
        setTime((previousTime) => previousTime + 1);
      }, 10);

      timer.current = interval;
    } else {
      clearInterval(timer.current);
    }

    setRunning((previousState) => !previousState);
  }, [isRunning]);


  const [clickme,setclickme]=useState(true)
  const[hello,sethello]=useState(true)

    setTimeout(() => {
    sethello(false)
  
    }, 5000);

  

 
  return (
    <>
    {clickme?(<SafeAreaView style={styles.container1}>

       {hello?(
   <TouchableOpacity onPress={()=>sethello(false)}>   
    <Image  source={require('../assets/hello.gif')} style={{ width: 200, height: 200 ,alignSelf:'center'}} />  
    </TouchableOpacity>
       
       ):(
     <TouchableOpacity onPress={()=>setclickme(false)}>  
     <Image source={require('../assets/click.gif')} style={{ width: 200, height: 200,alignSelf:'center' }} /> 
     </TouchableOpacity> 
       )}
{/* <TouchableOpacity><Text Style={{color:'green'}} onPress={()=>setclickme(false)}>HEYYY CLICK MEEEE to START</Text></TouchableOpacity> */}
      </SafeAreaView>
      ):(<SafeAreaView style={styles.container}>

              <StatusBar style="light" />

              <View style={styles.display}>
                  <Text style={styles.displayText}>{displayTime(time)}</Text>
              </View>

              <View style={styles.control}>
                  <Control
                      isRunning={isRunning}
                      handleLeftButtonPress={handleLeftButtonPress}
                      handleRightButtonPress={handleRightButtonPress} />
              </View>

              <View style={styles.result}>
                  <Result results={results} />
              </View>
          </SafeAreaView>)}
          
          </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Constants.statusBarHeight,
    width:'100%'
  },
  container1:{
flex:1,
width:'100%',

backgroundColor:"white",
justifyContent:'center'

  },
  display: {
    flex: 3 / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  displayText: {
    color: "#fff",
    fontSize: 70,
    fontWeight: "200",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : null,
  },
  control: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  result: { flex: 2 / 5 },
});
