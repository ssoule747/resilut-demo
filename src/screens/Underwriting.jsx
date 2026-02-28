import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, RotateCcw, XCircle, CheckCircle2 } from 'lucide-react'
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
  const [reviewRequested, setReviewRequested] = useState(false)
  const [dealPassed, setDealPassed] = useState(false)

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
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-end md:gap-3 pt-2">
          <button
            onClick={() => navigate('/pm')}
            className="w-full md:w-auto justify-center inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors cursor-pointer"
          >
            <CheckCircle className="h-4 w-4" />
            Approve — Proceed to Acquisition
          </button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setReviewRequested(true)}
            disabled={reviewRequested}
            className={`w-full md:w-auto justify-center inline-flex items-center gap-2 border px-6 py-3 rounded-xl text-sm transition-all cursor-pointer ${
              reviewRequested
                ? 'border-[#f59e0b]/30 text-[#f59e0b] bg-[#f59e0b]/10'
                : 'border-white/[0.1] text-[#94a3b8] hover:text-[#f8fafc] hover:border-white/[0.2]'
            }`}
          >
            {reviewRequested ? <CheckCircle2 className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
            {reviewRequested ? 'Review Requested' : 'Request Additional Review'}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDealPassed(true)}
            disabled={dealPassed}
            className={`w-full md:w-auto justify-center inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm transition-all cursor-pointer ${
              dealPassed
                ? 'text-[#ef4444] bg-[#ef4444]/10 line-through'
                : 'text-[#ef4444]/60 hover:text-[#ef4444]'
            }`}
          >
            <XCircle className="h-4 w-4" />
            {dealPassed ? 'Deal Passed' : 'Pass on Deal'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
