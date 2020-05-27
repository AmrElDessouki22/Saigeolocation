const express = require('express')
var Distance = require('geo-distance');
const app = express()
app.use(express.json())
 
app.post('/nearest/:liketoken', function (req, res) {
if(req.params.liketoken === process.env.Sai)
{
    try {
    var nearby_one =[];
    req.body.arrlocations.forEach(element => 
    {
        var distance = Distance.between(req.body.userlocation,element.location)
        nearby_one = nearby_one.concat({lon:element.lon,lat:element.lat,distance:distance.human_readable(),TokenFromFirebaseOrUID:element.uid})
        
    });
    var small = myFunction(nearby_one);
    res.status(200).send(small)
    } catch (error) {
        res.status(404).send(error.message)
    }
   
}
else{
    res.status(401).send('token is required')
}

})

function myFunction(justPrices) {
    var i = 0;
    var element =justPrices[0]
    var smallestNumber = justPrices[0].distance.distance;
    for(i = 0; i < justPrices.length; i++) {
        console.log(justPrices[i].distance.distance);
        if(Number(justPrices[i].distance.distance) < Number(smallestNumber)) {
            console.log(justPrices[i].distance.distance + " : "+smallestNumber);
            
            smallestNumber = justPrices[i].distance.distance;
            element = justPrices[i]
        }
    }
    return element;
}
app.get('/',(req,res)=>
{
    res.send('welcome to Sai geo location')

})

app.listen(process.env.PORT || 3000 )