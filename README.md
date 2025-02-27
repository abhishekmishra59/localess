# Localess

The **Localess** helps to store internationalization in form of key-values.
The application is design to be deployed in **Firebase**. 

## Supporting Localess & Lessify Project
Lessify is part of the Lessify Project, is an open source project with its ongoing development made possible entirely by the support of Sponsors.
If you would like to become a sponsor, please consider:

## Firebase

### Create Project
Open Firebase and create a new project

### Create Web App connection
- In [Firebase console](https://console.firebase.google.com/), open **Firebase Settings**
- Go to **Your apps** section
- Select **Web App** icon
  - Fill the **App nickname** field
  - Check **Also set up Firebase Hosting for this app** checkbox
  - Press **Register app**
  - Copy **firebaseConfig** values , as they will be required in [Cloud Build](#cloud-build) section
  - Press **Next**
  - Press **Next** again
  - Copy the **Hosting Site ID**, as it will be required in [Cloud Build](#cloud-build) section
  - Press **Continue to console**

### Authentication
**Firebase** makes Authentication easier for **Localess**. 
Localess needs to identify identity of the users to provide custom experience and keep the data secure.

#### Email/Password
Login by Email and Password is enabled by default.

#### Google Identity Provider
Enable Google as a sign-in method in the Firebase console:
- In the [Firebase console](https://console.firebase.google.com/), open the **Auth** section.
- On the **Sign in method** tab, enable the **Google sign-in** method
- Click **Save**.

In case you limit access only to organization domain, please fill the domain name in [Cloud Build](#cloud-build)

#### Microsoft Identity Provider
To sign in users using Microsoft accounts (Azure Active Directory and personal Microsoft accounts), you must first enable Microsoft as a sign-in provider for your Firebase project:
- In the [Firebase console](https://console.firebase.google.com/), open the **Auth** section.
- On the **Sign in method** tab, enable the **Microsoft** provider.
- Add the **Client ID** and **Client Secret** from that provider's developer console to the provider configuration:
  - To register a Microsoft OAuth client, follow the instructions in [Quickstart: Register an app with the Azure Active Directory v2.0 endpoint](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-register-an-app). Note that this endpoint supports sign-in using Microsoft personal accounts as well as Azure Active Directory accounts. [Learn more](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-overview) about Azure Active Directory v2.0.
  - When registering apps with these providers, be sure to register the ``*.firebaseapp.com`` domain for your project as the redirect domain for your app.
- Click Save.

### Hosting
Open **Hosting** tab to create a default one

### Firestore
Open **Firestore** tab to create a default one

## Deployment

### IAM rights
Add IAM rights to Cloud Builder. Article from official site [here](https://cloud.google.com/build/docs/deploying-builds/deploy-firebase#before_you_begin). 

The **CloudBuild** account (@cloudbuild.gserviceaccount.com) should have next Roles in IAM
- API Keys Admin
- Cloud Build Service Account
- Cloud Functions Developer
- Firebase Admin
- Service Account Use

### Create Firebase Community Builder image
You will need first to create a **Firebase Community Builder**.
Details how to do that you can find [here](https://cloud.google.com/build/docs/deploying-builds/deploy-firebase#using_the_firebase_community_builder) on official GCP site. 

### Configuration
The ``cloudbuild.yaml`` is already preconfigured in the source code.

### Cloud Build
To automatically deploy the latest changes, you will need to create *Cloud Build Trigger* :
- Open Cloud Build Triggers
- On the Create trigger page, enter the following settings:
  - Enter a name for your trigger.
  - Select the repository event : *Push to a branch*.
  - Select the repository : https://github.com/Lessify/localess
  - Specify the `main` branch that will start your trigger. 
  - Select next for Configuration:
    - Type : *Cloud Build configuration file (YAML or JSON)*
    - Location: *Repository*
  - In Advanced you will need to add next Substitution variables, with their related Firebase values:
    - **_LOCALESS_FIREBASE_PROJECT_ID** - firebase project id
    - **_LOCALESS_FIREBASE_APP_ID** - firebase app id
    - **_LOCALESS_FIREBASE_STORAGE_BUCKET** - firebase storage bucket
    - **_LOCALESS_FIREBASE_API_KEY** - firebase api key
    - **_LOCALESS_FIREBASE_AUTH_DOMAIN** - firebase auth domain
    - **_LOCALESS_FIREBASE_MESSAGING_SENDER_ID** - firebase messaging sender id
    - **_LOCALESS_AUTH_CUSTOM_DOMAIN** - sign in custom domain, you can use organization domain (for example, lessify.io). If not provided it will allow all domains.
    - **_LOCALESS_AUTH_PROVIDERS** - Auth providers separated by comma. Available values : GOOGLE and MICROSOFT
- Click Create to save your build trigger.

Errors that may appear during build :
- `functions: missing required API cloudfunctions.googleapis.com. Enabling now...` - Enable **Cloud Functions API** in Marketplace
- `artifactregistry: missing required API artifactregistry.googleapis.com. Enabling now...` - Enable **Artifact Registry** in Marketplace

## Setup
For the first time you will need to go to your project url under the path ``'/setup'`` :

- <firebase-project-id>.web.app/setup
- <firebase-project-id>.firebaseapp.com/setup


## Integration
You will need to know your **Firebase project ID**, **Space ID** and host domain name.

Hosting domain names:
- <firebase-project-id>.web.app
- <firebase-project-id>.firebaseapp.com
- custom domain name

### Angular Transloco
Detailed guid you can find on official [Transloco site](https://ngneat.github.io/transloco/docs/getting-started/installation)
```typescript
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private readonly http: HttpClient) {}

  getTranslation(lang: string): Observable<Translation> {
    return this.http.get<Translation>(`https://<host-domain-name>/api/v1/spaces/<space-id>/translations/${lang}.json`);
  }
}
```

### React-intl
[Official WebSite](https://formatjs.io/docs/react-intl)

### React-i18next
[Official WebSite](https://react.i18next.com/latest/using-with-hooks)

### Vue-intl
[Official WebSite](https://formatjs.io/docs/vue-intl)

### Vue-i18n
[Official WebSite](https://vue-i18n.intlify.dev/guide/advanced/lazy.html)

### Other
For any other libraries, you will need to find a way to have a network call to fetch JSON file with translations.

``
https://<host-domain-name>/api/v1/spaces/<space-id>/translations/<locale>.json
``
