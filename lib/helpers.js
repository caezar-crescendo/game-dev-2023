import * as contentful from "contentful";
import * as contentfulManagement from "contentful-management";
import _ from "lodash";

const space_id = process.env.NEXT_PUBLIC_SPACE_ID;
const access_token = process.env.NEXT_PUBLIC_DELIVERY_TOKEN;
const preview_token = process.env.NEXT_PUBLIC_PREVIEW_TOKEN;
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
const cma_token = process.env.NEXT_PUBLIC_CMA_TOKEN;

const getOptions = (is_preview) => {
    let options = {};
    options.space = space_id;
    options.host = is_preview ? "preview.contentful.com" : undefined;
    options.accessToken = is_preview ? preview_token : access_token;
    options.environment = environment ? environment : "master";
    options.resolveLinks = true;
    options.cmaToken = cma_token;

    return options;
};

const optionsCMA = getOptions(false);
const CMA = contentfulManagement.createClient({
    accessToken: optionsCMA.cmaToken
});

const clientCMA = CMA.getSpace(optionsCMA.space)
  .then((space) => space.getEnvironment(optionsCMA.environment))

export const getAllLocales = async() => {
    const options = getOptions(false);
    const contentfulClient = contentful.createClient(options);
    try {
        let allLocales = await contentfulClient.getLocales();
        let dataType = _.get(allLocales, "sys.type");
        let items = _.get(allLocales, "items");
        if (dataType === "Array") {
            return items;
        } else {
            return false;
        }
    } catch (error) {
        console.log("getAllLocales error ", error);
    }
};

export const getEntriesByContentType = async(content_type, isPreview = false) => {
    const options = getOptions(isPreview);

    try {
        const contentfulClient = contentful.createClient(options); // https://contentful.github.io/contentful.js/contentful/9.1.9/contentful.html#.createClient
        if (contentfulClient) {
            let customParams = {};

            if (content_type === 'user') {
                customParams = {
                    order: '-fields.points',
                }
            }

            let params = {
                content_type: content_type,
                ...customParams
            }; //include -> to retrieve related data(linked entries) in same request, number of levels is 3

            let entries = await contentfulClient.getEntries(params); // https://contentful.github.io/contentful.js/contentful/9.1.9/ContentfulClientAPI.html#.getEntries

            const items = _.get(entries, "items");

            return { items };
        } else {
            return false;
        }
    } catch (error) {
        console.log("any errors? ->", error);
        return false;
    }
};

export const getEntryByContentType = async() => {
    const options = getOptions(false);
    const contentfulClient = contentful.createClient(options);

    try {
        if (contentfulClient) {
            return await contentfulClient.getEntry("3bN3dORuBMcda03mMpPQlD")
        } else {
            return false;
        }
    } catch (error) {
        console.log("any errors? ->", error);
        return false;
    }
};

export const createEntry = async(fields, contentTypeId) => {
    const options = getOptions(false);
    const client = await contentfulManagement.createClient({
        accessToken: options.cmaToken
    });

    if (client) {
        return await client.getSpace(options.space)
          .then((space) => space.getEnvironment(options.environment))
          .then((environment) => environment.createEntry(contentTypeId, {
              fields: fields
          }))
          .then(async (entry) => {
              await publishEntry(entry.sys.id);
              return entry;
          })
          .catch(console.error)
    } else {
        return false;
    }
}

export const updateUser = async(entry_id, nextPlayer = false, plusPoint = false) => {
    return await clientCMA
        .then((environment) => environment.getEntry(entry_id))
        .then(async(entry) => {
            entry.fields.playerTurn['en-US'] = nextPlayer;
            if (plusPoint) {
                entry.fields.points['en-US'] = entry.fields.points['en-US'] + 1;
            }
            return await entry.update();
        })
        .then(async(entry) => {
            console.log(`Entry ${entry.sys.id} updated.`);
            return await entry.publish()
        })
        .catch(console.error)
}

export const updateGameSettings = async(entry_id, data) => {
    return await clientCMA
        .then((environment) => environment.getEntry(entry_id))
        .then((entry) => {
            entry.fields = {
                ...entry.fields,
                ...data
            };
            return entry.update();
        })
        .then(async(entry) => {
            console.log(`Entry ${entry.sys.id} updated.`);
            entry.publish()
        })
        .catch(console.error)
}

export const updateBlocks = (entry_id, isSelected = false, isPaired = false) => {
    clientCMA
        .then((environment) => environment.getEntry(entry_id))
        .then((entry) => {
            entry.fields.isSelected['en-US'] = isSelected;
            entry.fields.isPaired['en-US'] = isPaired;
            return entry.update();
        })
        .then((entry) => {
            console.log(`Entry ${entry.sys.id} updated.`);
            entry.publish()
        })
        .catch(console.error)
}

export const publishEntry = async (entryId) => {
    return await clientCMA
      .then((environment) => environment.getEntry(entryId))
      .then((entry) => {
          entry.publish();
      })
      .catch(console.error)
}
