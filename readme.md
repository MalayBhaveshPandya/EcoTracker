# EcoTracker - Environmental Impact Monitoring Platform

EcoTracker is a comprehensive environmental monitoring and sustainability platform that helps users track their carbon footprint, energy consumption, water usage, and waste management. The application combines data visualization with AI-powered assistance to promote eco-friendly practices.

## 👥 Contributors

- [AstralKS](https://github.com/AstralKS)
- [MalayBhaveshPandya](https://github.com/MalayBhaveshPandya)
- [Viraj217](https://github.com/Viraj217)

## 🌟 Features

### 🏠 Dashboard

- Real-time environmental metrics tracking
- Weekly energy usage visualization
- Active sustainability challenges
- EcoPoints reward system

### ⚡ Energy Tracking

- **Electrical Energy Management**: Monitor home appliances and devices
- **Vehicle Energy Tracking**: Track transportation energy consumption
- Device efficiency monitoring with optimization suggestions
- Energy-saving tips and recommendations

### 🏆 Leaderboard & Competitions

- Community leaderboard with EcoPoints ranking
- Weekly energy efficiency competitions
- Achievement tracking and badges
- Historical performance analysis

### 🎯 Challenges & Goals

- Active sustainability challenges
- Progress tracking with visual indicators
- Reward system for completed goals
- Community events and announcements

### 🤖 AI Assistant

- Integrated AI chatbot for eco-friendly advice
- Personalized energy-saving recommendations
- Real-time Q&A about sustainability practices
- Connected to n8n workflow automation

### 📊 Data Dashboard & Visualization

- Interactive charts and graphs using Recharts
- Carbon footprint tracking over time
- Renewable energy usage breakdown
- Water conservation progress
- Waste management analytics
- Device efficiency comparisons
- Vehicle energy consumption analysis

## 🛠️ Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Radix UI** for accessible components
- **Lucide React** for icons

### Backend

- **Node.js** with Express
- **CORS** for cross-origin requests
- **n8n integration** for AI workflows
- **Dotenv** for environment management

### Development Tools

- **ESLint** for code linting
- **TypeScript** for type safety
- **PostCSS** for CSS processing
- **Vite** for fast development

## 📁 Project Structure

```
EcoTracker/
├── Backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── card.tsx
│   │   │       ├── chart.tsx
│   │   │       └── select.tsx
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── assets/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── EcoCharts.tsx
│   │   ├── SimpleCharts.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── components.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd EcoTracker
   ```

2. **Install Backend Dependencies**

   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Setup

1. **Backend Configuration**

   Create a `.env` file in the `Backend` directory:

   ```env
   PORT=5000
   NODE_ENV=development
   # Add any additional environment variables here
   ```

2. **Frontend Configuration**

   The frontend uses Vite's default configuration. No additional environment setup required.

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd Backend
   node server.js
   ```

   Server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

### Building for Production

1. **Build Frontend**

   ```bash
   cd frontend
   npm run build
   ```

2. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 🔧 Available Scripts

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend Scripts

- `node server.js` - Start production server
- `npm test` - Run tests (not implemented)

## 🌐 API Endpoints

### Chat Endpoint

- **POST** `/api/chat`
  - Description: Send messages to AI assistant
  - Request body: `{ "message": "your message here" }`
  - Response: `{ "reply": "AI response" }`

## 🎨 UI Components

The application uses a custom design system built with:

- **shadcn/ui** components for consistency
- **Tailwind CSS** for styling
- **Radix UI** for accessibility
- **Custom animations** and transitions
- **Dark theme** optimized for environmental awareness

## 📊 Key Features Breakdown

### Energy Tracking

- **Home Devices**: LED lights, HVAC, water heating, electronics, appliances
- **Vehicles**: Electric cars, gasoline vehicles, airplanes
- **Efficiency Monitoring**: Real-time efficiency ratings and consumption data

### Environmental Metrics

- **Carbon Footprint**: Monthly CO2 emissions tracking
- **Renewable Energy**: Solar, wind, and hydro energy consumption
- **Water Conservation**: Usage vs. savings tracking
- **Waste Management**: Recycling, composting, and landfill percentages

### Gamification

- **EcoPoints System**: Reward sustainable behaviors
- **Weekly Challenges**: Energy reduction goals
- **Community Competitions**: Leaderboards and rankings
- **Achievement Badges**: Recognition for milestones

## 🔗 Integrations

### n8n Workflow

The AI chat feature integrates with n8n for advanced workflow automation:

- Webhook endpoint: `https://temp23.app.n8n.cloud/webhook-test/device-assistant`
- Handles natural language processing for environmental advice
- Provides personalized recommendations based on user data

## 🚀 Deployment

### Frontend Deployment

The frontend can be deployed to:

- **Vercel** (recommended for Vite projects)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

### Backend Deployment

The backend can be deployed to:

- **Heroku**
- **Railway**
- **DigitalOcean**
- **AWS EC2**
- **Any Node.js hosting service**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

## 🔮 Future Enhancements

- Mobile application development
- IoT device integrations
- Advanced AI recommendations
- Social features and community challenges
- Real-time data from smart home devices
- Carbon offset marketplace integration
- Detailed reporting and analytics
- Multi-language support

## 🙏 Acknowledgments

- React community for excellent tooling
- Recharts for beautiful data visualization
- Tailwind CSS for rapid UI development
- n8n for workflow automation capabilities
- Open source contributors and environmental advocates

---

**EcoTracker** - Making sustainability tracking simple, engaging, and effective. Together, we can make a difference for our planet! 🌍💚
