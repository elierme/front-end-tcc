import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConveniadosService } from '../service/ConveniadosService';

const lineData = {
    labels: ['Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
        {
            label: 'Agendamentos',
            data: [100000, 60000, 75000, 80000, 90000, 60000, 80000],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: .4
        },
        {
            label: 'Atendiemntos',
            data: [90000, 50005, 62456, 75455, 105546, 54241, 75142],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: .4
        }
    ]
};

export const Dashboard = (props) => {

    const [faturamentos, setFaturamentos] = useState(null);


    const [lineOptions, setLineOptions] = useState(null)

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
        const conveniadosService = new ConveniadosService();
        conveniadosService.getFaturamento().then(data => setFaturamentos(data));
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
                            <div className="text-900 font-medium text-xl">1.385.618</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-shopping-cart text-blue-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">312 novos </span>
                    <span className="text-500">desde a última visita</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Conveniados</span>
                            <div className="text-900 font-medium text-xl">3.100</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-map-marker text-orange-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">%11+ </span>
                    <span className="text-500">desde a última semana</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Prestadores</span>
                            <div className="text-900 font-medium text-xl">103.005</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-inbox text-cyan-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">520</span>
                    <span className="text-500"> novos</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Contatos</span>
                            <div className="text-900 font-medium text-xl">152 Não Lidos</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-comment text-purple-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">85 </span>
                    <span className="text-500">respondidos</span>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Faturamento</h5>
                    <DataTable value={faturamentos} rows={5} paginator responsiveLayout="scroll">
                        <Column field="name" header="Conveniado" sortable style={{width: '35%'}}/>
                        <Column field="price" header="Receita" sortable style={{width: '35%'}} body={(data) => formatCurrency(data.price)}/>
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
