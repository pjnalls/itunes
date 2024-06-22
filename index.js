import registerRootComponent from 'expo/build/launch/registerRootComponent';
import TrackPlayer from 'react-native-track-player';
import App from './App';
import { playbackService } from './playbackServices';

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => playbackService);
