import React, { useState, useEffect} from 'react';


import PrimeReact from 'primereact/api';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import {API} from "aws-amplify";



export const ValidarAtendimento = () => {


    PrimeReact.ripple = true;


    const [latitude, setLatitude ] = useState(2321545456);
    const [longitude, setLongitude] = useState(6451244242);
    const [token, setToken] = useState();
    
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
    

        let apiName = 'api';
        let myInit = { 
            headers: { }, 
            body: request,
            response: true, 
        }
        API.put(apiName, '/tokens/'+token, myInit).then(response => {
            // Add your code here
            console.log(response.data)

            alert("Sucesso ao ativar token");

        }).catch(error => {
            console.log(error.response)
            alert("Não foi possivel ativar token");
        }).finally(()=>{
        })

    }

   
    
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
                </div>
            </div>
        </div>
    );

}

export default ValidarAtendimento
