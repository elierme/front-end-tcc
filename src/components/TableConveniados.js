import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import {API} from "aws-amplify";


export const TableConveniados = () => {
    const [conveniados, setConveniados] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        let apiName = 'api';
        let myInit = { 
            headers: { }, 
            response: true, 
        }
        API.get(apiName, '/conveniados', myInit).then(response => {
            // Add your code here
            console.log(response.data)

            setConveniados(response.data);
        }).catch(error => {
            console.log(error.response)
        }).finally(()=>{
            setLoading(false);
        })

    }, []); 

    const filterClearTemplate = (options) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary"></Button>;
    }

    const filterApplyTemplate = (options) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success"></Button>
    }

    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Conveniados</h5>
                    <DataTable value={conveniados} loading={loading} paginator className="p-datatable-gridlines" showGridlines rows={10}
                        dataKey="id" filterDisplay="menu" responsiveLayout="scroll"
                          emptyMessage="Prestadores Não encontrados.">
                        <Column header="Identificador" field="id"  filter filterPlaceholder="Filtrar por Identificador" style={{ minWidth: '12rem' }} />
                        <Column header="Nome Fantasia" field="nomeFantasia"  filter filterPlaceholder="Filtrar por Nome Fantasia" style={{ minWidth: '12rem' }} />
                        <Column header="Nome Social" field="razaoSocial"  filter filterPlaceholder="Filtrar por Nome Social" style={{ minWidth: '12rem' }} />
                        <Column header="CNPJ" field="cnpj"  filterField="cpf" style={{ minWidth: '12rem' }}  filter filterPlaceholder="Filtrar por CPF"
                            filterClear={filterClearTemplate} filterApply={filterApplyTemplate} />
                        <Column header="Endereço" field="endereco"  filter filterPlaceholder="Filtrar por Endereço" style={{ minWidth: '12rem' }} />
                        <Column header="Telefone" field="telefone"  filter filterPlaceholder="Filtrar por Telefone" style={{ minWidth: '12rem' }} />
                    </DataTable>
                </div>
            </div>
        </div>

    );
}
