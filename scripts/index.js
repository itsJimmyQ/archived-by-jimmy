const { v4: uuidv4 } = require('uuid');
const contentful = require('contentful-management');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  // accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
});

const locale = 'en-US';

// This API call will request a space with the specified ID
client.getSpace(process.env.CONTENTFUL_SPACE_ID).then((space) => {
  // This API call will request an environment with the specified ID
  space.getEnvironment('master').then(async (environment) => {
    const { items: existingEntries } = await environment.getEntries({
      content_type: 'image',
    });

    const mediaAssets = await environment
      .getAssets({
        limit: 1000,
      })
      .then((assets) => {
        console.log(assets);
        return assets.items;
      });

    console.info(`${mediaAssets.length} assets found.`);

    mediaAssets.forEach((asset) => {
      const { fields } = asset;
      const assetId = asset.sys.id;
      const assetDimensions = fields.file[locale].details.image;
      const orientation = getAssetOrientation(assetDimensions);

      const isAssetAlreadyInEntries = existingEntries.find(
        (entry) => entry.fields.asset[locale].sys.id === assetId,
      );

      if (!isAssetAlreadyInEntries) {
        setTimeout(
          () =>
            environment
              .createEntry('image', {
                fields: {
                  title: {
                    [locale]: uuidv4(),
                  },
                  asset: {
                    [locale]: {
                      sys: {
                        type: 'Link',
                        linkType: 'Asset',
                        id: assetId,
                      },
                    },
                  },
                  orientation: {
                    [locale]: orientation,
                  },
                },
              })
              .then((entry) => {
                entry.publish();
              }),
          100,
        );
      }
    });
  });
});

const getAssetOrientation = (dimensions) => {
  if (dimensions.width === dimensions.height) return 'Square';

  return dimensions.width > dimensions.height ? 'Landscape' : 'Portrait';
};
