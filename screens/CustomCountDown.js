import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, useColorScheme, Image } from 'react-native';
const VacayImage = require('./images/Vacay.png');
const VacayDModeImage = require('./images/VacayDmode.png');

const Countdown = ({ seconds, onFinish, isDarkMode: isDarkModeProp }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = isDarkModeProp !== undefined ? isDarkModeProp : colorScheme === 'dark';

  const [remainingSeconds, setRemainingSeconds] = useState(seconds);

  useEffect(() => {
    if (remainingSeconds > 0) {
      const timerId = setTimeout(() => {
        setRemainingSeconds(remainingSeconds - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else {
      onFinish();
    }
  }, [remainingSeconds]);

  const days = Math.floor(remainingSeconds / 86400);
  const hours = Math.floor((remainingSeconds % 86400) / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const secondsLeft = remainingSeconds % 60;

  const textColor = isDarkMode ? styles.textDark : styles.textLight;
  const boxColor = isDarkMode ? styles.boxDark : styles.boxLight;
  const imageSource = isDarkMode ? VacayDModeImage : VacayImage;

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.boxesContainer}>
        <View style={styles.boxContainer}>
          <View style={[styles.box, boxColor]}>
            <Text style={[styles.number, textColor]}>{days}</Text>
          </View>
          <Text style={[styles.label, textColor]}>Days</Text>
        </View>
        <View style={styles.boxContainer}>
          <View style={[styles.box, boxColor]}>
            <Text style={[styles.number, textColor]}>{hours}</Text>
          </View>
          <Text style={[styles.label, textColor]}>Hours</Text>
        </View>
        <View style={styles.boxContainer}>
          <View style={[styles.box, boxColor]}>
            <Text style={[styles.number, textColor]}>{minutes}</Text>
          </View>
          <Text style={[styles.label, textColor]}>Minutes</Text>
        </View>
        <View style={styles.boxContainer}>
          <View style={[styles.box, boxColor]}>
            <Text style={[styles.number, textColor]}>{secondsLeft}</Text>
          </View>
          <Text style={[styles.label, textColor]}>Seconds</Text>
        </View>
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff6e5',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    zIndex: 2,
  },
  boxesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  
  image: {
    width: 600,
    height: 400,
    resizeMode: 'contain',
    marginTop: -50,
    marginLeft: 20,
    marginRight: 20,
  },
  
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 5,
    paddingVertical: 20,
    width: 70, 
  },
  boxLight: {
    backgroundColor: '#fcbd49',
  },
  boxDark: {
    backgroundColor: '#4080ef',
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  textLight: {
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
});

export default Countdown;





