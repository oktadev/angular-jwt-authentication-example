# Angular Authentication with JWT
 
This example app shows how to build a JWT authentication with Node.js and Angular. It also shows how you can simplify JWT authentication by using Okta.

Please read [Angular Authentication with JWT](https://developer.okta.com/blog/2019/05/16/angular-authentication-jwt) to see how this app was created.

**Prerequisites:** [Java 11](https://sdkman.io/sdks#java) and [Node.js](https://nodejs.org/). 

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/oktadeveloper/angular-jwt-authentication-example.git
cd angular-jwt-authentication-example
```

This will get a copy of the project installed locally. There are a number of directories within this project:

```
jwt-client
jwt-server
okta-client
okta-server
```

If you'd like to run the bare-bones JWT examples (that doesn't use Okta), run `npm install` followed by `npm start` in the `jwt-server` and `jwt-client` directories. Make sure you do this in two separate terminal windows. You should then be able to register and authenticate at `http://localhost:4200`.

To run the Okta examples, you'll first need to create an OIDC app in Okta.

### Create a New OIDC App in Okta

If you don't have an Okta developer account, please [create one](https://developer.okta.com/signup/). Then, create a new OIDC app on Okta:

1. Log in to your developer account, navigate to **Applications** > **Add Application**.
3. Select **Single-Page App** > **Next**. 
4. Give the application a name, change all instances of `https://localhost:8080` to `https://localhost:4200`, and click **Done**.

#### Server Configuration

Set your `issuer` and copy the `clientId` into `okta-server/auth.js`. 

```js
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  clientId: '{yourClientId}'
});
```

**NOTE:** The value of `{yourOktaDomain}` should be something like `dev-123456.okta.com`. Make sure you don't include `-admin` in the value!

#### Client Configuration

For the client, set the `issuer` and copy the `clientId` into `okta-client/src/app/app.module.ts`.

```typescript
const oktaConfig = {
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '{yourClientId}',
  scope: 'openid profile'
}
```

Run `npm install` followed by `npm start` in the `okta-server` and `okta-client` directories. Make sure you do this in two separate terminal windows. You should then be able to authenticate at `http://localhost:4200`.

## Links

This example uses the following open source libraries from Okta:

* [Okta Angular SDK](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-angular#readme)
* [Okta JWT Verifier for Node.js](https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier#readme)

## Help

Please post any questions as commnets on the [blog post](https://developer.okta.com/blog/2019/05/16/angular-authentication-jwt) or ask them on the [Okta Developer Forums](https://devforum.okta.com/). Our whole team monitors this channel and will see your questions. You can also enter them as issues on this project or ask them on Stack Overflow and add the `okta` tag.

## License

Apache 2.0, see [LICENSE](LICENSE).
