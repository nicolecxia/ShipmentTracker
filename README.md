# ShipmentTracker
 Demostration Video Link: https://www.youtube.com/watch?v=8ZFBc8FuAGU

```text
shipmenttracker/
├── Core/          # Interface
│   ├── Entities/
│   └── Interfaces/
├── Infrastructure/       # Repository
│   ├── Data/
│   └── Repositories/
├── ShipmentTracker.Api/    # API Controller
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

1.Backend Setup  
- `git clone https://github.com/nicolecxia/ShipmentTracker.git`
- `cd ShipmentTracker.Api`
- `dotnet run`    #API runs at local environment,

2.Frontend Setup  
- `cd client`
- `npm install  # or yarn`
- Create .env file, setting up your API URL<br>
  `NEXT_PUBLIC_API_BASE_URL=http://localhost:5251/api`
- `npm run dev`




  
