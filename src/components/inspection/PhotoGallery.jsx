import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const photos = [
  {
    label: "Foundation Crack",
    severity: "Critical",
    badgeClasses: "bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30",
  },
  {
    label: "Roof Damage",
    severity: "Major",
    badgeClasses: "bg-[#f97316]/20 text-[#f97316] border border-[#f97316]/30",
  },
  {
    label: "Electrical Panel",
    severity: "Critical",
    badgeClasses: "bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30",
  },
  {
    label: "HVAC Unit",
    severity: "Major",
    badgeClasses: "bg-[#f97316]/20 text-[#f97316] border border-[#f97316]/30",
  },
  {
    label: "Mold / Water Damage",
    severity: "Major",
    badgeClasses: "bg-[#f97316]/20 text-[#f97316] border border-[#f97316]/30",
  },
  {
    label: "Kitchen Cabinets",
    severity: "Minor",
    badgeClasses: "bg-[#64748b]/20 text-[#94a3b8] border border-[#64748b]/30",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function PhotoGallery() {
  return (
    <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/[0.06] rounded-xl p-6">
      <h2 className="font-heading text-[#f8fafc] text-sm font-semibold mb-5 uppercase tracking-wider">
        Tagged Condition Photos
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {photos.map((photo) => (
          <motion.div
            key={photo.label}
            variants={card}
            className="relative aspect-video bg-[#1e293b] border border-white/[0.04] rounded-xl overflow-hidden hover:border-white/[0.1] transition-colors duration-200 flex items-center justify-center"
          >
            {/* Placeholder icon */}
            <Camera className="w-10 h-10 text-[#334155]" strokeWidth={1.5} />

            {/* Severity badge */}
            <span
              className={`absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${photo.badgeClasses}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {photo.label}
              <span className="opacity-60">|</span>
              {photo.severity}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
