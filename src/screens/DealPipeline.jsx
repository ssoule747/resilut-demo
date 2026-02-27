import { useState } from 'react'
import { motion } from 'framer-motion'
import PipelineTable from '@/components/shared/PipelineTable'
import DealDetailSheet from '@/components/shared/DealDetailSheet'

export default function DealPipeline() {
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleSelectDeal = (property) => {
    setSelectedDeal(property)
    setSheetOpen(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PipelineTable onSelectDeal={handleSelectDeal} />
      <DealDetailSheet
        property={selectedDeal}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </motion.div>
  )
}
