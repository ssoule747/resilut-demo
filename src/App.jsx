import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import DealPipeline from './screens/DealPipeline'
import Inspection from './screens/Inspection'
import RenovationScope from './screens/RenovationScope'
import Underwriting from './screens/Underwriting'
import PropertyManagement from './screens/PropertyManagement'
import Refinance from './screens/Refinance'
import KPIDashboard from './screens/KPIDashboard'
import AICopilot from './screens/AICopilot'

export default function App() {
  return (
    <Routes>
      {/* Login — no sidebar/topbar */}
      <Route path="/" element={<Login />} />

      {/* All other routes wrapped in MainLayout */}
      <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/pipeline" element={<MainLayout><DealPipeline /></MainLayout>} />
      <Route path="/inspection" element={<MainLayout><Inspection /></MainLayout>} />
      <Route path="/renovation" element={<MainLayout><RenovationScope /></MainLayout>} />
      <Route path="/underwriting" element={<MainLayout><Underwriting /></MainLayout>} />
      <Route path="/pm" element={<MainLayout><PropertyManagement /></MainLayout>} />
      <Route path="/refinance" element={<MainLayout><Refinance /></MainLayout>} />
      <Route path="/analytics" element={<MainLayout><KPIDashboard /></MainLayout>} />
      <Route path="/copilot" element={<MainLayout><AICopilot /></MainLayout>} />
    </Routes>
  )
}
