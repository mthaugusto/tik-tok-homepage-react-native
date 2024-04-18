import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRef, useState, useEffect } from "react";

import { Video } from "expo-av";

import { Ionicons } from "@expo/vector-icons";

const { height: heightScreen } = Dimensions.get("screen");
export function FeedItem({ dados, currentVisibleItem }) {
  const video = useRef(null);

  const [status, setStatus] = useState({});
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(50);

  function likeButton() {
    if (liked) {
      return <Ionicons name="heart" size={35} color="#DC143C" />;
    }
    return <Ionicons name="heart" size={35} color="#fff" />;
  }

  useEffect(() => {
    if (currentVisibleItem?.id === dados.id) {
      video.current?.playAsync();
    } else {
      video.current?.pauseAsync();
    }
  }, [currentVisibleItem]);

  function handlePlayer() {
    status.isPlaying ? video.current?.pauseAsync() : video.current?.playAsync();
  }

  return (
    <Pressable onPress={handlePlayer}>
      <View style={styles.info}>
        <Text style={styles.name}>{dados.name}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {dados.description}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => {
            setLiked(!liked);

            setLikes((likes) => (liked ? likes - 1 : likes + 1));
          }}
        >
          {likeButton()}
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble-ellipses" size={35} color="#FFF" />
          <Text style={styles.actionText}>23</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bookmark" size={35} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Video
        ref={video}
        style={{ width: "100%", height: heightScreen * 0.98 }}
        source={{ uri: dados.video }}
        resizeMode="cover"
        shouldPlay={false}
        isMuted={false}
        isLooping={true}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  info: {
    position: "absolute",
    zIndex: 99,
    left: 4,
    padding: 8,
    bottom: 100,
  },
  name: {
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 4,
    textShadowColor: "rgba(0, 0, 0, .20)",
    textShadowOffset: { width: -1, height: 1.5 },
    textShadowRadius: 8,
  },
  description: {
    color: "#FFF",
    marginRight: 24,
    textShadowColor: "rgba(0, 0, 0, .20)",
    textShadowOffset: { width: -1, height: 1.5 },
    textShadowRadius: 8,
  },
  actions: {
    position: "absolute",
    zIndex: 99,
    right: 10,
    bottom: Platform.OS === "android" ? 120 : 180,
    gap: 18,
  },
  actionText: {
    textAlign: "center",
    color: "#FFF",
  },
});
