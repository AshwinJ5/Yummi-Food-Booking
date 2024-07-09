import axios from 'axios'


export const commonAPI=async(httpRequest,url,reqBody,reqHeader)=>{

    const reqConfig={
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
    }
    return await axios(reqConfig).then(
        (result)=>{
            return result
        }
    ).catch((err)=>{
        console.error('API Error:', err.response ? err.response.data : err.message);
        return err.response ? err.response : err;    })
}
