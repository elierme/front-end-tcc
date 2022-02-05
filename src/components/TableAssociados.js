import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


import {API} from "aws-amplify";


export const TableAssociados = () => {
    const [associados, setAssociados] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);

        let apiName = 'api';
        let myInit = { 
            headers: { }, 
            response: true, 
        }
        API.get(apiName, '/associados', myInit).then(response => {
            // Add your code here
            console.log(response.data)

            setAssociados(response.data);

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
                    <h5>Associados</h5>
                    <DataTable value={associados} loading={loading} paginator className="p-datatable-gridlines" showGridlines rows={10}
                        dataKey="id" filterDisplay="menu" responsiveLayout="scroll"
                          emptyMessage="Associados Não encontrados.">
                        <Column header="Identificador" field="id"  filter filterPlaceholder="Filtrar por Identificador" style={{ minWidth: '12rem' }} />
                        <Column header="Nome" field="nome"  filter filterPlaceholder="Filtrar por Nome" style={{ minWidth: '12rem' }} />
                        <Column header="CPF" field="cpf"  filterField="cpf" style={{ minWidth: '12rem' }}  filter filterPlaceholder="Filtrar por CPF"
                            filterClear={filterClearTemplate} filterApply={filterApplyTemplate} />
                         <Column header="RG" field="rg"  filter filterPlaceholder="Filtrar por RG" style={{ minWidth: '12rem' }} />    
                        <Column header="Data de Nascimento" field="dataNascimento"  filter filterPlaceholder="Filtrar por Data de Nascimento" style={{ minWidth: '12rem' }} />    
                        <Column header="Endereço" field="endereco"  filter filterPlaceholder="Filtrar por Endereço" style={{ minWidth: '12rem' }} />
                        <Column header="Telefone" field="telefone"  filter filterPlaceholder="Filtrar por Telefone" style={{ minWidth: '12rem' }} />
                        <Column header="Plano" field="planoName"  filter filterPlaceholder="Filtrar por Plano" style={{ minWidth: '12rem' }} />
                    </DataTable>
                </div>
            </div>
        </div>

    );
}
