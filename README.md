# Currency Converter App

Author: **[@official-carledwardp](https://github.com/official-carledwardfp)**\
Live app: **[currency-converter-carledwardfp.vercel.app](https://currency-converter-carledwardfp.vercel.app)**\
Last updated on: **Oct 3, 2021 8:00PM (+08:00)**

## Description

This is the first challenge from our new and upcoming [Discord server](https://discord.gg/rergxXQfu2). This app will be used to convert 200+ supported currencies from one to another. The "Currency Code" field (ex. USD) follows the standard _ISO 4217 Three Letter Currency Code_ <sup>[1]</sup>. This ensures clarity and reduces errors in any exchange activities.

The app is a _Next.JS_ <sup>[2]</sup> project which utilizes the **SSR** (Server Side Rendering) feature and uses the third-party data fetching service, _SWR_ <sup>[3]</sup> (_Fun Fact! The developers of NextJS also made this service_). This makes sure that data will always be available whenever you use this app.

---

## Try my project!

To run:

1. Clone repository

```bash
git clone https://github.com/official-carledwardfp/currency-converter.git
```

2. Run project

```bash
cd ~path-to/currency-converter
yarn dev
```

A great feature of Nextjs, Server Side Props. This ensures that you will have the currency options on load:

```js
export async function getServerSideProps() {
  let response = await api().get(`api-end-point`)

  return {
    props: {
      currencies: response.currencies || [],
    },
  }
}
```

The use case of SWR in this project is to cache data and make sure that the app will not have duplicate api calls:

```js
const { data } = useSWR(`/api-end-point`)
```

SWR Global config:\
_Documentation for the options can be found [here](https://swr.vercel.app/docs/options)_

```js
<SWRConfig
  value={{
    fetcher: (url) => fetch(url).then((response) => response.json()),
    revalidateOnFocus: false, // Do not revalidate on window refocus
    dedupingInterval: 1000 * 60 * 60 * 24, // 1 day
    onError: errorCallback, // Callback function if there are errors
    errorRetryCount: 2, // Retry limit
  }}
>
  {children}
</SWRConfig>
```

### Styling

CSS Framework used: _Chakra UI_ <sup>[4]</sup>

---

## Limitations

Currently, these are the limitations of this app:

1. The data updates only once a day.
2. The currency name is not returned, only the code (i.e. USD, PHP). It would be better if you can see the currency name alongside the code for a much better user experience.

These limitations can be overcome either by upgrading the plan or by finding another API service which returns the currency name.

---

## References

<sup>[1]</sup> [_ISO 4217 Three Letter Currency Code_](https://www.iso.org/iso-4217-currency-codes.html)\
<sup>[2]</sup> [_Next.JS_](https://nextjs.org)\
<sup>[3]</sup> [_SWR_](https://swr.vercel.app)\
<sup>[4]</sup> [ChakraUI](https://chakra-ui.com/docs/getting-started)

---

## About Me

I'm Carl Edward, a self-taught developer. I started on October 2020 and have been studying, working, and improving since then. I had a 6-month experience in a corporate setting.

### Connect with me

<a href="https://twitter.com/carledwardfp" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="carledwardfp" height="30" width="40" /></a>
<a href="https://linkedin.com/in/carlpahuyo" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="carlpahuyo" height="30" width="40" /></a>
<a href="https://fb.com/carl.pahuyo" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/facebook.svg" alt="carl.pahuyo" height="30" width="40" /></a>

### My Tech Stack

Front-End:

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
</a>
<a href="https://reactjs.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
<a href="https://reactnative.dev/" target="_blank"> <img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="40" height="40"/> </a>
<a href="https://nextjs.org/" target="_blank"> <img src="https://cdn.worldvectorlogo.com/logos/nextjs-3.svg" alt="nextjs" width="40" height="40"/> </a>
<a href="https://www.gatsbyjs.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/gatsbyjs/gatsbyjs-icon.svg" alt="gatsby" width="40" height="40"/> </a>
<a href="https://bulma.io/" target="_blank"> <img src="https://raw.githubusercontent.com/gilbarbara/logos/804dc257b59e144eaca5bc6ffd16949752c6f789/logos/bulma.svg" alt="bulma" width="40" height="40"/> </a>
<a href="https://sass-lang.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/> </a>
<a href="https://tailwindcss.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a>

Back-End:

<a href="https://firebase.google.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" alt="firebase" width="40" height="40"/> </a>
<a href="https://graphql.org" target="_blank"> <img src="https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg" alt="graphql" width="40" height="40"/> </a>
<a href="https://www.mongodb.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a>
<a href="https://www.mysql.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a>

Tools I Use:

<a href="https://www.photoshop.com/en" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg" alt="photoshop" width="40" height="40"/> </a>
<a href="https://postman.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a>
<a href="https://canvasjs.com" target="_blank"> <img src="https://raw.githubusercontent.com/Hardik0307/Hardik0307/master/assets/canvasjs-charts.svg" alt="canvasjs" width="40" height="40"/> </a>
<a href="https://www.chartjs.org" target="_blank"> <img src="https://www.chartjs.org/media/logo-title.svg" alt="chartjs" width="40" height="40"/> </a>
<a href="https://www.figma.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a>

Others:

<a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a>
<a href="https://www.linux.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="linux" width="40" height="40"/> </a>
