import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TrackPlayer, { Track } from 'react-native-track-player';
import { MEDIA_QUERY_BREAKPOINT_PX } from '../../utils';
import Controls from '../Controls';
import TrackProgress from '../atomic/TrackProgress';

export default function Header({
  width,
  info,
  setInfo,
  setCurrentTrack,
  setQueue,
}: {
  width: number;
  info?: Track;
  setInfo: React.Dispatch<React.SetStateAction<Track | undefined>>;
  setCurrentTrack: React.Dispatch<React.SetStateAction<number>>;
  setQueue: React.Dispatch<React.SetStateAction<Track[]>>;
}) {

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
    queue = [...queue.map((track, i) => ({ ...track, id: i }))];

    setCurrentTrack(0);

    await TrackPlayer.add(queue);
    setQueue(queue);

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

const styles = StyleSheet.create({
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
});
