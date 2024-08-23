import axios from "axios";



const map= await axios.get('https://geo.datav.aliyun.com/areas_v3/bound/500000_full.json')

export default map