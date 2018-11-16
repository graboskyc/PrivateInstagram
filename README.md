# Private Instagram
## Background
See an example at [ig.gsky.us](http://ig.gsky.us)

This is a simple website demonstrating MongoDB Atlas, MongoDB Stitch, Azure Cognitive Vision API, and AWS Rekognition.

Basically it was orginally an export of Instagram (see below) loaded into MongoDB Atlas then building a grid of those images using Stitch Query Anywhere. Now extra functionality exists such that there is a Stitch REST API that accepts uploads from a mobile app to upload new photos to Azure Blob Storage, store the record in the MongoDB DB, then use Stitch Triggers to automatically call the Cognitive Vision and Rekognition APIs to discover what the photo is a picture of.

![](SS/FC01.png)

## Getting Data
* In your instagram settings, there is a button to export your data. This can take up to a few days. However once exported, unzip the file they send you.
* Move the `photos` and `videos` directories as-is into the `assets` directory
* Edit the `media.json` file they give you. Later I will look at making a script for this but you want one media file per line and a new field called `type` which is either `picture` or `video`
* import this into database called `ig` in collection called `media`

## Stitch
* Set up stitch. You want to create a rule for anonymous read-only to the `ig.media` collection
* modify `index.html` and `media.html` to use your database path and your details for Disqus

# Screenshots
## Mobile App
![](SS/SS01.png)

## Web Site (Stitch Query Anywhere)
![](SS/SS02.png)

![](SS/SS03.png)