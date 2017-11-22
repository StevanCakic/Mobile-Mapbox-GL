import React, { Component } from "react";
import { StyleSheet, View, TouchableHighlight, Text } from "react-native";
import Mapbox, { MapView } from "@mapbox/react-native-mapbox-gl";

import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

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
      followUser: Mapbox.UserTrackingModes.None,
      map: null
    };
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.centerMap = this.centerMap.bind(this);
  }
  setNativeProps = nativeProps => {
    this._root.setNativeProps(nativeProps);
  };
  zoomIn() {
    if (this.state.zoom < 22) {
      this.setState({ zoom: this.state.zoom + 1 });
    }
  }
  zoomOut() {
    if (this.state.zoom > 0) {
      this.setState({ zoom: this.state.zoom - 1 });
    }
  }

  centerMap(map) {
    if (!this.state.showUser) {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<h2>Use Location?</h2> \
                                    This app wants to change your device settings:<br/><br/>\
                                    Use GPS for location<br/><br/>",
        ok: "YES",
        cancel: "NO"
      })
        .then(() => {
          this.setState({ followUser: Mapbox.UserTrackingModes.Follow });
          this.setState({ showUser: true });
          navigator.geolocation.getCurrentPosition(position => {
            this.setState({
              center: [position.coords.longitude, position.coords.latitude]
            });
          });
        })
        .catch(error => {
          this.setState({ followUser: Mapbox.UserTrackingModes.None });
          this.setState({ showUser: false });
          this.setState({ center: [19.819025, 41.327953] });
        });
    } else {
      this.setState({ followUser: Mapbox.UserTrackingModes.None });
      this.setState({ showUser: false });
      this.setState({ center: [19.819025, 41.327953] });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          centerCoordinate={this.state.center}
          zoomLevel={this.state.zoom}
          style={styles.container}
          zoomEnabled={true}
          showUserLocation={this.state.showUser}
          userTrackingMode={this.state.followUser}
          ref={component => (this._root = component)}
        />

        <View style={styles.zoomContainer}>
          <TouchableHighlight
            onPress={this.zoomIn}
            underlayColor="#E0E0E0"
            style={styles.zoomControlsContainer}
          >
            <Text style={styles.controlsFont}> + </Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.zoomOut}
            underlayColor="#E0E0E0"
            style={styles.zoomControlsContainer}
          >
            <Text style={styles.controlsFont}> - </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.centerContainer}>
          <TouchableHighlight
            onPress={() => this.centerMap(this._root)}
            underlayColor="#E0E0E0"
            style={styles.centerControlsContainer}
          >
            {!this.state.showUser ? (
              <Text style={styles.controlsFont}> O </Text>
            ) : (
              <Text style={styles.controlsFont}> X </Text>
            )}
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
  zoomControlsContainer: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center"
  },
  controlsFont: {
    textAlign: "center",
    fontSize: 25
  },

  centerContainer: {
    position: "absolute",
    flex: 1,
    top: 10,
    left: 15,
    width: "10%",
    height: "10%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 1
  },
  centerControlsContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
