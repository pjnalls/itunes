import { Image, StyleSheet, Text, View } from 'react-native';
import { MEDIA_QUERY_BREAKPOINT_PX } from '../utils';

export default function AlbumArt({
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
});
