// ============================================================================
// Resilut Demo — Single Source of Truth
// All screens pull from this file. Data is internally consistent.
// ============================================================================

// ---------------------------------------------------------------------------
// 1. PROPERTIES (10 across 4 markets)
// ---------------------------------------------------------------------------
export const properties = [
  {
    id: 'prop-001',
    address: '1847 Magnolia Drive',
    city: 'Memphis',
    state: 'TN',
    zip: '38106',
    beds: 3,
    baths: 2,
    sqft: 1450,
    yearBuilt: 1962,
    propertyType: 'Single Family Residential',
    conditionTier: 'Heavy Rehab',
    purchasePrice: 85000,
    arv: 185000,
    estimatedRent: 1450,
    status: 'Underwriting',
    wholesalerId: 'ws-001',
    dealScore: 82,
    submittedDate: '2026-02-15',
  },
  {
    id: 'prop-002',
    address: '2203 Oak Street',
    city: 'Memphis',
    state: 'TN',
    zip: '38109',
    beds: 4,
    baths: 2,
    sqft: 1680,
    yearBuilt: 1958,
    propertyType: 'Single Family Residential',
    conditionTier: 'Heavy Rehab',
    purchasePrice: 72000,
    arv: 165000,
    estimatedRent: 1350,
    status: 'Scope in Progress',
    wholesalerId: 'ws-006',
    dealScore: 71,
    submittedDate: '2026-02-10',
  },
  {
    id: 'prop-003',
    address: '4521 Birch Lane',
    city: 'Dallas',
    state: 'TX',
    zip: '75216',
    beds: 4,
    baths: 2,
    sqft: 1680,
    yearBuilt: 1974,
    propertyType: 'Single Family Residential',
    conditionTier: 'Stabilized',
    purchasePrice: 112000,
    arv: 215000,
    estimatedRent: 1650,
    status: 'Rented',
    wholesalerId: 'ws-002',
    dealScore: 88,
    submittedDate: '2025-04-22',
  },
  {
    id: 'prop-004',
    address: '891 Peachtree Court',
    city: 'Atlanta',
    state: 'GA',
    zip: '30310',
    beds: 3,
    baths: 2,
    sqft: 1320,
    yearBuilt: 1968,
    propertyType: 'Single Family Residential',
    conditionTier: 'Moderate Rehab',
    purchasePrice: 95000,
    arv: 195000,
    estimatedRent: 1500,
    status: 'Renovating',
    wholesalerId: 'ws-003',
    dealScore: 76,
    submittedDate: '2025-09-14',
  },
  {
    id: 'prop-005',
    address: '1502 Glenwood Ave',
    city: 'Atlanta',
    state: 'GA',
    zip: '30316',
    beds: 3,
    baths: 1,
    sqft: 1100,
    yearBuilt: 1955,
    propertyType: 'Single Family Residential',
    conditionTier: 'Stabilized',
    purchasePrice: 68000,
    arv: 145000,
    estimatedRent: 1200,
    status: 'Rented',
    wholesalerId: 'ws-003',
    dealScore: 64,
    submittedDate: '2025-05-08',
  },
  {
    id: 'prop-006',
    address: '3340 Desert Vista Rd',
    city: 'Phoenix',
    state: 'AZ',
    zip: '85040',
    beds: 3,
    baths: 2,
    sqft: 1540,
    yearBuilt: 1978,
    propertyType: 'Single Family Residential',
    conditionTier: 'Stabilized',
    purchasePrice: 135000,
    arv: 245000,
    estimatedRent: 1750,
    status: 'Refi Ready',
    wholesalerId: 'ws-004',
    dealScore: 85,
    submittedDate: '2025-03-12',
  },
  {
    id: 'prop-007',
    address: '7712 Elm Creek Dr',
    city: 'Dallas',
    state: 'TX',
    zip: '75241',
    beds: 3,
    baths: 2,
    sqft: 1380,
    yearBuilt: 1970,
    propertyType: 'Single Family Residential',
    conditionTier: 'Moderate Rehab',
    purchasePrice: 98000,
    arv: 190000,
    estimatedRent: 1500,
    status: 'Approved',
    wholesalerId: 'ws-002',
    dealScore: 79,
    submittedDate: '2026-01-28',
  },
  {
    id: 'prop-008',
    address: '445 Riverside Blvd',
    city: 'Memphis',
    state: 'TN',
    zip: '38103',
    beds: 2,
    baths: 1,
    sqft: 980,
    yearBuilt: 1951,
    propertyType: 'Single Family Residential',
    conditionTier: 'Unknown',
    purchasePrice: 45000,
    arv: 110000,
    estimatedRent: 950,
    status: 'Needs Info',
    wholesalerId: 'ws-006',
    dealScore: 58,
    submittedDate: '2026-02-23',
  },
  {
    id: 'prop-009',
    address: '2890 Magnolia Heights',
    city: 'Atlanta',
    state: 'GA',
    zip: '30318',
    beds: 4,
    baths: 3,
    sqft: 2100,
    yearBuilt: 1982,
    propertyType: 'Single Family Residential',
    conditionTier: 'Moderate Rehab',
    purchasePrice: 145000,
    arv: 285000,
    estimatedRent: 2100,
    status: 'Inspection Scheduled',
    wholesalerId: 'ws-005',
    dealScore: 91,
    submittedDate: '2026-02-20',
  },
  {
    id: 'prop-010',
    address: '1156 Cactus Wren Ln',
    city: 'Phoenix',
    state: 'AZ',
    zip: '85042',
    beds: 3,
    baths: 2,
    sqft: 1420,
    yearBuilt: 1975,
    propertyType: 'Single Family Residential',
    conditionTier: 'Stabilized',
    purchasePrice: 128000,
    arv: 230000,
    estimatedRent: 1650,
    status: 'Refi Ready',
    wholesalerId: 'ws-004',
    dealScore: 83,
    submittedDate: '2025-04-05',
  },
]

// Convenience reference
export const HERO_PROPERTY = properties[0]

// ---------------------------------------------------------------------------
// 2. WHOLESALERS
// ---------------------------------------------------------------------------
export const wholesalers = [
  {
    id: 'ws-001',
    name: 'Marcus Johnson',
    company: 'Memphis Wholesale Group',
    totalDeals: 23,
    closedDeals: 20,
    avgArvAccuracy: 87,
    avgCostDeviation: 8,
    reliabilityScore: 'Reliable',
    reliabilityPercent: 87,
  },
  {
    id: 'ws-002',
    name: 'Sarah Chen',
    company: 'DFW Deal Source',
    totalDeals: 45,
    closedDeals: 38,
    avgArvAccuracy: 92,
    avgCostDeviation: 5,
    reliabilityScore: 'Reliable',
    reliabilityPercent: 92,
  },
  {
    id: 'ws-003',
    name: 'DeAndre Williams',
    company: 'Atlanta Property Solutions',
    totalDeals: 12,
    closedDeals: 8,
    avgArvAccuracy: 74,
    avgCostDeviation: 15,
    reliabilityScore: 'Average',
    reliabilityPercent: 74,
  },
  {
    id: 'ws-004',
    name: 'Jennifer Martinez',
    company: 'Southwest Acquisitions',
    totalDeals: 31,
    closedDeals: 27,
    avgArvAccuracy: 89,
    avgCostDeviation: 7,
    reliabilityScore: 'Reliable',
    reliabilityPercent: 89,
  },
  {
    id: 'ws-005',
    name: 'Robert Kim',
    company: 'New Horizon Investments',
    totalDeals: 5,
    closedDeals: 3,
    avgArvAccuracy: 68,
    avgCostDeviation: 22,
    reliabilityScore: 'New',
    reliabilityPercent: 68,
  },
  {
    id: 'ws-006',
    name: 'Amanda Taylor',
    company: 'Mid-South Wholesale Co',
    totalDeals: 18,
    closedDeals: 14,
    avgArvAccuracy: 81,
    avgCostDeviation: 11,
    reliabilityScore: 'Average',
    reliabilityPercent: 81,
  },
]

// ---------------------------------------------------------------------------
// 3. DEFECT LEDGER (for prop-001 — 1847 Magnolia Drive)
// ---------------------------------------------------------------------------
export const defectLedger = [
  {
    id: 'D-001',
    defect: 'Foundation crack, NE corner, 12 linear ft, lateral displacement 1/8"–3/8"',
    system: 'Structural',
    trade: 'Foundation / Waterproofing',
    severity: 'Critical',
    urgency: 'Immediate',
    codeRelevance: true,
    description:
      'Upon inspection of the northeast corner of the foundation, evidence of significant structural cracking was observed extending approximately 12 linear feet along the exterior basement wall. The crack width varies from 1/8 inch to 3/8 inch with evidence of lateral displacement. Moisture intrusion was noted at the base of the affected area, with standing water observed in the northeast corner of the basement following recent precipitation. This condition constitutes a structural deficiency that should be evaluated by a licensed structural engineer prior to acquisition. The inspection team recommends full perimeter excavation and waterproofing assessment.',
  },
  {
    id: 'D-002',
    defect: 'Roof shingle deterioration, ~30% coverage, curling and granule loss',
    system: 'Roofing',
    trade: 'Roofing',
    severity: 'Major',
    urgency: 'Before occupancy',
    codeRelevance: true,
    description:
      'The roofing system consists of three-tab asphalt shingles that appear to be original to the construction date (estimated 1962). Approximately 30% of the shingle coverage on the south-facing and west-facing slopes shows significant deterioration including curling, missing tabs, and granule loss. Several areas of exposed underlayment were observed on the south-facing slope. One area approximately 4 feet by 6 feet on the west slope showed evidence of prior patch repair that has since failed.',
  },
  {
    id: 'D-003',
    defect: 'Electrical panel outdated — Federal Pacific Stab-Lok, overheating evidence',
    system: 'Electrical',
    trade: 'Electrical',
    severity: 'Critical',
    urgency: 'Immediate',
    codeRelevance: true,
    description:
      'The main electrical service panel is a Federal Pacific Stab-Lok model, which has been the subject of widespread safety concerns and is no longer manufactured. The panel showed signs of overheating at multiple breaker connections, with discoloration visible on the bus bar. The panel is rated at 100 amps; current code typically requires 200-amp service for a residence of this size. A full panel replacement with service upgrade is strongly recommended.',
  },
  {
    id: 'D-004',
    defect: 'HVAC system non-functional, 22 years old, compressor failure',
    system: 'HVAC',
    trade: 'HVAC',
    severity: 'Major',
    urgency: 'Before occupancy',
    codeRelevance: true,
    description:
      'The HVAC system is a split system with an estimated age of 22 years (Trane model, serial number indicates 2002 manufacture date). The outdoor compressor unit failed to engage during testing. The air handler and ductwork show signs of significant wear and biological contamination. Given the age and condition, full system replacement is the most cost-effective remediation path.',
  },
  {
    id: 'D-005',
    defect: 'Water damage + active mold, master bathroom ceiling and walls',
    system: 'Plumbing / Environmental',
    trade: 'Plumbing + Remediation',
    severity: 'Major',
    urgency: 'Before occupancy',
    codeRelevance: true,
    description:
      'Evidence of chronic water intrusion was observed in the master bathroom. Ceiling drywall shows extensive water staining and soft spots. Wall surfaces behind the vanity area show visible mold growth (suspected Stachybotrys and Aspergillus species — professional testing recommended). The subfloor in the immediate area feels soft underfoot, suggesting structural compromise of the floor joists. Plumbing inspection revealed a failed supply line connection behind the wall that is the likely source of the chronic moisture condition.',
  },
  {
    id: 'D-006',
    defect: 'Kitchen cabinets damaged/warped from moisture exposure',
    system: 'Interior',
    trade: 'Carpentry',
    severity: 'Minor',
    urgency: 'Cosmetic',
    codeRelevance: false,
    description:
      'The kitchen cabinetry shows damage consistent with prolonged moisture exposure: warped face frames, delaminating surfaces on lower cabinets, and soft particle board substrate. Upper cabinets are in serviceable condition. Full lower cabinet replacement is recommended.',
  },
  {
    id: 'D-007',
    defect: 'Exterior paint peeling, ~60% of siding surface',
    system: 'Exterior',
    trade: 'Painting',
    severity: 'Minor',
    urgency: 'Within 1 year',
    codeRelevance: false,
    description:
      'Exterior paint is peeling across approximately 60% of the wood siding surface area. Most affected areas are on the south and west elevations with the highest sun exposure. Bare wood is exposed in multiple locations, increasing risk of moisture damage to the siding substrate. Power washing, scraping, priming, and two coats of exterior paint are recommended.',
  },
  {
    id: 'D-008',
    defect: 'Broken windows (3 of 12), single-pane throughout',
    system: 'Exterior',
    trade: 'Glazing',
    severity: 'Moderate',
    urgency: 'Before occupancy',
    codeRelevance: false,
    description:
      'Three windows throughout the property are broken or cracked. All windows are original single-pane units. Replacement with double-pane vinyl units recommended for energy efficiency and habitability compliance.',
  },
]

// ---------------------------------------------------------------------------
// 4. RENOVATION SCOPE (for prop-001)
//    Base cost: $47,235 | Contingency 10%: $4,724 | Total: $51,959
// ---------------------------------------------------------------------------
export const renovationScope = {
  propertyId: 'prop-001',
  generatedIn: 47, // seconds — the "money shot" stat
  rsMeansConfidence: 94,
  estimatedDuration: '6–8 weeks',
  baseCost: 47235,
  contingencyPercent: 10,
  contingencyAmount: 4724,
  totalBudget: 51959,
  trades: {
    foundation: {
      trade: 'Foundation & Waterproofing',
      defectId: 'D-001',
      subtotal: 8840,
      items: [
        { id: 'SOW-001', description: 'Excavate & waterproof foundation exterior', qty: 80, unit: 'LF', unitCost: 70.50, total: 5640 },
        { id: 'SOW-002', description: 'Structural crack repair — epoxy injection', qty: 12, unit: 'LF', unitCost: 125.00, total: 1500 },
        { id: 'SOW-003', description: 'Interior drain tile system', qty: 40, unit: 'LF', unitCost: 42.50, total: 1700 },
      ],
    },
    roofing: {
      trade: 'Roofing',
      defectId: 'D-002',
      subtotal: 7245,
      items: [
        { id: 'SOW-004', description: 'Tear-off existing shingles', qty: 15, unit: 'SQ', unitCost: 95.00, total: 1425 },
        { id: 'SOW-005', description: 'Install architectural shingles (30-year)', qty: 15, unit: 'SQ', unitCost: 318.33, total: 4775 },
        { id: 'SOW-006', description: 'Replace damaged roof decking', qty: 3, unit: 'SH', unitCost: 65.00, total: 195 },
        { id: 'SOW-007', description: 'Ridge vent + flashing', qty: 1, unit: 'EA', unitCost: 850.00, total: 850 },
      ],
    },
    electrical: {
      trade: 'Electrical',
      defectId: 'D-003',
      subtotal: 6830,
      items: [
        { id: 'SOW-008', description: 'Remove Federal Pacific panel + disposal', qty: 1, unit: 'EA', unitCost: 450.00, total: 450 },
        { id: 'SOW-009', description: 'Install 200-amp panel with breakers', qty: 1, unit: 'EA', unitCost: 3200.00, total: 3200 },
        { id: 'SOW-010', description: 'Service entrance upgrade (100A→200A)', qty: 1, unit: 'EA', unitCost: 1850.00, total: 1850 },
        { id: 'SOW-011', description: 'Rewire kitchen circuit (dedicated 20A)', qty: 1, unit: 'EA', unitCost: 650.00, total: 650 },
        { id: 'SOW-012', description: 'GFCI outlets — kitchen/bath/exterior', qty: 8, unit: 'EA', unitCost: 85.00, total: 680 },
      ],
    },
    hvac: {
      trade: 'HVAC',
      defectId: 'D-004',
      subtotal: 7250,
      items: [
        { id: 'SOW-013', description: 'Remove existing split system', qty: 1, unit: 'EA', unitCost: 600.00, total: 600 },
        { id: 'SOW-014', description: 'Install 3-ton split system (SEER 15)', qty: 1, unit: 'EA', unitCost: 5200.00, total: 5200 },
        { id: 'SOW-015', description: 'Ductwork repair and sealing', qty: 1, unit: 'LS', unitCost: 1200.00, total: 1200 },
        { id: 'SOW-016', description: 'New thermostat (smart, WiFi)', qty: 1, unit: 'EA', unitCost: 250.00, total: 250 },
      ],
    },
    plumbing: {
      trade: 'Plumbing & Environmental',
      defectId: 'D-005',
      subtotal: 6130,
      items: [
        { id: 'SOW-017', description: 'Mold remediation — master bath', qty: 120, unit: 'SF', unitCost: 18.00, total: 2160 },
        { id: 'SOW-018', description: 'Replace failed supply line + wall repair', qty: 1, unit: 'EA', unitCost: 850.00, total: 850 },
        { id: 'SOW-019', description: 'Subfloor repair/replacement — master bath', qty: 60, unit: 'SF', unitCost: 12.00, total: 720 },
        { id: 'SOW-020', description: 'Bathroom re-tile (floor + shower surround)', qty: 1, unit: 'LS', unitCost: 2400.00, total: 2400 },
      ],
    },
    interior: {
      trade: 'Interior',
      defectId: 'D-006',
      subtotal: 4960,
      items: [
        { id: 'SOW-021', description: 'Remove damaged lower kitchen cabinets', qty: 12, unit: 'LF', unitCost: 25.00, total: 300 },
        { id: 'SOW-022', description: 'Install new lower cabinets (stock grade)', qty: 12, unit: 'LF', unitCost: 160.00, total: 1920 },
        { id: 'SOW-023', description: 'Countertop — laminate', qty: 24, unit: 'SF', unitCost: 32.00, total: 768 },
        { id: 'SOW-024', description: 'Interior paint — walls and ceilings (entire house)', qty: 1450, unit: 'SF', unitCost: 1.36, total: 1972 },
      ],
    },
    exterior: {
      trade: 'Exterior',
      defectId: 'D-007',
      subtotal: 4300,
      items: [
        { id: 'SOW-025', description: 'Power wash exterior', qty: 1800, unit: 'SF', unitCost: 0.35, total: 630 },
        { id: 'SOW-026', description: 'Scrape and prime peeling areas', qty: 1100, unit: 'SF', unitCost: 0.95, total: 1045 },
        { id: 'SOW-027', description: 'Exterior paint — 2 coats', qty: 1800, unit: 'SF', unitCost: 1.46, total: 2625 },
      ],
    },
    windows: {
      trade: 'Windows & Glazing',
      defectId: 'D-008',
      subtotal: 1680,
      items: [
        { id: 'SOW-028', description: 'Remove broken single-pane windows', qty: 3, unit: 'EA', unitCost: 45.00, total: 135 },
        { id: 'SOW-029', description: 'Install double-pane vinyl replacement windows', qty: 3, unit: 'EA', unitCost: 425.00, total: 1275 },
        { id: 'SOW-030', description: 'Weatherstripping — remaining 9 windows', qty: 9, unit: 'EA', unitCost: 30.00, total: 270 },
      ],
    },
  },
}

// ---------------------------------------------------------------------------
// 5. UNDERWRITING DATA (for prop-001)
// ---------------------------------------------------------------------------
export const underwritingData = {
  propertyId: 'prop-001',
  arv: 185000,
  arvConfidence: 4, // out of 5
  arvSources: [
    { source: 'HouseCanary', value: 183000 },
    { source: 'Quantarium', value: 187000 },
  ],
  purchasePrice: 85000,
  renovationCost: 51959,
  allInCost: 136959,
  estimatedRent: 1450,
  rentConfidence: 4, // out of 5
  rentRange: { low: 1425, high: 1475, source: 'Rentometer' },
  projectedDSCR: 1.35,
  cashOnCash: 11.2,
  maxPurchasePrice: 92400,
  dealScore: 82,
  recommendation: 'GO',
  recommendationDetail: 'Strong deal at current terms',
  riskFlags: [
    { color: 'yellow', message: 'Foundation work carries higher variance — recommend additional structural assessment' },
    { color: 'green', message: 'Memphis rental market trending +3.2% YoY — favorable for rent projections' },
    { color: 'green', message: 'Wholesaler track record: 87% accuracy, low deviation risk' },
  ],
  historicalComparison: {
    comparableDeals: 142,
    percentile: 74,
    market: 'Memphis',
    avgCoC: 10.8,
    closeRate: 91,
    summary:
      'Based on 142 comparable deals: this deal is in the 74th percentile of Memphis acquisitions by projected return. Similar properties (3BR, heavy rehab, 38106 zip) have averaged 10.8% CoC over the last 18 months with a 91% close rate.',
  },
  sensitivityScenarios: [
    {
      label: 'Rents -10%',
      rent: 1305,
      dscr: 1.21,
      cashOnCash: 8.7,
      verdict: 'Still viable',
    },
    {
      label: 'Renovation +15%',
      renovationCost: 59752,
      allInCost: 144752,
      cashOnCash: 8.4,
      verdict: 'Viable but below target',
    },
    {
      label: 'ARV below $170K',
      arv: 170000,
      recommendedPurchase: 78000,
      cashOnCash: 6.1,
      verdict: 'Renegotiate purchase price',
    },
  ],
}

// ---------------------------------------------------------------------------
// 6. TENANTS (for rented/occupied properties)
// ---------------------------------------------------------------------------
export const tenants = [
  {
    id: 'tenant-001',
    propertyId: 'prop-003', // 4521 Birch Lane, Dallas
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@email.com',
    phone: '(214) 555-0147',
    leaseStart: '2025-07-01',
    leaseEnd: '2026-06-30',
    monthlyRent: 1650,
    status: 'Active — Good Standing',
    paymentHistory: [
      { month: 'Jul 2025', status: 'Paid', date: 'Jul 1' },
      { month: 'Aug 2025', status: 'Paid', date: 'Aug 1' },
      { month: 'Sep 2025', status: 'Paid', date: 'Sep 3' },
      { month: 'Oct 2025', status: 'Late', date: 'Oct 8' },
      { month: 'Nov 2025', status: 'Paid', date: 'Nov 1' },
      { month: 'Dec 2025', status: 'Paid', date: 'Dec 1' },
    ],
    maintenanceRequests: [
      {
        id: 'maint-001',
        description: 'Kitchen sink is leaking under the cabinet',
        submittedAt: '2026-02-24T14:17:00',
        classification: 'Plumbing — Moderate Urgency',
        routedTo: 'Metro Dallas Plumbing',
        routedAt: '2026-02-24T14:18:00',
        scheduledDate: '2026-03-03T09:00:00',
        status: 'Scheduled',
      },
    ],
  },
  {
    id: 'tenant-002',
    propertyId: 'prop-005', // 1502 Glenwood Ave, Atlanta
    name: 'James Thompson',
    email: 'james.thompson@email.com',
    phone: '(404) 555-0283',
    leaseStart: '2025-09-01',
    leaseEnd: '2026-08-31',
    monthlyRent: 1200,
    status: 'Active — Late Payment History',
    paymentHistory: [
      { month: 'Sep 2025', status: 'Paid', date: 'Sep 1' },
      { month: 'Oct 2025', status: 'Late', date: 'Oct 12' },
      { month: 'Nov 2025', status: 'Paid', date: 'Nov 3' },
      { month: 'Dec 2025', status: 'Late', date: 'Dec 9' },
      { month: 'Jan 2026', status: 'Paid', date: 'Jan 2' },
      { month: 'Feb 2026', status: 'Paid', date: 'Feb 1' },
    ],
    maintenanceRequests: [],
    rentOptimization: {
      currentRent: 1200,
      marketComps: { low: 1250, median: 1350, high: 1475 },
      recommendation: 1300,
      renewalDate: '2026-08-31',
      acceptanceProbability: 91,
      annualRevenueImpact: 1200,
    },
  },
  {
    id: 'tenant-003',
    propertyId: 'prop-006', // 3340 Desert Vista Rd, Phoenix
    name: 'David & Lisa Park',
    email: 'dpark@email.com',
    phone: '(602) 555-0391',
    leaseStart: '2025-05-01',
    leaseEnd: '2026-04-30',
    monthlyRent: 1750,
    status: 'Active — Good Standing',
    paymentHistory: [
      { month: 'Sep 2025', status: 'Paid', date: 'Sep 1' },
      { month: 'Oct 2025', status: 'Paid', date: 'Oct 1' },
      { month: 'Nov 2025', status: 'Paid', date: 'Nov 1' },
      { month: 'Dec 2025', status: 'Paid', date: 'Dec 1' },
      { month: 'Jan 2026', status: 'Paid', date: 'Jan 1' },
      { month: 'Feb 2026', status: 'Paid', date: 'Feb 1' },
    ],
    maintenanceRequests: [],
  },
  {
    id: 'tenant-004',
    propertyId: 'prop-010', // 1156 Cactus Wren Ln, Phoenix
    name: 'Samuel Okafor',
    email: 'samuel.okafor@email.com',
    phone: '(602) 555-0518',
    leaseStart: '2025-06-01',
    leaseEnd: '2026-05-31',
    monthlyRent: 1650,
    status: 'Active — Good Standing',
    paymentHistory: [
      { month: 'Sep 2025', status: 'Paid', date: 'Sep 1' },
      { month: 'Oct 2025', status: 'Paid', date: 'Oct 1' },
      { month: 'Nov 2025', status: 'Paid', date: 'Nov 1' },
      { month: 'Dec 2025', status: 'Paid', date: 'Dec 2' },
      { month: 'Jan 2026', status: 'Paid', date: 'Jan 1' },
      { month: 'Feb 2026', status: 'Paid', date: 'Feb 1' },
    ],
    maintenanceRequests: [],
  },
  {
    id: 'tenant-005',
    propertyId: 'prop-008', // 445 Riverside Blvd, Memphis
    name: 'Tanya Jackson',
    email: 'tanya.jackson@email.com',
    phone: '(901) 555-0672',
    leaseStart: '2025-08-01',
    leaseEnd: '2026-07-31',
    monthlyRent: 950,
    status: 'Active — Good Standing',
    paymentHistory: [
      { month: 'Sep 2025', status: 'Paid', date: 'Sep 1' },
      { month: 'Oct 2025', status: 'Paid', date: 'Oct 1' },
      { month: 'Nov 2025', status: 'Paid', date: 'Nov 1' },
      { month: 'Dec 2025', status: 'Paid', date: 'Dec 1' },
      { month: 'Jan 2026', status: 'Paid', date: 'Jan 1' },
      { month: 'Feb 2026', status: 'Paid', date: 'Feb 1' },
    ],
    maintenanceRequests: [],
  },
  {
    id: 'tenant-006',
    propertyId: 'prop-004', // 891 Peachtree Court, Atlanta
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '(404) 555-0834',
    leaseStart: '2025-03-01',
    leaseEnd: '2026-02-28',
    monthlyRent: 1500,
    status: 'Active — Renewal Pending',
    paymentHistory: [
      { month: 'Sep 2025', status: 'Paid', date: 'Sep 1' },
      { month: 'Oct 2025', status: 'Paid', date: 'Oct 1' },
      { month: 'Nov 2025', status: 'Paid', date: 'Nov 1' },
      { month: 'Dec 2025', status: 'Paid', date: 'Dec 1' },
      { month: 'Jan 2026', status: 'Paid', date: 'Jan 1' },
      { month: 'Feb 2026', status: 'Paid', date: 'Feb 1' },
    ],
    maintenanceRequests: [],
  },
]

// ---------------------------------------------------------------------------
// 7. REFINANCE PIPELINE
// ---------------------------------------------------------------------------
export const refiPipeline = [
  {
    propertyId: 'prop-006', // 3340 Desert Vista Rd, Phoenix — Refi Ready
    dscr: 1.41,
    monthsOccupied: 9,
    estimatedAppraisal: 248000,
    estimatedCashOut: 42500,
    status: 'Ready — Lender Package Complete',
    checklistItems: [
      { item: 'DSCR > 1.25', passed: true, detail: 'Actual: 1.41' },
      { item: 'Occupied > 6 months', passed: true, detail: 'Actual: 9 months' },
      { item: 'Rent roll clean', passed: true, detail: 'No late payments in 6 months' },
      { item: 'No outstanding maintenance', passed: true, detail: 'All requests resolved' },
      { item: 'Lender package assembled', passed: true, detail: 'Complete and verified' },
    ],
    termSheetComparison: {
      lenderA: {
        institution: 'First National Lending',
        recommended: true,
        rate: 7.25,
        rateType: 'Fixed',
        points: 1.5,
        term: '30-year amortization, 5-year balloon',
        prepaymentPenalty: '3-year stepdown (5/4/3%)',
        estimatedMonthlyPayment: 1089,
        totalClosingCosts: 4200,
      },
      lenderB: {
        institution: 'Pacific Mortgage Group',
        recommended: false,
        rate: 7.50,
        rateType: 'Fixed (years 1–5)',
        points: 1.0,
        term: '30-year amortization',
        prepaymentPenalty: '2-year flat (3%)',
        estimatedMonthlyPayment: 1117,
        totalClosingCosts: 3800,
        hiddenClause: 'Rate adjusts to SOFR + 3.5% after year 5',
        projectedAdjustedRate: '8.75–9.25%',
        riskExposure: 12400,
      },
      aiRecommendation:
        'Lender A offers better total cost over hold period despite higher upfront points. The fixed rate eliminates interest rate risk. Lender B\'s rate adjustment clause adds an estimated $12,400 in risk exposure over a 10-year hold period. At current SOFR projections, the adjusted rate could reach 8.75–9.25% by year 6, significantly impacting DSCR. Recommend Lender A.',
    },
  },
  {
    propertyId: 'prop-010', // 1156 Cactus Wren Ln, Phoenix — Refi Ready
    dscr: 1.38,
    monthsOccupied: 8,
    estimatedAppraisal: 235000,
    estimatedCashOut: 38200,
    status: 'Ready — Awaiting Appraisal',
    checklistItems: [
      { item: 'DSCR > 1.25', passed: true, detail: 'Actual: 1.38' },
      { item: 'Occupied > 6 months', passed: true, detail: 'Actual: 8 months' },
      { item: 'Rent roll clean', passed: true, detail: 'No late payments' },
      { item: 'No outstanding maintenance', passed: true, detail: 'All clear' },
      { item: 'Lender package assembled', passed: true, detail: 'Awaiting appraisal scheduling' },
    ],
    termSheetComparison: null,
  },
  {
    propertyId: 'prop-003', // 4521 Birch Lane, Dallas — Rented
    dscr: 1.52,
    monthsOccupied: 7,
    estimatedAppraisal: 218000,
    estimatedCashOut: 38500,
    status: 'Ready — Lender Package Complete',
    checklistItems: [
      { item: 'DSCR > 1.25', passed: true, detail: 'Actual: 1.52' },
      { item: 'Occupied > 6 months', passed: true, detail: 'Actual: 7 months' },
      { item: 'Rent roll clean', passed: true, detail: '1 late payment (Oct) — within tolerance' },
      { item: 'No outstanding maintenance', passed: false, detail: '1 open request (kitchen sink)' },
      { item: 'Lender package assembled', passed: true, detail: 'Complete' },
    ],
    termSheetComparison: null,
  },
  {
    propertyId: 'prop-005', // 1502 Glenwood Ave, Atlanta — Rented
    dscr: 1.19,
    monthsOccupied: 5,
    estimatedAppraisal: 148000,
    estimatedCashOut: 12800,
    status: 'Not Ready — DSCR Below Threshold',
    checklistItems: [
      { item: 'DSCR > 1.25', passed: false, detail: 'Actual: 1.19 — below 1.25 threshold' },
      { item: 'Occupied > 6 months', passed: false, detail: 'Actual: 5 months — needs 6+' },
      { item: 'Rent roll clean', passed: false, detail: '2 late payments in last 6 months' },
      { item: 'No outstanding maintenance', passed: true, detail: 'All clear' },
      { item: 'Lender package assembled', passed: false, detail: 'Not started — address DSCR first' },
    ],
    termSheetComparison: null,
  },
]

// ---------------------------------------------------------------------------
// 8. PORTFOLIO KPIs
// ---------------------------------------------------------------------------
export const portfolioKPIs = {
  totalProperties: 312,
  totalValue: 58200000,
  monthlyNOI: 387000,
  avgOccupancy: 94.2,
  pipelineValue: 12800000,
  activeDeals: 127,
  underRenovation: 43,
  refiPipeline: 28,
  ytdDealsClosed: 847,
  ytdTarget: 833,
  capitalDeployedYTD: 102400000,
  avgDaysToRent: 34,
  daysToRentTarget: 28,
  avgCashOnCash: 10.2,
}

// ---------------------------------------------------------------------------
// 9. NOI TREND DATA (12 actual + 3 forecast)
// ---------------------------------------------------------------------------
export const noiTrendData = [
  { month: 'Jan 2025', noi: 342000, type: 'actual' },
  { month: 'Feb 2025', noi: 348000, type: 'actual' },
  { month: 'Mar 2025', noi: 355000, type: 'actual' },
  { month: 'Apr 2025', noi: 351000, type: 'actual' },
  { month: 'May 2025', noi: 362000, type: 'actual' },
  { month: 'Jun 2025', noi: 370000, type: 'actual' },
  { month: 'Jul 2025', noi: 368000, type: 'actual' },
  { month: 'Aug 2025', noi: 375000, type: 'actual' },
  { month: 'Sep 2025', noi: 382000, type: 'actual' },
  { month: 'Oct 2025', noi: 379000, type: 'actual' },
  { month: 'Nov 2025', noi: 385000, type: 'actual' },
  { month: 'Dec 2025', noi: 387000, type: 'actual' },
  { month: 'Jan 2026', noi: 392000, type: 'forecast' },
  { month: 'Feb 2026', noi: 398000, type: 'forecast' },
  { month: 'Mar 2026', noi: 405000, type: 'forecast' },
]

// ---------------------------------------------------------------------------
// 10. BURN RATE DATA (by market)
// ---------------------------------------------------------------------------
export const burnRateData = [
  { market: 'Memphis', budget: 485000, actual: 542000 },
  { market: 'Atlanta', budget: 392000, actual: 401000 },
  { market: 'Dallas', budget: 318000, actual: 305000 },
  { market: 'Phoenix', budget: 275000, actual: 268000 },
]

// ---------------------------------------------------------------------------
// 11. AI COPILOT TEMPLATES
// ---------------------------------------------------------------------------
export const copilotTemplates = [
  {
    id: 'tpl-001',
    name: 'Refinance Summary',
    category: 'Finance',
    description: 'Generate complete refi summary with property data, metrics, and recommendation',
    acceptRate: 89,
    editRate: 8,
    rejectRate: 3,
    systemPrompt:
      'You are a real estate finance analyst at Resilut, an institutional SFR platform. Generate a comprehensive refinance summary for the given property. Include: property details, current financials (DSCR, occupancy, rent roll), appraisal estimate, recommended lender terms, cash-out projection, and a GO/NO-GO recommendation with reasoning. Format with clear sections and bullet points. Be specific with numbers.',
  },
  {
    id: 'tpl-002',
    name: 'Seller Outreach — Initial',
    category: 'Marketing',
    description: 'First-touch personalized message to potential seller based on property/situation',
    acceptRate: 76,
    editRate: 18,
    rejectRate: 6,
    systemPrompt:
      'You are a real estate acquisitions specialist at Resilut. Write a warm, personalized first-touch outreach message to a property seller. Be empathetic to their situation (vacant property, financial pressure, inherited home, etc.). Mention specific details about their property to show genuine interest. Keep it under 200 words. Do not be pushy — focus on offering a solution and making the process easy.',
  },
  {
    id: 'tpl-003',
    name: 'Seller Outreach — Follow-up',
    category: 'Marketing',
    description: 'Follow-up message sequence for non-responsive leads',
    acceptRate: 81,
    editRate: 14,
    rejectRate: 5,
    systemPrompt:
      'You are a real estate acquisitions specialist at Resilut. Write a polite follow-up message to a seller who did not respond to the initial outreach. Reference the original message briefly. Provide additional value (market data, comparable sales, timeline flexibility). Keep it under 150 words. Professional but warm tone.',
  },
  {
    id: 'tpl-004',
    name: 'Maintenance Response',
    category: 'Operations',
    description: 'Acknowledge tenant maintenance request and provide timeline',
    acceptRate: 92,
    editRate: 6,
    rejectRate: 2,
    systemPrompt:
      'You are a property management AI assistant at Resilut. Write a professional, empathetic response to a tenant maintenance request. Acknowledge the issue, confirm it has been classified and routed to the appropriate vendor, provide an estimated timeline for resolution, and include any interim safety instructions if relevant. Keep it concise and reassuring.',
  },
  {
    id: 'tpl-005',
    name: 'Deal Memo',
    category: 'Acquisitions',
    description: 'Internal deal summary for investment committee review',
    acceptRate: 85,
    editRate: 12,
    rejectRate: 3,
    systemPrompt:
      'You are a real estate investment analyst at Resilut. Write an internal deal memo for the investment committee. Include: Executive Summary, Property Overview, Market Analysis, Financial Projections (purchase price, ARV, renovation estimate, all-in cost, projected rent, DSCR, CoC return), Risk Assessment, and Recommendation. Use a professional, data-driven tone with specific numbers. Format with clear headers.',
  },
  {
    id: 'tpl-006',
    name: 'Investor Update',
    category: 'Finance',
    description: 'Monthly/quarterly portfolio performance update for investors',
    acceptRate: 88,
    editRate: 9,
    rejectRate: 3,
    systemPrompt:
      'You are the VP of Investor Relations at Resilut. Write a monthly portfolio performance update for investors. Include: portfolio summary (properties, value, NOI), acquisition activity, renovation progress, occupancy and rent collection rates, refinance pipeline status, and market outlook. Professional, confident tone. Use specific numbers and percentages. Highlight wins and address any concerns proactively.',
  },
  {
    id: 'tpl-007',
    name: 'Lease Notice',
    category: 'Legal',
    description: 'Standard lease notices (renewal, late payment, inspection)',
    acceptRate: 94,
    editRate: 4,
    rejectRate: 2,
    systemPrompt:
      'You are a property management system at Resilut. Generate a formal lease notice. The notice type will be specified (renewal offer, late payment notice, inspection notice, or lease violation). Use professional legal language appropriate for tenant communications. Include all required elements: dates, amounts, deadlines, and contact information. Comply with standard landlord-tenant communication practices.',
  },
  {
    id: 'tpl-008',
    name: 'Contractor SOW Email',
    category: 'Operations',
    description: 'Email to contractor with scope summary and bid request',
    acceptRate: 82,
    editRate: 14,
    rejectRate: 4,
    systemPrompt:
      'You are a renovation project manager at Resilut. Write a professional email to a contractor requesting a bid for a specific scope of work. Include: property address, detailed scope description, materials specifications, timeline requirements, and bid submission deadline. Reference RSMeans data where applicable. Request itemized pricing. Professional but direct tone.',
  },
]

// ---------------------------------------------------------------------------
// 12. ACTIVITY FEED
// ---------------------------------------------------------------------------
export const activityFeed = [
  {
    id: 'act-001',
    action: 'AI completed renovation scope for 1847 Magnolia Dr, Memphis — 8 trades, $51,959 total',
    property: 'prop-001',
    user: 'System',
    timestamp: '12 minutes ago',
    type: 'ai',
  },
  {
    id: 'act-002',
    action: 'Deal score updated: 2203 Oak Street, Memphis — 71/100',
    property: 'prop-002',
    user: 'System',
    timestamp: '45 minutes ago',
    type: 'update',
  },
  {
    id: 'act-003',
    action: 'Inspection report received: 2890 Magnolia Heights, Atlanta — processing',
    property: 'prop-009',
    user: 'Inspectify',
    timestamp: '1 hour ago',
    type: 'inspection',
  },
  {
    id: 'act-004',
    action: 'Maria Rodriguez submitted maintenance request: kitchen sink leak',
    property: 'prop-003',
    user: 'Tenant Portal',
    timestamp: '2 hours ago',
    type: 'maintenance',
  },
  {
    id: 'act-005',
    action: 'Refinance package assembled: 3340 Desert Vista Rd, Phoenix — ready for submission',
    property: 'prop-006',
    user: 'Sarah Chen',
    timestamp: '3 hours ago',
    type: 'refi',
  },
  {
    id: 'act-006',
    action: 'New deal submitted: 445 Riverside Blvd, Memphis — wholesaler: Amanda Taylor',
    property: 'prop-008',
    user: 'Portal',
    timestamp: '4 hours ago',
    type: 'deal',
  },
  {
    id: 'act-007',
    action: 'AI flagged anomaly: Atlanta vacancy trending above target (8.2% vs 5% target)',
    property: null,
    user: 'System',
    timestamp: '5 hours ago',
    type: 'alert',
  },
  {
    id: 'act-008',
    action: 'Lease renewal sent: 891 Peachtree Court, Atlanta — Michael Chen, expires Feb 2026',
    property: 'prop-004',
    user: 'System',
    timestamp: '6 hours ago',
    type: 'lease',
  },
]

// ---------------------------------------------------------------------------
// 13. PIPELINE FUNNEL DATA
// ---------------------------------------------------------------------------
export const pipelineFunnel = [
  { stage: 'Intake', count: 47, color: '#3b82f6' },
  { stage: 'Inspection', count: 31, color: '#06b6d4' },
  { stage: 'Scoping', count: 22, color: '#8b5cf6' },
  { stage: 'Underwriting', count: 15, color: '#f59e0b' },
  { stage: 'Approved', count: 12, color: '#10b981' },
  { stage: 'Renovating', count: 43, color: '#f97316' },
  { stage: 'Rented', count: 312, color: '#10b981' },
  { stage: 'Refi Ready', count: 28, color: '#06b6d4' },
]

// ---------------------------------------------------------------------------
// 14. WHOLESALER RAW SUBMISSION + AI PROCESSED (for Deal Detail screen)
// ---------------------------------------------------------------------------
export const wholesalerSubmission = {
  propertyId: 'prop-001',
  raw: {
    description:
      '3/2 house needs full reno, roof is bad, maybe foundation issues, ARV around 180-190K. Kitchen is gutted. Saw some water in basement. Motivated seller, been vacant 8 months. Neighborhood is solid — rentals going for 1400-1500 nearby.',
    fields: {
      address: '1847 Magnolia Dr',
      city: 'Memphis',
      state: 'TN',
      zip: '38106',
      beds: '3',
      baths: '2',
      sqft: null,
      yearBuilt: '1960s?',
      askingPrice: 85000,
      arvEstimate: '180-190K',
      condition: 'Needs full reno',
      photos: 4,
      rehabEstimate: '50-70K maybe?',
    },
  },
  aiProcessed: {
    propertyType: 'Single Family Residential',
    address: '1847 Magnolia Drive, Memphis, TN 38106',
    beds: 3,
    baths: 2,
    sqft: 1450,
    sqftSource: 'County records (Shelby County Assessor)',
    yearBuilt: 1962,
    yearBuiltSource: 'County records',
    lotSize: 0.18,
    conditionTier: 'Heavy Rehab',
    marketSegment: 'Memphis — South Memphis (Shelby County)',
    estimatedARV: 185000,
    arvSources: { HouseCanary: 183000, Quantarium: 187000 },
    arvAgreement: 'High',
    estimatedRent: 1450,
    rentRange: { low: 1425, high: 1475, source: 'Rentometer' },
    classification: 'Distressed SFR, Vacant 8+ months, Motivated Seller',
    missingDataResolved: [
      { field: 'Sqft', value: '1,450 SF', source: 'Shelby County Assessor', status: 'resolved' },
      { field: 'Year built', value: '1962', source: 'County records', status: 'resolved' },
      { field: 'Lot size', value: '0.18 acres', source: 'County records', status: 'resolved' },
      { field: 'Interior photos (bathroom, foundation)', value: null, source: 'Auto-requested from wholesaler', status: 'pending' },
    ],
    dealQualityScore: 78,
    scoreBreakdown: {
      submissionCompleteness: { raw: 62, normalized: 95, note: 'Normalized via AI + county data' },
      marketStrength: 85,
      priceToARV: { ratio: 46, target: '<55%', pass: true },
      wholesalerTrackRecord: 87,
    },
    processingTime: 8, // seconds
  },
}

// ---------------------------------------------------------------------------
// 15. STATUS CONFIG (colors & labels for deal statuses)
// ---------------------------------------------------------------------------
export const statusConfig = {
  'New':                  { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: '#3b82f6', style: 'outline' },
  'AI Processing':        { color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', border: '#3b82f6', style: 'solid', spinner: true },
  'Needs Info':           { color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: '#f97316', style: 'solid' },
  'Inspection Scheduled': { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', border: '#06b6d4', style: 'solid' },
  'Scope in Progress':    { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: '#8b5cf6', style: 'solid' },
  'Underwriting':         { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: '#f59e0b', style: 'solid' },
  'Approved':             { color: '#10b981', bg: 'rgba(16,185,129,0.15)', border: '#10b981', style: 'solid' },
  'Renovating':           { color: '#f97316', bg: 'rgba(249,115,22,0.15)', border: '#f97316', style: 'solid' },
  'Rented':               { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: '#10b981', style: 'solid' },
  'Refi Ready':           { color: '#059669', bg: 'rgba(5,150,105,0.1)', border: '#059669', style: 'solid' },
}

// ---------------------------------------------------------------------------
// HELPER: Look up property by ID
// ---------------------------------------------------------------------------
export function getPropertyById(id) {
  return properties.find((p) => p.id === id) || null
}

// HELPER: Look up wholesaler by ID
export function getWholesalerById(id) {
  return wholesalers.find((w) => w.id === id) || null
}

// HELPER: Get wholesaler for a property
export function getWholesalerForProperty(propertyId) {
  const property = getPropertyById(propertyId)
  if (!property) return null
  return getWholesalerById(property.wholesalerId)
}

// HELPER: Get tenant for a property
export function getTenantForProperty(propertyId) {
  return tenants.find((t) => t.propertyId === propertyId) || null
}

// HELPER: Format currency
export function formatCurrency(amount, decimals = 0) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}

// HELPER: Format large numbers (e.g., $58.2M)
export function formatCompact(amount) {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`
  return formatCurrency(amount)
}
