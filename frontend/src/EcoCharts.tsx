"use client"

import * as React from "react"
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  XAxis, 
  YAxis,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Carbon Footprint Data
const carbonFootprintData = [
  { month: "Jan", emissions: 2.8, reduction: 0.2 },
  { month: "Feb", emissions: 2.6, reduction: 0.4 },
  { month: "Mar", emissions: 2.4, reduction: 0.6 },
  { month: "Apr", emissions: 2.2, reduction: 0.8 },
  { month: "May", emissions: 2.1, reduction: 0.9 },
  { month: "Jun", emissions: 1.9, reduction: 1.1 },
  { month: "Jul", emissions: 1.8, reduction: 1.2 },
  { month: "Aug", emissions: 1.7, reduction: 1.3 },
  { month: "Sep", emissions: 1.6, reduction: 1.4 },
  { month: "Oct", emissions: 1.5, reduction: 1.5 },
  { month: "Nov", emissions: 1.4, reduction: 1.6 },
  { month: "Dec", emissions: 1.3, reduction: 1.7 },
]

// Renewable Energy Usage Data
const renewableEnergyData = [
  { date: "2024-01-01", solar: 45, wind: 25, hydro: 15 },
  { date: "2024-02-01", solar: 48, wind: 28, hydro: 18 },
  { date: "2024-03-01", solar: 52, wind: 30, hydro: 20 },
  { date: "2024-04-01", solar: 58, wind: 32, hydro: 22 },
  { date: "2024-05-01", solar: 62, wind: 35, hydro: 25 },
  { date: "2024-06-01", solar: 68, wind: 38, hydro: 28 },
  { date: "2024-07-01", solar: 72, wind: 40, hydro: 30 },
  { date: "2024-08-01", solar: 75, wind: 42, hydro: 32 },
  { date: "2024-09-01", solar: 78, wind: 45, hydro: 35 },
  { date: "2024-10-01", solar: 80, wind: 47, hydro: 38 },
  { date: "2024-11-01", solar: 82, wind: 50, hydro: 40 },
  { date: "2024-12-01", solar: 85, wind: 52, hydro: 42 },
]

// Water Conservation Data
const waterConservationData = [
  { week: "Week 1", usage: 850, saved: 150 },
  { week: "Week 2", usage: 820, saved: 180 },
  { week: "Week 3", usage: 780, saved: 220 },
  { week: "Week 4", usage: 750, saved: 250 },
  { week: "Week 5", usage: 720, saved: 280 },
  { week: "Week 6", usage: 690, saved: 310 },
  { week: "Week 7", usage: 660, saved: 340 },
  { week: "Week 8", usage: 630, saved: 370 },
]

// Waste Reduction Data
const wasteData = [
  { name: "Recycled", value: 45, color: "#22c55e" },
  { name: "Composted", value: 25, color: "#84cc16" },
  { name: "Reused", value: 20, color: "#10b981" },
  { name: "Landfill", value: 10, color: "#ef4444" },
]

// Energy Efficiency Data
const energyEfficiencyData = [
  { appliance: "LED Lights", efficiency: 92, usage: 180 },
  { appliance: "Smart AC", efficiency: 88, usage: 450 },
  { appliance: "Energy Star Fridge", efficiency: 85, usage: 320 },
  { appliance: "Heat Pump", efficiency: 90, usage: 280 },
  { appliance: "Smart Thermostat", efficiency: 95, usage: 120 },
  { appliance: "Solar Water Heater", efficiency: 87, usage: 200 },
]

// Chart configurations
const carbonConfig = {
  emissions: {
    label: "CO2 Emissions",
    color: "hsl(var(--chart-1))",
  },
  reduction: {
    label: "Reduction",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const renewableConfig = {
  solar: {
    label: "Solar",
    color: "hsl(var(--chart-1))",
  },
  wind: {
    label: "Wind",
    color: "hsl(var(--chart-2))",
  },
  hydro: {
    label: "Hydro",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const waterConfig = {
  usage: {
    label: "Water Usage",
    color: "hsl(var(--chart-1))",
  },
  saved: {
    label: "Water Saved",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

// Carbon Footprint Chart Component
export function CarbonFootprintChart() {
  const [timeRange, setTimeRange] = React.useState("12m")

  return (
    <Card className="h-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="flex items-center gap-2">
            🌍 Carbon Footprint Tracking
          </CardTitle>
          <CardDescription>
            Monthly CO2 emissions and reduction progress (tons)
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="12m" className="rounded-lg">
              Last 12 months
            </SelectItem>
            <SelectItem value="6m" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="3m" className="rounded-lg">
              Last 3 months
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={carbonConfig} className="aspect-auto h-[300px] w-full">
          <AreaChart data={carbonFootprintData}>
            <defs>
              <linearGradient id="fillEmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-emissions)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-emissions)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillReduction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-reduction)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-reduction)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="emissions"
              type="natural"
              fill="url(#fillEmissions)"
              stroke="var(--color-emissions)"
              stackId="a"
            />
            <Area
              dataKey="reduction"
              type="natural"
              fill="url(#fillReduction)"
              stroke="var(--color-reduction)"
              stackId="b"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// Renewable Energy Chart Component
export function RenewableEnergyChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ⚡ Renewable Energy Sources
        </CardTitle>
        <CardDescription>
          Monthly renewable energy consumption breakdown (kWh)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={renewableConfig} className="aspect-auto h-[300px] w-full">
          <AreaChart data={renewableEnergyData}>
            <defs>
              <linearGradient id="fillSolar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-solar)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-solar)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillWind" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-wind)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-wind)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillHydro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-hydro)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-hydro)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis 
              dataKey="date" 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { month: "short" })
              }}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="solar"
              type="natural"
              fill="url(#fillSolar)"
              stroke="var(--color-solar)"
              stackId="a"
            />
            <Area
              dataKey="wind"
              type="natural"
              fill="url(#fillWind)"
              stroke="var(--color-wind)"
              stackId="a"
            />
            <Area
              dataKey="hydro"
              type="natural"
              fill="url(#fillHydro)"
              stroke="var(--color-hydro)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// Water Conservation Chart Component
export function WaterConservationChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💧 Water Conservation Progress
        </CardTitle>
        <CardDescription>
          Weekly water usage vs. conservation efforts (gallons)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={waterConfig} className="aspect-auto h-[300px] w-full">
          <BarChart data={waterConservationData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="usage" fill="var(--color-usage)" radius={4} />
            <Bar dataKey="saved" fill="var(--color-saved)" radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// Waste Reduction Pie Chart Component
export function WasteReductionChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ♻️ Waste Management Breakdown
        </CardTitle>
        <CardDescription>
          Current month waste distribution by category
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={wasteData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {wasteData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Energy Efficiency Chart Component
export function EnergyEfficiencyChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏠 Appliance Energy Efficiency
        </CardTitle>
        <CardDescription>
          Energy efficiency ratings vs. monthly usage (kWh)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer 
          config={{
            efficiency: { label: "Efficiency %", color: "hsl(var(--chart-1))" },
            usage: { label: "Usage (kWh)", color: "hsl(var(--chart-2))" }
          }} 
          className="aspect-auto h-[300px] w-full"
        >
          <BarChart data={energyEfficiencyData} layout="horizontal">
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis 
              dataKey="appliance" 
              type="category" 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8}
              width={120}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="efficiency" fill="var(--color-efficiency)" radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// Main Dashboard Component that combines all charts
export function EcoDashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="lg:col-span-2">
        <CarbonFootprintChart />
      </div>
      <RenewableEnergyChart />
      <WaterConservationChart />
      <WasteReductionChart />
      <EnergyEfficiencyChart />
    </div>
  )
}