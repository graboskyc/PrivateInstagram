// Try running in the console below.

exports = async function(payload,response) {
  var conn = context.services.get("mongodb-atlas").db("ig").collection("media");
  var doc = await conn.findOne({cva:{$exists:false},type:"picture"});

  const httpService = context.services.get("cva");
  
  var uri = "https://eastus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description,Tags&language=en";
  var data = {"url":context.values.get("azureBlobStore")+doc.path};
  
  var args = {"url":uri, "headers": {"Content-Type":["application/json"] , "Ocp-Apim-Subscription-Key":[context.values.get("cvaAccessKey")]}, "body":data, "encodeBodyAsJSON":true};
  
  var cvaresult = httpService.post(args, {"encodeBodyAsJSON":true});
  
  var res = await cvaresult;
  
  conn.updateOne({_id:doc._id},{$set: {cva: JSON.parse(res.body.text()), trigger:data.url}});
  
  console.log(doc._id + " " + res);
  
  response.setHeader("Content-Type", "text/html");
  response.setBody(doc._id + " " + res);
  
};
