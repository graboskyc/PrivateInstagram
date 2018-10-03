// Try running in the console below.
  
exports = function(payload, response) {
    var conn = context.services.get("mongodb-atlas").db("ig").collection("media");
    var d = new Date(Date.now());
    var updateObj = {"query":payload, "taken_at": d, "path": payload.query.path, "type": payload.query.type};
    if(payload.query.hasOwnProperty("filter")) { updateObj.filter = payload.query.filter; }
    if(payload.query.hasOwnProperty("location")) { updateObj.location = payload.query.location; }
    if(payload.query.hasOwnProperty("caption")) { updateObj.caption = payload.query.caption; }
    conn.insertOne(updateObj);
    
    var html="";
    
    html = "Created Record.";
    if(html.length > 1) {
      response.setHeader("Content-Type", "text/html");
      response.setBody(html);
    }
  };