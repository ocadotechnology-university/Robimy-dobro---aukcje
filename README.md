
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

How to clone your project

### For windows users:
```bash
git clone https://github.com/ocadotechnology-university/Robimy-dobro---aukcje.git
```

<h2 id="docker">🐳 Docker</h2>
<h3>Set Up</h3>

We use docker to start the project. Firstly you need to configure variables inside `docker-compose.yml`, as shown below:
```bash
environment:
      GOOGLE_SHEET_ID: "your_sheet_id"
      GOOGLE_CLIENT_ID: "your_client_id"
      GOOGLE_CLIENT_SECRET: "your_client_secret"
      GOOGLE_DRIVE_FOLDER_ID: "your_folder_id"
volumes:
      - ./path/to/credentials.json:/app/credentials.json:ro
```
Don't know what they are and where to get them? Go <a href="#env-setup">here</a>.

<h3>Running the container</h3>

Go to the terminal and pass in:
```bash
docker-compose up --build
```


<h2>Documentations that might help</h2>
<h3 id="env-setup"> 🔑 How to get variables to start docker environment</h3>
---
<h4>Getting `credentials.json`</h4>
Follow these steps if you're using a Google Cloud **Service Account**:

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
