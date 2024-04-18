import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  FlatList,
  Dimensions,
} from "react-native";

import { useState, useRef } from "react";

import { FeedItem } from "../../components/FeedItem";

const { height: heightScreen } = Dimensions.get("screen");

export function Home() {
  let feedItems = [
    {
      id: "1",
      video: "https://i.imgur.com/Cnz1CPK.mp4",
      name: "@sujeitoprogramador",
      description: "Criando o ShortDev do zero com RN",
    },
    {
      id: "2",
      video: "https://i.imgur.com/E0tK2bY.mp4",
      name: "@henriquesilva",
      description:
        "Fala turma, estou aprendendo React Native com sujeito programador",
    },
    {
      id: "3",
      video: "https://i.imgur.com/mPFvFyX.mp4",
      name: "@sujeitoprogramador",
      description: "Aprendendo a trabalhar com Drag and Drop no React Native",
    },
  ];

  const [showItem, setShowItem] = useState(feedItems[0]);
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setShowItem(feedItems[viewableItems[0].index]);
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <TouchableOpacity>
          <Text style={[styles.text, { color: "#DDD" }]}>Seguindo</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.text, { color: "#FFF" }]}>Pra você</Text>
          <View style={styles.indicator}></View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={feedItems}
        renderItem={({ item }) => (
          <FeedItem dados={item} currentVisibleItem={showItem} />
        )}
        onViewableItemsChanged={onViewRef.current}
        snapToAlignment="center"
        snapToInterval={heightScreen}
        scrollEventThrottle={200}
        decelerationRate={"fast"}
        viewabilityConfig={{
          waitForInteraction: false,
          viewAreaCoveragePercentThreshold: 100,
          // isso significa que um item deve estar como TOTALMENTE VISÍVEL na tela para contar como visível
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  labels: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    position: "absolute",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 55,
    zIndex: 99,
    top: 6,
    left: 0,
    right: 0,
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  indicator: {
    backgroundColor: "#FFF",
    width: 32,
    height: 2,
    alignSelf: "center",
  },
});
