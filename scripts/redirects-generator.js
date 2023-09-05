/* eslint-disable no-param-reassign */
const { default: axios } = require('axios');
const fs = require('fs');
const { isWhiteLabelAcademy, WHITE_LABEL_ACADEMY } = require('./_utils');
const { getAsset } = require('./sitemap-generator/requests');
require('dotenv').config({
  path: '.env.production',
});

const BREATHECODE_HOST = process.env.BREATHECODE_HOST || 'https://breathecode-test.herokuapp.com';

const redirectConfig = {
  permanent: true,
};

const mapDifficulty = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'junior':
      return 'easy';
    case 'semi-senior':
      return 'intermediate';
    case 'senior':
      return 'hard';
    default:
      return 'unknown';
  }
};

const getEvents = () => {
  const data = axios.get(`${BREATHECODE_HOST}/v1/events/all`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return data;
};

const getAliasRedirects = async () => {
  const data = axios.get(`${BREATHECODE_HOST}/v1/registry/alias/redirect?academy=${WHITE_LABEL_ACADEMY}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error('Error getting alias redirects', err);
    });

  return data;
};

const redirectByLang = ({ slug, lang, difficulty, assetType }) => {
  const assetTypeValue = assetType?.toUpperCase();
  if (assetTypeValue === 'EVENT') {
    return {
      source: `/workshops/${slug}`,
      destination: `/${lang}/workshops/${slug}`,
      ...redirectConfig,
    };
  }
  if (assetTypeValue === 'LESSON') {
    return {
      source: `/lesson/${slug}`,
      destination: `/${lang}/lesson/${slug}`,
      ...redirectConfig,
    };
  }
  if (assetTypeValue === 'EXERCISE') {
    return {
      source: `/interactive-exercise/${slug}`,
      destination: `/${lang}/interactive-exercise/${slug}`,
      ...redirectConfig,
    };
  }
  if (assetTypeValue === 'PROJECT' && difficulty) {
    return {
      source: `/interactive-coding-tutorial/${slug}`,
      destination: `/${lang}/interactive-coding-tutorial/${slug}`,
      ...redirectConfig,
    };
  }
  if (assetTypeValue === 'ARTICLE') {
    return {
      source: `/how-to/${slug}`,
      destination: `/${lang}/how-to/${slug}`,
      ...redirectConfig,
    };
  }
  return null;
};

const generateAssetRedirect = (pages, type) => {
  const redirectList = pages.filter((page) => page.lang !== 'us' && page.lang !== 'en' && page.lang !== null)
    .map((page) => {
      const { slug, lang, asset_type: assetType } = page;

      const redirect = redirectByLang({
        slug,
        lang,
        difficulty: assetType?.toUpperCase() === 'PROJECT' ? page?.difficulty?.toLowerCase() : null,
        assetType: assetType || type,
      });
      return redirect;
    });
  return redirectList || [];
};

const generateAliasRedirects = async (redirects, projects) => {
  const list = projects.map((item) => ({
    source: `/project/${item.slug}`,
    type: 'PROJECT-REROUTE',
    destination: `/${item.lang === 'us' ? 'en' : item.lang}/interactive-coding-tutorial/${item.slug}`,
  }));
  const objectToAliasList = await Promise.all(Object.entries(redirects).map(async ([key, value]) => {
    const lang = value.lang === 'us' ? 'en' : value.lang;
    const getConnector = async () => {
      if (value.type === 'PROJECT') return 'interactive-coding-tutorial';
      if (value.type === 'LESSON') return 'lesson';
      if (value.type === 'EXERCISE') return 'interactive-exercise';
      if (value.type === 'ARTICLE' || value.type === 'QUIZ') return 'how-to';
      return null;
    };

    const connector = await getConnector();

    return ({
      source: `/${connector}/${key}`,
      type: value.type,
      destination: `/${lang}/${connector}/${value.slug}`,
    });
  }));
  return [...objectToAliasList, ...list];
};

async function generateRedirect() {
  if (!isWhiteLabelAcademy) {
    console.log('Generating redirects...');

    const lessonsList = await getAsset('LESSON,ARTICLE', { exclude_category: 'how-to,como' });
    const excersisesList = await getAsset('exercise');
    const projectList = await getAsset('project').map((item) => {
      item.difficulty = mapDifficulty(item.difficulty);
      return item;
    });
    const howToList = await getAsset('LESSON,ARTICLE').then(
      (data) => data.filter((l) => l?.category?.slug === 'how-to' || l?.category?.slug === 'como'),
    );

    const eventList = await getEvents();
    const aliasRedirectList = await getAliasRedirects();

    const lessonRedirectList = generateAssetRedirect(lessonsList);
    const excersisesRedirectList = generateAssetRedirect(excersisesList);
    const projectRedirectList = generateAssetRedirect(projectList);
    const howToRedirectList = generateAssetRedirect(howToList);
    const eventRedirectList = generateAssetRedirect(eventList, 'EVENT');

    const aliasRedirectionList = await generateAliasRedirects(aliasRedirectList, projectList)
      .then((redirects) => redirects);
      // .filter((item) => !item.destination?.includes(item?.source))

    const redirectJson = [
      ...lessonRedirectList,
      ...excersisesRedirectList,
      ...projectRedirectList,
      ...howToRedirectList,
      ...eventRedirectList,
    ];

    fs.writeFileSync('public/redirects-from-api.json', JSON.stringify(redirectJson, null, 2));
    fs.writeFileSync('public/alias-redirects.json', JSON.stringify(aliasRedirectionList, null, 2));

    console.log('Redirects generated!');
  } else {
    console.log('Redirects not generated, in white label academy');
  }
}
generateRedirect();
