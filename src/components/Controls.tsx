import { View } from 'react-native';
import TrackPlayer, {
	Track,
	usePlaybackState,
	State,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Controls({
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
		if ((await TrackPlayer.getPlaybackState()).state == State.Playing) {
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

	const handleShuffle = () => onShuffle();

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
				name='backward'
				size={20}
				backgroundColor='transparent'
				color={'#777'}
				onPress={async () => {
					await TrackPlayer.skipToPrevious();
					setTrackInfo();
				}}
			/>
			<Icon.Button
				name={playerState.state == State.Playing ? 'pause' : 'play'}
				size={28}
				backgroundColor='transparent'
				color={'#777'}
				onPress={handlePlayPress}
			/>
			<Icon.Button
				name='forward'
				size={20}
				backgroundColor='transparent'
				color={'#777'}
				onPress={async () => {
					await TrackPlayer.skipToNext();
					setTrackInfo();
				}}
			/>
			<Icon.Button
				name='random'
				size={20}
				backgroundColor='transparent'
				color={'#777'}
				onPress={handleShuffle}
			/>
		</View>
	);
}
