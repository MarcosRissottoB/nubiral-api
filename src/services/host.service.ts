import axios, { AxiosResponse } from 'axios';
import { ResponseData } from '../interface/response.interface';

const ZABBIX_URL = process.env.ZABBIX_URL;

const Zabbixlogin = async (): Promise<AxiosResponse> => {
  const ZABBIX_USER = process.env.ZABBIX_USER;
  const ZABBIX_PASS = process.env.ZABBIX_PASS;
  return await axios.post(`${ZABBIX_URL}/user/login`, {
      jsonrpc: '2.0',
      method: 'user.login',
      params: {
          username: ZABBIX_USER,
          password: ZABBIX_PASS
      },
      id: 1
    },{
      headers: {
        contentType: 'application/json-rpc'
      },
    }
  )
}

export const fetchHost = async (): Promise<ResponseData> => {
  const {data} = await Zabbixlogin();
  const auth = data.result;
  return await axios.post(`${ZABBIX_URL}/host/get`,{
    jsonrpc: '2.0',
    method: 'host.get',
    params: {
        filter: {
            host: [
                'Zabbix server',
                'Linux server'
            ]
        }
    },
    auth,
    id:1
  })
}