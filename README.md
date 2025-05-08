# ShipmentTracker

A simplified Shipment Tracker application built with `Next.js, TypeScript, Material UI, Redux` on the frontend, and `ASP.NET Core Web API, Entity Framework Core` on the backend. <br>

It supports `Google OAuth`, `Theming`, and `Bilingual` (English & French).<br>

---
Demostration Video Link: https://www.youtube.com/watch?v=qftXqzclE1o

---

```text
shipmenttracker/
├── Core/                    # Entities, Interface
│   ├── Entities/
│   └── Interfaces/
├── Infrastructure/          # Repositories, EF Core DbContext
│   ├── Data/
│   └── Repositories/
├── ShipmentTracker.Api/     # API Controller
│   └── API/Controllers/           
├── Unit.Tests/              # Xunit
├── client/                  # NextJS + Typescript
│   ├── public/
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
- Install the necessary packages <br>
```bash
cd client
npm install  # or yarn
```
- Create `.env` file, setting up your server API URL,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,and NEXTAUTH_URL. For example: <br>
```bash
  NEXT_PUBLIC_API_BASE_URL=http://localhost:5251/api
  GOOGLE_CLIENT_ID=...
  GOOGLE_CLIENT_SECRET=...
  NEXTAUTH_URL=http://localhost:3000
  ```
- Run <br>
```bash
npm run dev
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

---

## Design Choices  
### Frontend Architecture (Next.js + TypeScript)  
- TypeScript  
  - Reduces runtime errors with compile-time checks  
- State Management<br>
  - Context API for theming<br>
  - Redux for global status
- Authentication<br>
  - Google OAuth<br>
- Translation<br>
  - i18next<br>

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

---

## API endpoints  
- GET /api/shipments – List all shipments contains ImageId (with filter by status, carrier)

- POST /api/shipments – Add new shipment

- PUT /api/shipments/{id}/status – Update shipment status

- GET /api/carriers – List of available carriers

- POST /api/images/upload - Upload image

- GET /api/images/{id} - Get image by id

  
