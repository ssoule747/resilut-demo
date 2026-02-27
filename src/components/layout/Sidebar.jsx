import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Inbox,
  Search,
  Hammer,
  Calculator,
  Home,
  RefreshCcw,
  BarChart3,
  Bot,
  ChevronLeft,
} from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/pipeline', label: 'Deal Pipeline', icon: Inbox },
  { path: '/inspection', label: 'Inspection', icon: Search },
  { path: '/renovation', label: 'Renovation Scope', icon: Hammer, badge: 'Priority' },
  { path: '/underwriting', label: 'Underwriting', icon: Calculator },
  { path: '/pm', label: 'Property Mgmt', icon: Home },
  { path: '/refinance', label: 'Refinance', icon: RefreshCcw },
  { path: '/analytics', label: 'Portfolio Analytics', icon: BarChart3 },
  { path: '/copilot', label: 'AI Copilot', icon: Bot, badge: 'AI' },
]

const badgeStyles = {
  Priority: 'bg-[#f59e0b]/10 text-[#f59e0b]',
  AI: 'bg-[#8b5cf6]/10 text-[#8b5cf6]',
}

export default function Sidebar({ isCollapsed, onToggle }) {
  return (
    <aside
      className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/6 bg-[#0f172a] transition-all duration-200"
      style={{ width: isCollapsed ? '64px' : '240px' }}
    >
      {/* Logo area */}
      <div className="flex h-16 items-center px-4">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <rect x="2" y="2" width="12" height="12" rx="2" fill="#3b82f6" opacity="0.9" />
          <rect x="18" y="2" width="12" height="12" rx="2" fill="#3b82f6" opacity="0.5" />
          <rect x="2" y="18" width="12" height="12" rx="2" fill="#3b82f6" opacity="0.5" />
          <rect x="18" y="18" width="12" height="12" rx="2" fill="#3b82f6" opacity="0.3" />
          <path d="M8 8h0M24 8h0M8 24h0M24 24h0" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span
          className={`ml-3 font-heading text-lg font-bold tracking-wider text-white transition-all duration-200 ${
            isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'
          }`}
        >
          RESILUT
        </span>
      </div>

      {/* Navigation items */}
      <nav className="mt-6 flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                  isActive
                    ? 'border-l-2 border-[#3b82f6] bg-[#3b82f6]/10 font-medium text-[#3b82f6] shadow-[inset_0_0_12px_rgba(59,130,246,0.05)]'
                    : 'border-l-2 border-transparent text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f8fafc] hover:translate-x-0.5'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span
                className={`whitespace-nowrap transition-all duration-200 ${
                  isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'
                }`}
              >
                {item.label}
              </span>
              {item.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase transition-all duration-200 ${
                    badgeStyles[item.badge] || ''
                  } ${isCollapsed ? 'hidden' : ''}`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 pb-4">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg px-3 py-2.5 text-[#64748b] transition-all duration-200 hover:text-[#f8fafc]"
        >
          <ChevronLeft
            className="h-5 w-5 transition-transform duration-200"
            style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>
      </div>
    </aside>
  )
}
