import '@expo/metro-runtime';
import {
  DimensionValue,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
  Track,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MEDIA_QUERY_BREAKPOINT_PX } from './constants';
import { useState, useEffect } from 'react';

/** composite component */
function Header({
  width,
  info,
  setInfo,
}: {
  width: number;
  info?: Track;
  setInfo: React.Dispatch<React.SetStateAction<Track | undefined>>;
}) {
  const [, setQueue] = useState<Track[]>([]);

  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  async function setTrackInfo() {
    const track = await TrackPlayer.getActiveTrack();
    setInfo(track);
  }

  async function onShuffle() {
    let queue = await TrackPlayer.getQueue();
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);

    loadPlaylist();

    setTrackInfo();
  }

  return (
    <>
      <View
        style={[
          width > MEDIA_QUERY_BREAKPOINT_PX
            ? styles.playerDesktop
            : styles.playerMobile,
          styles.player,
          styles.mediaPlayer,
        ]}
      >
        <Controls {...{ onShuffle, setInfo }} />
      </View>
      <View
        style={[
          width > MEDIA_QUERY_BREAKPOINT_PX
            ? styles.mediaDesktop
            : styles.mediaMobile,
          styles.media,
          styles.mediaPlayer,
        ]}
      >
        <Text style={{ fontSize: 16, color: '#222' }}>{info?.title}</Text>
        <Text style={{ fontSize: 14, color: '#777' }}>{info?.artist}</Text>
        <TrackProgress />
      </View>
      <View
        style={[
          width > MEDIA_QUERY_BREAKPOINT_PX
            ? styles.playerDesktop
            : styles.playerMobile,
          styles.player,
          styles.mediaPlayer,
        ]}
      ></View>
    </>
  );
}

/** atomic component */
function TrackProgress() {
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

function Controls({
  onShuffle,
  setInfo,
}: {
  onShuffle: () => void;
  setInfo: React.Dispatch<React.SetStateAction<Track | undefined>>;
}) {
  const playerState = usePlaybackState();

  async function handlePlayPress() {
    if ((await TrackPlayer.getState()) == State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setTrackInfo();
  }

  async function setTrackInfo() {
    const track = await TrackPlayer.getActiveTrack();
    setInfo(track);
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        height: 60,
        justifyContent: 'center',
      }}
    >
      <Icon.Button
        name="backward"
        size={28}
        backgroundColor="transparent"
        color={'#999'}
        onPress={async () => {
          await TrackPlayer.skipToPrevious();
          setTrackInfo();
        }}
      />
      <Icon.Button
        name={playerState.state == State.Playing ? 'pause' : 'play'}
        size={28}
        backgroundColor="transparent"
        color={'#999'}
        onPress={handlePlayPress}
      />
      <Icon.Button
        name="forward"
        size={28}
        backgroundColor="transparent"
        color={'#999'}
        onPress={async () => {
          await TrackPlayer.skipToNext();
          setTrackInfo();
        }}
      />
      <Icon.Button
        name="random"
        size={28}
        backgroundColor="transparent"
        color={'#999'}
        onPress={onShuffle}
      />
    </View>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const [info, setInfo] = useState<Track>();

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
          /** Sound files not included in the repo
           * for this project due to licenses.
           * Please include your own sample sounds. */
          await TrackPlayer.add([
            {
              url: './assets/sample.mp3',
              title: 'Blizzard',
              artist: 'Vivi Freezy',
              album: 'if(onlySilent)',
              genre: 'Classical',
              date: '2022-06-20T010:00:00+00:00',
              artwork: 'http://example.com/cover.png',
            },
            {
              url: './assets/sample.wav',
              title: 'Nova',
              artist: 'Mao Kiki Chan',
              album: 'Celestial Wonders',
              genre: 'Classical',
              date: '2014-05-20T07:00:00+00:00',
              artwork: 'http://example.com/cover.png',
            },
          ]);
          setTrackInfo();
        }
      } catch (err) {
        console.error('Media player setup failed: ', err);
      }
    }
    setup();
  }, []);

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <View
        style={[
          styles.container,
          width > MEDIA_QUERY_BREAKPOINT_PX
            ? styles.flexRow
            : styles.flexColumn,
        ]}
      >
        <Header {...{ width, info, setInfo }} />
      </View>
    </SafeAreaView>
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
    backgroundColor: '#eee',
    height: 60,
  },
  mediaPlayer: {
    height: 60,
  },
  media: {
    backgroundColor: '#f6fff8',
    alignItems: 'center',
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
  processBar: {
    height: 4,
    width: '100%',
    position: 'absolute',
    backgroundColor: '#eee',
    zIndex: 2,
    bottom: 0,
  },
  process: {
    height: 4,
    width: '25%',
    backgroundColor: '#999',
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
