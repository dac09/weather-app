import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as cityActions from '../../redux/cities/actions';
import * as weatherActions from '../../redux/weather/actions';

type Props = {

}
export class Forecasts extends React.Component {
  props: Props;

  componentWillReceiveProps(nextProps) {
    const {cities, weather, weatherActions} = this.props;

    let cityList = Object.keys(nextProps.cities);

    cityList.map((city) => {
      console.log(city)

      // // Don't fetch weather again if already present
      if (city in cities){
        return;
      }

      weatherActions.getWeatherFor(city);
    })
  }

  render() {

    const deleteCity = (city) => {
      const {cityActions} = this.props;

      cityActions.removeCity(city);
    }

    const renderForecastTracks = () => {
      const cityList = Object.keys(this.props.cities);

      return cityList.map((city) => {
        return (
          <div className="row">
            <h3 className="column column-80">{city}</h3>
            <button className="column column-10" onClick={() => deleteCity(city)}> Delete </button>
            <div className="forecast-track">
              <div className="forecast-card">
                {/*<Forecast forecast={weather[city]}>*/}
              </div>
            </div>
        </div>)
      })
    }

    return (
      <div>
        {renderForecastTracks()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    weather: state.weather,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    cityActions: bindActionCreators(cityActions, dispatch),
    weatherActions: bindActionCreators(weatherActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forecasts)
