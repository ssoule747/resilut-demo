import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, X } from 'lucide-react'

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

const notifications = [
  { id: 1, text: 'New deal submitted — 1247 Birch Lane', time: '2m ago' },
  { id: 2, text: 'Inspection report ready for 892 Elm St', time: '18m ago' },
  { id: 3, text: 'Renovation scope approved — Oak Drive', time: '1h ago' },
]

export default function TopBar({ sidebarCollapsed }) {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Dashboard'
  const [notifOpen, setNotifOpen] = useState(false)
  const [dismissed, setDismissed] = useState([])

  const activeNotifs = notifications.filter(n => !dismissed.includes(n.id))

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
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative text-[#94a3b8] transition-colors duration-200 hover:text-[#f8fafc]"
          >
            <Bell className="h-5 w-5" />
            {activeNotifs.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ef4444] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ef4444]" />
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-10 w-80 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/6 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#f8fafc] uppercase tracking-wider">Notifications</span>
                <span className="text-[10px] font-mono text-[#3b82f6] bg-[#3b82f6]/10 px-2 py-0.5 rounded-full">{activeNotifs.length}</span>
              </div>
              {activeNotifs.length === 0 ? (
                <div className="px-4 py-6 text-center text-xs text-[#64748b]">All caught up</div>
              ) : (
                <div className="max-h-60 overflow-y-auto">
                  {activeNotifs.map(n => (
                    <div key={n.id} className="px-4 py-3 hover:bg-white/[0.03] transition-colors flex items-start gap-3 border-b border-white/[0.03] last:border-0">
                      <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#f8fafc] leading-relaxed">{n.text}</p>
                        <p className="text-[10px] text-[#64748b] mt-0.5">{n.time}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setDismissed(d => [...d, n.id]) }}
                        className="text-[#64748b] hover:text-[#94a3b8] transition-colors shrink-0"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

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
