import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Countdown = ({ seconds, onFinish }) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {days}d {hours}h {minutes}m {secondsLeft}s
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Countdown;
