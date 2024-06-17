import '@expo/metro-runtime';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { MEDIA_QUERY_BREAKPOINT_PX } from './constants';

export default function App() {
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        styles.container,
        width > MEDIA_QUERY_BREAKPOINT_PX ? styles.flexRow : styles.flexColumn,
      ]}
    >
      <View
        style={[
          width > MEDIA_QUERY_BREAKPOINT_PX
            ? styles.playerDesktop
            : styles.playerMobile,
          styles.player,
          styles.mediaPlayer,
        ]}
      ></View>
      <View
        style={[
          width > MEDIA_QUERY_BREAKPOINT_PX
            ? styles.mediaDesktop
            : styles.mediaMobile,
          styles.media,
          styles.mediaPlayer,
        ]}
      ></View>
      <View
        style={[
          width > MEDIA_QUERY_BREAKPOINT_PX
            ? styles.playerDesktop
            : styles.playerMobile,
          styles.player,
          styles.mediaPlayer,
        ]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mediaPlayer: {
    height: 60,
  },
  media: {
    backgroundColor: '#f0fff6',
  },
  mediaDesktop: {
    width: '36%',
  },
  mediaMobile: {
    width: '100%',
  },
  player: {
    backgroundColor: '#eee',
  },
  playerDesktop: {
    width: '32%',
  },
  playerMobile: {
    width: '100%',
  },
});
