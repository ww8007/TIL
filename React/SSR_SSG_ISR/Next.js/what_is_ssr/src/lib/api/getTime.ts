import axios from 'axios';

function getTimeAPI() {
	return axios.get('https://worldtimeapi.org/api/ip');
}
export default getTimeAPI;
