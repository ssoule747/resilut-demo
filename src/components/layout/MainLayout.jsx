import { useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { useMediaQuery } from '@/lib/useMediaQuery'
import Sidebar, { navItems, badgeStyles } from './Sidebar'
import TopBar from './TopBar'

export default function MainLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)')
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#020617]">
      <div className="noise-overlay" />

      {/* Desktop sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Mobile sidebar sheet */}
      {isMobile && (
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-[260px] bg-[#0f172a] border-r border-white/6 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            {/* Logo */}
            <div className="flex h-16 items-center px-4 border-b border-white/6">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <rect x="2" y="2" width="12" height="12" rx="2" fill="#3b82f6" opacity="0.9" />
                <rect x="18" y="2" width="12" height="12" rx="2" fill="#3b82f6" opacity="0.5" />
                <rect x="2" y="18" width="12" height="12" rx="2" fill="#3b82f6" opacity="0.5" />
                <rect x="18" y="18" width="12" height="12" rx="2" fill="#3b82f6" opacity="0.3" />
                <path d="M8 8h0M24 8h0M8 24h0M24 24h0" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="ml-3 font-heading text-lg font-bold tracking-wider text-white">RESILUT</span>
            </div>
            {/* Nav items */}
            <nav className="mt-4 flex flex-col gap-1 px-3">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                        isActive
                          ? 'border-l-2 border-[#3b82f6] bg-[#3b82f6]/10 font-medium text-[#3b82f6]'
                          : 'border-l-2 border-transparent text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f8fafc]'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="flex-1 min-w-0 truncate">{item.label}</span>
                    {item.badge && (
                      item.badge === 'star' ? (
                        <Star className="h-3.5 w-3.5 shrink-0 fill-[#f59e0b] text-[#f59e0b] drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                      ) : (
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${badgeStyles[item.badge] || ''}`}>
                          {item.badge}
                        </span>
                      )
                    )}
                  </NavLink>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      )}

      <TopBar
        sidebarCollapsed={sidebarCollapsed}
        isMobile={isMobile}
        onMobileMenuOpen={() => setMobileMenuOpen(true)}
      />

      <main
        className="pt-16 transition-all duration-200"
        style={{ marginLeft: isMobile ? '0px' : (sidebarCollapsed ? '64px' : '240px') }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="p-4 md:p-6"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
