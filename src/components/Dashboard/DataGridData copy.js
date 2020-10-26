import React from "react"
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";


class DataGridData extends React.Component {
    constructor() {
        super()
        this.state = {
            all_data: [],
            rows: []
        }
    }
    componentDidMount(props) {
        const querystring = require("querystring");
        const token = "Token " + localStorage.access_token;
        axios({
            method: "get",
            url:
                "http://127.0.0.1:8000/api/albatross/user/alldata/",
            headers: { Authorization: token },
            data: querystring.stringify({
                Authorization: token,
            }),
        })
            .then((response) => {
                const data = response.data;
                this.setState({
                    all_data: data.map(item => item.locationdata ? {
                        id: item.id, name: item.name,
                        funcD: item.locationdata.func_d_data, funcE: item.locationdata.func_e_data, funcF: item.locationdata.func_f_data,
                        temp_data: item.locationdata.temp_data, sza_data: item.locationdata.sza_data, min_sza_data: item.locationdata.min_sza_data, max_sza_data: item.locationdata.max_sza_data,
                        netto_sludge_data: item.locationdata.netto_sludge_data, avg_elc_data: item.locationdata.avg_elc_data, minpoolvolume_data: item.locationdata.minpoolvolume_data, daily_sludge_data: item.locationdata.daily_sludge_data,
                        sludge_index_data: item.locationdata.sludge_index_data, dehyd_sludge_sza_data: item.locationdata.dehyd_sludge_sza_data, pool_volume: item.locationdata.pool_volume, boi_5_on: item.locationdata.boi_5_on
                    } : { id: "-" })
                });
                console.log(response.data);
                console.log("LOG");
                console.log(this.state.all_data);
            })
            .catch(function (error) {
                console.log("Error: " + error);
            });
        /*  this.setState({
             rows: this.state.all_data.map(item => [item.locationdata ? { name: item.name, id: item.locationdata.id } : {}])
         })
         console.log(this.state.rows);
         console.log("this.state.rows"); */
    }

    render() {

        const columns = [
            { field: 'name', headerName: 'Telephely', width: 120 },
            { field: 'funcD', headerName: 'Szűk keresztmetszet a sűrítésnél vagy a víztelenítésnél', width: 400, },
            { field: 'funcE', headerName: 'Jelen időszakban az utóülepítő túlterhelt', width: 300 },
            { field: 'funcF', headerName: 'A levegőztetés vagy a víztelenítés üzemideje aránytalanul nagy', width: 450 },
            { field: 'temp_data', headerName: 'Hőmérséklet', width: 120 },
            { field: 'sza_data', headerName: 'Sza (g/l)', description: 'A biológiai medence szárazanyag tartalma (g/l)', width: 120 },
            { field: 'min_sza_data', headerName: 'Minimum Sza (g/l)', description: 'A tisztításhoz szükséges minimális szárazanyag tartalom (g/l)', width: 150 },
            { field: 'max_sza_data', headerName: 'Maximális Sza', width: 150, description: 'Az utóülepítő adottágai miatti maximális megengedett szárazanyag tartalom a biológiai medencében (g/l)', width: 150 },
            { field: 'netto_sludge_data', headerName: 'Nattó iszapszaporulat (m3/hét)', description: 'Nettó iszapszaporulat víztelenített iszapban kifejezve (m3/hét)', width: 250 },
            { field: 'avg_elc_data', headerName: 'Lakosegyenérték szerinti energiaindex', width: 300 },
            { field: 'boi_5_on', headerName: 'BOI5/öN', width: 120 },
            { field: 'minpoolvolume_data', headerName: 'Jelenlegi hőmérsékleten szükséges medencetérfogat (m3)', width: 400 },
            { field: 'sludge_index_data', headerName: 'Iszapindex (ml/g)', width: 120 },
            { field: 'dehyd_sludge_sza_data', headerName: 'Víztelenített iszap szárazanyag tartalma (%)', width: 250 },
            { field: 'daily_sludge_data', headerName: 'Napi iszapszaporulat (kg)', width: 200 },
            { field: 'pool_volume', headerName: 'Rendelkezésre álló medencetérfogat (m3)', width: 300 },

        ]
        const rows = this.state.all_data

        return (
            <div style={{ height: 400, width: '100%' }} className="react-grid-multiline-header">
                <DataGrid rows={rows} columns={columns} pageSize={5} />
            </div>

        )
    }
}
export default DataGridData