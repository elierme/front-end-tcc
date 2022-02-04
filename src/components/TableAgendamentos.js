import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import {API} from "aws-amplify";


export const TableAgendamentos = () => {
    const [agendamentos, setAgendamentos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        let apiName = 'api';
        let myInit = { 
            headers: { }, 
            response: true, 
        }
        API.get(apiName, '/agendamentos', myInit).then(response => {
            // Add your code here
            console.log(response.data)

            setAgendamentos(response.data);

        }).catch(error => {
            console.log(error.response)
        }).finally(()=>{
            setLoading(false);
        })

    }, []); 

    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Agendamentos</h5>
                    <DataTable value={agendamentos} loading={loading} paginator className="p-datatable-gridlines" showGridlines rows={10}
                        dataKey="id" filterDisplay="menu" responsiveLayout="scroll"
                          emptyMessage="Agendamentos Não encontrados.">
                        <Column header="Identificador" field="id"  filter filterPlaceholder="Filtrar por Identificador" style={{ minWidth: '12rem' }} />
                        <Column header="Data" field="data"  filter filterPlaceholder="Filtrar por Data" style={{ minWidth: '12rem' }} />    
                        <Column header="Procedimento" field="procedimentoName"  />  
                        <Column header="Associado" field="nomeAssociado"  filter filterPlaceholder="Filtrar por Associado" style={{ minWidth: '12rem' }} />
                        <Column header="Prestador" field="nomePrestador"  filterField="cpf" style={{ minWidth: '12rem' }}  filter filterPlaceholder="Filtrar por Prestador" />
                        <Column header="Conveniado" field="nomeConveniado"  filterField="cpf" style={{ minWidth: '12rem' }}  filter filterPlaceholder="Filtrar por Conveniado" />                    
                        <Column header="Plano" field="planoName"   />
                    </DataTable>
                </div>
            </div>
        </div>

    );
}
