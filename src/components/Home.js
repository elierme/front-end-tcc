import React from 'react';


import PrimeReact from 'primereact/api';



export const Home = () => {


    PrimeReact.ripple = true;


    

    
    return (
        
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">

                    Seja bem vindo Ao Nosso portal
                </div>
            </div>
        </div>
    );

}

export default Home
