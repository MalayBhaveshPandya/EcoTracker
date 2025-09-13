import { useState } from 'react';
import { 
  Home, 
  Zap, 
  Trophy, 
  Target, 
  MessageSquare, 
  Database, 
  Calendar, 
  TrendingUp,
  Leaf,
  Sun,
  Droplets,
  Recycle,
  Award,
  ChevronRight,
  Plus,
  Minus,
  Car,
  Lightbulb,
  Thermometer,
  Monitor,
  Waves,
  Microwave,
  WashingMachine,
  Fuel,
  Plane
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
// import { EcoDashboardCharts } from './EcoCharts';
import { SimpleEcoCharts } from './SimpleCharts';

function sendMessageToAI(message) {
  return fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
    .then(res => res.json());
}

const EcoTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeEnergyTab, setActiveEnergyTab] = useState('electrical');
  const [electricalUsage, setElectricalUsage] = useState(1250);
  const [waterUsage] = useState(85);
  const [wasteReduction] = useState(67);
  const [carbonFootprint] = useState(2.4);
  
  const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: "🤖 Hello! I'm your EcoAI assistant. How can I help you conserve energy and reduce your environmental impact today?" },
    { role: 'assistant', content: "💬 Ask me about energy-saving tips, sustainable practices, or track your progress!" }
  ]);


  // Detailed device usage tracking
  const [deviceUsage, setDeviceUsage] = useState({
    lighting: { usage: 180, efficiency: 92, icon: Lightbulb, color: 'yellow' },
    hvac: { usage: 560, efficiency: 88, icon: Thermometer, color: 'blue' },
    waterHeating: { usage: 320, efficiency: 85, icon: Waves, color: 'orange' },
    electronics: { usage: 150, efficiency: 90, icon: Monitor, color: 'purple' },
    appliances: { usage: 280, efficiency: 87, icon: Microwave, color: 'green' },
    laundry: { usage: 120, efficiency: 89, icon: WashingMachine, color: 'cyan' }
  } as const);

  // Vehicle energy tracking
  const [vehicleData, setVehicleData] = useState({
    electricVehicle: { consumption: 85, efficiency: 95, range: 280, icon: Car, color: 'green' },
    gasolineVehicle: { consumption: 45, efficiency: 25, mpg: 28, icon: Fuel, color: 'red' },
    airplane: { consumption: 450, efficiency: 35, gallonsPerHour: 75, icon: Plane, color: 'blue' }
  } as const);

  // Sample data for charts and leaderboard
  const weeklyData = [
    { day: 'Mon', usage: 45 },
    { day: 'Tue', usage: 52 },
    { day: 'Wed', usage: 38 },
    { day: 'Thu', usage: 61 },
    { day: 'Fri', usage: 42 },
    { day: 'Sat', usage: 33 },
    { day: 'Sun', usage: 28 }
  ];

  const leaderboardData = [
    { name: 'Alex Green', score: 2850, avatar: '🌱' },
    { name: 'Sarah Eco', score: 2720, avatar: '♻️' },
    { name: 'Mike Clean', score: 2650, avatar: '🌍' },
    { name: 'You', score: 2480, avatar: '⭐' },
    { name: 'John Save', score: 2340, avatar: '💚' }
  ];

  // Weekly wins data - tracks how many times each person won (had lowest energy usage) per week
  const weeklyWinsData = [
    { week: 'Week 1', alexWins: 1, sarahWins: 0, mikeWins: 0, youWins: 0, johnWins: 0, winner: 'Alex Green' },
    { week: 'Week 2', alexWins: 0, sarahWins: 1, mikeWins: 0, youWins: 0, johnWins: 0, winner: 'Sarah Eco' },
    { week: 'Week 3', alexWins: 1, sarahWins: 0, mikeWins: 0, youWins: 0, johnWins: 0, winner: 'Alex Green' },
    { week: 'Week 4', alexWins: 0, sarahWins: 0, mikeWins: 1, youWins: 0, johnWins: 0, winner: 'Mike Clean' },
    { week: 'Week 5', alexWins: 0, sarahWins: 1, mikeWins: 0, youWins: 0, johnWins: 0, winner: 'Sarah Eco' },
    { week: 'Week 6', alexWins: 1, sarahWins: 0, mikeWins: 0, youWins: 0, johnWins: 0, winner: 'Alex Green' },
    { week: 'Week 7', alexWins: 0, sarahWins: 0, mikeWins: 0, youWins: 1, johnWins: 0, winner: 'You' },
    { week: 'Week 8', alexWins: 0, sarahWins: 1, mikeWins: 0, youWins: 0, johnWins: 0, winner: 'Sarah Eco' },
    { week: 'Week 9', alexWins: 1, sarahWins: 0, mikeWins: 0, youWins: 0, johnWins: 0, winner: 'Alex Green' },
    { week: 'Week 10', alexWins: 0, sarahWins: 0, mikeWins: 0, youWins: 0, johnWins: 1, winner: 'John Save' },
    { week: 'Week 11', alexWins: 0, sarahWins: 1, mikeWins: 0, youWins: 0, johnWins: 0, winner: 'Sarah Eco' },
    { week: 'Week 12', alexWins: 1, sarahWins: 0, mikeWins: 0, youWins: 0, johnWins: 0, winner: 'Alex Green' }
  ];

  // Calculate total wins for each person
  const totalWins = {
    'Alex Green': weeklyWinsData.reduce((sum, week) => sum + week.alexWins, 0),
    'Sarah Eco': weeklyWinsData.reduce((sum, week) => sum + week.sarahWins, 0),
    'Mike Clean': weeklyWinsData.reduce((sum, week) => sum + week.mikeWins, 0),
    'You': weeklyWinsData.reduce((sum, week) => sum + week.youWins, 0),
    'John Save': weeklyWinsData.reduce((sum, week) => sum + week.johnWins, 0)
  };

  const challenges = [
    { title: 'Reduce Energy by 20%', progress: 75, reward: '50 EcoPoints', icon: '⚡' },
    { title: 'Zero Waste Week', progress: 40, reward: '100 EcoPoints', icon: '🗑️' },
    { title: 'Water Conservation', progress: 90, reward: '30 EcoPoints', icon: '💧' }
  ];

  const events = [
    { date: 'Sep 15', title: 'Earth Day Community Cleanup', type: 'community' },
    { date: 'Sep 20', title: 'Renewable Energy Workshop', type: 'workshop' },
    { date: 'Sep 25', title: 'Sustainability Challenge Ends', type: 'challenge' }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'electrical', label: 'Energy Tracking', icon: Zap },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'challenges', label: 'Active Challenges', icon: Target },
    { id: 'ai-chat', label: 'Talk to AI', icon: MessageSquare },
    { id: 'data-dashboard', label: 'Data Dashboard', icon: Database },
    { id: 'events', label: 'Event Announcements', icon: Calendar },
    { id: 'progress', label: 'Progress Visualization', icon: TrendingUp }
  ];

  interface StatCardProps {
    title: string;
    value: number;
    unit: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    trend: number;
  }

  const StatCard = ({ title, value, unit, icon: Icon, color, trend }: StatCardProps) => (
    <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${color}`} />
        <span className={`text-sm font-medium ${trend > 0 ? 'text-red-400' : 'text-green-400'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      </div>
      <h3 className="text-gray-300 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-gray-400 text-sm">{unit}</p>
    </div>
  );

  interface ProgressBarProps {
    progress: number;
    color?: string;
  }

  const ProgressBar = ({ progress, color = 'green' }: ProgressBarProps) => (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div 
        className={`h-2 rounded-full bg-gradient-to-r from-${color}-400 to-${color}-600 transition-all duration-1000 ease-out`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

const handleSend = async () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: 'user', content: chatInput }]);
    const currentInput = chatInput;
    setChatInput('');
    try {
      const res = await sendMessageToAI(currentInput);
      if (res.reply) {
        let replyContent = res.reply;
        if (typeof replyContent === 'object') {
          // Render object as JSON string or format nicely
          replyContent = JSON.stringify(replyContent.response, null, 2);
        }
        setChatMessages(msgs => [...msgs, { role: 'assistant', content: replyContent }]);
      } else if (res.error) {
        setChatMessages(msgs => [...msgs, { role: 'assistant', content: `⚠️ ${res.error}` }]);
      }
    } catch (err) {
      setChatMessages(msgs => [...msgs, { role: 'assistant', content: '⚠️ Error: Unable to get response from AI.' }]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-white">EcoTracker Dashboard</h1>
              <div className="flex items-center space-x-3 bg-gray-800/70 px-4 py-2 rounded-full">
                <Leaf className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">2,480 EcoPoints</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Energy Usage" 
                value={electricalUsage} 
                unit="kWh/month" 
                icon={Zap} 
                color="text-yellow-400"
                trend={-12}
              />
              <StatCard 
                title="Water Conservation" 
                value={waterUsage} 
                unit="gallons saved" 
                icon={Droplets} 
                color="text-blue-400"
                trend={8}
              />
              <StatCard 
                title="Waste Reduction" 
                value={wasteReduction} 
                unit="% reduction" 
                icon={Recycle} 
                color="text-green-400"
                trend={-15}
              />
              <StatCard 
                title="Carbon Footprint" 
                value={carbonFootprint} 
                unit="tons CO2/month" 
                icon={Sun} 
                color="text-orange-400"
                trend={-20}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">Weekly Energy Usage</h3>
                <div className="space-y-3">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <span className="text-gray-300 w-12">{day.day}</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-3">
                        <div 
                          className="h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000"
                          style={{ width: `${(day.usage / 70) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white w-12 text-sm">{day.usage}kWh</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">Active Challenges</h3>
                <div className="space-y-4">
                  {challenges.slice(0, 3).map((challenge, index) => (
                    <div key={index} className="p-4 bg-gray-700/50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{challenge.icon}</span>
                        <span className="text-green-400 text-sm font-medium">{challenge.reward}</span>
                      </div>
                      <h4 className="text-white font-medium mb-2">{challenge.title}</h4>
                      <ProgressBar progress={challenge.progress} />
                      <p className="text-gray-400 text-sm mt-1">{challenge.progress}% complete</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'electrical':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-white">Energy Tracking Center</h1>
              <div className="flex items-center space-x-3 bg-gray-800/70 px-4 py-2 rounded-full">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Total: {electricalUsage} kWh</span>
              </div>
            </div>
            
            {/* Energy Type Tabs */}
            <div className="flex space-x-4 bg-gray-800/70 p-2 rounded-2xl">
              <button 
                onClick={() => setActiveEnergyTab('electrical')}
                className={`flex-1 py-3 px-6 rounded-xl transition-all duration-300 ${
                  activeEnergyTab === 'electrical' 
                    ? 'bg-yellow-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Electrical Energy</span>
                </div>
              </button>
              <button 
                onClick={() => setActiveEnergyTab('vehicle')}
                className={`flex-1 py-3 px-6 rounded-xl transition-all duration-300 ${
                  activeEnergyTab === 'vehicle' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Car className="w-5 h-5" />
                  <span>Vehicle Energy</span>
                </div>
              </button>
            </div>

            {/* Electrical Energy Tab */}
            {activeEnergyTab === 'electrical' && (
              <div className="space-y-6">
                <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-white">Home Energy Management</h2>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => setElectricalUsage(prev => Math.max(0, prev - 50))}
                        className="p-3 bg-green-600 hover:bg-green-700 rounded-full transition-colors"
                      >
                        <Minus className="w-5 h-5 text-white" />
                      </button>
                      <button 
                        onClick={() => setElectricalUsage(prev => prev + 50)}
                        className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                      >
                        <Plus className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(deviceUsage).map(([device, data]) => {
                      const IconComponent = data.icon;
                      return (
                        <div key={device} className="bg-gray-700/50 rounded-xl p-6 hover:bg-gray-700/70 transition-all duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 bg-${data.color}-600/20 rounded-xl`}>
                              <IconComponent className={`w-6 h-6 text-${data.color}-400`} />
                            </div>
                            <span className={`text-${data.color}-400 font-semibold`}>{data.efficiency}%</span>
                          </div>
                          <h3 className="text-white font-semibold mb-2 capitalize">
                            {device.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <p className="text-gray-300 text-xl font-bold">{data.usage} kWh</p>
                          <p className="text-gray-400 text-sm">Monthly consumption</p>
                          
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Efficiency</span>
                              <span className={`text-${data.color}-400`}>{data.efficiency}%</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full bg-${data.color}-500 transition-all duration-1000`}
                                style={{ width: `${data.efficiency}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 mt-4">
                            <button 
                              onClick={() => setDeviceUsage(prev => ({
                                ...prev,
                                [device]: { ...prev[device as keyof typeof prev], usage: Math.max(0, prev[device as keyof typeof prev].usage - 10) }
                              }))}
                              className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm transition-colors"
                            >
                              Reduce
                            </button>
                            <button 
                              onClick={() => setDeviceUsage(prev => ({
                                ...prev,
                                [device]: { ...prev[device as keyof typeof prev], usage: prev[device as keyof typeof prev].usage + 10 }
                              }))}
                              className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors"
                            >
                              Increase
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">💡 Energy Saving Tips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-600/20 rounded-xl">
                      <h4 className="text-green-400 font-semibold mb-2">LED Lighting</h4>
                      <p className="text-gray-300 text-sm">Switch to LED bulbs to reduce lighting energy by up to 80%</p>
                    </div>
                    <div className="p-4 bg-blue-600/20 rounded-xl">
                      <h4 className="text-blue-400 font-semibold mb-2">Smart Thermostat</h4>
                      <p className="text-gray-300 text-sm">Programmable thermostats can save 10-23% on heating and cooling</p>
                    </div>
                    <div className="p-4 bg-purple-600/20 rounded-xl">
                      <h4 className="text-purple-400 font-semibold mb-2">Unplug Electronics</h4>
                      <p className="text-gray-300 text-sm">Phantom loads from standby devices can cost $100+ per year</p>
                    </div>
                    <div className="p-4 bg-orange-600/20 rounded-xl">
                      <h4 className="text-orange-400 font-semibold mb-2">Water Heater</h4>
                      <p className="text-gray-300 text-sm">Lower water heater temperature to 120°F to save energy</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vehicle Energy Tab */}
            {activeEnergyTab === 'vehicle' && (
              <div className="space-y-6">
                <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                  <h2 className="text-2xl font-semibold text-white mb-6">Transportation Energy Tracking</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {Object.entries(vehicleData).map(([vehicle, data]) => {
                      const IconComponent = data.icon;
                      return (
                        <div key={vehicle} className="bg-gray-700/50 rounded-xl p-6 hover:bg-gray-700/70 transition-all duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 bg-${data.color}-600/20 rounded-xl`}>
                              <IconComponent className={`w-6 h-6 text-${data.color}-400`} />
                            </div>
                            <span className={`text-${data.color}-400 font-semibold`}>{data.efficiency}%</span>
                          </div>
                          
                          <h3 className="text-white font-semibold mb-4 capitalize">
                            {vehicle.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Energy Used</span>
                              <span className="text-white font-semibold">
                                {data.consumption} {vehicle === 'electricVehicle' ? 'kWh' : vehicle === 'airplane' ? 'gallons/flight' : 'gallons'}
                              </span>
                            </div>
                            
                            {vehicle === 'electricVehicle' && 'range' in data && (
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Range</span>
                                <span className="text-white font-semibold">{data.range} miles</span>
                              </div>
                            )}
                            
                            {vehicle === 'gasolineVehicle' && 'mpg' in data && (
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Fuel Economy</span>
                                <span className="text-white font-semibold">{data.mpg} MPG</span>
                              </div>
                            )}

                            {vehicle === 'airplane' && 'gallonsPerHour' in data && (
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Fuel Rate</span>
                                <span className="text-white font-semibold">{data.gallonsPerHour} gal/hr</span>
                              </div>
                            )}
                            
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Efficiency</span>
                                <span className={`text-${data.color}-400`}>{data.efficiency}%</span>
                              </div>
                              <div className="w-full bg-gray-600 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full bg-${data.color}-500 transition-all duration-1000`}
                                  style={{ width: `${data.efficiency}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 mt-4">
                            <button 
                              onClick={() => setVehicleData(prev => ({
                                ...prev,
                                [vehicle]: { ...prev[vehicle as keyof typeof prev], consumption: Math.max(0, prev[vehicle as keyof typeof prev].consumption - 5) }
                              }))}
                              className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm transition-colors"
                            >
                              Optimize
                            </button>
                            <button 
                              onClick={() => setVehicleData(prev => ({
                                ...prev,
                                [vehicle]: { ...prev[vehicle as keyof typeof prev], consumption: prev[vehicle as keyof typeof prev].consumption + 5 }
                              }))}
                              className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors"
                            >
                              Increase
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">🚗 Transportation Tips</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-600/20 rounded-lg">
                        <h4 className="text-green-400 font-semibold text-sm">Combine Trips</h4>
                        <p className="text-gray-300 text-xs">Plan multiple errands in one trip to save fuel</p>
                      </div>
                      <div className="p-3 bg-blue-600/20 rounded-lg">
                        <h4 className="text-blue-400 font-semibold text-sm">Choose Direct Flights</h4>
                        <p className="text-gray-300 text-xs">Non-stop flights use less fuel than connecting flights</p>
                      </div>
                      <div className="p-3 bg-purple-600/20 rounded-lg">
                        <h4 className="text-purple-400 font-semibold text-sm">Carbon Offsets</h4>
                        <p className="text-gray-300 text-xs">Consider purchasing carbon offsets for air travel</p>
                      </div>
                      <div className="p-3 bg-orange-600/20 rounded-lg">
                        <h4 className="text-orange-400 font-semibold text-sm">Alternative Transport</h4>
                        <p className="text-gray-300 text-xs">Use trains or buses for shorter distances when possible</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">📊 Monthly Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                        <span className="text-gray-300">Total Energy</span>
                        <span className="text-white font-semibold">
                          {Object.values(vehicleData).reduce((sum, vehicle) => sum + vehicle.consumption, 0)} units
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                        <span className="text-gray-300">Avg Efficiency</span>
                        <span className="text-green-400 font-semibold">
                          {Math.round(Object.values(vehicleData).reduce((sum, vehicle) => sum + vehicle.efficiency, 0) / Object.keys(vehicleData).length)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                        <span className="text-gray-300">CO2 Savings</span>
                        <span className="text-green-400 font-semibold">-15.2 lbs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'leaderboard':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white">EcoLeaders Board</h1>
            
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-semibold text-white mb-6">Current Rankings</h2>
              <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                      user.name === 'You' ? 'bg-green-600/20 border border-green-500/50' : 'bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-600 rounded-full">
                        <span className="text-lg">{index + 1}</span>
                      </div>
                      <span className="text-2xl">{user.avatar}</span>
                      <div>
                        <h3 className="text-white font-semibold">{user.name}</h3>
                        <p className="text-gray-400 text-sm">Eco Warrior</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">{user.score}</p>
                      <p className="text-gray-400 text-sm">EcoPoints</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Wins Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">🏆 Total Weekly Wins</h3>
                <p className="text-gray-400 text-sm mb-4">Most energy-efficient person each week</p>
                <div className="space-y-3">
                  {Object.entries(totalWins).map(([name, wins]) => {
                    const user = leaderboardData.find(u => u.name === name);
                    return (
                      <div key={name} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{user?.avatar}</span>
                          <span className="text-white font-medium">{name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-green-400 font-bold text-lg">{wins}</span>
                          <p className="text-gray-400 text-xs">weeks won</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">📊 Recent Performance</h3>
                <div className="space-y-3">
                  {weeklyWinsData.slice(-4).map((week, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-300">{week.week}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400 font-semibold">{week.winner}</span>
                        <span className="text-xl">
                          {leaderboardData.find(u => u.name === week.winner)?.avatar}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Wins Chart */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-semibold text-white mb-6">📈 Weekly Winners Over Time</h3>
              <p className="text-gray-400 text-sm mb-6">Track of who used the least energy each week</p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyWinsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="week" 
                      stroke="#9CA3AF" 
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }}
                      formatter={(value, name) => [value === 1 ? 'Winner' : 'No win', name]}
                    />
                    <Legend />
                    <Bar dataKey="alexWins" stackId="a" fill="#10B981" name="Alex Green" />
                    <Bar dataKey="sarahWins" stackId="a" fill="#3B82F6" name="Sarah Eco" />
                    <Bar dataKey="mikeWins" stackId="a" fill="#8B5CF6" name="Mike Clean" />
                    <Bar dataKey="youWins" stackId="a" fill="#F59E0B" name="You" />
                    <Bar dataKey="johnWins" stackId="a" fill="#EF4444" name="John Save" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
                {leaderboardData.map((user, index) => (
                  <div key={index} className="text-center p-3 bg-gray-700/30 rounded-lg">
                    <div className="text-2xl mb-1">{user.avatar}</div>
                    <div className="text-white font-medium text-sm">{user.name}</div>
                    <div className="text-green-400 font-bold">{totalWins[user.name as keyof typeof totalWins]}</div>
                    <div className="text-gray-400 text-xs">total wins</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'challenges':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white">Active Challenges</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {challenges.map((challenge, index) => (
                <div key={index} className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{challenge.icon}</span>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {challenge.reward}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{challenge.title}</h3>
                  <ProgressBar progress={challenge.progress} />
                  <p className="text-gray-400 mt-2">{challenge.progress}% complete</p>
                  <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition-colors">
                    Continue Challenge
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'ai-chat':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white">EcoAI Assistant</h1>
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 h-96">
              <div className="h-full flex flex-col">
                <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={msg.role === 'user' ? 'bg-gray-700/50 p-4 rounded-xl text-right' : 'bg-green-600/20 p-4 rounded-xl text-left'}>
                      <p className="text-white">{msg.content}</p>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Ask about conservation tips..."
                    className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-green-500 focus:outline-none"
                    onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                  />
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors" onClick={handleSend}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white">Event Announcements</h1>
            
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {event.date}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                        <p className="text-gray-400 text-sm capitalize">{event.type} Event</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'data-dashboard':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-white">Data Dashboard</h1>
              <div className="flex items-center space-x-3 bg-gray-800/70 px-4 py-2 rounded-full">
                <Database className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-semibold">Real-time Analytics</span>
              </div>
            </div>
            
            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-600/20 rounded-xl">
                    <Leaf className="w-6 h-6 text-green-400" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">-15%</span>
                </div>
                <h3 className="text-gray-300 text-sm mb-2">Carbon Footprint</h3>
                <p className="text-3xl font-bold text-white mb-1">1.3</p>
                <p className="text-gray-400 text-sm">tons CO2/month</p>
              </div>
              
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-600/20 rounded-xl">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">+12%</span>
                </div>
                <h3 className="text-gray-300 text-sm mb-2">Renewable Energy</h3>
                <p className="text-3xl font-bold text-white mb-1">85%</p>
                <p className="text-gray-400 text-sm">of total usage</p>
              </div>
              
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-cyan-600/20 rounded-xl">
                    <Droplets className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">+8%</span>
                </div>
                <h3 className="text-gray-300 text-sm mb-2">Water Saved</h3>
                <p className="text-3xl font-bold text-white mb-1">370</p>
                <p className="text-gray-400 text-sm">gallons this week</p>
              </div>
              
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-600/20 rounded-xl">
                    <Recycle className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">+18%</span>
                </div>
                <h3 className="text-gray-300 text-sm mb-2">Waste Recycled</h3>
                <p className="text-3xl font-bold text-white mb-1">90%</p>
                <p className="text-gray-400 text-sm">of total waste</p>
              </div>
            </div>

            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-semibold text-white mb-4">📊 Data Management Center</h2>
              <p className="text-gray-300 mb-6">Access and manage your environmental data, export reports, and configure data sources.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition-colors">
                  📈 Export Reports
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl transition-colors">
                  🔗 Data Sources
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl transition-colors">
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-white">Progress Visualization</h1>
              <div className="flex items-center space-x-3 bg-gray-800/70 px-4 py-2 rounded-full">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Environmental Impact</span>
              </div>
            </div>
            
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">📊 Your Environmental Journey</h2>
              <p className="text-gray-300 mb-4">
                Track your progress towards a more sustainable lifestyle with detailed visualizations and insights.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">Carbon Reduction</span>
                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">Energy Efficiency</span>
                <span className="bg-cyan-600/20 text-cyan-400 px-3 py-1 rounded-full text-sm">Water Conservation</span>
                <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">Waste Management</span>
              </div>
            </div>

            {/* Charts Section */}
            <SimpleEcoCharts />
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400 text-xl">Select a section from the navigation</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Inter',sans-serif]">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-green-900/10 to-blue-900/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)] animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-green-500/5 rounded-full animate-bounce [animation-delay:2s]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full animate-pulse [animation-delay:4s]"></div>
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(34,197,94,0.05)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex">
        {/* Sidebar Navigation */}
        <div className="w-80 bg-gray-800/80 backdrop-blur-sm border-r border-gray-700/50 min-h-screen p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">EcoTracker</h1>
              <p className="text-gray-400 text-sm">Green Living Assistant</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl border border-green-500/20">
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-white font-semibold">Eco Warrior</p>
                <p className="text-gray-300 text-sm">Level 7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default EcoTracker;