import { Text, View, DimensionValue, Platform, StyleSheet } from 'react-native';
import { useProgress } from 'react-native-track-player';

export default function TrackProgress() {
  const { position, duration } = useProgress(200);

  function format(seconds: number) {
    let mins = (seconds / 60).toFixed(0).padStart(1, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  return (
    <View style={{ width: '100%' }}>
      <View style={{ width: '100%', justifyContent: 'space-between' }}>
        <Text style={styles.trackProgress}>{format(position)}</Text>
        <Text style={styles.trackDuration}>{format(duration)}</Text>
      </View>
      <View style={styles.processBar}></View>
      <View
        style={[
          {
            ...styles.process,
            width: `${(
              (position / duration) *
              100
            ).toString()}%` as DimensionValue,
          },
        ]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  processBar: {
    height: 4,
    width: '100%',
    position: 'absolute',
    backgroundColor: '#eee',
    zIndex: 2,
    bottom: Platform.OS === 'ios' || Platform.OS === 'web' ? -4 : 0,
  },
  process: {
    height: 4,
    width: '25%',
    backgroundColor: '#777',
    zIndex: 3,
    bottom: 0,
  },
  trackProgress: {
    position: 'absolute',
    marginTop: 0,
    fontSize: 13,
    paddingLeft: 12,
    top: -4,
    color: '#777',
  },
  trackDuration: {
    marginTop: 0,
    textAlign: 'right',
    fontSize: 12,
    paddingRight: 12,
    top: -4,
    color: '#777',
  },
});
