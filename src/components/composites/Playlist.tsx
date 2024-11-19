import { Text, FlatList, View, StyleSheet } from 'react-native';
import { Track } from 'react-native-track-player';
import PlaylistItem from '@/src/components/atoms/PlaylistItem';

export default function Playlist({
  queue,
  currentTrack,
  setInfo,
  setCurrentTrack,
}: {
  queue: Track[];
  currentTrack: number;
  setInfo: React.Dispatch<React.SetStateAction<Track | undefined>>;
  setCurrentTrack: React.Dispatch<React.SetStateAction<number>>;
}) {
  const Label = ({ text }: { text: string }) => (
    <Text style={{ fontWeight: 500 }}>{text}</Text>
  );

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
            gap: 2,
          },
        }}
      >
        <View style={{ width: '22%' }}>
          <Label text='Name' />
        </View>
        <View style={{ width: '9%' }}>
          <Label text='Time' />
        </View>
        <View style={{ width: '19%' }}>
          <Label text='Artist' />
        </View>
        <View style={{ width: '23%' }}>
          <Label text='Album' />
        </View>
        <View style={{ width: '10%' }}>
          <Label text='Year' />
        </View>
        <View style={{ width: '22%' }}>
          <Label text='Genre' />
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
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
              setInfo={setInfo}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
