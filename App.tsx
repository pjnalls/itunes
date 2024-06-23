import '@expo/metro-runtime';
import {
  DimensionValue,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

const MEDIA_QUERY_BREAKPOINT_PX = 768;

/** composite component */
function Header({
  width,
  info,
  setInfo,
  setCurrentTrack,
}: {
  width: number;
  info?: Track;
  setInfo: React.Dispatch<React.SetStateAction<Track | undefined>>;
  setCurrentTrack: React.Dispatch<React.SetStateAction<number>>;
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
        ]}
      >
        <Controls {...{ onShuffle, setInfo, setCurrentTrack }} />
      </View>
      <View
        style={[
          width > MEDIA_QUERY_BREAKPOINT_PX
            ? styles.mediaDesktop
            : styles.mediaMobile,
          styles.media,
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
  setCurrentTrack,
}: {
  onShuffle: () => void;
  setInfo: React.Dispatch<React.SetStateAction<Track | undefined>>;
  setCurrentTrack: React.Dispatch<React.SetStateAction<number>>;
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
    setCurrentTrack(track?.id);
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
        size={20}
        backgroundColor="transparent"
        color={'#777'}
        onPress={async () => {
          await TrackPlayer.skipToPrevious();
          setTrackInfo();
        }}
      />
      <Icon.Button
        name={playerState.state == State.Playing ? 'pause' : 'play'}
        size={28}
        backgroundColor="transparent"
        color={'#777'}
        onPress={handlePlayPress}
      />
      <Icon.Button
        name="forward"
        size={20}
        backgroundColor="transparent"
        color={'#777'}
        onPress={async () => {
          await TrackPlayer.skipToNext();
          setTrackInfo();
        }}
      />
      <Icon.Button
        name="random"
        size={20}
        backgroundColor="transparent"
        color={'#777'}
        onPress={onShuffle}
      />
    </View>
  );
}

function Playlist({
  queue,
  currentTrack,
}: {
  queue: Track[];
  currentTrack: number;
}) {
  function PlaylistItem({
    index,
    track,
    isCurrent,
  }: {
    index: number;
    track?: Track;
    isCurrent: boolean;
  }) {
    const { title, duration, artist, album, date, genre } = track as Track;
    function handleItemPress() {
      TrackPlayer.skip(index);
    }

    return (
      <TouchableOpacity onPress={handleItemPress}>
        <View
          style={{
            ...styles.playlistItem,
            ...{
              backgroundColor: isCurrent
                ? '#48f'
                : index % 2 === 0
                ? '#e4e8ef'
                : '#fff',
              justifyContent: 'space-between',
              alignContent: 'center',
              flexDirection: 'row',
              width: '100%',
            },
          }}
        >
          <View style={{ width: 92 }}>
            <Text style={{ color: isCurrent ? '#fff' : '#222' }}>
              {title?.substring(0, 12)}
              {title?.substring(12) ? '...' : ''}
            </Text>
          </View>
          <View style={{ width: 40 }}>
            <Text style={{ color: isCurrent ? '#fff' : '#222' }}>
              {duration?.toString().split('.').join(':')}
            </Text>
          </View>
          <View style={{ width: 80 }}>
            <Text style={{ color: isCurrent ? '#fff' : '#222' }}>
              {artist?.substring(0, 8)}
              {artist?.substring(8) ? '...' : ''}
            </Text>
          </View>
          <View style={{ width: 100 }}>
            <Text style={{ color: isCurrent ? '#fff' : '#222' }}>
              {album?.substring(0, 12)}
              {album?.substring(12) ? '...' : ''}
            </Text>
          </View>
          <View style={{ width: 40 }}>
            <Text style={{ color: isCurrent ? '#fff' : '#222' }}>
              {new Date(date as string).getFullYear()}
            </Text>
          </View>
          <View style={{ width: 90 }}>
            <Text style={{ color: isCurrent ? '#fff' : '#222' }}>{genre}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.playlist]}>
      <View
        style={{
          ...styles.playlistItem,
          ...{
            backgroundColor: '#eee',
            justifyContent: 'space-between',
            alignContent: 'center',
            flexDirection: 'row',
            width: '100%',
          },
        }}
      >
        <View style={{ width: 92 }}>
          <Text style={{ fontWeight: 500 }}>Name</Text>
        </View>
        <View style={{ width: 40 }}>
          <Text style={{ fontWeight: 500 }}>Time</Text>
        </View>
        <View style={{ width: 80 }}>
          <Text style={{ fontWeight: 500 }}>Artist</Text>
        </View>
        <View style={{ width: 100 }}>
          <Text style={{ fontWeight: 500 }}>Album</Text>
        </View>
        <View style={{ width: 40 }}>
          <Text style={{ fontWeight: 500 }}>Year</Text>
        </View>
        <View style={{ width: 90 }}>
          <Text style={{ fontWeight: 500 }}>Genre</Text>
        </View>
      </View>
      {queue && (
        <FlatList
          data={queue}
          renderItem={({ item, index }) => (
            <PlaylistItem
              key={index}
              index={index}
              track={item}
              isCurrent={currentTrack == index}
            />
          )}
        />
      )}
    </View>
  );
}

function AlbumArt({
  width,
  artworkUri,
  album,
  artist,
}: {
  width: number;
  artworkUri?: string;
  album?: string;
  artist?: string;
}) {
  return (
    <View
      style={[
        styles.albumContainer,
        width > MEDIA_QUERY_BREAKPOINT_PX
          ? styles.albumDesktop
          : styles.albumMobile,
      ]}
    >
      {artworkUri && (
        <Image
          style={styles.album}
          source={{ uri: artworkUri }}
          alt="album art"
        />
      )}
      <Text style={{ fontSize: 16, color: '#fff' }}>{album}</Text>
      <Text style={{ fontSize: 14, color: '#fff' }}>{artist}</Text>
    </View>
  );
}
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
      TrackPlayer.registerPlaybackService(() =>
        require('./service.js')
      );
      try {
        await TrackPlayer.setupPlayer();
        const queue = await TrackPlayer.getQueue();

        if (queue.length <= 0) {
          /** Paths to sound files are not included in 
           * this repo for this project due to licensing.
           * Please include your own sample sounds `url`s. */
          await TrackPlayer.add([
            {
              id: 0,
              url: 'https://path/to/your/music/file.mp3',
              title: 'Blizzard',
              artist: 'Kiki, Mimi, & Mini',
              album: 'if(onlySilent)',
              genre: 'Classical',
              date: '2022-06-20T07:00:00+00:00',
              artwork:
                'https://raw.githubusercontent.com/pjnalls/modulart-01/main/art.avif',
              duration: 4.32,
            },
            {
              id: 1,
              url: 'https://path/to/your/music/file.mp3',
              title: 'Nova',
              artist: 'Vivi Freezy',
              album: 'Celestial Wonders',
              genre: 'Classical',
              date: '2014-05-20T07:00:00+00:00',
              artwork:
                'https://raw.githubusercontent.com/pjnalls/modulart-01/main/art.avif',
              duration: 3.02,
            },
            {
              id: 2,
              url: 'https://path/to/your/music/file.mp3',
              title: 'Shaman',
              artist: 'Jungmorpheus',
              album: 'O1.',
              genre: 'New Age',
              date: '2020-06-20T07:00:00+00:00',
              artwork:
                'https://raw.githubusercontent.com/pjnalls/modulart-01/main/art.avif',
              duration: 2.37,
            },
            {
              id: 3,
              url: 'https://path/to/your/music/file.mp3',
              title: 'Iron Feathers Of Air',
              artist: 'Jungmorpheus',
              album: 'O1.',
              genre: 'New Age',
              date: '2020-06-20T07:00:00+00:00',
              artwork:
                'https://raw.githubusercontent.com/pjnalls/modulart-01/main/art.avif',
              duration: 4.39,
            },
            {
              id: 4,
              url: 'https://path/to/your/music/file.mp3',
              title: 'Fly You To The Sky × Free Fall',
              artist: 'Jungmorpheus',
              album: 'O1.',
              genre: 'New Age',
              date: '2020-06-20T07:00:00+00:00',
              artwork:
                'https://raw.githubusercontent.com/pjnalls/modulart-01/main/art.avif',
              duration: 6.59,
            },
          ]);
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
    <SafeAreaView style={[{ flex: 1 }]}>
      <StatusBar animated={true} backgroundColor="#999" hidden={false} />
      <View
        style={[
          styles.container,
          width > MEDIA_QUERY_BREAKPOINT_PX
            ? styles.flexRow
            : styles.flexColumn,
        ]}
      >
        <Header {...{ width, info, setInfo, setCurrentTrack }} />
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
      <Playlist {...{ queue, currentTrack }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  album: {
    height: 240,
    width: 240,
  },
  albumContainer: {
    backgroundColor: '#000',
    height: 360,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  albumDesktop: {
    marginTop: 0,
  },
  albumMobile: {
    marginTop: 120,
  },
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
  media: {
    backgroundColor: '#f6fff8',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 4,
  },
  mediaDesktop: {
    width: '36%',
  },
  mediaMobile: {
    width: '100%',
  },
  player: {
    backgroundColor: '#eee',
    height: 60,
  },
  playerDesktop: {
    width: '32%',
  },
  playerMobile: {
    width: '100%',
  },
  playlist: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 0,
    marginBottom: 40,
  },
  playlistItem: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
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
