    import React, { Component } from 'react';
    import axios from 'axios';
    import Global from '../Global';
    import loading from './../assets/images/img1.jpg';

export default class Doctor extends Component {

    state = {
        status : false ,
        doctores  : []
    }

    cargarDoctor = () => {
        var request = "/api/Doctores/";
        var url = Global.url + request;

        axios.get(url).then( res => {
            this.setState({
                status : true ,
                doctores : res.data
            })
        });
    }
    componentDidMount = () => {
        this.cargarDoctor();
    }
    componentDidUpdate = () => {
        this.cargarDoctor();
    }

    render() {
        if(this.state.status == false) {
            return(<div>
                <img src={loading} alt="cargando" />
            </div>)
        } else {
            return (<div>
                <h1>Incremento salarial doctores</h1>

                <table className="table" border="1">
                    <thead>
                        <tr>
                            <th scope="col">Appelido</th>
                            <th scope="col">Especialidad</th>
                            <th scope="col">Salario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.doctores.map((doctor, index) => {
                                return (<tr key={index}>
                                    <td>{doctor.apellido}</td>
                                    <td>{doctor.especialidad}</td>
                                    <td>{doctor.salario}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>)
        }
    }
}
