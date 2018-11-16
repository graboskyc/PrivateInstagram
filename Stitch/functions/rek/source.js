exports = async function(changeEvent) {
  var doc = changeEvent.fullDocument;
  if(doc.type == "picture"){
    var conn = context.services.get("mongodb-atlas").db("ig").collection("media");
    
    const aws = context.services.get('rekognition');
    const httpService = context.services.get("cva");
  
    var uri = context.values.get("azureBlobStore")+doc.path
    var args = {"url":uri, "headers": {"Content-Type":["image/jpeg"]}};
    var req = httpService.get(args);
    var img = await req;
    
    try {
      var awsreq = aws.rekognition().DetectLabels({"Image": {"Bytes":img.body}});
      var res = await awsreq;
      conn.updateOne({_id:doc._id},{$set: {rek: res}});
    } catch (error) {
      console.log(JSON.stringify(error));
    }

  }
    
};
