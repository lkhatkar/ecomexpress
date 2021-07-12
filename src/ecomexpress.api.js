const fetch = require('node-fetch');
const routes = require('express').Router();
const {gzip, ungzip} = require('node-gzip');
const decompressResponse = require('decompress-response');

async function expost(api, data){
    const url = process.env.ECOMEXPRESS_URL + api;
    let res = null;
    try{
        res = await fetch(url,
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                method: "post",
                body: new URLSearchParams(data)
            });

        if(res.headers.contentType == 'Gunzip'){
            res = decompressResponse(res.body);
        }

        res = await res.json();
        
    }catch(ex){
        console.log(ex);
        res = {success: false, message: ex};
    }

    console.log(res);
    return res;
    
}

routes.get('/pincodes', async (req, res) => {
    const api = process.env.PINCODE_SERVICEABLE_API;
    const payload = {username: process.env.API_USERNAME, password: process.env.API_PASSWORD};
    const data = await expost(api, payload);
    res.status(200).send(data);
})
routes.get('/fetch_awb', async (req, res) => {
    const api = process.env.FETCH_WAYBILL_API;
    const payload = {username: process.env.API_USERNAME, password: process.env.API_PASSWORD};
    const data = await expost(api, payload);
    res.status(200).send(data);
})
routes.get('/manifest_awb/:count/:type', async (req, res) => {
    const api = process.env.FORWARD_MANIFEST_API;
    const payload = {username: process.env.API_USERNAME, password: process.env.API_PASSWORD, count:req.params.count || 5, type: req.params.type || 'COD'};
    const data = await expost(api, payload);
    res.status(200).send(data);
})
routes.get('/manifest_awb_rev_v2', async (req, res) => {
    const api = process.env.REV_MANIFEST_API;
    const payload = {
        username: process.env.API_USERNAME, 
        password: process.env.API_PASSWORD,
        AWB_NUMBER: req.params.AWB_NUMBER,
        ORDER_NUMBER: req.params.ORDER_NUMBER,
        PRODUCT: req.params.PRODUCT,
        CONSIGNEE: req.params.CONSIGNEE,
        CONSIGNEE_ADDRESS1: req.params.CONSIGNEE_ADDRESS1,
        CONSIGNEE_ADDRESS2: req.params.CONSIGNEE_ADDRESS2,
        CONSIGNEE_ADDRESS3: req.params.CONSIGNEE_ADDRESS3,
    };
    const data = await expost(api, payload);
    res.status(200).send(data);
})
routes.get('/track_me/mawbd', async (req, res) => {
    const api = process.env.TRACKING_API;
    const payload = {username: process.env.API_USERNAME, password: process.env.API_PASSWORD};
    const data = await expost(api, payload);
    res.status(200).send(data);
})
routes.get('/ndr_resolutions', async (req, res) => {
    const api = process.env.NDR_DATA_API;
    const payload = {username: process.env.API_USERNAME, password: process.env.API_PASSWORD};
    const data = await expost(api, payload);
    res.status(200).send(data);
})
routes.get('/cancel_awb', async (req, res) => {
    const api = process.env.SHIPMENT_CANCELLATION_API;
    const payload = {username: process.env.API_USERNAME, password: process.env.API_PASSWORD};
    const data = await expost(api, payload);
    res.status(200).send(data);
})

module.exports = routes;