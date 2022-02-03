import axios from 'axios';

export class ConveniadosService {

    getFaturamento() {
        return axios.get('assets/demo/data/faturamentoConveniados.json').then(res => res.data.data);
    }
}