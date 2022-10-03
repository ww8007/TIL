import axios from 'axios';

function getTimeAPI() {
	return axios.get('https://worldtimeapi.org/api/timezone/Asia/Seoul');
}
export default getTimeAPI;
