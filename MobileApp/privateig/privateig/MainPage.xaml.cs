using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Plugin.FilePicker;
using Plugin.FilePicker.Abstractions;
using System.Net;

namespace privateig
{
    public partial class MainPage : ContentPage
    {
        async void Handle_FileClicked(object sender, System.EventArgs e)
        {
            try
            {
                FileData fileData = new FileData();
                fileData = await CrossFilePicker.Current.PickFile();
                if (fileData == null)
                {
                    lbl.Text = "cancelled";
                    return; // user canceled file picking
                }
                else
                {
                    Guid g = Guid.NewGuid();
                    string azurePath = "fromandroid/" + g.ToString() + ".jpg";
                    lbl.Text = fileData.FilePath;
                    await ProcessAsync(fileData.FilePath, azurePath);
                    lbl.Text = "Inserting record...";
                    await pushAtlas(azurePath, txt_cap.Text, txt_loc.Text, txt_tags.Text);
                    lbl.Text = "Complete!";
                }
            }
            catch (Exception ex)
            {
                lbl.Text = ex.ToString();
            }

        }

        private static async Task pushAtlas(string _azurePath, string cap, string loc, string tags) {
            string atlas = "";
            if (cap.Length > 0) { atlas += "&caption=" + cap; }
            if (loc.Length > 0) { atlas += "&location=" + loc; }
            if (tags.Length > 0) { atlas += "&tags=" + tags; }
            atlas += "&type=picture&path=" + _azurePath;
            var webClient = new WebClient();
            webClient.DownloadDataAsync(new Uri(atlas));

        }

        private static async Task ProcessAsync(string _imagePath, string _azurePath)
        {
            CloudStorageAccount storageAccount = null;
            CloudBlobContainer cloudBlobContainer = null;

            string storageConnectionString = "";

            // Check whether the connection string can be parsed.
            if (CloudStorageAccount.TryParse(storageConnectionString, out storageAccount))
            {
                try
                {
                    Guid g = Guid.NewGuid();
                    // Create the CloudBlobClient that represents the Blob storage endpoint for the storage account.
                    CloudBlobClient cloudBlobClient = storageAccount.CreateCloudBlobClient();

                    // Create a container called 'quickstartblobs' and append a GUID value to it to make the name unique. 
                    //cloudBlobContainer = cloudBlobClient.GetContainerReference("quickstartblobs" + Guid.NewGuid().ToString());
                    cloudBlobContainer = cloudBlobClient.GetContainerReference("media");

                    // Set the permissions so the blobs are public. 
                    BlobContainerPermissions permissions = new BlobContainerPermissions
                    {
                        PublicAccess = BlobContainerPublicAccessType.Blob
                    };
                    await cloudBlobContainer.SetPermissionsAsync(permissions);

                    // Get a reference to the blob address, then upload the file to the blob.
                    // Use the value of localFileName for the blob name.
                    CloudBlockBlob cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(_azurePath);
                    await cloudBlockBlob.UploadFromFileAsync(_imagePath);
                    
                }
                catch (StorageException ex)
                {
                    Console.WriteLine("Error returned from the service: {0}", ex.Message);
                }
                finally
                {
                }
            }
            else
            {
            }
            string test = "";
        }

        public MainPage()
        {
            InitializeComponent();
        }
    }
}
