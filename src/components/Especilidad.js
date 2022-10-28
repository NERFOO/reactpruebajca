import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import loading from './../assets/images/img1.jpg';
import { Navigate } from 'react-router-dom';

export default class Especilidad extends Component {

    state = {
        statusSelect : false ,
        statusInput : false ,
        especialidad : []
    }

    cargarEspecialidad = () => {
        var request = "/api/Doctores/Especialidades/";
        var url = Global.url + request;

        axios.get(url).then(res => {
            this.setState({
                statusSelect : true ,
                especialidad : res.data
            });
        });
    }
    componentDidMount = () => {
        this.cargarEspecialidad();
    }

    incrementoInput = React.createRef();
    selectedOption = React.createRef();
    incrementoSalario = (e) => {
        e.preventDefault();

        var value = this.selectedOption.current.value;
        var incremento = this.incrementoInput.current.value;
        var request = "/api/Doctores/" + value + "/" + incremento;
        var url = Global.url + request;


        var data = {
            salario : incremento
        }

        axios.put(url, data).then(res => {
            this.setState({
                statusInput : true
            })
        })

    }

    render() {
        if(this.state.statusInput == true) {
            (<Navigate to="/"/>)
        } else {
            return (<div>
                <h1>Especilidad</h1>
    
                <label>Seleccione una especialidad</label>
                <select ref={this.selectedOption}>
                    {
                        this.state.statusSelect == true &&
                        (this.state.especialidad.map((especialidad, index) => {
                            return (<option key={index}>{especialidad}</option>)
                        }))
                    }
                </select>
    
                <form>
                    <label>Incremento salarial</label>
                    <input type="text" ref={this.incrementoInput}/>
    
                    <button onClick={this.incrementoSalario}>Incrementar salarios</button>
                </form>
            </div>)
        }
    }
}
