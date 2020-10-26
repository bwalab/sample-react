import React from "react"
import BwaLocations from "./BwaLocations"
import LocationData from "./LocationData"
import GridSelect from "./GridSelect"
import DataGrid from "./DataGridData"
import axios from 'axios'
import Demo from './demo'
import { withTranslation } from 'react-i18next';


class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 0,
      userLoaded: false,
      locations: [],
      SelectedLocation: null,
      SelectedLocationName: '-',
      isLoading: true,
    }
    this.selectLocation = this.selectLocation.bind(this)
    this.getUserID = this.getUserID.bind(this)
    this.getUserLocations = this.getUserLocations.bind(this)


  }
  getUserID() {
    const querystring = require('querystring')
    const token = "Token " + localStorage.access_token
    axios({
      method: 'get',
      url: 'https://beta.bwalab.net/api/me/',
      headers: { 'Authorization': token, },
      data: querystring.stringify({
        Authorization: "Token" + localStorage.access_token,
      })
    }).then((response) => {
      const user_id = response.data.id
      this.setState({ userId: user_id })
      this.setState({ userLoaded: true })
    }).catch(function (error) {
      console.log('Error: ' + error)
    })
  }


  getUserLocations() {
    const querystring = require('querystring')
    const token = "Token " + localStorage.access_token
    axios({
      method: 'get',
      url: 'https://beta.bwalab.net/api/albatross/user/' + this.state.userId + '/locations/',
      headers: { 'Authorization': token, },
      data: querystring.stringify({
        Authorization: "Token" + localStorage.access_token,
      })
    }).then((response) => {
      const { data } = response.data
      this.setState({
        locations: data,
        isLoading: false
      })
    }).catch(function (error) {
      console.log('Error: ' + error)
    })
  }


  componentDidMount() {
    this.getUserID()
  }


  componentDidUpdate(prevProps, prevState) {
    console.log();
    if (this.state.userId !== prevState.userId) {
      this.getUserLocations()
    }
  }





  selectLocation = event => {
    const { id } = event.currentTarget
    if (id === "all") {
      this.setState({
        SelectedLocation: id,
      })
    }
    else {
      var locationId = Number(id)
      const location = this.state.locations.find(location => location.id === locationId)
      console.log(locationId)
      this.setState({
        SelectedLocation: id,
        SelectedLocationName: location.name

      })
    }


  }

  render() {
    const { t, i18n } = this.props
    const locationItems = this.state.locations.map(item => <BwaLocations key={item.id} id={item.id} item={item} selectLocation={this.selectLocation} />)

    let displayedData
    if (this.state.SelectedLocation === null) {
      displayedData = <h1>{t('Kiválasztás')}</h1>
    }
    else if (this.state.SelectedLocation === "all") {
      displayedData = <DataGrid />
    }
    else {
      displayedData = <LocationData SelectedLocation={this.state.SelectedLocation} />
    }
    return (
      <div>
        <Demo gridSelector={<GridSelect selectLocation={this.selectLocation} />} locationItems={locationItems} handleLogout={this.props.handleLogout} displayedData={displayedData} SelectedLocationName={this.state.SelectedLocationName} />
      </div>
    )
  }
}



export default withTranslation()(Dashboard)