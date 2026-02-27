import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, RotateCcw, XCircle } from 'lucide-react'
import DealScorecard from '@/components/underwriting/DealScorecard'
import MetricsGrid from '@/components/underwriting/MetricsGrid'
import SensitivityPanel from '@/components/underwriting/SensitivityPanel'
import RiskAnalysis from '@/components/underwriting/RiskAnalysis'

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function Underwriting() {
  const navigate = useNavigate()

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
        <DealScorecard />
      </motion.div>

      <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
        <MetricsGrid />
      </motion.div>

      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <SensitivityPanel />
        <RiskAnalysis />
      </motion.div>

      <motion.div variants={fadeUp} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => navigate('/pm')}
            className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors cursor-pointer"
          >
            <CheckCircle className="h-4 w-4" />
            Approve — Proceed to Acquisition
          </button>
          <button className="inline-flex items-center gap-2 border border-white/[0.1] text-[#94a3b8] hover:text-[#f8fafc] hover:border-white/[0.2] px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer">
            <RotateCcw className="h-4 w-4" />
            Request Additional Review
          </button>
          <button className="inline-flex items-center gap-2 text-[#ef4444]/60 hover:text-[#ef4444] px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer">
            <XCircle className="h-4 w-4" />
            Pass on Deal
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
