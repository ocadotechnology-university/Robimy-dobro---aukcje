
<h1 align="center" style="font-weight: bold;">Robimy Dobro Aukcje</h1>

<p align="center">
<a href="#tech">Technologies</a>
<a href="#started">Getting Started</a>
<a href="#docker">Running</a>
<a href="#colab">Collaborators</a>

</p>


<p align="center">Simple description of what your project do or how to use it</p>


<p align="center">
<a href="https://github.com/ocadotechnology-university/Robimy-dobro---aukcje/">📱 Visit this Project</a>
</p>

<h2 id="technologies">💻 Technologies</h2>

- java
- nodejs
- npm
- maven
- mockito
- junit

<h2 id="started">🚀 Getting started</h2>

<h3>Prerequisites</h3>

- [Java](https://www.oracle.com/java/technologies/downloads/)
- [Docker](https://www.docker.com/)
- [NodeJs](https://nodejs.org/en/download)

<h3>Cloning</h3>
```bash
git clone https://github.com/ocadotechnology-university/Robimy-dobro---aukcje.git
```

<h2 id="running">Running the project</h2>

<h3>Set Up</h3>

All things below need to be set up to get the service running correctly

<h4>1. Google cloud console setup</h4>

Firstly you need to create **google service account** for this follow these steps:
- Go to the [Service Accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts)
- Select your project
- Click the service account name to open its details (if you don't have one create by clicking **"Create service account"**)
- Copy the **email** to clipboard

**2. Google sheets setup**
- Go to the [Google sheets page](https://docs.google.com/spreadsheets/u/0/)
- Select desired sheet or create a new one and open it
- Click **Share** and put in the copied service account email
- Set editing rights for this email

**3. Google drive setup**
- Go to the [Google drive page](https://drive.google.com/drive/u/1/my-drive)
- Select desired drive or create a new one and open it
- Click **Manage access** and put in the copied service account email
- Set editing rights for this email

**4. OAuth2.0 google client setup**
- Go to the [Credentials page](https://console.cloud.google.com/apis/credentials)
- Select your project in right left corner
- Click the OAuth 2.0 Client id (if you don't have one create by clicking **"Create credentials -> OAuth Client ID"**)
- Put frontend server URIs inside **"Authorized JavaScript origins"**
- Put frontend server redirect URI with `/login/oauth2/code/google` added in the end inside **"Authorized redirect URIs"**

<h3 id="docker">🐳 Docker</h3>
<h4>Set Up</h4>

We use docker to start the project. Firstly you need to configure variables inside `docker-compose.yml`, which are shown below:
```bash
...
        args:
        GOOGLE_SHEET_ID: "your_sheet_id"
        GOOGLE_CLIENT_ID: "your_client_id"
        GOOGLE_CLIENT_SECRET: "your_client_secret"
        GOOGLE_DRIVE_FOLDER_ID: "your_folder_id"
...
environment:
      GOOGLE_SHEET_ID: "your_sheet_id"
      GOOGLE_CLIENT_ID: "your_client_id"
      GOOGLE_CLIENT_SECRET: "your_client_secret"
      GOOGLE_DRIVE_FOLDER_ID: "your_folder_id"
volumes:
      - ./path/to/credentials.json:/app/credentials.json:ro
```

<h4 id="env-setup"> 🔑 How to get variables to start docker environment</h4>
---
<h4>Getting `GOOGLE_SHEET_ID`</h4>
- Go to the [Google sheets page](https://docs.google.com/spreadsheets/u/0/)
- Select desired sheet or create a new one and open it
- Go to the search bar and extract the part between /d/ and /edit
- For example in link
  - `https://docs.google.com/spreadsheets/d/1V9CZ4xpPTK62CWPdmU9G-dmbPsBcdp-Uho1Lti1kCLc/edit?gid=0#gid=0`
  - you would extract `1V9CZ4xpPTK62CWPdmU9G-dmbPsBcdp-Uho1Lti1kCLc`
---
<h4>Getting `GOOGLE_DRIVE_FOLDER_ID`</h4>
- Go to the [Google drive page](https://drive.google.com/drive/u/1/my-drive)
- Select desired folder or create a new one and open it
- Go to the search bar and extract the part after folder/
- For example in link
  - `https://drive.google.com/drive/u/1/folders/1uMOLYx8nVjSZ9188WtY7WbCsnQvPcTYr`
  - you would extract `1uMOLYx8nVjSZ9188WtY7WbCsnQvPcTYr`

---
<h4>Getting `GOOGLE_CLIENT_ID` and/or `GOOGLE_CLIENT_SECRET`</h4>
**1. Open the Service Account**
- Go to the [Credentials page](https://console.cloud.google.com/apis/credentials)
- Select your project in right left corner
- Click on desired **"OAuth 2.0 Client IDs"** (if you don't have any then create one)

**2. Extract `GOOGLE_CLIENT_ID`**
- Copy **"Client ID"**

**2. Extract `GOOGLE_CLIENT_SECRET`**
- Copy  **"Client secret"**

---
<h4>Getting `credentials.json`</h4>
**1. Open the Service Account**
- Go to the [Service Accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts)
- Select your project
- Click the service account name to open its details

**2. Download the Key**
- Go to the **“Keys”** tab
- Click **“Add Key” → “Create new key”**
- Choose **JSON**
- Click **Create** → your browser will download the `credentials.json` file
- Mount it in Docker like this (for Linux):
  ```bash
  -v path/to/credentials.json:/app/credentials.json

<h3>Running the container</h3>

Go to the terminal and pass in:
```bash
docker-compose up --build
```