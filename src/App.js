import React, { Component } from "react";
import { StyleSheet, View, TouchableHighlight, Text } from "react-native";
import Mapbox, { MapView } from "@mapbox/react-native-mapbox-gl";

import ZoomBtn from "./components/buttons/ZoomBtn";
import CenterBtn from "./components/buttons/CenterBtn";

Mapbox.setAccessToken(
  "pk.eyJ1IjoidGVzdHIiLCJhIjoiY2o5enlpdmNyMjF4MjMybnJmM3A4dW8zOCJ9.pjsE75NxZ9PGW8rnI5P5xA"
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 15,
      center: [19.819025, 41.327953],
      showUser: false,
      followUser: Mapbox.UserTrackingModes.None
    };
  }

  setNativeProps = nativeProps => {
    this._root.setNativeProps(nativeProps);
  };

  zoomControler = zoomLevel => {
    this.setState({ zoom: zoomLevel });
  };

  centerControler = (center, showUser, followUser) => {
    this.setState({ center, showUser, followUser });
  };

  render() {
    const { center, zoom, showUser, followUser } = this.state;
    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          centerCoordinate={center}
          zoomLevel={zoom}
          style={styles.container}
          zoomEnabled={true}
          showUserLocation={showUser}
          userTrackingMode={followUser}
          ref={component => {
            this._root = component;
          }}
        />

        <ZoomBtn getZoom={this.zoomControler} zoom={zoom} />
        <CenterBtn
          getCenter={this.centerControler}
          center={center}
          showUser={showUser}
          followUser={followUser}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative"
  }
});

export default App;
