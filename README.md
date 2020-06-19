# Multiplayer Counter Pub Sub Demo

This is a simple project to showcase how you can use an AWS AppSync Local Resolver (also known as a NONE Data Source type) to get simple broadcast pub/sub over websockets. The client code is built in React.

The demo application just shows two numeric input boxes on a web page. Whenever a user updates the value in one of the boxes, the value will get broadcast out to anyone else who has the same page open in their browser, and their value will update to whatever you set it to. There is no state managed in this application at all; it's just a simple example UI showing how to send data over a GraphQL mutation to an AWS AppSync server and how subscribe to updates in a similar fashion.

## What's it look like?

![Demo GIF](https://raw.githubusercontent.com/gabehollombe-aws/appsync-for-pubsub-demo/gh-pages/docs/MultiplayerSlidersDemo.gif)

## What's going on here?

You can use AWS AppSync as a simple pub-sub system using something called [AppSync Local Resolvers](https://docs.aws.amazon.com/appsync/latest/devguide/tutorial-local-resolvers.html).  This pattern just involves creating a Request/Resolver mapping for a mutation that uses an AppSync Data Source type of NONE.  Then, you just map that mutation to a subscription, and the data will pass through from the client who issues the mutation to all subscribed clients.

AWS Amplify is a set of tooling and libraries that makes it easier to get started provisioning AWS resources and using them in your apps. This demo uses Amplify to provision the AppSync API and the other required resources to make this all work.

## How does it work?

Look at `src/App.js` and you'll see a simple React app that uses the `@aws-amplify/api` library to talk to a backend GraphQL server powered by AWS AppSync.

The GraphQL schema is located in `amplify/backend/api/multiplayercounter/schema.graphql`.

We handle creating the `NONE` AppSync Data Source and mapping the `setCounter` mutation appropriately inside `amplify/backend/api/multiplayercounter/stacks/CustomResources.json`. Embedding VTL templates inside a JSON CloudFormation template file is sad, as you have to escape all the quotes. But it's a simple template that just maps our incoming data directly through to the response mapper so it's not so bad.

## How do I run the demo?

Assuming you've already instaled and configured the AWS Amplify CLI, you can run this command to automatically clone this repo, deploy this app in your AWS account, and boot up the local demo dev server:

```
mkdir appsync-for-pubsub-demo
cd appsync-for-pubsub-demo
amplify init --app https://github.com/gabehollombe-aws/appsync-for-pubsub-demo
```
