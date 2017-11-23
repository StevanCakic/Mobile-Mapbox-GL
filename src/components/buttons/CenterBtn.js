import React, { Component } from "react";
import { StyleSheet, View, TouchableHighlight, Text } from "react-native";
import Mapbox from "@mapbox/react-native-mapbox-gl";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

class CenterBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: props.center,
      showUser: props.showUser,
      followUser: props.followUser,
      findingCenter: false
    };
    this.centerMap = this.centerMap.bind(this);
  }

  centerMap() {
    this.setState({ findingCenter: true });
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        "<h2>Use Location?</h2> \
                                    This app wants to change your device settings:<br/><br/>\
                                    Use GPS for location<br/><br/>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 3000
    })
      .then(() => {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({
              followUser: Mapbox.UserTrackingModes.Follow,
              showUser: true,
              findingCenter: false
            });
            const { latitude, longitude } = position.coords;
            this.controlCenter(
              [longitude, latitude],
              true,
              Mapbox.UserTrackingModes.Follow
            );
          },
          error => {
            this.setState({ findingCenter: false });
            console.log(new Date(), error);
          },
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 3000 }
        );
      })
      .catch(error => {
        this.setState({ findingCenter: false });
        console.log(new Date(), error);
      });
  }

  centerControlPressed() {
    defaultState = {
      center: [19.819025, 41.327953],
      showUser: false,
      followUser: Mapbox.UserTrackingModes.None,
      findingCenter: false
    };
    if (!this.state.showUser) {
      this.centerMap();
    } else {
      this.setState({ findingCenter: false });
      this.setState(defaultState);
      this.controlCenter(
        defaultState.center,
        defaultState.showUser,
        defaultState.followUser
      );
    }
  }

  controlCenter(center, showUser, followUser) {
    this.props.getCenter(center, showUser, followUser);
  }

  render() {
    return (
      <View style={styles.centerContainer}>
        <TouchableHighlight
          onPress={() =>
            this.state.findingCenter ? "" : this.centerControlPressed()
          }
          underlayColor="#E0E0E0"
          style={styles.centerControlsContainer}
        >
          {!this.state.showUser ? (
            <Text style={styles.centerFont}> O </Text>
          ) : (
            <Text style={styles.centerFont}> X </Text>
          )}
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  centerFont: {
    textAlign: "center",
    fontSize: 25
  }
});

export default CenterBtn;
