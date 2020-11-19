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
                "https://beta.bwalab.net/api/albatross/user/alldata/",
            headers: { Authorization: token },
            data: querystring.stringify({
                Authorization: token,
            }),
        })
            .then((response) => {
                const data = response.data;
                this.setState({
                    all_data: data
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
        const allData = this.state.all_data.map(item => item.is_albatross ? item.locationdata ? <tr>
            <th scope="row">{item.name}</th>
            {item.locationdata.func_d_data ? <td className="table-danger">Igaz</td> : <td className="table-success">Hamis</td>}
            {item.locationdata.func_e_data ? <td className="table-danger">Igaz</td> : <td className="table-success">Hamis</td>}
            {item.locationdata.func_f_data ? <td className="table-danger">Igaz</td> : <td className="table-success">Hamis</td>}
            {item.locationdata.func_h_data ? <td className="table-danger">Igaz</td> : <td className="table-success">Hamis</td>}
            {item.locationdata.func_g_data ? <td className="table-danger">Igaz</td> : <td className="table-success">Hamis</td>}
            {item.locationdata.func_i_data ? <td className="table-success">Igaz</td> : <td className="table-danger">Hamis</td>}
            <td>{item.locationdata.temp_data} °C</td>
            <td>{item.locationdata.sza_data} g/l</td>
            <td>{item.locationdata.min_sza_data} g/l</td>
            <td>{item.locationdata.max_sza_data} g/l</td>
            <td>{item.locationdata.netto_sludge_data} m3/hét</td>
            <td>{item.locationdata.avg_elc_data} %</td>
            <td>{item.locationdata.boi_5_on}</td>
            <td>{item.locationdata.minpoolvolume_data} m3</td>
            <td>{item.locationdata.pool_volume} m3</td>
            <td>{item.locationdata.max_capacity_data} m3</td>
            <td>{item.locationdata.sludge_index_data} ml/g</td>
            <td>{item.locationdata.dehyd_sludge_sza_data} %</td>
            <td>{item.locationdata.daily_sludge_data} m3</td>
            <td>{item.locationdata.daily_sludge_sza_data} m3</td>
            <td>{item.locationdata.created_date_data_data}</td>

        </tr> : <tr></tr> : <tr></tr>)

        return (

            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr style={{ fontSize: "8px !important" }} className="text-center">
                            <th scope="col">Telephely</th>
                            <th scope="col">Szűk keresztmetszet a sűrítésnél vagy a víztelenítésnél </th>
                            <th scope="col">Jelen időszakban az utóülepítő túlterhelt</th>
                            <th scope="col">A levegőztetés vagy a víztelenítés üzemideje aránytalanul nagy</th>
                            <th scope="col">A jelen hőmérsékleten a rendelkezésre álló medenceterfogat nem elegendő</th>
                            <th scope="col">A denitrifikációhoz nem megfelelő a tápanyagarány</th>
                            <th scope="col">Az adatok 3 hétnél nem régebbiek</th>
                            <th scope="col">Szennyvíz- hőmérséklet</th>
                            <th scope="col">A biológiai medence szárazanyag tartalma (g/l)</th>
                            <th scope="col">A tisztításhoz szükséges minimális szárazanyag tartalom (g/l)</th>
                            <th scope="col">Az utóülepítő adottágai miatti maximális megengedett szárazanyag tartalom a biológiai medencében (g/l)</th>
                            <th scope="col">Nettó iszapszaporulat víztelenített iszapban kifejezve (m3/hét)</th>
                            <th scope="col">Lakosegyenérték szerinti energiaindex</th>
                            <th scope="col">BOI5/öN</th>
                            <th scope="col">Jelenlegi hőmérsékleten szükséges medencetérfogat (m3)</th>
                            <th scope="col">Rendelkezésre álló medencetérfogat (m3)</th>
                            <th scope="col">Maximális beérkező szennyvíz</th>
                            <th scope="col">Iszapindex (ml/g)</th>
                            <th scope="col">Víztelenített iszap szárazanyag tartalma (%)</th>
                            <th scope="col">Napi iszapszaporulat (kg)</th>
                            <th scope="col">Napi iszapszaporulat víztelenített iszapban kifejezve (m3)</th>
                            <th scope="col">Utolsó mérés dátuma</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {allData}
                    </tbody>
                </table>
            </div>

        )
    }
}
export default DataGridData