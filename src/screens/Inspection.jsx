import { motion } from 'framer-motion'
import PropertyHeader from '@/components/inspection/PropertyHeader'
import InspectionReport from '@/components/inspection/InspectionReport'
import DefectLedgerTable from '@/components/inspection/DefectLedgerTable'
import PhotoGallery from '@/components/inspection/PhotoGallery'
import InspectionActions from '@/components/inspection/InspectionActions'

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

const slideLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
}

const slideRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
}

export default function Inspection() {
  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Property Header */}
      <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
        <PropertyHeader />
      </motion.div>

      {/* Two-panel layout: Inspection Report (left) + Defect Ledger (right) */}
      <motion.div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <motion.div variants={slideLeft} transition={{ duration: 0.5 }} className="lg:col-span-2">
          <InspectionReport />
        </motion.div>
        <motion.div variants={slideRight} transition={{ duration: 0.5 }} className="lg:col-span-3">
          <DefectLedgerTable />
        </motion.div>
      </motion.div>

      {/* Photo Gallery */}
      <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
        <PhotoGallery />
      </motion.div>

      {/* Action Bar */}
      <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
        <InspectionActions />
      </motion.div>
    </motion.div>
  )
}
