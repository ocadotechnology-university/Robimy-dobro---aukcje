# Robimy-dobro---aukcje

# Docker
## Backend Server

### For windows users:

#### Environment Variables

---

**`GOOGLE_SHEET_ID`**  
The **sheet ID** from your Google Sheets URL.  
Extract the part after `/d/` and before `/edit`.

Example:  
`1MGF_IGRmGNrcZZVrwRWbhJsAfHix5PIQXmDs2hXTLAs`

---

**`GOOGLE_CLIENT_ID`**  
Your **Google OAuth 2.0 Client ID**.  
Found in the Google Cloud Console.

Example:  
`1234567890-abc123def456.apps.googleusercontent.com`

---

**`GOOGLE_CLIENT_SECRET`**  
Your **Google OAuth 2.0 Client Secret**.  
Also found in Google Cloud Console under Credentials.

---

**`GOOGLE_DRIVE_FOLDER_ID`**  
The **folder ID** from a shared Google Drive folder where files will be accessed or uploaded.  
It's the string after `/folders/` in the folder's URL.

Example:  
`1A2B3C4D5E6F7G8H9`

---

**`path\to\credentials.json`**  
Path to your local `credentials.json` file (OAuth credentials) that must be mounted into the container.

[Don’t know where to find credentials.json?](#-how-to-get-credentialsjson)

---

```bash
docker run -p 8080:8080 `
  -e GOOGLE_SHEET_ID="your_sheet_id" `
  -e GOOGLE_CLIENT_ID="your_client_id" `
  -e GOOGLE_CLIENT_SECRET="your_client_secret" `
  -e GOOGLE_DRIVE_FOLDER_ID="your_folder_id" `
  -v path\to\credentials.json:/app/credentials.json `
  robimy-dobro
```

### For linux users:
```bash
docker run -p 8080:8080 \
  -e GOOGLE_SHEET_ID="your_sheet_id" \
  -e GOOGLE_CLIENT_ID="your_client_id" \
  -e GOOGLE_CLIENT_SECRET="your_client_secret" \
  -e GOOGLE_DRIVE_FOLDER_ID="your_folder_id" \
  -v path/to/credentials.json:/app/credentials.json \
  robimy-dobro
```

### Frontend Server

## 🔑 How to Get `credentials.json`

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
