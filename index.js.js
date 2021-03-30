var express = require('express');
var app = express();
const axios = require('axios');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 40);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        logger.log(new Date().toUTCString(), 'app.use');
        return res.status(200).json({});
    };
    next();
});


app.get('/positions',(request,response) => {
    console.log("req.params",request.query);
    let url='http://jobs.github.com/positions.json?';
    if(request.query.location){
        url=url+`location=${request.query.location}`;
      }
      if(request.query.search){
        url=url+`&search=${request.query.search}`;
      }
      if(request.query.full_time){
        url=url+`&full_time=${!!request.query.full_time}`;
      }
      if(request.query.page){
        url=url+`&page=${request.query.page}`;
      }

    response.setHeader('Content-Type', 'application/json');
    axios.get(url)
        .then((res)=> {
            response.status(200).end(JSON.stringify(res.data));
        })
        .catch(function (error) {
           response.status(500).end(error);
        })
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})
