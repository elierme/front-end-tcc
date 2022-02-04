import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import {API} from "aws-amplify";



export const Dashboard = (props) => {

    const [faturamentos, setFaturamentos] = useState(null);

    const [prestadores, setPrestadores] = useState(null);
    const [associados, setAssociados] = useState(null);
    const [conveniados, setConveniados] = useState(null);
    const [qtdAtendimentos, setQtdAtendimentos] = useState(null);
    const [atendimentos, setAtendimentos] = useState(null);
    const [agendamentos, setAgendamentos] = useState(null);

    const [loading, setLoading] = useState(true);

    const [lineOptions, setLineOptions] = useState(null)

    const lineData = {
        labels: ['Janeiro','Fevereiro','Março', 'Abril','Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
            {
                label: 'Agendamentos',
                data: atendimentos,
                fill: false,
                backgroundColor: '#2f4860',
                borderColor: '#2f4860',
                tension: .4
            },
            {
                label: 'Atendiemntos',
                data: agendamentos,
                fill: false,
                backgroundColor: '#00bb7e',
                borderColor: '#00bb7e',
                tension: .4
            }
        ]
    };

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

  

    useEffect(() => {
        setLoading(true);

        let apiName = 'api';
        let myInit = { 
            headers: { }, 
            response: true, 
        }
        
        API.get(apiName, '/atendimentos', myInit).then(response => {
            // Add your code here
           

            var result = [];
            response.data.reduce(function(res, value) {
            if (!res[value.nameConveniado]) {
                res[value.nameConveniado] = { nameConveniado: value.nameConveniado, valor: 0 };
                result.push(res[value.nameConveniado])
            }
            res[value.nameConveniado].valor += value.valor;
            return res;
            }, {});


            setQtdAtendimentos(response.data.length);

            setFaturamentos(result);

            var meses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            response.data.reduce(function(res, value) {   
                meses[parseInt(value.data.split('/')[1])] += 1;
            return res;
            }, {});

           

            setAtendimentos(meses);
        }).catch(error => {
            console.log(error.response)
        }).finally(()=>{
            setLoading(false);
        })

        API.get(apiName, '/agendamentos', myInit).then(response => {

            var meses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            console.log(response.data)
            response.data.reduce(function(res, value) {            
                meses[parseInt(value.data.split('/')[1])] += 1;
            return res;
            }, {});

            setAgendamentos(meses);

      

        }).catch(error => {
            console.log(error.response)
        }).finally(()=>{
            setLoading(false);
        })

        API.get(apiName, '/associados', myInit).then(response => {

            setAssociados(response.data.length);

        }).catch(error => {
            console.log(error.response)
        }).finally(()=>{
            setLoading(false);
        })

        API.get(apiName, '/conveniados', myInit).then(response => {

            setConveniados(response.data.length);
        }).catch(error => {
            console.log(error.response)
        }).finally(()=>{
            setLoading(false);
        })


        API.get(apiName, '/prestadores', myInit).then(response => {

            setPrestadores(response.data.length);
        }).catch(error => {
            console.log(error.response)
        }).finally(()=>{
            setLoading(false);
        })

        
    }, []);

    useEffect(() => {
        if (props.colorMode === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [props.colorMode]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Associados</span>
                            <div className="text-900 font-medium text-xl">{associados}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-shopping-cart text-blue-500 text-xl"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Conveniados</span>
                            <div className="text-900 font-medium text-xl">{conveniados}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-map-marker text-orange-500 text-xl"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Prestadores</span>
                            <div className="text-900 font-medium text-xl">{prestadores}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-inbox text-cyan-500 text-xl"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Atendimentos</span>
                            <div className="text-900 font-medium text-xl">{qtdAtendimentos}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-comment text-purple-500 text-xl"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Faturamento</h5>
                    <DataTable value={faturamentos} rows={5} loading={loading} paginator responsiveLayout="scroll">
                        <Column field="nameConveniado" header="Conveniado" sortable style={{width: '35%'}}/>
                        <Column field="valor" header="Receita" sortable style={{width: '35%'}} body={( data ) => formatCurrency(data.valor)} />
                    </DataTable>
                </div>
                
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Agendamentos x Atendimentos</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>

                
            </div>
        </div>
    );
}
