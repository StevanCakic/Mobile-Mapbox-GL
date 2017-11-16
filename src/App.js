import React, { Component } from "react";
import { StyleSheet, View, TouchableHighlight, Text } from "react-native";
import Mapbox, { MapView } from "@mapbox/react-native-mapbox-gl";

Mapbox.setAccessToken(
  "pk.eyJ1IjoidGVzdHIiLCJhIjoiY2o5enlpdmNyMjF4MjMybnJmM3A4dW8zOCJ9.pjsE75NxZ9PGW8rnI5P5xA"
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { zoom: 15 };
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }
  zoomIn() {
    if (this.state.zoom < 20) {
      this.setState({ zoom: this.state.zoom + 1 });
    }
  }
  zoomOut() {
    if (this.state.zoom > 12) {
      this.setState({ zoom: this.state.zoom - 1 });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={this.state.zoom}
          centerCoordinate={[11.256, 43.77]}
          style={styles.container}
          zoomEnabled={true}
        />

        <View style={styles.zoomContainer}>
          <TouchableHighlight
            onPress={this.zoomIn}
            underlayColor="#E0E0E0"
            style={styles.zoomControlContainer}
          >
            <Text style={styles.zoomControlFont}> + </Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.zoomOut}
            underlayColor="#E0E0E0"
            style={styles.zoomControlContainer}
          >
            <Text style={styles.zoomControlFont}> - </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  zoomContainer: {
    position: "absolute",
    flex: 1,
    top: 10,
    right: 15,
    width: "10%",
    height: "20%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 1
  },
  zoomControlContainer: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center"
  },
  zoomControlFont: {
    textAlign: "center",
    fontSize: 25
  }
});

export default App;
