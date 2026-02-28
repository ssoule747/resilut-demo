import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Hammer, RefreshCcw, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function InspectionActions() {
  const navigate = useNavigate();
  const [reInspectionRequested, setReInspectionRequested] = useState(false);

  return (
    <motion.div
      className="flex items-center justify-end gap-3 pt-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
    >
      {/* Ghost — Back to Pipeline */}
      <button
        onClick={() => navigate("/pipeline")}
        className="inline-flex items-center gap-2 text-[#64748b] hover:text-[#94a3b8] px-5 py-3 rounded-xl transition-colors duration-200 font-medium text-sm cursor-pointer"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Pipeline
      </button>

      {/* Outline — Request Re-Inspection */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setReInspectionRequested(true)}
        disabled={reInspectionRequested}
        className={`inline-flex items-center gap-2 border px-5 py-3 rounded-xl transition-all duration-200 font-medium text-sm cursor-pointer ${
          reInspectionRequested
            ? 'border-[#f59e0b]/30 text-[#f59e0b] bg-[#f59e0b]/10'
            : 'border-white/[0.1] text-[#94a3b8] hover:text-[#f8fafc] hover:border-white/[0.2]'
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {reInspectionRequested ? <CheckCircle2 className="w-4 h-4" /> : <RefreshCcw className="w-4 h-4" />}
        {reInspectionRequested ? 'Re-Inspection Requested' : 'Request Re-Inspection'}
      </motion.button>

      {/* Primary — Generate Renovation Scope */}
      <button
        onClick={() => navigate("/renovation")}
        className="inline-flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-sm cursor-pointer"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <Hammer className="w-4 h-4" />
        Generate Renovation Scope
        <span className="ml-0.5">&rarr;</span>
      </button>
    </motion.div>
  );
}
