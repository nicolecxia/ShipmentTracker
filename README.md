# ShipmentTracker
 Demostration Video Link: https://www.youtube.com/watch?v=8ZFBc8FuAGU

```text
shipmenttracker/
├── Core/          # Entities, Interface
│   ├── Entities/
│   └── Interfaces/
├── Infrastructure/       # EF Core, Repositories
│   ├── Data/
│   └── Repositories/
├── ShipmentTracker.Api/    # API Controller (ASP.NET Core Web API)
│   └── API/Controllers
├── client/         # React + TypeScript
│   ├── public/
│   └── src/
├── ShipmentTrackerProject.sln
└── README.md
```
# Setup Instructions  
## Prerequisites  
- Node.js 18+
- .Net 7 SDK
- Git

## 1.Backend Setup  
- `git clone https://github.com/nicolecxia/ShipmentTracker.git`
- `cd ShipmentTracker.Api`
- `dotnet run`    #API runs at local environment,

## 2.Frontend Setup  
- `cd client`
- `npm install  # or yarn`
- Create .env file, setting up your API URL<br>
  `NEXT_PUBLIC_API_BASE_URL=http://localhost:5251/api`
- `npm run dev`


# Design Choices  
## Frontend Architecture (Next.js + TypeScript)  
- Next.js Page Router  
- TypeScript  
Reduces runtime errors with compile-time checks  
- State Management<br>
  - Context API for global state (carriers list, filters)<br>
  - Local state for form management (avoided Redux for simplicity)
## UI/UX (Material UI)
- DataGrid Component<br>
  - Implemented server-side pagination/filtering to handle large datasets<br>
  - Custom StatusBadge component with color-coded shipment states<br>
  - Double-click row handler for edit modals (UX best practice)<br>

- Form Design<br>
  - Controlled components with Formik + Yup validation<br>
  - DatePicker for consistent date input<br>
  - Dynamic carrier dropdown populated from API<br>






  
