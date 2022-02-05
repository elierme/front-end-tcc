import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import {API} from "aws-amplify";


export const TableAtendimentos = () => {
    const [atendimentos, setAtendimentos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        let apiName = 'api';
        let myInit = { 
            headers: { }, 
            response: true, 
        }
        API.get(apiName, '/atendimentos', myInit).then(response => {
            // Add your code here
            console.log(response.data)

            setAtendimentos(response.data);
        }).catch(error => {
            console.log(error.response)
        }).finally(()=>{
            setLoading(false);
        })

    }, []); 

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'BRL' });
    };

    const formatConfirmacao = (value) => {
        return value === true? "Confirmado" : "Não Confirmado" ;
    };

    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Atendimentos</h5>
                    <DataTable value={atendimentos} loading={loading} paginator className="p-datatable-gridlines" showGridlines rows={10}
                        dataKey="id" filterDisplay="menu" responsiveLayout="scroll"
                          emptyMessage="Atendimentos Não encontrados.">
                        <Column header="Identificador" field="id"  filter filterPlaceholder="Filtrar por Identificador" style={{ minWidth: '12rem' }} />
                        <Column header="Data" field="data"  filter filterPlaceholder="Filtrar por Data" style={{ minWidth: '12rem' }} /> 
                        <Column header="Token" field="confirmado"  body={( data ) => formatConfirmacao(data.confirmado)}   />  
                        <Column header="Procedimento" field="procedimentoName"   />  
                        <Column header="Associado" field="nameAssociado"   />
                        <Column header="Prestador" field="namePrestador"   />
                        <Column header="Conveniado" field="nameConveniado"   />
                        <Column header="Plano" field="planoName"   />
                        <Column header="Valor" field="valor"   body={( data ) => formatCurrency(data.valor)}/>
                    </DataTable>
                </div>
            </div>
        </div>

    );
}
