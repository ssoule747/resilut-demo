import { motion } from 'framer-motion'
import { Inbox, Hammer, Home, RefreshCcw } from 'lucide-react'
import StatCard from '@/components/shared/StatCard'
import PipelineFunnel from '@/components/charts/PipelineFunnel'
import BurnRateChart from '@/components/charts/BurnRateChart'
import AIInsightsPanel from '@/components/ai/AIInsightsPanel'
import ActivityFeed from '@/components/shared/ActivityFeed'
import { portfolioKPIs } from '@/data/mockData'

// Stagger container variant
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function Dashboard() {
  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Row 1: Stat Cards */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard
          title="Active Deals"
          value={portfolioKPIs.activeDeals}
          change="+12%"
          changeType="up"
          icon={Inbox}
          color="blue"
        />
        <StatCard
          title="Under Renovation"
          value={portfolioKPIs.underRenovation}
          change="-3%"
          changeType="down"
          icon={Hammer}
          color="orange"
        />
        <StatCard
          title="Rented & Stabilized"
          value={portfolioKPIs.totalProperties}
          change="+8%"
          changeType="up"
          icon={Home}
          color="green"
        />
        <StatCard
          title="Refi Pipeline"
          value={portfolioKPIs.refiPipeline}
          change="+15%"
          changeType="up"
          icon={RefreshCcw}
          color="purple"
        />
      </motion.div>

      {/* Row 2: Charts */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
      >
        <PipelineFunnel />
        <BurnRateChart />
      </motion.div>

      {/* Row 3: AI Insights + Activity Feed */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-4 lg:grid-cols-5"
      >
        <div className="lg:col-span-3">
          <AIInsightsPanel />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </motion.div>
    </motion.div>
  )
}
