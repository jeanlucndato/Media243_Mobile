import Slider from '@react-native-community/slider';
import { ResizeMode, Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

/**
 * Custom Video Player Component
 * 
 * @param {string} uri - Video URI
 * @param {object} posterSource - Poster image source
 * @param {function} onClose - Close handler
 * @param {boolean} autoPlay - Auto play on mount (default: false)
 */
const VideoPlayer = ({ uri, posterSource, onClose, autoPlay = false }) => {
    const videoRef = useRef(null);
    const [status, setStatus] = useState({});
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [showControls, setShowControls] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const controlsTimeout = useRef(null);

    useEffect(() => {
        return () => {
            if (controlsTimeout.current) {
                clearTimeout(controlsTimeout.current);
            }
        };
    }, []);

    const handlePlayPause = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                await videoRef.current.pauseAsync();
            } else {
                await videoRef.current.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = async (value) => {
        if (videoRef.current && status.durationMillis) {
            await videoRef.current.setPositionAsync(value * status.durationMillis);
        }
    };

    const handleVideoPress = () => {
        setShowControls(true);

        if (controlsTimeout.current) {
            clearTimeout(controlsTimeout.current);
        }

        controlsTimeout.current = setTimeout(() => {
            setShowControls(false);
        }, 3000);
    };

    const formatTime = (millis) => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleLoadStart = () => setIsLoading(true);
    const handleLoad = () => setIsLoading(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={1} onPress={handleVideoPress} style={styles.videoContainer}>
                <Video
                    ref={videoRef}
                    source={{ uri }}
                    posterSource={posterSource}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={autoPlay}
                    isLooping={false}
                    style={styles.video}
                    onPlaybackStatusUpdate={(status) => setStatus(status)}
                    onLoadStart={handleLoadStart}
                    onLoad={handleLoad}
                />

                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                )}

                {showControls && (
                    <View style={styles.controlsOverlay}>
                        {/* Top Bar with Close Button */}
                        <View style={styles.topBar}>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Icon name="close" size={30} color={colors.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        {/* Center Play/Pause Button */}
                        <TouchableOpacity onPress={handlePlayPause} style={styles.centerButton}>
                            <View style={styles.playPauseButton}>
                                <Icon
                                    name={isPlaying ? 'pause' : 'play'}
                                    size={50}
                                    color={colors.textPrimary}
                                />
                            </View>
                        </TouchableOpacity>

                        {/* Bottom Controls */}
                        <View style={styles.bottomControls}>
                            <View style={styles.progressContainer}>
                                <Text style={styles.timeText}>
                                    {status.positionMillis ? formatTime(status.positionMillis) : '0:00'}
                                </Text>

                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={1}
                                    value={status.positionMillis && status.durationMillis
                                        ? status.positionMillis / status.durationMillis
                                        : 0}
                                    onSlidingComplete={handleSeek}
                                    minimumTrackTintColor={colors.primary}
                                    maximumTrackTintColor={colors.borderLight}
                                    thumbTintColor={colors.primary}
                                />

                                <Text style={styles.timeText}>
                                    {status.durationMillis ? formatTime(status.durationMillis) : '0:00'}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: width,
        height: height,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black70,
    },
    controlsOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.black30,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: spacing.base,
        paddingTop: spacing['2xl'],
    },
    closeButton: {
        padding: spacing.sm,
        backgroundColor: colors.black50,
        borderRadius: spacing.borderRadius.full,
    },
    centerButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playPauseButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.black70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomControls: {
        paddingHorizontal: spacing.base,
        paddingBottom: spacing['2xl'],
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    slider: {
        flex: 1,
        marginHorizontal: spacing.md,
    },
    timeText: {
        ...typography.styles.caption,
        color: colors.textPrimary,
        minWidth: 40,
    },
});

export default VideoPlayer;
