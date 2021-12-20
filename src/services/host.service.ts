import { ResponseData } from '../interface/response.interface';
import boom from '@hapi/boom';


export const fetchHost = async (): Promise<ResponseData> => {
  try {
    // login api

    // fetchHost
    const hosts = {
      items: [
        {
        "jsonrpc": "2.0",
        "method": "host.get",
        "params": {
            "output": [
                "hostid",
                "host"
            ],
            "selectInterfaces": [
                "interfaceid",
                "ip"
            ]
        },
        "id": 2,
        "auth": "0424bd59b807674191e7d77572075f33"
      },
      {
        "jsonrpc": "2.0",
        "method": "host.get",
        "params": {
            "output": [
                "hostid",
                "host"
            ],
            "selectInterfaces": [
                "interfaceid",
                "ip"
            ]
        },
        "id": 2,
        "auth": "0424bd59b807674191e7d77572075f33"
      }
    ]
    };

    
    return { statusCode: 200, message: 'Ok', data: hosts };
  } catch(err) {
    throw boom.internal();
  }
}