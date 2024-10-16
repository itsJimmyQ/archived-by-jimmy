const { v4: uuidv4 } = require('uuid');
const contentful = require('contentful-management');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
});

const LOCALE = 'en-US';
const LIMIT = 200;

// This API call will request a space with the specified ID
client.getSpace(process.env.CONTENTFUL_SPACE_ID).then((space) => {
  // This API call will request an environment with the specified ID
  space.getEnvironment('master').then(async (environment) => {
    const { items: existingEntries } = await environment.getEntries({
      content_type: 'image',
      limit: LIMIT,
    });
    const mediaAssets = await environment
      .getAssets({
        limit: LIMIT,
      })
      .then((assets) => {
        return assets.items;
      });
    const newAssets = mediaAssets.filter((asset) => {
      return !existingEntries.find((entry) => entry.fields.asset[LOCALE].sys.id === asset.sys.id);
    });

    console.log(existingEntries.length);

    if (newAssets.length === 0) {
      console.info('No new assets found.');
      return;
    }

    console.info(`${newAssets.length} new assets found.`);
    let amountEntryCreated = 0;

    for (asset of newAssets) {
      const { fields } = asset;
      const assetId = asset.sys.id;
      const assetDimensions = fields.file[LOCALE].details.image;
      const orientation = getAssetOrientation(assetDimensions);

      const createdEntry = await createEntry(environment, assetId, orientation);
      const newAmount = amountEntryCreated + 1;
      if (createdEntry) {
        amountEntryCreated = newAmount;
        console.log(`Entry #${newAmount} created.`);
      }
      try {
        await createdEntry.publish();
        console.log(`Entry #${newAmount} published.`);
      } catch (e) {
        console.error(e);
      }
    }

    console.log(`Total ${amountEntryCreated} entries created.`);
  });
});

const createEntry = (environment, assetId, orientation) => {
  return environment.createEntry('image', {
    fields: {
      title: {
        [LOCALE]: uuidv4(),
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
};

const getAssetOrientation = (dimensions) => {
  if (dimensions.width === dimensions.height) return 'Square';

  return dimensions.width > dimensions.height ? 'Landscape' : 'Portrait';
};
