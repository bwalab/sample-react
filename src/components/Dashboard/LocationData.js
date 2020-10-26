import React from "react";
import axios from "axios";
/* import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent'; */
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { useTranslation, withTranslation, Trans } from 'react-i18next';

class LocationData extends React.Component {
  constructor() {
    super();
    this.state = {
      SavedData: {},
    };
  }
  componentDidMount(props) {
    const querystring = require("querystring");
    const token = "Token " + localStorage.access_token;
    axios({
      method: "get",
      url:
        "https://beta.bwalab.net/api/albatross/user/" +
        this.props.SelectedLocation +
        "/data/",
      headers: { Authorization: token },
      data: querystring.stringify({
        Authorization: token,
      }),
    })
      .then((response) => {
        const data = response.data;
        this.setState({ SavedData: data });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.SelectedLocation !== prevProps.SelectedLocation) {
      console.log("componentDidUpdate");
      const querystring = require("querystring");
      const token = "Token " + localStorage.access_token;
      console.log(".");
      axios({
        method: "get",
        url:
          "https://beta.bwalab.net/api/albatross/user/" +
          this.props.SelectedLocation +
          "/data/",
        headers: { Authorization: token },
        data: querystring.stringify({
          Authorization: token,
        }),
      })
        .then((response) => {
          const data = response.data;
          this.setState({ SavedData: data });
        })
        .catch(function (error) {
          console.log("Error: " + error);
        });
    }
  }


  render() {
    const { t } = this.props;
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>

            <h2>{t('Szűk keresztmetszet a sűrítésnél vagy a víztelenítésnél')}: {this.state.SavedData.func_d_data ? "True" : "False"}</h2>

          </Grid>
          <Grid item xs={12} sm={6}>
            <h2>{t('Jelen időszakban az utóülepítő túlterhelt')}: {this.state.SavedData.func_e_data ? "True" : "False"}</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h2>{t('A levegőztetés vagy a víztelenítés üzemideje aránytalanul nagy')}: {this.state.SavedData.func_f_data ? "True" : "False"}</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
          </Grid>



          <Grid h4item xs={6}>
            <h4>{t('Szennyvíz- hőmérséklet')}: <strong>{this.state.SavedData.temp_data} °C</strong></h4>
          </Grid>
          <Grid h4item xs={6}>
            <h4>{t('A biológiai medence szárazanyag tartalma (g/l)')}: <strong>{this.state.SavedData.sza_data}</strong></h4>
          </Grid>
          <Grid h4item xs={6}>
            <h4>{t('A tisztításhoz szükséges minimális szárazanyag tartalom (g/l)')}: <strong>{this.state.SavedData.min_sza_data}</strong></h4>
          </Grid>
          <Grid h4item xs={6}>
            <h4>{t('Az utóülepítő adottágai miatti maximális megengedett szárazanyag tartalom a biológiai medencében (g/l)')}: <strong>{this.state.SavedData.max_sza_data}</strong></h4>
          </Grid>
          <Grid h4item xs={6}>
            <h4>{t('Nettó iszapszaporulat víztelenített iszapban kifejezve (m3/hét)')}: <strong>{this.state.SavedData.netto_sludge_data}</strong></h4>
          </Grid>
          <Grid h4item xs={6}>
            <h4>{t('Lakosegyenérték szerinti energiaindex')}: <strong>{this.state.SavedData.avg_elc_data * 100} %</strong></h4>
          </Grid>
          <Grid h4item xs={6}>
            <h4>{t('BOI5/öN')}: <strong>{this.state.SavedData.boi_5_on}</strong></h4>
          </Grid>
          <Grid h4item xs={6}>
            <h4>{t('Jelenlegi hőmérsékleten szükséges medencetérfogat (m3)')}: <strong>{this.state.SavedData.minpoolvolume_data}</strong></h4>
          </Grid>
          <Grid h4item xs={6}>
            <h4>{t('Rendelkezésre álló medencetérfogat (m3)')}: <strong>{this.state.SavedData.pool_volume}</strong></h4>
          </Grid>
          <Grid h4item xs={6}>
            <h4>{t('Iszapindex (ml/g)')}: <strong>{this.state.SavedData.sludge_index_data}</strong></h4>
          </Grid>
          <Grid h4item xs={6}>
            <h4>{t('Víztelenített iszap szárazanyag tartalma (%)')}: <strong>{this.state.SavedData.dehyd_sludge_sza_data}</strong></h4>
          </Grid>
          <Grid h4item xs={6}>
            <h4>{t('Napi iszapszaporulat (kg)')}: <strong>{this.state.SavedData.daily_sludge_data}</strong></h4>
          </Grid>
          <Grid h4item xs={6}>
            <h4>{t('Napi iszapszaporulat víztelenített iszapban kifejezve (m3)')}: {t('Kijelentkezés')}</h4>
          </Grid>
        </Grid>

      </div>

      /*                <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {this.state.SavedData.created_date}
          </Typography>
          <Typography variant="h5" component="h2">
            {this.state.SavedData.comment_1}
          </Typography>
          <Typography color="textSecondary">
            {this.state.SavedData.comment_2}
          </Typography>
          <Typography variant="body2" component="span">
            <br />
            {this.state.SavedData.comment_3}
          </Typography>
        </CardContent> */
    );
  }
}

export default withTranslation()(LocationData);
