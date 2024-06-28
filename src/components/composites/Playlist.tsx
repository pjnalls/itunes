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
