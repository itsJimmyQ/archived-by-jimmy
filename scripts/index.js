import { createClient } from 'contentful-management';

const client = createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  // accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  accessToken: 'CFPAT-_22nHgi4OTpBUmSM17ZJ5vxLtMSIOz4kvWGQXoLtHdI',
});

const LOCALE = 'en-US';

// This API call will request a space with the specified ID
client.getSpace('685js46qz33p').then((space) => {
  // This API call will request an environment with the specified ID
  space.getEnvironment('master').then(async (environment) => {
    // Now that we have an environment, we can get entries from that space
    environment.getEntries().then((entries) => {
      console.log(entries.items);
    });

    const mediaAssets = await environment.getAssets().then((assets) => {
      return assets.items;
    });

    mediaAssets.forEach((asset) => {
      const assetEntryTitle = asset.fields.title[LOCALE];
      const assetEntryId = asset.sys.id;

      environment.createEntry('image', {
        fields: {
          title: {
            [LOCALE]: assetEntryTitle,
          },
          asset: {
            [LOCALE]: {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: assetEntryId,
              },
            },
          },
          orientation: {
            [LOCALE]: 'Landscape',
          },
        },
      });
    });

    // // let's get a content type
    // environment.getContentType('image').then((contentType) => {
    //   console.log(contentType)
    //   // // and now let's update its name
    //   // contentType.name = 'New Product'
    //   // contentType.update().then((updatedContentType) => {
    //   //   console.log('Update was successful')
    //   // })
    // })
  });
});
