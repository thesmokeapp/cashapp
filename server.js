const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const { Client, Environment } = require('square');


const client = new Client({
  environment: Environment.Sandbox,
  accessToken: 'EAAAEIYxxvL05a-aAz9-I6GafUpwQa0omZxANgSQh820SkYcxcPs-HTS14RxAoMy',
})
const paymentsApi = client.paymentsApi;

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));




app.post('/smokePaymentRequest', (req,res) => {
  const body = {
    sourceId: req.body.sourceId,
    idempotencyKey: req.body.idempotencyKey,
    amountMoney: {
      amount: req.body.amount?req.body.amount:1,
      currency: 'USD'
    },
    customerId: req.body.customerId,
    shippingAddress: {
      addressLine1: req.body.addressLine1?req.body.addressLine1:'',
      addressLine2: req.body.addressLine2?req.body.addressLine2:'',
      addressLine3: req.body.addressLine3? req.body.addressLine3: 'address line3',
      postalCode: req.body.postalCode?req.body.postalCode:'355',
      country: req.body.country?req.body.country: 'JP'
    }
  };

paymentsApi.createPayment(body).then(response => {
  res.send(response.result);

}).catch(error=> {
   res.send(error);
})
})


app.use(function(err, req, res, next) {
        res.status(err.status || 500).json({ message: err.message });
      });
      
app.listen(port);
