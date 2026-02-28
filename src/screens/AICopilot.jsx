import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Send,
  Bot,
  User,
  Check,
  Edit3,
  X,
  Sparkles,
  Brain,
  ChevronDown,
  Zap,
  FileText,
  Clock,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { useMediaQuery } from '@/lib/useMediaQuery'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  copilotTemplates,
  properties,
  portfolioKPIs,
  formatCurrency,
} from '@/data/mockData'
import { callClaude, isAPIConfigured } from '@/lib/anthropic'

// ---------------------------------------------------------------------------
// System prompt for live AI calls
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are the AI Copilot for Resilut, an AI-powered single-family rental (SFR) investment platform managing 312 properties across Memphis, Dallas, Atlanta, and Phoenix.

Platform data context:
- Portfolio: 312 properties, $58.2M total value, $387K monthly NOI, 94.2% occupancy
- Pipeline: 127 active deals, 43 under renovation, 28 in refi pipeline
- YTD: 847 deals closed (102% of 833 target), $102.4M capital deployed
- Markets: Memphis (138 props), Atlanta (82 props), Dallas (56 props), Phoenix (36 props)
- Avg Cash-on-Cash: 10.2%, Avg Days to Rent: 34

Answer questions about properties, deals, portfolio performance, and generate documents. Be concise, data-specific, and format with markdown. Reference actual numbers. Use tables, bullet points, and clear headers.`

// ---------------------------------------------------------------------------
// Pre-loaded conversation
// ---------------------------------------------------------------------------
const initialMessages = [
  {
    id: 1,
    role: 'user',
    content: 'Generate a refinance summary for 4521 Birch Lane, Dallas',
    timestamp: '2:34 PM',
  },
  {
    id: 2,
    role: 'assistant',
    content: `## Refinance Summary \u2014 4521 Birch Lane, Dallas, TX 75216

**Property Overview**
4BR/2BA single-family residence, 1,680 sq ft, built 1974. Acquired via wholesaler at $112,000. Condition tier: Heavy Rehab.

**Renovation**
Completed June 2025. Total renovation cost: $38,400 (within 3% of original scope estimate). All-in basis: $150,400.

**Stabilization**
Tenant placed July 2025 (Maria Rodriguez) at $1,650/mo. Current occupancy: 8 months. Payment history: 5 of 6 months on-time, 1 late payment (October \u2014 resolved).

**Refinance Metrics**
- Current Appraised Value (est.): $218,000
- Loan-to-Value: 69%
- DSCR: 1.52
- Cash-on-Cash Return: 11.8%
- Estimated Cash-Out: $38,500

**Refi Readiness Checklist**
- \u2705 DSCR > 1.25 (Actual: 1.52)
- \u2705 Occupied > 6 months (Actual: 8 months)
- \u2705 Rent roll clean (1 late \u2014 within tolerance)
- \u274C No outstanding maintenance (1 open request \u2014 kitchen sink)
- \u2705 Lender package assembled

**Recommendation:** GO \u2014 Property meets all primary refi criteria. One open maintenance request should be resolved before lender submission. Recommend submitting to First National Lending (7.25% fixed) as primary, with Pacific Mortgage Group as backup. Expected cash-out: **$38,500** with moderate-high confidence based on 23 comparable refis in the Dallas market.`,
    timestamp: '2:34 PM',
    feedback: null,
  },
  {
    id: 3,
    role: 'user',
    content: 'What about the lender comparison for that property?',
    timestamp: '2:35 PM',
  },
  {
    id: 4,
    role: 'assistant',
    content: `## Lender Term Sheet Comparison \u2014 4521 Birch Lane

### Lender A: First National Lending \u2B50 Recommended
| Metric | Value |
|--------|-------|
| Rate | 7.25% Fixed |
| Points | 1.5 |
| Term | 30yr amortization, 5yr balloon |
| Prepayment | 3-year stepdown (5/4/3%) |
| Monthly Payment | $1,089 |
| Closing Costs | $4,200 |

### Lender B: Pacific Mortgage Group \u26A0\uFE0F
| Metric | Value |
|--------|-------|
| Rate | 7.50% Fixed (Years 1-5) |
| Points | 1.0 |
| Term | 30yr amortization |
| Prepayment | 2-year flat (3%) |
| Monthly Payment | $1,117 |
| Closing Costs | $3,800 |

**\u26A0\uFE0F Critical Flag:** Lender B's rate adjusts to SOFR + 3.5% after year 5. At current SOFR projections, this could reach **8.75\u20139.25%** by year 6, adding an estimated **$12,400 in risk exposure** over a 10-year hold.

**AI Recommendation:** Lender A offers better total cost over hold period despite higher upfront points. The fixed rate eliminates interest rate risk entirely. **Recommend Lender A.**`,
    timestamp: '2:35 PM',
    feedback: null,
  },
]

// ---------------------------------------------------------------------------
// Markdown renderer — converts markdown text to HTML string
// ---------------------------------------------------------------------------
function renderMarkdown(text) {
  if (!text) return ''

  const lines = text.split('\n')
  const htmlLines = []
  let inTable = false
  let tableRows = []
  let inList = false

  function flushTable() {
    if (tableRows.length === 0) return
    let html = '<table class="w-full text-sm my-3 border-collapse">'
    tableRows.forEach((row, idx) => {
      // skip separator row (|---|---|)
      if (/^\|[\s\-:]+\|/.test(row) && row.replace(/[\s|:\-]/g, '') === '') return
      const cells = row
        .split('|')
        .filter((c) => c.trim() !== '')
        .map((c) => c.trim())
      if (idx === 0) {
        html += '<thead><tr>'
        cells.forEach(
          (c) =>
            (html += `<th class="text-left py-1.5 px-3 text-[#94a3b8] font-medium border-b border-[#1e293b]">${inlineFormat(c)}</th>`)
        )
        html += '</tr></thead><tbody>'
      } else if (!/^\|[\s\-:]+\|/.test(row) || row.replace(/[\s|:\-]/g, '') !== '') {
        html += '<tr>'
        cells.forEach(
          (c) =>
            (html += `<td class="py-1.5 px-3 text-[#e2e8f0] border-b border-[#1e293b]/50">${inlineFormat(c)}</td>`)
        )
        html += '</tr>'
      }
    })
    html += '</tbody></table>'
    htmlLines.push(html)
    tableRows = []
  }

  function flushList() {
    inList = false
  }

  function inlineFormat(str) {
    // Bold
    str = str.replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#f8fafc] font-semibold">$1</strong>')
    // Inline code
    str = str.replace(/`(.+?)`/g, '<code class="font-mono text-[#3b82f6] bg-[#1e293b] px-1.5 py-0.5 rounded text-xs">$1</code>')
    return str
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Table row
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (!inTable) {
        inTable = true
        tableRows = []
      }
      tableRows.push(line.trim())
      continue
    } else if (inTable) {
      inTable = false
      flushTable()
    }

    // H2
    if (line.startsWith('## ')) {
      flushList()
      htmlLines.push(
        `<h3 class="font-heading text-lg font-semibold text-[#f8fafc] mt-4 mb-2">${inlineFormat(line.slice(3))}</h3>`
      )
      continue
    }

    // H3
    if (line.startsWith('### ')) {
      flushList()
      htmlLines.push(
        `<h4 class="font-heading text-base font-semibold text-[#e2e8f0] mt-3 mb-1.5">${inlineFormat(line.slice(4))}</h4>`
      )
      continue
    }

    // Bullet list
    if (line.startsWith('- ')) {
      if (!inList) {
        inList = true
        htmlLines.push('<ul class="space-y-1 my-2">')
      }
      htmlLines.push(
        `<li class="flex items-start gap-2 text-[#cbd5e1] text-sm leading-relaxed"><span class="text-[#475569] mt-1.5 shrink-0">\u2022</span><span>${inlineFormat(line.slice(2))}</span></li>`
      )
      continue
    } else if (inList) {
      htmlLines.push('</ul>')
      flushList()
    }

    // Empty line
    if (line.trim() === '') {
      if (inList) {
        htmlLines.push('</ul>')
        flushList()
      }
      htmlLines.push('<div class="h-2"></div>')
      continue
    }

    // Paragraph
    htmlLines.push(`<p class="text-[#cbd5e1] text-sm leading-relaxed my-1">${inlineFormat(line)}</p>`)
  }

  // Flush remaining
  if (inTable) flushTable()
  if (inList) htmlLines.push('</ul>')

  return htmlLines.join('\n')
}

// ---------------------------------------------------------------------------
// Typing indicator component
// ---------------------------------------------------------------------------
function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 py-4 px-4">
      <div className="w-8 h-8 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(59,130,246,0.15)]">
        <Bot size={14} className="text-[#3b82f6]" />
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.1)]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-[#3b82f6]"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Message feedback buttons
// ---------------------------------------------------------------------------
function FeedbackButtons({ message, onFeedback }) {
  if (message.role !== 'assistant') return null

  if (message.feedback === 'accepted') {
    return (
      <Badge className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20 text-xs font-normal">
        <Check size={12} className="mr-1" /> Accepted
      </Badge>
    )
  }
  if (message.feedback === 'edited') {
    return (
      <Badge className="bg-[#f97316]/10 text-[#f97316] border-[#f97316]/20 text-xs font-normal">
        <Edit3 size={12} className="mr-1" /> Edited
      </Badge>
    )
  }
  if (message.feedback === 'rejected') {
    return (
      <Badge className="bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20 text-xs font-normal">
        <X size={12} className="mr-1" /> Rejected
      </Badge>
    )
  }

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={() => onFeedback(message.id, 'accepted')}
        className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs text-[#10b981] border border-[#10b981]/20 hover:bg-[#10b981]/10 transition-colors cursor-pointer"
      >
        <Check size={12} /> Accept
      </button>
      <button
        onClick={() => onFeedback(message.id, 'editing')}
        className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs text-[#f97316] border border-[#f97316]/20 hover:bg-[#f97316]/10 transition-colors cursor-pointer"
      >
        <Edit3 size={12} /> Edit
      </button>
      <button
        onClick={() => onFeedback(message.id, 'rejected')}
        className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs text-[#ef4444] border border-[#ef4444]/20 hover:bg-[#ef4444]/10 transition-colors cursor-pointer"
      >
        <X size={12} /> Reject
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Single chat message
// ---------------------------------------------------------------------------
function ChatMessage({ message, onFeedback, onSaveEdit }) {
  const [editContent, setEditContent] = useState(message.content)
  const isUser = message.role === 'user'
  const isEditing = message.feedback === 'editing'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 py-3 px-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser
            ? 'bg-[#1e293b] border border-[#334155]'
            : 'bg-[#3b82f6]/20 border border-[#3b82f6]/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
        }`}
      >
        {isUser ? (
          <User size={14} className="text-[#94a3b8]" />
        ) : (
          <Bot size={14} className="text-[#3b82f6]" />
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] min-w-0`}>
        <div
          className={`rounded-xl px-4 py-3 ${
            isUser
              ? 'glass-card text-[#e2e8f0] text-sm'
              : 'bg-[rgba(59,130,246,0.03)] border border-l-2 border-[rgba(59,130,246,0.1)] border-l-[rgba(59,130,246,0.3)] rounded-tl-sm'
          }`}
        >
          {isUser ? (
            <p className="text-sm text-[#e2e8f0] leading-relaxed">{message.content}</p>
          ) : isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full min-h-[200px] bg-[#0f172a] border border-[#334155] rounded-lg p-3 text-sm text-[#e2e8f0] font-mono resize-y focus:outline-none focus:border-[#3b82f6]/50"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSaveEdit(message.id, editContent)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-[#0f172a] bg-[#f97316] hover:bg-[#f97316]/90 transition-colors cursor-pointer"
                >
                  <Check size={12} /> Save
                </button>
                <button
                  onClick={() => {
                    setEditContent(message.content)
                    onFeedback(message.id, null)
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs text-[#94a3b8] border border-[#334155] hover:bg-[#1e293b] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              className="prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
            />
          )}
        </div>

        {/* Timestamp + feedback */}
        <div className={`flex items-center gap-3 mt-1.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-[10px] text-[#475569]">{message.timestamp}</span>
          {!isEditing && <FeedbackButtons message={message} onFeedback={onFeedback} />}
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Template performance bars
// ---------------------------------------------------------------------------
function TemplatePerformance({ template }) {
  if (!template) return null

  const bars = [
    { label: 'Accept', value: template.acceptRate, color: '#10b981' },
    { label: 'Edit', value: template.editRate, color: '#f97316' },
    { label: 'Reject', value: template.rejectRate, color: '#ef4444' },
  ]

  return (
    <div className="glass-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-heading text-sm font-semibold text-[#f8fafc]">Template Performance</h4>
        <Zap size={14} className="text-[#f97316]" />
      </div>

      <div className="space-y-3">
        {bars.map((bar) => (
          <div key={bar.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94a3b8]">{bar.label}</span>
              <span className="text-[#e2e8f0] font-mono text-xs">{bar.value}%</span>
            </div>
            <div className="h-2 bg-[#1e293b] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${bar.value}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="h-full rounded-full"
                style={{ backgroundColor: bar.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-[#475569] flex items-center gap-1">
        <Clock size={10} />
        Based on 847 generations
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Group templates by category
// ---------------------------------------------------------------------------
const templateCategories = copilotTemplates.reduce((acc, tpl) => {
  if (!acc[tpl.category]) acc[tpl.category] = []
  acc[tpl.category].push(tpl)
  return acc
}, {})

const categoryOrder = ['Finance', 'Marketing', 'Operations', 'Acquisitions', 'Legal']

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function AICopilot() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [templateSheetOpen, setTemplateSheetOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTemplateId, setSelectedTemplateId] = useState(null)
  const [selectedPropertyId, setSelectedPropertyId] = useState(null)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const apiConfigured = isAPIConfigured()

  const selectedTemplate = copilotTemplates.find((t) => t.id === selectedTemplateId) || null
  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) || null

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [inputValue])

  // Send message
  const handleSend = async () => {
    const text = inputValue.trim()
    if (!text || isLoading) return

    const now = new Date()
    const timestamp = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await callClaude(SYSTEM_PROMPT, text)
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content:
          response ||
          'I apologize, but I was unable to generate a response. Please check your API configuration and try again.',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        feedback: null,
        error: !response,
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'AI response unavailable \u2014 check API configuration.',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        feedback: null,
        error: true,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Keyboard handler
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Feedback handler
  const handleFeedback = (messageId, feedback) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, feedback } : m))
    )
  }

  // Save edit handler
  const handleSaveEdit = (messageId, newContent) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, content: newContent, feedback: 'edited' } : m
      )
    )
  }

  // Use template handler
  const handleUseTemplate = () => {
    if (!selectedTemplate) return
    const propertyText = selectedProperty
      ? `${selectedProperty.address}, ${selectedProperty.city}`
      : 'the selected property'
    const prompt = `${selectedTemplate.name} for ${propertyText}`
    setInputValue(prompt)
    textareaRef.current?.focus()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row gap-4 h-[calc(100vh-7rem)]"
    >
      {/* ================================================================= */}
      {/* LEFT PANEL: Chat Interface */}
      {/* ================================================================= */}
      <div className="flex-1 md:flex-[7] flex flex-col glass-card overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e293b]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center">
              <Brain size={18} className="text-[#3b82f6]" />
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold text-[#f8fafc]">AI Copilot</h2>
              <p className="text-[10px] text-[#475569]">
                Real-time portfolio intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="hidden md:inline-flex bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20 text-[10px] font-normal gap-1">
              <Sparkles size={10} />
              Powered by Claude
            </Badge>
            <div className="flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full ${
                  apiConfigured
                    ? 'bg-[#10b981] shadow-[0_0_6px_rgba(16,185,129,0.5)]'
                    : 'bg-[#475569]'
                }`}
              />
              <span className="text-[10px] text-[#64748b]">
                {apiConfigured ? 'Live' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-2">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onFeedback={handleFeedback}
                  onSaveEdit={handleSaveEdit}
                />
              ))}
            </AnimatePresence>
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input bar */}
        <div className="border-t border-[#1e293b] p-4">
          {/* API warning */}
          {!apiConfigured && (
            <div className="mb-3 px-3 py-2 rounded-lg bg-[#f97316]/5 border border-[#f97316]/15 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#f97316] shrink-0" />
              <p className="text-[11px] text-[#f97316]/80">
                Add <code className="font-mono text-[#f97316] bg-[#f97316]/10 px-1 py-0.5 rounded text-[10px]">VITE_ANTHROPIC_API_KEY</code> to{' '}
                <code className="font-mono text-[#f97316] bg-[#f97316]/10 px-1 py-0.5 rounded text-[10px]">.env</code> to enable live AI
              </p>
            </div>
          )}

          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!apiConfigured || isLoading}
                placeholder={
                  apiConfigured
                    ? 'Ask about properties, deals, portfolio performance...'
                    : 'API key required to send messages'
                }
                rows={1}
                className="w-full bg-[#0f172a]/60 border border-[#1e293b] rounded-xl px-4 py-3 pr-12 text-sm text-[#e2e8f0] placeholder:text-[#475569] focus:outline-none focus:border-[#3b82f6]/40 focus:ring-1 focus:ring-[#3b82f6]/20 resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || !apiConfigured || isLoading}
              className="w-10 h-10 rounded-xl bg-[#3b82f6] hover:bg-[#3b82f6]/90 disabled:bg-[#1e293b] disabled:text-[#475569] text-white flex items-center justify-center transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-[10px] text-[#334155]">
              Shift + Enter for new line
            </p>
            <p className="text-[10px] text-[#334155] flex items-center gap-1">
              <Sparkles size={8} className="text-[#3b82f6]/40" />
              Powered by Claude
            </p>
          </div>
        </div>
      </div>

      {/* Mobile floating button to open template sheet */}
      {isMobile && (
        <button
          onClick={() => setTemplateSheetOpen(true)}
          className="fixed bottom-24 right-4 z-40 w-12 h-12 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center shadow-lg shadow-[#8b5cf6]/20"
        >
          <FileText size={20} />
        </button>
      )}

      {/* Mobile template sheet */}
      {isMobile && (
        <Sheet open={templateSheetOpen} onOpenChange={setTemplateSheetOpen}>
          <SheetContent side="bottom" className="bg-[#0f172a] border-t border-white/10 h-[75vh] p-0 rounded-t-2xl">
            <SheetTitle className="sr-only">Templates</SheetTitle>
            <div className="p-4 space-y-4 overflow-y-auto h-full">
              {/* Template selector */}
              <div className="glass-card p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-[#8b5cf6]" />
                  <h3 className="font-heading text-sm font-semibold text-[#f8fafc]">Templates</h3>
                  <Badge className="bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20 text-[10px] font-normal ml-auto">
                    {copilotTemplates.length}
                  </Badge>
                </div>

                <Select value={selectedTemplateId || ''} onValueChange={(v) => setSelectedTemplateId(v)}>
                  <SelectTrigger className="w-full bg-[#0f172a]/60 border-[#1e293b] text-sm text-[#e2e8f0] h-9">
                    <SelectValue placeholder="Choose a template..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0f172a] border-[#1e293b]">
                    {categoryOrder.map((category) => {
                      const templates = templateCategories[category]
                      if (!templates) return null
                      return templates.map((tpl) => (
                        <SelectItem
                          key={tpl.id}
                          value={tpl.id}
                          className="text-[#e2e8f0] text-sm focus:bg-[#1e293b] focus:text-[#f8fafc]"
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{
                                backgroundColor:
                                  category === 'Finance'
                                    ? '#10b981'
                                    : category === 'Marketing'
                                      ? '#3b82f6'
                                      : category === 'Operations'
                                        ? '#f97316'
                                        : category === 'Acquisitions'
                                          ? '#8b5cf6'
                                          : '#ef4444',
                              }}
                            />
                            {tpl.name}
                          </span>
                        </SelectItem>
                      ))
                    })}
                  </SelectContent>
                </Select>

                <AnimatePresence mode="wait">
                  {selectedTemplate ? (
                    <motion.div
                      key={selectedTemplate.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            className="text-[10px] font-normal border"
                            style={{
                              backgroundColor:
                                selectedTemplate.category === 'Finance'
                                  ? 'rgba(16,185,129,0.1)'
                                  : selectedTemplate.category === 'Marketing'
                                    ? 'rgba(59,130,246,0.1)'
                                    : selectedTemplate.category === 'Operations'
                                      ? 'rgba(249,115,22,0.1)'
                                      : selectedTemplate.category === 'Acquisitions'
                                        ? 'rgba(139,92,246,0.1)'
                                        : 'rgba(239,68,68,0.1)',
                              color:
                                selectedTemplate.category === 'Finance'
                                  ? '#10b981'
                                  : selectedTemplate.category === 'Marketing'
                                    ? '#3b82f6'
                                    : selectedTemplate.category === 'Operations'
                                      ? '#f97316'
                                      : selectedTemplate.category === 'Acquisitions'
                                        ? '#8b5cf6'
                                        : '#ef4444',
                              borderColor:
                                selectedTemplate.category === 'Finance'
                                  ? 'rgba(16,185,129,0.2)'
                                  : selectedTemplate.category === 'Marketing'
                                    ? 'rgba(59,130,246,0.2)'
                                    : selectedTemplate.category === 'Operations'
                                      ? 'rgba(249,115,22,0.2)'
                                      : selectedTemplate.category === 'Acquisitions'
                                        ? 'rgba(139,92,246,0.2)'
                                        : 'rgba(239,68,68,0.2)',
                            }}
                          >
                            {selectedTemplate.category}
                          </Badge>
                        </div>
                        <h4 className="font-heading text-sm font-semibold text-[#f8fafc]">
                          {selectedTemplate.name}
                        </h4>
                        <p className="text-xs text-[#94a3b8] leading-relaxed">
                          {selectedTemplate.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] text-[#64748b] font-medium uppercase tracking-wider">
                          Select Property
                        </label>
                        <Select
                          value={selectedPropertyId || ''}
                          onValueChange={(v) => setSelectedPropertyId(v)}
                        >
                          <SelectTrigger className="w-full bg-[#0f172a]/60 border-[#1e293b] text-sm text-[#e2e8f0] h-9">
                            <SelectValue placeholder="Choose property..." />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0f172a] border-[#1e293b]">
                            {properties.map((p) => (
                              <SelectItem
                                key={p.id}
                                value={p.id}
                                className="text-[#e2e8f0] text-sm focus:bg-[#1e293b] focus:text-[#f8fafc]"
                              >
                                {p.address}, {p.city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <button
                        onClick={() => {
                          handleUseTemplate()
                          setTemplateSheetOpen(false)
                        }}
                        disabled={!apiConfigured}
                        className="w-full py-2.5 rounded-lg bg-[#3b82f6] hover:bg-[#3b82f6]/90 disabled:bg-[#1e293b] disabled:text-[#475569] text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Sparkles size={14} />
                        Use Template
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center text-center px-4 py-6"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#1e293b] border border-[#334155] flex items-center justify-center mb-3">
                        <FileText size={20} className="text-[#475569]" />
                      </div>
                      <p className="text-xs text-[#64748b] leading-relaxed">
                        Select a template to generate AI-powered documents, communications, and analyses
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Template performance */}
              <TemplatePerformance template={selectedTemplate} />

              {/* Session Stats */}
              <div className="glass-card p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-[#3b82f6]" />
                  <h4 className="font-heading text-xs font-semibold text-[#f8fafc]">Session Stats</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-lg font-heading font-semibold text-[#f8fafc]">
                      {messages.filter((m) => m.role === 'assistant').length}
                    </p>
                    <p className="text-[10px] text-[#475569]">Generations</p>
                  </div>
                  <div>
                    <p className="text-lg font-heading font-semibold text-[#10b981]">
                      {messages.filter((m) => m.feedback === 'accepted').length}
                    </p>
                    <p className="text-[10px] text-[#475569]">Accepted</p>
                  </div>
                  <div>
                    <p className="text-lg font-heading font-semibold text-[#f97316]">
                      {messages.filter((m) => m.feedback === 'edited').length}
                    </p>
                    <p className="text-[10px] text-[#475569]">Edited</p>
                  </div>
                  <div>
                    <p className="text-lg font-heading font-semibold text-[#ef4444]">
                      {messages.filter((m) => m.feedback === 'rejected').length}
                    </p>
                    <p className="text-[10px] text-[#475569]">Rejected</p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* ================================================================= */}
      {/* RIGHT PANEL: Template Sidebar */}
      {/* ================================================================= */}
      <div className="hidden md:flex md:flex-[3] flex-col gap-4 min-w-0">
        {/* Template selector */}
        <div className="glass-card p-4 flex flex-col gap-4 flex-1 overflow-hidden">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-[#8b5cf6]" />
            <h3 className="font-heading text-sm font-semibold text-[#f8fafc]">Templates</h3>
            <Badge className="bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20 text-[10px] font-normal ml-auto">
              {copilotTemplates.length}
            </Badge>
          </div>

          {/* Template dropdown */}
          <Select value={selectedTemplateId || ''} onValueChange={(v) => setSelectedTemplateId(v)}>
            <SelectTrigger className="w-full bg-[#0f172a]/60 border-[#1e293b] text-sm text-[#e2e8f0] h-9">
              <SelectValue placeholder="Choose a template..." />
            </SelectTrigger>
            <SelectContent className="bg-[#0f172a] border-[#1e293b]">
              {categoryOrder.map((category) => {
                const templates = templateCategories[category]
                if (!templates) return null
                return templates.map((tpl) => (
                  <SelectItem
                    key={tpl.id}
                    value={tpl.id}
                    className="text-[#e2e8f0] text-sm focus:bg-[#1e293b] focus:text-[#f8fafc]"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            category === 'Finance'
                              ? '#10b981'
                              : category === 'Marketing'
                                ? '#3b82f6'
                                : category === 'Operations'
                                  ? '#f97316'
                                  : category === 'Acquisitions'
                                    ? '#8b5cf6'
                                    : '#ef4444',
                        }}
                      />
                      {tpl.name}
                    </span>
                  </SelectItem>
                ))
              })}
            </SelectContent>
          </Select>

          {/* Selected template details */}
          <AnimatePresence mode="wait">
            {selectedTemplate ? (
              <motion.div
                key={selectedTemplate.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 flex-1 overflow-y-auto"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      className="text-[10px] font-normal border"
                      style={{
                        backgroundColor:
                          selectedTemplate.category === 'Finance'
                            ? 'rgba(16,185,129,0.1)'
                            : selectedTemplate.category === 'Marketing'
                              ? 'rgba(59,130,246,0.1)'
                              : selectedTemplate.category === 'Operations'
                                ? 'rgba(249,115,22,0.1)'
                                : selectedTemplate.category === 'Acquisitions'
                                  ? 'rgba(139,92,246,0.1)'
                                  : 'rgba(239,68,68,0.1)',
                        color:
                          selectedTemplate.category === 'Finance'
                            ? '#10b981'
                            : selectedTemplate.category === 'Marketing'
                              ? '#3b82f6'
                              : selectedTemplate.category === 'Operations'
                                ? '#f97316'
                                : selectedTemplate.category === 'Acquisitions'
                                  ? '#8b5cf6'
                                  : '#ef4444',
                        borderColor:
                          selectedTemplate.category === 'Finance'
                            ? 'rgba(16,185,129,0.2)'
                            : selectedTemplate.category === 'Marketing'
                              ? 'rgba(59,130,246,0.2)'
                              : selectedTemplate.category === 'Operations'
                                ? 'rgba(249,115,22,0.2)'
                                : selectedTemplate.category === 'Acquisitions'
                                  ? 'rgba(139,92,246,0.2)'
                                  : 'rgba(239,68,68,0.2)',
                      }}
                    >
                      {selectedTemplate.category}
                    </Badge>
                  </div>
                  <h4 className="font-heading text-sm font-semibold text-[#f8fafc]">
                    {selectedTemplate.name}
                  </h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    {selectedTemplate.description}
                  </p>
                </div>

                {/* Property selector */}
                <div className="space-y-2">
                  <label className="text-[11px] text-[#64748b] font-medium uppercase tracking-wider">
                    Select Property
                  </label>
                  <Select
                    value={selectedPropertyId || ''}
                    onValueChange={(v) => setSelectedPropertyId(v)}
                  >
                    <SelectTrigger className="w-full bg-[#0f172a]/60 border-[#1e293b] text-sm text-[#e2e8f0] h-9">
                      <SelectValue placeholder="Choose property..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f172a] border-[#1e293b]">
                      {properties.map((p) => (
                        <SelectItem
                          key={p.id}
                          value={p.id}
                          className="text-[#e2e8f0] text-sm focus:bg-[#1e293b] focus:text-[#f8fafc]"
                        >
                          {p.address}, {p.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Use template button */}
                <button
                  onClick={handleUseTemplate}
                  disabled={!apiConfigured}
                  className="w-full py-2.5 rounded-lg bg-[#3b82f6] hover:bg-[#3b82f6]/90 disabled:bg-[#1e293b] disabled:text-[#475569] text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  <Sparkles size={14} />
                  Use Template
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center px-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1e293b] border border-[#334155] flex items-center justify-center mb-3">
                  <FileText size={20} className="text-[#475569]" />
                </div>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  Select a template to generate AI-powered documents, communications, and analyses
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Template performance */}
        <TemplatePerformance template={selectedTemplate} />

        {/* Quick stats card */}
        <div className="glass-card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-[#3b82f6]" />
            <h4 className="font-heading text-xs font-semibold text-[#f8fafc]">Session Stats</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-lg font-heading font-semibold text-[#f8fafc]">
                {messages.filter((m) => m.role === 'assistant').length}
              </p>
              <p className="text-[10px] text-[#475569]">Generations</p>
            </div>
            <div>
              <p className="text-lg font-heading font-semibold text-[#10b981]">
                {messages.filter((m) => m.feedback === 'accepted').length}
              </p>
              <p className="text-[10px] text-[#475569]">Accepted</p>
            </div>
            <div>
              <p className="text-lg font-heading font-semibold text-[#f97316]">
                {messages.filter((m) => m.feedback === 'edited').length}
              </p>
              <p className="text-[10px] text-[#475569]">Edited</p>
            </div>
            <div>
              <p className="text-lg font-heading font-semibold text-[#ef4444]">
                {messages.filter((m) => m.feedback === 'rejected').length}
              </p>
              <p className="text-[10px] text-[#475569]">Rejected</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
