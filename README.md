# ShipmentTracker

A simplified Shipment Tracker application build using `Next.js + TypeScript + Material UI` on the frontend, and `ASP.NET Core Web API + Entity Framework Core` on the backend. <br>
Demostration Video Link: https://www.youtube.com/watch?v=8ZFBc8FuAGU

---

```text
shipmenttracker/
├── Core/                    # Entities, Interface
│   ├── Entities/
│   └── Interfaces/
├── Infrastructure/          # Repositories
│   ├── Data/
│   └── Repositories/
├── ShipmentTracker.Api/     # API Controller
│   └── API/Controllers/           
├── Unit.Tests/              # Xunit
├── client/                  # NextJS + Typescript
│   └── src/
├── ShipmentTrackerProject.sln
└── README.md
```
---

## Setup Instructions  
### Prerequisites  
- Node.js 18+
- .NET 9 SDK
- Git

---

### 1.Backend Setup  
```bash
git clone https://github.com/nicolecxia/ShipmentTracker.git
cd ShipmentTracker.Api
dotnet run    
```
---

### 2.Frontend Setup  
```bash
cd client
npm install  # or yarn
```
- Create .env file, setting up your server API URL. For example: <br>
  `NEXT_PUBLIC_API_BASE_URL=http://localhost:5251/api`
```bash
`npm run dev`
```
---
## Deployment Instructions  
### 1.Frontend Deployment 
- Azure Web app service/ Vercel + Github
  - Create a `NEXT_PUBLIC_API_BASE_URL` Environment variables for your API base url.
  - If using Azure Static Web Apps service, copy your Azure `Deployment token`, go to your GitHub repository → Settings → Security → Secrets and Variable → Actions → Click New repository secret, add the Azure token as a secret(`AZURE_STATIC_WEB_APPS_API_TOKEN`).

### 2.Backend Deployment
- Azure Web app service + Github

- CI/CD - Github  Actions
1. Download the Publish Profile for your Azure Web App. You can download this file from the Overview page of your Web App in the Azure Portal.
2. Create a secret in your repository named AZURE_WEBAPP_PUBLISH_PROFILE, paste the publish profile contents as the value of the secret.
3. Change the value for the AZURE_WEBAPP_NAME.
```bash
name: Build and deploy ASP.Net Core app to an Azure Web App

env:
  AZURE_WEBAPP_NAME: <Your_WebApp_Name>    # set this to the name of your Azure Web App
  AZURE_WEBAPP_PACKAGE_PATH: 'ShipmentTracker.Api'      # set this to the path to your web app project, defaults to the repository root
  DOTNET_VERSION: '9'                 # set this to the .NET Core version to use

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up .NET Core
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: ${{ env.DOTNET_VERSION }}

      - name: Set up dependency caching for faster builds
        uses: actions/cache@v3
        with:
          path: ~/.nuget/packages
          key: ${{ runner.os }}-nuget-${{ hashFiles('**/packages.lock.json') }}
          restore-keys: |
            ${{ runner.os }}-nuget-

      - name: Build with dotnet
        run: dotnet build --configuration Release

      - name: dotnet publish
        run: dotnet publish -c Release -o ${{env.DOTNET_ROOT}}/myapp

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: .net-app
          path: ${{env.DOTNET_ROOT}}/myapp

  deploy:
    permissions:
      contents: none
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: 'Development'
      url: ${{ steps.deploy-to-webapp.outputs.webapp-url }}

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: .net-app

      - name: Deploy to Azure Web App
        id: deploy-to-webapp
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME }}
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}
```
---

## Design Choices  
### Frontend Architecture (Next.js + TypeScript)  
- Flexible Routing  
- TypeScript  
  - Reduces runtime errors with compile-time checks  
- State Management<br>
  - Context API for global state (carriers list, filters)<br>
  - Local state for form management (avoided Redux for simplicity)

### UI/UX (Material UI)
- DataGrid Component<br>
  - Implemented server-side pagination & filtering to handle large datasets<br>
  - Custom StatusBadge component with color-coded shipment states<br>
  - Double-click row handler for edit modals <br>

### Backend Architecture (.NET Web API  + EF Core)
- Clean Architecture(Controller, Interface, Repository)
- In-memory database for lightweight development simplicity

### Integration Choices
- Axios






  
