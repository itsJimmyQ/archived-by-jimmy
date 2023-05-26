const contentful = require('contentful-management');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  // accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
});

const LOCALE = 'en-US';

// This API call will request a space with the specified ID
client.getSpace(process.env.SPACE_ID).then((space) => {
  // This API call will request an environment with the specified ID
  space.getEnvironment('master').then(async (environment) => {
    // Now that we have an environment, we can get entries from that space
    // environment.getEntries().then((entries) => {
    //   console.log(entries.items);
    // });

    const mediaAssets = await environment.getAssets().then((assets) => {
      return assets.items;
    });

    mediaAssets.forEach((asset) => {
      const { fields } = asset;
      const assetTitle = asset.fields.title[LOCALE];
      const assetId = asset.sys.id;
      const assetDimensions = fields.file[LOCALE].details.image;
      const orientation = getAssetOrientation(assetDimensions);

      environment.createEntry('image', {
        fields: {
          title: {
            [LOCALE]: assetTitle,
          },
          asset: {
            [LOCALE]: {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: assetId,
              },
            },
          },
          orientation: {
            [LOCALE]: orientation,
          },
        },
      });
    });
  });
});

const getAssetOrientation = (dimensions) => {
  return dimensions.width > dimensions.height ? 'Landscape' : 'Portrait';
};
