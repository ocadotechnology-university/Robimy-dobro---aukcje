# **Robimy Dobro Aukcje**

[📱 Visit this Project](https://github.com/ocadotechnology-university/Robimy-dobro---aukcje/)

**Simple description of what your project does or how to use it.**

---

## 🔗 Table of Contents

* [💻 Technologies](#-technologies)
* [🚀 Getting Started](#-getting-started)
* [🐳 Running with Docker](#-running-with-docker)
* [🤝 Collaborators](#-collaborators)

---

## 💻 Technologies

* Java
* Node.js
* npm
* Maven
* Mockito
* JUnit

---

## 🚀 Getting Started

### Prerequisites

* [Java](https://www.oracle.com/java/technologies/downloads/)
* [Docker](https://www.docker.com/)
* [Node.js](https://nodejs.org/en/download)

### Cloning

```bash
git clone https://github.com/ocadotechnology-university/Robimy-dobro---aukcje.git
```

---

## Project Setup

### 1. Google Cloud Console Setup

* Go to the [Service Accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts)
* Select your project
* Click the service account name to open its details (or click **"Create service account"**)
* Copy the **email**

### 2. Google Sheets Setup

* Go to [Google Sheets](https://docs.google.com/spreadsheets/u/0/)
* Create or select a spreadsheet
* Click **Share**, input the service account email, and grant editing rights

### 3. Google Drive Setup

* Go to [Google Drive](https://drive.google.com/drive/u/1/my-drive)
* Create or select a folder
* Click **Manage Access**, input the service account email, and grant editing rights

### 4. OAuth2.0 Google Client Setup

* Go to the [Credentials page](https://console.cloud.google.com/apis/credentials)
* Select your project
* Click the **OAuth 2.0 Client ID** (or create one via **"Create Credentials" → "OAuth Client ID"**)
* Add frontend server URIs to **Authorized JavaScript origins**
* Add the frontend redirect URI with `/login/oauth2/code/google` to **Authorized redirect URIs**

---

## 🐳 Running with Docker

### Docker Setup

We use multi-stage build for frontend and backend servers and it defaults to production stage for both. 
If you want frontend server for development put `development` in target as shown below:

```yaml
  frontend:
    build:
      target: development
```

Edit your environment variables inside `docker-compose.yml`:

```yaml
args:
  GOOGLE_SHEET_ID: "your_sheet_id"
  GOOGLE_CLIENT_ID: "your_client_id"
  GOOGLE_CLIENT_SECRET: "your_client_secret"
  GOOGLE_DRIVE_FOLDER_ID: "your_folder_id"

environment:
  GOOGLE_SHEET_ID: "your_sheet_id"
  GOOGLE_CLIENT_ID: "your_client_id"
  GOOGLE_CLIENT_SECRET: "your_client_secret"
  GOOGLE_DRIVE_FOLDER_ID: "your_folder_id"

volumes:
  - ./path/to/credentials.json:/app/credentials.json:ro
```

---

### 🔑 Environment Variables Setup

#### Getting `GOOGLE_SHEET_ID`

* Go to [Google Sheets](https://docs.google.com/spreadsheets/u/0/)
* Open your sheet
* From the URL, copy the part between `/d/` and `/edit`

Example:

```
https://docs.google.com/spreadsheets/d/1V9CZ4xpPTK62CWPdmU9G-dmbPsBcdp-Uho1Lti1kCLc/edit#gid=0
```

ID: `1V9CZ4xpPTK62CWPdmU9G-dmbPsBcdp-Uho1Lti1kCLc`

---

#### Getting `GOOGLE_DRIVE_FOLDER_ID`

* Go to [Google Drive](https://drive.google.com/drive/u/1/my-drive)
* Open your folder
* From the URL, copy the ID after `folders/`

Example:

```
https://drive.google.com/drive/u/1/folders/1uMOLYx8nVjSZ9188WtY7WbCsnQvPcTYr
```

ID: `1uMOLYx8nVjSZ9188WtY7WbCsnQvPcTYr`

---

#### Getting `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

* Go to the [Credentials page](https://console.cloud.google.com/apis/credentials)
* Select your project
* Click your OAuth 2.0 Client ID
* Copy the **Client ID** and **Client Secret**

---

#### Getting `credentials.json`

* Go to the [Service Accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts)
* Select your project and service account
* Go to the **Keys** tab
* Click **"Add Key" → "Create new key"**
* Choose **JSON**
* Click **Create** → This will download `credentials.json`

**Mount it in Docker:**

```bash
-v path/to/credentials.json:/app/credentials.json
```

---

### Running the Container

In your terminal, run:

```bash
docker-compose up --build
```