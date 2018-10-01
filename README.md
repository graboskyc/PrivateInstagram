# Private Instagram
## Background
See an example at [ig.gsky.us](http://ig.gsky.us)

## Getting Data
* In your instagram settings, there is a button to export your data. This can take up to a few days. However once exported, unzip the file they send you.
* Move the `photos` and `videos` directories as-is into the `assets` directory
* Edit the `media.json` file they give you. Later I will look at making a script for this but you want one media file per line and a new field called `type` which is either `picture` or `video`
* import this into database called `ig` in collection called `media`

## Stitch
* Set up stitch. You want to create a rule for anonymous read-only to the `ig.media` collection
* modify `index.html` and `media.html` to use your database path and your details for Disqus