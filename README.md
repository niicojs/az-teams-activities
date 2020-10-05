## Auth

Configure SSO with Teams  
https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/auth-aad-sso

Azure AD Login (outside of Teams)  
https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-core

## Dev Settings

In `/api/local.settings.json`:
```
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "COSMOSDB_ENDPOINT": "https://hostname.documents.azure.com/",
    "COMSOSDB_KEY": "cosmosdb key"
  }
}
```
