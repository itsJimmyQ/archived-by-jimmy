const contentful = require('contentful-management');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

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
    const { items: existingEntries } = await environment.getEntries({
      content_type: 'image',
    });
    const mediaAssets = await environment.getAssets().then((assets) => {
      return assets.items;
    });
    let amountNewEntriesCreated = 0;

    console.info(`${mediaAssets.length} assets found.`);

    mediaAssets.forEach((asset) => {
      const { fields } = asset;
      const assetTitle = asset.fields.title[LOCALE];
      const assetId = asset.sys.id;
      const assetDimensions = fields.file[LOCALE].details.image;
      const orientation = getAssetOrientation(assetDimensions);

      const isAssetAlreadyInEntries = existingEntries.find(
        (entry) => entry.fields.asset[LOCALE].sys.id === assetId,
      );

      if (!isAssetAlreadyInEntries) {
        setTimeout(() => {
          environment
            .createEntry('image', {
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
            })
            .then(() => (amountNewEntriesCreated += 1));
        }, 100);
      }
    });

    console.info(`Created ${amountNewEntriesCreated} new entries.`);
  });
});

const getAssetOrientation = (dimensions) => {
  if (dimensions.width === dimensions.height) return 'Neutral';

  return dimensions.width > dimensions.height ? 'Landscape' : 'Portrait';
};
