import React, { useRef } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

import { WebView, WebViewMessageEvent } from "react-native-webview";
import { Colors } from "react-native/Libraries/NewAppScreen";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;
  const webviewRef = useRef<WebView | null>(null);
  const appURL = "https://work.runwell.app/";

  const handleEvent = async (event: WebViewMessageEvent) => {
    const eventData = JSON.parse(event.nativeEvent.data);
    console.log(eventData);
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />
      <SafeAreaView style={styles.scrollView}>
        <View style={styles.webView}>
          <WebView
            ref={webviewRef}
            source={{ uri: appURL }}
            onMessage={handleEvent}
            allowsBackForwardNavigationGestures
            sharedCookiesEnabled={true}
            originWhitelist={["*"]}
            onContentProcessDidTerminate={() => {
              webviewRef.current?.reload();
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  webView: {
    height: "100%",
    width: "100%",
  },
});

export default App;
