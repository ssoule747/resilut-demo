import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search as SearchIcon, ChevronRight } from 'lucide-react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import StatusBadge from '@/components/shared/StatusBadge'
import DealScoreBar from '@/components/shared/DealScoreBar'
import { properties, getWholesalerById } from '@/data/mockData'

export default function PipelineTable({ onSelectDeal }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const statuses = [...new Set(properties.map((p) => p.status))]

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch =
        searchQuery === '' ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex flex-1 items-center gap-3">
          {/* Search input */}
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
            <Input
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-64 border-white/6 bg-[#0f172a] pl-9 text-[#f8fafc] placeholder:text-[#64748b]"
            />
          </div>

          {/* Status filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-48 border-white/6 bg-[#0f172a] text-[#94a3b8]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="border-white/6 bg-[#0f172a]">
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Deal count */}
        <span className="text-sm text-[#64748b]">
          {filteredProperties.length} deals
        </span>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden rounded-xl">
        <Table>
          <TableHeader className="bg-[#0f172a]/50">
            <TableRow>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Status
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Address
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                City
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Wholesaler
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Submitted
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
                Score
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.map((property, index) => (
              <motion.tr
                key={property.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="cursor-pointer transition-all duration-150 hover:bg-[#1e293b]/50 border-l-2 border-transparent hover:border-[#3b82f6]/50"
                onClick={() => onSelectDeal(property)}
              >
                <TableCell>
                  <StatusBadge status={property.status} />
                </TableCell>
                <TableCell className="text-sm font-medium text-[#f8fafc]">
                  {property.address}
                </TableCell>
                <TableCell className="text-sm text-[#94a3b8]">
                  {property.city}, {property.state}
                </TableCell>
                <TableCell className="text-sm text-[#94a3b8]">
                  {getWholesalerById(property.wholesalerId)?.name}
                </TableCell>
                <TableCell className="font-mono text-sm text-[#64748b]">
                  {new Date(property.submittedDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <DealScoreBar score={property.dealScore} />
                </TableCell>
                <TableCell>
                  <ChevronRight className="h-4 w-4 text-[#334155]" />
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
