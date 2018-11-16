// Try running in the console below.

exports = async function(payload,response) {
  var conn = context.services.get("mongodb-atlas").db("ig").collection("media");
  var doc = await conn.findOne({rek:{$exists:false},type:"picture"});

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
    response.setHeader("Content-Type", "text/html");
    response.setBody(doc._id + " " + res);
  } catch (error) {
    response.setHeader("Content-Type", "text/html");
    response.setBody(JSON.stringify(error));
  }
  
};
