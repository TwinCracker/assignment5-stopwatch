import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default function StopwatchUI() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSecondsElapsed((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleStartPause = () => {
    setRunning(!running);
  };

  const handleStop = () => {
    setRunning(false);
    setSecondsElapsed(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((currentLaps) => [...currentLaps, secondsElapsed]);
  };

  const handleRemoveLap = (index) => {
    setLaps((currentLaps) => currentLaps.filter((_, i) => i !== index));
  };

  const handleClearLaps = () => {
    setLaps([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(secondsElapsed)}</Text>
      <ScrollView style={styles.lapsContainer}>
        {laps.map((lap, index) => (
          <TouchableOpacity key={index} onLongPress={() => handleRemoveLap(index)} style={styles.lap}>
            <Text>Lap {index + 1}: {formatTime(lap)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStartPause}>
          <Text style={styles.buttonText}>{running ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleStop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLap}>
          <Text style={styles.buttonText}>Lap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleClearLaps}>
          <Text style={styles.buttonText}>Clear Laps</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f0f0f0',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    margin: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '80%', 
  },
  button: {
    backgroundColor: '#007bff', 
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  lapsContainer: {
    alignSelf: 'stretch',
    marginVertical: 20,
  },
  lap: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
});
