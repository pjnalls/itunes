import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { Track } from 'react-native-track-player';

export default function PlaylistItem({
	index,
	track,
	currentTrack,
	setCurrentTrack,
	setInfo,
}: {
	index: number;
	track?: Track;
	currentTrack: number;
	setCurrentTrack: React.Dispatch<React.SetStateAction<number>>;
	setInfo: React.Dispatch<React.SetStateAction<Track | undefined>>;
}) {
	const { title, duration, artist, album, date, genre } = track as Track;

	const isCurrent = () => currentTrack === index;
	const text = StyleSheet.create({
		color: { color: isCurrent() ? '#fff' : '#222' },
	});

	async function handleItemPress() {
		await TrackPlayer.skip(index);
		await setCurrentTrack(index);

		const currentTrack = await TrackPlayer.getTrack(index);
		await setInfo(currentTrack);
	}

	return (
		<TouchableOpacity onPress={handleItemPress}>
			<View
				style={{
					...styles.playlistItem,
					...{
						backgroundColor: isCurrent()
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
					<Text style={text.color}>
						{title?.substring(0, 12)}
						{title?.substring(12) ? '...' : ''}
					</Text>
				</View>
				<View style={{ width: 40 }}>
					<Text style={text.color}>
						{duration?.toFixed(2).split('.').join(':')}
					</Text>
				</View>
				<View style={{ width: 80 }}>
					<Text style={text.color}>
						{artist?.substring(0, 8)}
						{artist?.substring(8) ? '...' : ''}
					</Text>
				</View>
				<View style={{ width: 100 }}>
					<Text style={text.color}>
						{album?.substring(0, 12)}
						{album?.substring(12) ? '...' : ''}
					</Text>
				</View>
				<View style={{ width: 40 }}>
					<Text style={text.color}>
						{new Date(date as string).getFullYear()}
					</Text>
				</View>
				<View style={{ width: 90 }}>
					<Text style={text.color}>{genre}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	playlistItem: {
		fontSize: 16,
		paddingTop: 4,
		paddingBottom: 4,
		paddingLeft: 8,
		paddingRight: 8,
	},
});
