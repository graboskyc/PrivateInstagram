exports = async function(changeEvent) {
  var doc = changeEvent.fullDocument;
  if(doc.type == "picture"){
    var conn = context.services.get("mongodb-atlas").db("ig").collection("media");
    const httpService = context.services.get("cva");
    
    var uri = "https://eastus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description,Tags&language=en";
    var data = {"url":context.values.get("azureBlobStore")+doc.path};
    
    var args = {"url":uri, "headers": {"Content-Type":["application/json"] , "Ocp-Apim-Subscription-Key":[context.values.get("cvaAccessKey")]}, "body":data, "encodeBodyAsJSON":true};
    
    var cvaresult = httpService.post(args, {"encodeBodyAsJSON":true});
    
    var res = await cvaresult;
    
    conn.updateOne({_id:doc._id},{$set: {cva: JSON.parse(res.body.text()), trigger:data.url}});
  }
};
