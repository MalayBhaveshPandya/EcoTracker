import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  XAxis, 
  YAxis,
  Bar,
  BarChart,
  ResponsiveContainer
} from "recharts"

// Simple chart data
const carbonData = [
  { month: "Jan", emissions: 2.8 },
  { month: "Feb", emissions: 2.6 },
  { month: "Mar", emissions: 2.4 },
  { month: "Apr", emissions: 2.2 },
  { month: "May", emissions: 2.1 },
  { month: "Jun", emissions: 1.9 },
]

const energyData = [
  { month: "Jan", solar: 45, wind: 25 },
  { month: "Feb", solar: 48, wind: 28 },
  { month: "Mar", solar: 52, wind: 30 },
  { month: "Apr", solar: 58, wind: 32 },
  { month: "May", solar: 62, wind: 35 },
  { month: "Jun", solar: 68, wind: 38 },
]

const waterData = [
  { week: "Week 1", usage: 850, saved: 150 },
  { week: "Week 2", usage: 820, saved: 180 },
  { week: "Week 3", usage: 780, saved: 220 },
  { week: "Week 4", usage: 750, saved: 250 },
]
const deviceEfficiencyData = [
  { name: "LED Lights", efficiency: 92, category: "lighting", usage: 180 },
  { name: "Smart HVAC", efficiency: 88, category: "climate", usage: 560 },
  { name: "Water Heater", efficiency: 85, category: "heating", usage: 320 },
  { name: "Smart TV", efficiency: 90, category: "electronics", usage: 150 },
  { name: "Refrigerator", efficiency: 87, category: "appliances", usage: 280 },
  { name: "Washing Machine", efficiency: 89, category: "laundry", usage: 120 },
  { name: "Dishwasher", efficiency: 86, category: "appliances", usage: 95 },
  { name: "Computer Setup", efficiency: 91, category: "electronics", usage: 180 }
]

// Vehicle energy data
const vehicleEnergyData = [
  { name: "Electric Car", consumption: 85, efficiency: 95, type: "Electric", color: "#10B981" },
  { name: "Airplane", consumption: 450, efficiency: 35, type: "Aviation", color: "#3B82F6" },
  { name: "Gas Vehicle", consumption: 45, efficiency: 25, type: "Gasoline", color: "#EF4444" },
  { name: "E-Bike", consumption: 12, efficiency: 98, type: "Electric", color: "#06B6D4" }
]

// Simple chart components without shadcn/ui dependencies
export function SimpleCarbonChart() {
  return (
    <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        🌍 Carbon Footprint Tracking
      </h3>
      <p className="text-gray-400 text-sm mb-4">Monthly CO2 emissions (tons)</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={carbonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Area 
              type="monotone" 
              dataKey="emissions" 
              stroke="#10B981" 
              fill="#10B981" 
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function SimpleEnergyChart() {
  return (
    <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        ⚡ Renewable Energy Sources
      </h3>
      <p className="text-gray-400 text-sm mb-4">Monthly renewable energy (kWh)</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={energyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Area 
              type="monotone" 
              dataKey="solar" 
              stackId="1"
              stroke="#F59E0B" 
              fill="#F59E0B" 
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="wind" 
              stackId="1"
              stroke="#3B82F6" 
              fill="#3B82F6" 
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function SimpleWaterChart() {
  return (
    <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        💧 Water Conservation
      </h3>
      <p className="text-gray-400 text-sm mb-4">Weekly water usage vs saved (gallons)</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={waterData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="week" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Bar dataKey="usage" fill="#EF4444" />
            <Bar dataKey="saved" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function SimpleDeviceChart() {
  return (
    <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-xl font-semibold text-white mb-4">🏠 Device Energy Efficiency</h3>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {deviceEfficiencyData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
            <div className="flex-1">
              <span className="text-gray-300 font-medium">{item.name}</span>
              <div className="text-gray-500 text-xs capitalize">{item.category} • {item.usage} kWh/month</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                  style={{ width: `${item.efficiency}%` }}
                />
              </div>
              <span className="text-green-400 font-medium w-12 text-sm">{item.efficiency}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SimpleVehicleChart() {
  return (
    <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-xl font-semibold text-white mb-4">🚗 Vehicle Energy Tracking</h3>
      <div className="space-y-4">
        {vehicleEnergyData.map((vehicle, index) => (
          <div key={index} className="p-4 bg-gray-700/30 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-white font-semibold">{vehicle.name}</h4>
                <span className="text-gray-400 text-sm">{vehicle.type} Vehicle</span>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{vehicle.consumption}</div>
                <div className="text-gray-400 text-xs">
                  {vehicle.type === 'Electric' ? 'kWh' : vehicle.type === 'Aviation' ? 'gal/flight' : 'gallons'}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-400">Efficiency</span>
              <span style={{ color: vehicle.color }}>{vehicle.efficiency}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-1000"
                style={{ 
                  width: `${vehicle.efficiency}%`,
                  backgroundColor: vehicle.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SimpleWasteChart() {
  return (
    <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        ♻️ Waste Management
      </h3>
      <p className="text-gray-400 text-sm mb-4">Waste breakdown by category</p>
      <div className="h-64 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <div className="text-center p-4 bg-green-600/20 rounded-xl">
            <div className="text-3xl mb-2">45%</div>
            <div className="text-green-400 font-medium">Recycled</div>
          </div>
          <div className="text-center p-4 bg-lime-600/20 rounded-xl">
            <div className="text-3xl mb-2">25%</div>
            <div className="text-lime-400 font-medium">Composted</div>
          </div>
          <div className="text-center p-4 bg-emerald-600/20 rounded-xl">
            <div className="text-3xl mb-2">20%</div>
            <div className="text-emerald-400 font-medium">Reused</div>
          </div>
          <div className="text-center p-4 bg-red-600/20 rounded-xl">
            <div className="text-3xl mb-2">10%</div>
            <div className="text-red-400 font-medium">Landfill</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SimpleEcoCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="lg:col-span-2">
        <SimpleCarbonChart />
      </div>
      <SimpleEnergyChart />
      <SimpleWaterChart />
      <SimpleWasteChart />
      <SimpleDeviceChart />
      <SimpleVehicleChart />
    </div>
  )
}