import axios from 'axios'

export function worldChina() {
    return axios.get('./map/worldChina.json')
}