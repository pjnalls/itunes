import '@expo/metro-runtime';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import TrackPlayer, { Track } from 'react-native-track-player';
import { useState, useEffect } from 'react';
import AlbumArt from './src/components/AlbumArt';
import { MEDIA_QUERY_BREAKPOINT_PX } from './src/utils';
import Playlist from './src/components/composites/Playlist';
import Header from './src/components/composites/Header';
import { sampleSongData } from './src/utils';

export default function App() {
  const { width } = useWindowDimensions();
  const [info, setInfo] = useState<Track>();
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  async function setTrackInfo() {
    const track = await TrackPlayer.getActiveTrack();
    setInfo(track);
  }

  useEffect(() => {
    async function setup() {
      try {
        await TrackPlayer.setupPlayer();
        const queue = await TrackPlayer.getQueue();

        if (queue.length <= 0) {
          await TrackPlayer.add(sampleSongData);
          setTrackInfo();
          loadPlaylist();
        }
      } catch (err) {
        console.error('Media player setup failed: ', err);
      }
    }
    setup();
  }, []);

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: '#eee' }]}>
      <StatusBar
        animated={true}
        backgroundColor='#999'
        hidden={false}
      />
      <View
        style={[
          styles.container,
          width > MEDIA_QUERY_BREAKPOINT_PX
            ? styles.flexRow
            : styles.flexColumn,
        ]}
      >
        <Header {...{ width, info, setInfo, setCurrentTrack, setQueue }} />
        <Text>{'\n'}</Text>
      </View>
      <AlbumArt
        {...{
          width,
          album: info?.album,
          artworkUri: info?.artwork,
          artist: info?.artist,
        }}
      />
      <Playlist {...{ queue, currentTrack, setInfo, setCurrentTrack }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    height: 60,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
});
