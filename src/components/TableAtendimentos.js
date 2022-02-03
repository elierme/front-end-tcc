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

    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Atendimentos</h5>
                    <DataTable value={atendimentos} loading={loading} paginator className="p-datatable-gridlines" showGridlines rows={10}
                        dataKey="id" filterDisplay="menu" responsiveLayout="scroll"
                          emptyMessage="Atendimentos Não encontrados.">
                        <Column header="Data" field="data"  filter filterPlaceholder="Filtrar por Data" style={{ minWidth: '12rem' }} />    
                        <Column header="Associado" field="nomeAssociado"  filter filterPlaceholder="Filtrar por Associado" style={{ minWidth: '12rem' }} />
                        <Column header="Prestador" field="nomePrestador"  filterField="cpf" style={{ minWidth: '12rem' }}  filter filterPlaceholder="Filtrar por Prestador" />
                        <Column header="Conveniado" field="nomeConveniado"  filterField="cpf" style={{ minWidth: '12rem' }}  filter filterPlaceholder="Filtrar por Conveniado" />
                    </DataTable>
                </div>
            </div>
        </div>

    );
}
