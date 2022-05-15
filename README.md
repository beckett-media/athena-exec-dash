### 1. How to Run it

Production ready! 

To run this code, you need to follow the steps below:
- start by steeign up amplify on your local machine: Follow Links for how to do that https://docs.amplify.aws/cli/start/install/

- When you done run amplify pull rom the root of your project, and follow the steps on the console to create update and run  the app.

- You can  can publish the app to the cloud by running the following command: `amplify publish`


Make sure you have **npm/yarn** installed. This project use ❯ yarn --version 1.22.17 & ❯ node --version v16.11.0

**Reference** - https://classic.yarnpkg.com/lang/en/docs/install/#mac stable

Now you're all set up. Navigate your way into the project's directory and write `npm install` or `yarn install`. This will install all the dependencies that the **Beckett Exec. Dashboard** needs to function correctly. Enter `yarn start` in your terminal to launch the project.
(This project was built with yarn) 👀

### 2. Potential Error

If everything works as planned 🤞 with no errors, you can skip this section. Others wise, you most likely ran into the node-sass error. Please remain calm 😌. Building node-sass using node 16 is supported only for node-sass versions 6.0+ and above. Essentially, node 16 can only build node-sass 6.0+, details here https://github.com/sass/node-sass, version support policy. to fix it, try this First remove node-sass: `yarn remove node-sass` If you use npm:
`npm uninstall node-sass` Then install sass instead of node-sass:
`yarn add -D sass` or `npm i -D sass` Finally, The SCSS and Sass will compile your SCSS and Sass files correctly. If you still have a problem, shoot me an email: christian@plainspokendigital.com.


### 3. Project packages

These are the main **dependencies** used inside **Beckett Exec. Dashboard**:

```json
        "@chakra-ui/icons": "^1.1.1",
        "@chakra-ui/react": "^1.7.4",
        "@emotion/react": "^11.7.1",
        "@emotion/styled": "^11.6.0",
        "@testing-library/jest-dom": "^5.16.1",
        "@testing-library/react": "^12.1.2",
        "@testing-library/user-event": "^13.5.0",
        "body-scroll-lock": "^4.0.0-beta.0",
        "classnames": "^2.2.6",
        "date-fns": "^2.25.0",
        "draft-js": "^0.11.7",
        "framer-motion": "^5.6.0",
        "moment": "^2.29.1",
        "node-sass": "^7.0.1",
        "react": "^17.0.2",
        "react-datepicker": "^4.2.1",
        "react-div-100vh": "^0.7.0",
        "react-dnd": "14.0.2",
        "react-dnd-html5-backend": "14.0.0",
        "react-dom": "^17.0.2",
        "react-draft-wysiwyg": "^1.14.7",
        "react-icons": "^4.3.1",
        "react-outside-click-handler": "^1.3.0",
        "react-range": "^1.8.11",
        "react-responsive": "^9.0.0-beta.4",
        "react-router-dom": "^6.2.1",
        "react-scripts": "5.0.0",
        "react-share": "^4.4.0",
        "react-slick": "^0.28.1",
        "react-table": "^7.7.0",
        "react-tag-input": "^6.8.0",
        "react-tooltip": "^4.2.21",
        "react-tradingview-widget": "^1.3.2",
        "recharts": "^2.1.2",
        "sass": "1.32.8",
        "styled-components": "^5.3.3",
        "use-dark-mode": "^2.3.1",
        "web-vitals": "^2.1.4"

```

### 4 Project 3rd party tools

**Recharts** - https://recharts.org/en-US/
Recharts is a Redefined chart library built with React and D3.
This library's primary purpose is to help you write charts in React applications without any pain. The main principles of Recharts are:
Deploy with React components.
Native SVG support, lightweight depending only on some D3 submodules.
Declarative components, components of charts are purely presentational.

**Chakra UI** - https://chakra-ui.com/docs/getting-started
Chakra UI provides a set of accessible, reusable, and composable React components that make it super easy to create websites and apps.
Ease of Styling: Chakra UI contains a set of layout components like Box and Stack that make it easy to style your components by passing props. Learn more
Flexible & composable: Chakra UI components are built on a React UI Primitive for endless composability.
Accessible. Chakra UI components follow the WAI-ARIA guidelines and have the proper aria-\* attributes.
Dark Mode 😍: Most components in Chakra UI are dark mode compatible.

**_ React Router (v6)_** -https://reactrouterdotcom.fly.dev/
React Router is a lightweight, fully-featured routing library for the React JavaScript library. React Router runs everywhere that React runs; on the web, on the server (using node.js), and on React Native. If you're new to React Router, we recommend starting with the getting started guide.



### 5. Project structure

```
├─ src
│  ├─ .babelrc
│  ├─ App.js
│  ├─ assets
│  ├─ components
│  │  ├─ Card
│  │  │  ├─ Card.module.sass
│  │  │  └─ index.js
│  │  ├─ Header
│  │  │  ├─ Header.module.sass
│  │  │  ├─ Logo
│  │  │  │  ├─ LogoHeader.module.sass
│  │  │  │  └─ index.js
│  │  │  └─ index.js
│  │  ├─ Icon.js
│  │  ├─ Image.js
│  │  ├─ Modal
│  │  │  ├─ Modal.module.sass
│  │  │  └─ index.js
│  │  ├─ Page
│  │  │  ├─ Page.module.sass
│  │  │  └─ index.js
│  │  ├─ PercentOfPostPerWeek
│  │  │  ├─ PercentOfPostPerWeek.module.sass
│  │  │  └─ index.js
│  │  ├─ Sidebar
│  │  │  ├─ Sidebar.module.sass
│  │  │  └─ index.js
│  │  ├─ Switch
│  │  │  ├─ Switch.module.sass
│  │  │  └─ index.js
│  │  ├─ Theme
│  │  │  ├─ Theme.module.sass
│  │  │  └─ index.js
│  │  ├─ Tooltip
│  │  │  ├─ Tooltip.module.sass
│  │  │  └─ index.js
│  │  └─ TooltipGlodal
│  │     ├─ TooltipGlodal.module.sass
│  │     └─ index.js
│  ├─ index.js
│  ├─ mocks
│  │  ├─ market.js
│  │  ├─ reports.js
│  │  └─ socialMessage.js
│  ├─ screens
│  │  ├─ Home
│  │  │  ├─ BeckettDash.module.sass
│  │  │  ├─ GradedVsReceivedGraph
│  │  │  │  ├─ GradedVsReceivedGraph.module.sass
│  │  │  │  └─ index.js
│  │  │  ├─ GradingCards
│  │  │  │  ├─ Chart
│  │  │  │  │  ├─ Chart.module.sass
│  │  │  │  │  └─ index.js
│  │  │  │  ├─ Overview.module.sass
│  │  │  │  └─ index.js
│  │  │  ├─ ReceivedChart
│  │  │  │  ├─ ReceivedChart.module.sass
│  │  │  │  └─ index.js
│  │  │  └─ index.js
│  │  ├─ MarketAnalysis
│  │  │  ├─ CardBottom
│  │  │  │  ├─ CardBottom.module.sass
│  │  │  │  └─ index.js
│  │  │  ├─ CardTop
│  │  │  │  ├─ CardTop.module.sass
│  │  │  │  └─ index.js
│  │  │  ├─ CompanySales
│  │  │  │  ├─ CampanySales.module.sass
│  │  │  │  └─ index.js
│  │  │  ├─ MarketAnalysis.module.sass
│  │  │  ├─ Products
│  │  │  │  ├─ Market
│  │  │  │  │  ├─ Market.module.sass
│  │  │  │  │  ├─ Row
│  │  │  │  │  │  ├─ Row.module.sass
│  │  │  │  │  │  └─ index.js
│  │  │  │  │  └─ index.js
│  │  │  │  ├─ PriceTicker.js
│  │  │  │  └─ Products.module.sass
│  │  │  ├─ Table
│  │  │  │  ├─ Table.module.sass
│  │  │  │  └─ index.js
│  │  │  ├─ TopCountries
│  │  │  │  ├─ TopCountries.module.sass
│  │  │  │  └─ index.js
│  │  │  └─ index.js
│  │  ├─ Reports
│  │  │  ├─ ReportScreen.module.sass
│  │  │  ├─ Row
│  │  │  │  ├─ Details
│  │  │  │  │  ├─ Details.module.sass
│  │  │  │  │  ├─ Parameter
│  │  │  │  │  │  ├─ Parameter.module.sass
│  │  │  │  │  │  └─ index.js
│  │  │  │  │  └─ index.js
│  │  │  │  ├─ Row.module.sass
│  │  │  │  └─ index.js
│  │  │  └─ index.js
│  │  └─ SocialMediaMetric
│  │     ├─ Overview
│  │     │  ├─ Chart
│  │     │  │  ├─ Chart.module.sass
│  │     │  │  └─ index.js
│  │     │  ├─ PostPerWeekGraph.module.sass
│  │     │  └─ index.js
│  │     ├─ Sentiment
│  │     │  ├─ SentimentAnalysis.js
│  │     │  └─ SentimentAnalysis.module.sass
│  │     ├─ SocialMediaMetric.module.sass
│  │     ├─ SocialMessage
│  │     │  ├─ Item
│  │     │  │  ├─ Control
│  │     │  │  │  ├─ Control.module.sass
│  │     │  │  │  └─ index.js
│  │     │  │  ├─ Item.module.sass
│  │     │  │  └─ index.js
│  │     │  ├─ List.module.sass
│  │     │  └─ index.js
│  │     ├─ TopCountry
│  │     │  ├─ TopCountry.module.sass
│  │     │  └─ index.js
│  │     ├─ TopDevice
│  │     │  ├─ TopDevice.module.sass
│  │     │  └─ index.js
│  │     ├─ TrafficChannel
│  │     │  ├─ TrafficChannel.module.sass
│  │     │  └─ index.js
│  │     └─ index.js
│  ├─ styles
│  │  ├─ app.sass
│  │  ├─ blocks
│  │  │  ├─ button.sass
│  │  │  ├─ container.sass
│  │  │  ├─ datepicker.scss
│  │  │  ├─ editor.sass
│  │  │  ├─ headers.sass
│  │  │  ├─ panel.sass
│  │  │  ├─ reactTags.sass
│  │  │  ├─ slick.sass
│  │  │  ├─ status.sass
│  │  │  └─ title.sass
│  │  ├─ common.sass
│  │  ├─ helpers.sass
│  │  └─ reset.sass
│  └─ utils.js
└─ yarn.lock

```# Exec-dash
# Prod-Dashboard
# Exec-Dash
# prod-exec-dash
