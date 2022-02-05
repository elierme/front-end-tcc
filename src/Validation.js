import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';


import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';



const Validation = () => {

  
    const location = useLocation();

    PrimeReact.ripple = true;


    const [latitude, setLatitude ] = useState(2321545456);
    const [longitude, setLongitude] = useState(6451244242);
    const [token, setToken] = useState();
    const [visible, setVisible] = useState(false);
    const [mensagem, setMensagem] = useState();
    
 
    useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        position => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);

        console.log(latitude);
        console.log(longitude);

        },
        err => {
        console.log(err);
        },
        {
        timeout: 30000,
        }
    );
    }, []);

    const ValidarToken = () => {
        const request = { latitude: latitude, longitude: longitude };

        const instance = axios.create({
            baseURL:'https://t5xkeey356.execute-api.us-west-2.amazonaws.com/homo/tokens/',
            headers:{
                'Content-Type':'application/json',
                            'x-api-key':`fwuc86s27o7fnCNLOZH6L7GjmvowZyRE7yYlmdik`,
                            'Accept': "application/json"
                }
            })

        return instance.put(token,request)
        .then(res => setMensagem(res.data));
    }

    const footer  = () =>  (
        <div>
            <Button label="Ok" icon="pi pi-check" onClick={setVisible(false)} />
        </div>
    );
    
    const myIcon = () =>  (
        <button className="p-dialog-titlebar-icon p-link">
            <span className="pi pi-search"></span>
        </button>
    )

    return (
        
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">

                    <Panel  header="Confirme aqui seu atendimento">
                        <InputText id="in"  
                         value={token}
                        onChange={e => setToken(e.target.value )} />
                        <span>&nbsp;&nbsp;</span>
                        <Button label="Validar"  icon="pi pi-check" className="p-button-success mr-2" onClick={ValidarToken} />
                    </Panel>

                    <Dialog header="Header Text" footer={footer} icons={myIcon} visible={visible} style={{width: '50vw'}} modal>
                        {mensagem}
                    </Dialog>
                </div>
            </div>
        </div>
    );

}

export default Validation
