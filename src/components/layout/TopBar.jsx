import { useLocation } from 'react-router-dom'
import { Bell } from 'lucide-react'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/pipeline': 'Deal Pipeline',
  '/inspection': 'Inspection Intelligence',
  '/renovation': 'Renovation Scope',
  '/underwriting': 'Underwriting Decision',
  '/pm': 'Property Management',
  '/refinance': 'Refinance Intelligence',
  '/analytics': 'Portfolio Analytics',
  '/copilot': 'AI Copilot',
}

export default function TopBar({ sidebarCollapsed }) {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Dashboard'

  return (
    <header
      className="fixed top-0 right-0 z-30 flex h-16 items-center justify-between border-b border-white/6 bg-[#020617] px-6 transition-all duration-200"
      style={{ left: sidebarCollapsed ? '64px' : '240px' }}
    >
      {/* Left side — page title */}
      <h1 className="font-heading text-lg font-semibold text-[#f8fafc]">{title}</h1>

      {/* Right side — notifications + user */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative text-[#94a3b8] transition-colors duration-200 hover:text-[#f8fafc]">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ef4444] opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ef4444]" />
          </span>
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3b82f6]">
            <span className="text-xs font-semibold text-white">AA</span>
          </div>
          <span className="text-sm text-[#94a3b8]">Abdullateef</span>
        </div>
      </div>
    </header>
  )
}
