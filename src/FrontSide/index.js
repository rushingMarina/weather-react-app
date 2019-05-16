import React, { Component } from "react";
import FrontSideView from "./FrontSideView";
import moment from "moment";
import queryString from 'query-string';
import { getWeatherForLocation } from "../api";

class FrontSide extends Component {
  state = { currentWeather: null, prevCityId: null };

  updateWeather = () => {
    getWeatherForLocation(this.props.currentCity).then(weather => {
      console.log(weather.currently);
      this.setState({ currentWeather: weather.currently });
    });
  };

  updateTime = () => {
    this.setState({time :moment()})
  }

  componentDidMount() {
    this.updateWeather(); 
    this.interval = setInterval(() => {
        this.updateTime();
    }, 1000);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentCity.woeid !== prevState.prevCityId) {
      return {
        prevCityId: nextProps.currentCity.woeid,
        currentWeather: null
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentWeather) {
      return null;
    }
    this.updateWeather();
  }

  render() {
    if (!this.state.currentWeather) {
      return null;
    }

    const {
      icon,
      temperature,
      apparentTemperature,
      summary
    } = this.state.currentWeather;

    return (
      <FrontSideView
        date={moment()}
        time
        icon={icon}
        temperature={temperature}
        apparentTemperature={apparentTemperature}
        summary={summary}
        currentCityName={this.props.currentCity.title}
        onClick={this.props.onClick}
      />
    );
  }
}

export default FrontSide;
