# Multiplayer Slider Pub Sub with AWS AppSync

This is a simple project to showcase how you can use an AWS AppSync API to facilitate realtime pub/sub interactions over websockets.

The demo client application (built with React) has two sliders on a web page. Whenever a user updates the value in one of the sliders, the value will get broadcast out to anyone else who has the same page open in their browser, and their slider will update to whatever you set it to. There is no state managed in this application at all; it's just a simple example UI showing how to send data over a GraphQL mutation to an AWS AppSync server and how subscribe to updates in a similar fashion.

## What's it look like?

![Demo GIF](https://raw.githubusercontent.com/gabehollombe-aws/appsync-for-pubsub-demo/gh-pages/docs/MultiplayerSlidersDemo.gif)

## What's going on here?

You can use [AWS AppSync](https://aws.amazon.com/appsync/) as a simple pub/sub system using a pattern called [AppSync Local Resolvers](https://docs.aws.amazon.com/appsync/latest/devguide/tutorial-local-resolvers.html).  This just involves creating a GraphQL mutation that resolves with an AppSync Data Source type of NONE.  Then, you just target that mutation with a subscription, and the data will pass through from the client who issues the mutation to all subscribed clients.

AWS Amplify is a set of tooling and libraries that makes it easier to get started provisioning AWS resources and using them in your apps. This demo uses Amplify to provision the AppSync API and the other required resources to make this all work. To learn more about using AWS Amplify with React, see the [AWS Amplify Tutorial for React](https://docs.amplify.aws/start/q/integration/react).

## How does it work?

Look at `src/App.js` and you'll see a simple React app that uses the `@aws-amplify/api` library to talk to a backend GraphQL server powered by AWS AppSync.

The GraphQL schema is located in `amplify/backend/api/multiplayercounter/schema.graphql`.

We handle creating the `NONE` AppSync Data Source and mapping the `setCounter` mutation appropriately inside `amplify/backend/api/multiplayercounter/stacks/CustomResources.json`. Embedding VTL templates inside a JSON CloudFormation template file is sad, as you have to escape all the quotes. But it's a simple template that just maps our incoming data directly through to the response mapper so it's not so bad.

## How do I deploy and run this demo for myself?

:warning: :warning: :warning: :warning: :warning: :warning: :warning: :warning: :warning: :warning: :warning: :warning:

**Security Note**

This example sets up an AppSync API endpoint that authenticates users with an API key. This approach is not recommended for production deploys. You proabbly want to switch to a different authentication mechanism before you deploy code like this in production. See [AWS AppSync Security](https://docs.aws.amazon.com/appsync/latest/devguide/security.html) for more information.

:warning: :warning: :warning: :warning: :warning: :warning: :warning: :warning: :warning: :warning: :warning: :warning:

### One-Click Deploy with the Amplify Console

Click the button to load the AWS Amplify Console, connect to GitHub and provide an IAM role for the build. The end to end back-end and front-end deployment should take around 5 minutes:

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/gabehollombe-aws/appsync-for-pubsub-demo)

### Get the code and run on my local dev workstation

This project uses AWS Amplify to deploy resources in your account. Assuming you've already instaled and configured the [AWS Amplify CLI](https://docs.amplify.aws/cli), you can run this command to automatically clone this repo, deploy this app in your AWS account, and boot up the local demo dev server:

```
mkdir appsync-for-pubsub-demo
cd appsync-for-pubsub-demo
amplify init --app https://github.com/gabehollombe-aws/appsync-for-pubsub-demo
```
