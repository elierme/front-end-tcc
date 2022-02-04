import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import {API} from "aws-amplify";


export const RelatorioFinanceiro = () => {
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


            var result = [];
            response.data.reduce(function(res, value) {
            if (!res[value.nameConveniado+value.procedimento]) {
                res[value.nameConveniado+value.procedimento] = { nameConveniado: value.nameConveniado, procedimento: value.procedimento, valor: 0 };
                result.push(res[value.nameConveniado+value.procedimento])
            }
            res[value.nameConveniado].valor += value.valor;
            return res;
            }, {});

            setAtendimentos(result);
        }).catch(error => {
            console.log(error.response)
        }).finally(()=>{
            setLoading(false);
        })

    }, []); 

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Atendimentos</h5>
                    <DataTable value={atendimentos} loading={loading} paginator className="p-datatable-gridlines" showGridlines rows={10}
                        dataKey="id" filterDisplay="menu" responsiveLayout="scroll"
                          emptyMessage="Atendimentos Não encontrados.">
                        <Column header="Conveniado" field="nameConveniado"   />
                        <Column header="Procedimento" field="procedimento"  />         
                        <Column header="Valor" field="valor" body={( data ) => formatCurrency(data.valor)}   />
                    </DataTable>
                </div>
            </div>
        </div>

    );
}
