const express = require('express')
var Distance = require('geo-distance');
const app = express()
app.use(express.json())
 
app.post('/nearest/:liketoken', function (req, res) {
if(req.params.liketoken ==='Saitoken44!!*()EGindia')
{
    var nearby_one =[];
    req.body.arrlocations.forEach(element => 
    {
        var distance = Distance.between(req.body.userlocation,element.location)
        nearby_one = nearby_one.concat({lon:element.lon,lat:element.lat,distance:distance.human_readable(),TokenFromFirebaseOrUID:element.uid})
        
    });
    var small = myFunction(nearby_one);
    res.status(200).send(small)
   
}
else{
    res.status(401).send('token is required')
}

})

function myFunction(justPrices) {
    var i = 0;
    var element =justPrices[0]
    var smallestNumber = justPrices[0].distance;
    for(i = 0; i < justPrices.length; i++) {
        if(justPrices[i].distance < smallestNumber) {
            smallestNumber = justPrices[i];
            element = justPrices[i]
        }
    }
    return element;
}
app.listen(3000)