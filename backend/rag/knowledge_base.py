"""
Groundwater RAG Knowledge Base
Contains structured domain knowledge chunks for retrieval-augmented generation.
These chunks are indexed and retrieved based on semantic similarity to user queries.
"""

KNOWLEDGE_CHUNKS = [
    # ─── WATER LEVEL SCENARIO ───────────────────────────────────────────────────
    {
        "id": "wl_001",
        "category": "water_level",
        "title": "Water Level Monitoring – National Framework",
        "content": (
            "India's Central Ground Water Board (CGWB) operates a network of over 24,000 "
            "National Hydrograph Stations (NHS) to monitor groundwater levels four times a year "
            "(January, April/May, August, November). Data is published in CGWB's Ground Water Year "
            "Books and on the India-WRIS portal. Telemetric stations (GPRS-based) provide near-real-time "
            "readings every 6 hours. A declining trend (>20 cm/year over 10 years) flags a 'critical' "
            "or 'over-exploited' assessment unit."
        ),
        "keywords": ["water level", "monitoring", "CGWB", "GWLF", "trend", "seasonal", "NHS"]
    },
    {
        "id": "wl_002",
        "category": "water_level",
        "title": "Interpreting Water Level Data",
        "content": (
            "Water table depth is reported in metres below ground level (m bgl). A shallow water table "
            "(0–3 m bgl) indicates high recharge or waterlogging risk. Depths of 3–10 m bgl are typical "
            "for unconfined alluvial aquifers. Hard-rock terrains may show 10–40 m bgl. Confined aquifer "
            "heads can exceed surface level (artesian conditions). Pre-monsoon (May) levels represent "
            "the most stressed condition; post-monsoon (November) levels show recovery. Long-term annual "
            "decline signals over-exploitation."
        ),
        "keywords": ["water table", "depth", "m bgl", "pre-monsoon", "post-monsoon", "unconfined", "confined"]
    },
    {
        "id": "wl_003",
        "category": "water_level",
        "title": "Coimbatore District – Water Level Scenario",
        "content": (
            "Telemetric stations in Coimbatore (CGWB) record groundwater levels in the range of "
            "-7 to -20 m bgl. Station COIM250 (Peruntholavu) at 60 m depth records around -19 to -20 m, "
            "while COIM261 (TN Urban Studies pz) at 200 m depth records -7 to -8 m. Readings are taken "
            "every 6 hours. The Tiruppur tehsil zone shows gradual level fluctuations consistent with "
            "seasonal recharge patterns. Data sourced from India-WRIS (Jan–Feb 2026)."
        ),
        "keywords": ["Coimbatore", "Tiruppur", "COIM250", "COIM261", "telemetric", "water level data"]
    },

    # ─── HYDROGEOLOGICAL SCENARIO ───────────────────────────────────────────────
    {
        "id": "hg_001",
        "category": "hydrogeology",
        "title": "Aquifer Types in India",
        "content": (
            "India has four principal aquifer systems: (1) Alluvial aquifers in Indo-Gangetic and "
            "Brahmaputra plains – highly productive, unconfined to semi-confined, yields 50–1500 lph. "
            "(2) Hard-rock aquifers (granite, gneiss, basalt, quartzite) – fractured and weathered zone "
            "storage, yields 10–200 lph, found across Deccan Plateau and Peninsular India. "
            "(3) Carbonate (limestone/dolomite) aquifers – karst systems, high permeability zones. "
            "(4) Sandstone aquifers – semi-consolidated, moderate yields. The National Aquifer Mapping "
            "Programme (NAQUIM) has mapped over 14 major aquifer systems across India."
        ),
        "keywords": ["aquifer", "alluvial", "hard rock", "granite", "basalt", "karst", "sandstone", "NAQUIM"]
    },
    {
        "id": "hg_002",
        "category": "hydrogeology",
        "title": "Coimbatore Hydrogeological Setting",
        "content": (
            "Coimbatore district lies in the Precambrian hard-rock terrain of Tamil Nadu. "
            "The subsurface comprises charnockites, gneisses, and crystalline rocks with weathered "
            "and fractured zones forming the primary aquifers. The Noyyal River basin drains the "
            "district westward to east. Groundwater occurs in weathered residuum (5–25 m depth) and "
            "in fractured zones at 30–200 m depth. Hydraulic conductivity in weathered zones is "
            "0.5–5 m/day. Specific yield ranges from 0.5–3%. Recharge is largely through rainfall "
            "infiltration during NE monsoon (Oct–Dec) and SW monsoon (Jun–Sep)."
        ),
        "keywords": ["Coimbatore", "hard rock", "charnockite", "gneiss", "Noyyal", "fracture", "Tamil Nadu"]
    },
    {
        "id": "hg_003",
        "category": "hydrogeology",
        "title": "Recharge and Discharge Mechanisms",
        "content": (
            "Groundwater recharge occurs through: (1) Direct rainfall infiltration – 5–25% of annual "
            "rainfall depending on soil type and land use. (2) Return flow from irrigation – 10–40% "
            "of irrigation water. (3) Seepage from tanks, ponds, and rivers. (4) Artificial recharge "
            "structures (check dams, percolation tanks, recharge shafts). Discharge occurs through: "
            "abstraction by wells, base flow to streams, springs, and evapotranspiration. The Water "
            "Balance method: Total Recharge = Natural Recharge + Artificial Recharge; Net Availability "
            "= Total Recharge – Natural Discharge."
        ),
        "keywords": ["recharge", "infiltration", "artificial recharge", "water balance", "discharge", "percolation"]
    },
    {
        "id": "hg_004",
        "category": "hydrogeology",
        "title": "Hydrology of Tamil Nadu",
        "content": (
            "Tamil Nadu receives about 925 mm of annual rainfall, predominantly from NE monsoon "
            "(Oct–Dec, ~50%). The state has 17 river basins. Groundwater development stands at ~65% "
            "of utilisable resources. About 40% of assessment units are semi-critical, critical, or "
            "over-exploited. Hard-rock aquifers dominate the western and southern districts; alluvial "
            "aquifers occur in delta regions (Cauvery, Palar, Vaigai). CGWB's Chennai and Coimbatore "
            "regional offices conduct hydrogeological surveys and publish district-wise reports."
        ),
        "keywords": ["Tamil Nadu", "monsoon", "river basin", "semi-critical", "over-exploited", "CGWB regional"]
    },

    # ─── WATER QUALITY ───────────────────────────────────────────────────────────
    {
        "id": "wq_001",
        "category": "water_quality",
        "title": "Groundwater Quality Standards – BIS / WHO",
        "content": (
            "India's Bureau of Indian Standards (BIS IS 10500:2012) specifies drinking water limits: "
            "pH 6.5–8.5, TDS ≤500 mg/L (max 2000), Hardness ≤200 mg/L, Nitrate ≤45 mg/L, "
            "Fluoride ≤1.0 mg/L (max 1.5), Arsenic ≤0.01 mg/L, Iron ≤0.3 mg/L, Chloride ≤250 mg/L. "
            "WHO 2022 guidelines are largely similar. Exceedances trigger 'not suitable for drinking' "
            "classification. CGWB publishes annual groundwater quality data for all states."
        ),
        "keywords": ["water quality", "BIS", "WHO", "TDS", "fluoride", "nitrate", "arsenic", "hardness", "pH"]
    },
    {
        "id": "wq_002",
        "category": "water_quality",
        "title": "Common Groundwater Quality Problems in India",
        "content": (
            "Major groundwater quality issues in India: (1) Fluoride contamination (>1.5 mg/L) in "
            "19 states including Rajasthan, AP, TN, causing fluorosis. (2) Arsenic contamination "
            "(>0.01 mg/L) in West Bengal, Bihar, UP, Jharkhand. (3) Nitrate (>45 mg/L) due to "
            "agricultural runoff in Punjab, Haryana, MP, TN. (4) Iron (>0.3 mg/L) in eastern India. "
            "(5) Salinity/TDS (>2000 mg/L) in coastal and semi-arid zones. (6) Heavy metals near "
            "industrial areas. Treatment options: defluoridation (Nalgonda technique), reverse osmosis, "
            "activated carbon, and ion exchange resins."
        ),
        "keywords": ["fluoride", "arsenic", "nitrate", "iron", "salinity", "heavy metals", "contamination", "treatment"]
    },
    {
        "id": "wq_003",
        "category": "water_quality",
        "title": "Water Quality in Coimbatore",
        "content": (
            "Coimbatore groundwater shows moderate TDS (300–800 mg/L) in most parts. Fluoride "
            "exceeds BIS limits (>1.5 mg/L) in some tehsils due to fluoride-bearing minerals in "
            "gneissic rocks. Nitrate contamination (>45 mg/L) has been reported in agricultural zones. "
            "Industrial effluents from textile/dyeing units in Tiruppur sub-basin have led to high "
            "TDS and chemical oxygen demand (COD) in shallow aquifers. CGWB and TWAD Board publish "
            "periodic water quality reports for the district."
        ),
        "keywords": ["Coimbatore", "TDS", "fluoride", "nitrate", "Tiruppur", "textile", "water quality"]
    },

    # ─── GW RESOURCE ASSESSMENT ─────────────────────────────────────────────────
    {
        "id": "gra_001",
        "category": "resource_assessment",
        "title": "GEC 2015 Methodology – Groundwater Resource Assessment",
        "content": (
            "India uses the Ground Water Estimation Committee (GEC) 2015 methodology for national "
            "groundwater resource assessment. Key components: "
            "(1) Estimation of Annual Replenishable Ground Water Resources (ARGWR) using water balance. "
            "(2) Deduction of natural discharge (base flow to streams, springs). "
            "(3) Net Annual Ground Water Availability = ARGWR – Natural Discharge. "
            "(4) Current Annual Ground Water Extraction (CAGWE) by all sectors. "
            "(5) Stage of Ground Water Development (%) = CAGWE / Net Availability × 100. "
            "Assessment units are typically at the block/taluk/mandal level."
        ),
        "keywords": ["GEC 2015", "resource assessment", "ARGWR", "stage of development", "water balance", "extraction"]
    },
    {
        "id": "gra_002",
        "category": "resource_assessment",
        "title": "Categorization of Assessment Units",
        "content": (
            "Based on GEC 2015, assessment units are categorized as: "
            "(1) Safe: Stage of development ≤70% AND long-term water level trend is stable or rising. "
            "(2) Semi-critical: Stage 70–90% OR declining trend (>0.2 m/yr) in pre-monsoon. "
            "(3) Critical: Stage 90–100% OR significant declining trend. "
            "(4) Over-exploited: Stage >100% — extraction exceeds recharge. "
            "(5) Saline: Groundwater salinity exceeds 3000 μS/cm and is unsuitable for irrigation. "
            "All India GW assessment (2022): ~16% over-exploited, ~4% critical, ~15% semi-critical, "
            "~65% safe."
        ),
        "keywords": ["categorization", "safe", "semi-critical", "critical", "over-exploited", "saline", "stage of development"]
    },
    {
        "id": "gra_003",
        "category": "resource_assessment",
        "title": "Tamil Nadu – Assessment Status",
        "content": (
            "In Tamil Nadu (2022 assessment), out of 385 assessment units: ~150 are over-exploited, "
            "~30 critical, ~55 semi-critical, and ~150 safe. Districts like Coimbatore, Madurai, "
            "Tirunelveli, and Vellore have significant over-exploited blocks due to high agricultural "
            "and industrial demand. The Noyyal sub-basin in Coimbatore has several semi-critical to "
            "critical blocks. CGWB reports and state SGWD (State Ground Water Department) bulletins "
            "provide block-wise categorization."
        ),
        "keywords": ["Tamil Nadu", "assessment", "over-exploited", "blocks", "Noyyal", "SGWD", "Coimbatore categorization"]
    },

    # ─── NOC / REGULATORY ───────────────────────────────────────────────────────
    {
        "id": "noc_001",
        "category": "noc_regulation",
        "title": "NOC for Groundwater Extraction – CGWB Framework",
        "content": (
            "The Central Ground Water Authority (CGWA) regulates groundwater extraction under "
            "Environment (Protection) Act, 1986. NOC (No Objection Certificate) is mandatory for: "
            "(1) Industries, infrastructure projects, and mining operations extracting >10 m³/day "
            "in notified areas. (2) All users (including agriculture) in over-exploited and critical "
            "units. (3) Borewells >200 mm diameter in semi-critical areas. "
            "Applications are submitted on the CGWB online portal (cgwb.gov.in/cgwa). "
            "Processing time: 30–60 working days. NOC is valid for 5 years and renewable."
        ),
        "keywords": ["NOC", "CGWA", "regulation", "extraction", "permit", "borewell", "notified area", "mandatory"]
    },
    {
        "id": "noc_002",
        "category": "noc_regulation",
        "title": "NOC Application Process – Step by Step",
        "content": (
            "Steps to obtain NOC from CGWA: "
            "Step 1: Register on cgwb.gov.in/cgwa portal using your email. "
            "Step 2: Fill Form-I (new users) or Form-II (renewal). Provide: name, address, "
            "purpose of extraction (industrial/commercial/drinking), proposed extraction quantity, "
            "borewell details (depth, diameter, location coordinates). "
            "Step 3: Upload documents: land ownership proof, site plan, water audit report, "
            "Aadhaar/PAN for individuals or incorporation certificate for companies. "
            "Step 4: Pay prescribed fee online. "
            "Step 5: CGWB regional office inspection (if required). "
            "Step 6: Receive NOC via email/portal. Install water meter and submit quarterly returns. "
            "For Tamil Nadu, CGWB South Eastern Regional Office, Chennai handles applications."
        ),
        "keywords": ["NOC process", "application", "CGWA portal", "documents", "Form-I", "Form-II", "Chennai CGWB"]
    },
    {
        "id": "noc_003",
        "category": "noc_regulation",
        "title": "Conditions Attached to NOC",
        "content": (
            "Standard NOC conditions issued by CGWA include: "
            "(1) Install a calibrated water meter; submit quarterly extraction returns online. "
            "(2) Construct a rainwater harvesting / artificial recharge structure (1 structure per "
            "1500 m² of built-up area or as specified). "
            "(3) Treat and reuse wastewater; no groundwater use for washing/cooling unless recycled. "
            "(4) Maintain minimum setback (30 m from public/community wells). "
            "(5) Borewell casing with grout seal to 6 m depth. "
            "(6) Comply with permissible extraction quantity; excess extraction penalised under EPA 1986. "
            "(7) Display NOC board at premises. Violation attracts closure of borewell and fine up to ₹1 lakh/day."
        ),
        "keywords": ["NOC conditions", "water meter", "rainwater harvesting", "recharge", "quarterly returns", "penalty"]
    },
    {
        "id": "noc_004",
        "category": "noc_regulation",
        "title": "State-Level Regulation – Tamil Nadu",
        "content": (
            "Tamil Nadu Water Supply and Drainage Board (TWAD) and State Ground Water Department "
            "(SGWD) regulate groundwater at state level under TN Ground Water (Development and "
            "Management) Act, 2003. Key provisions: "
            "(1) State Ground Water Authority (SGWA-TN) grants water use permits in notified areas. "
            "(2) Chennai Metropolitan Area requires additional Chennai Metro Water approval. "
            "(3) Registration of borewells >100 mm diameter is mandatory statewide. "
            "(4) Drilling agencies must be registered with SGWA-TN. "
            "CGWA NOC is required additionally for projects requiring EPA clearance."
        ),
        "keywords": ["Tamil Nadu", "TWAD", "SGWD", "TN Act 2003", "borewell registration", "SGWA", "state regulation"]
    },

    # ─── GW MANAGEMENT PRACTICES ────────────────────────────────────────────────
    {
        "id": "mgmt_001",
        "category": "management",
        "title": "Groundwater Management – Best Practices",
        "content": (
            "Sustainable groundwater management practices include: "
            "(1) Demand-side: drip/sprinkler irrigation, crop diversification, reducing paddy cultivation "
            "in over-exploited areas. "
            "(2) Supply-side: check dams, percolation tanks, rooftop rainwater harvesting, "
            "managed aquifer recharge (MAR), farm ponds. "
            "(3) Regulatory: groundwater zoning, licensing, metering. "
            "(4) Community-based: Groundwater Conservation Committees, participatory monitoring. "
            "(5) Data-driven: GIS-based management, telemetric monitoring, digital dashboards. "
            "CGWB's PRADHAN scheme and Jal Shakti Abhiyan promote mass recharge campaigns."
        ),
        "keywords": ["management", "drip irrigation", "check dam", "MAR", "managed aquifer recharge", "Jal Shakti", "PRADHAN"]
    },
    {
        "id": "mgmt_002",
        "category": "management",
        "title": "Artificial Recharge Techniques",
        "content": (
            "Artificial recharge methods: "
            "(1) Percolation tanks/ponds: impound runoff, recharge through infiltration. "
            "(2) Check dams and nala bunds: slow runoff in streams, increase seepage. "
            "(3) Recharge shafts / bore blasting: direct recharge to deep fractures in hard rock. "
            "(4) Rooftop rainwater harvesting (RRWH): mandatory in Tamil Nadu for buildings >100 m². "
            "(5) Spreading basins: spread water over permeable soils for infiltration. "
            "(6) Injection wells: pump treated water into confined aquifers (aquifer storage recovery). "
            "CGWB Master Plan for Artificial Recharge 2020 identifies 1.42 M recharge sites nationwide."
        ),
        "keywords": ["artificial recharge", "percolation tank", "check dam", "rooftop harvesting", "recharge shaft", "ASR"]
    },
    {
        "id": "mgmt_003",
        "category": "management",
        "title": "Groundwater Management in Over-Exploited Areas",
        "content": (
            "In over-exploited blocks, CGWB recommends: "
            "(1) Moratorium on new irrigation borewells. "
            "(2) Shift from water-intensive crops (paddy, sugarcane) to millets, pulses. "
            "(3) Large-scale MAR implementation with 100% surface runoff capture. "
            "(4) Wastewater recycling for industrial use to reduce freshwater draw. "
            "(5) Solar-powered drip systems to reduce energy-driven over-pumping. "
            "(6) Community groundwater budgeting at village level. "
            "(7) Groundwater Intensive Participatory Action Research (GIPAR) programmes. "
            "Coimbatore's Noyyal basin has active watershed programmes under National Watershed Project (PMKSY)."
        ),
        "keywords": ["over-exploited management", "moratorium", "crop change", "MAR", "GIPAR", "PMKSY", "watershed"]
    },

    # ─── GLOSSARY / DEFINITIONS ──────────────────────────────────────────────────
    {
        "id": "def_001",
        "category": "definitions",
        "title": "Groundwater Glossary – A to G",
        "content": (
            "Aquifer: A saturated permeable geological formation that can store and yield water. "
            "Aquiclude: Impermeable formation that does not transmit water (e.g., clay). "
            "Aquitard: Semi-permeable layer that transmits water very slowly. "
            "Artesian aquifer: Confined aquifer where hydraulic head exceeds land surface. "
            "Base flow: Stream flow sustained by groundwater discharge between rainfall events. "
            "Borewell (Tubewell): A vertical hole drilled to access groundwater, fitted with casing and pump. "
            "Confined aquifer: Aquifer bounded above and below by aquitards; water under pressure. "
            "Drawdown: Lowering of water table due to pumping. "
            "Effluent seepage: Recharge from irrigation return flow or wastewater. "
            "Fracture: Crack in hard rock forming a conduit for groundwater flow."
        ),
        "keywords": ["aquifer", "aquiclude", "aquitard", "artesian", "borewell", "drawdown", "fracture", "confined"]
    },
    {
        "id": "def_002",
        "category": "definitions",
        "title": "Groundwater Glossary – H to R",
        "content": (
            "Hydraulic conductivity (K): Rate of water flow through a unit area under unit hydraulic gradient (m/day). "
            "Hydraulic head: Total energy per unit weight at a point = elevation head + pressure head. "
            "Hydrogeology: Branch of geology studying groundwater distribution and movement. "
            "Permeability: Intrinsic property of rock/soil to transmit fluids. "
            "Phreatic zone: Saturated zone below the water table. "
            "Potentiometric surface: Surface to which water in a confined aquifer would rise (equals piezometric head). "
            "Recharge: Addition of water to the saturated zone from rainfall, irrigation, or rivers. "
            "Recharge rate: Volume of water added per unit area per year (mm/yr). "
            "Residuum: Unconsolidated weathered material above bedrock; primary water-bearing zone in hard-rock terrains."
        ),
        "keywords": ["hydraulic conductivity", "potentiometric", "phreatic", "recharge rate", "permeability", "residuum"]
    },
    {
        "id": "def_003",
        "category": "definitions",
        "title": "Groundwater Glossary – S to Z",
        "content": (
            "Safe yield: Maximum rate of groundwater extraction that can be sustained without causing "
            "unacceptable environmental or socioeconomic impacts. "
            "Specific capacity: Pumping rate per unit drawdown (m³/hr per metre). "
            "Specific yield (Sy): Ratio of drainable water volume to total rock volume (dimensionless, typically 0.01–0.3). "
            "Storage coefficient (S): Volume of water released from storage per unit area per unit head decline. "
            "Transmissivity (T): Rate of flow through unit width aquifer per unit hydraulic gradient; T = K × b (m²/day). "
            "Unconfined aquifer: Aquifer with free water surface (water table) open to atmosphere. "
            "Water table: Upper surface of the saturated zone in an unconfined aquifer. "
            "Zone of saturation: Rock zone where all pores are filled with water."
        ),
        "keywords": ["safe yield", "specific yield", "transmissivity", "water table", "storage coefficient", "unconfined"]
    },

    # ─── TRAINING / CAPACITY BUILDING ───────────────────────────────────────────
    {
        "id": "train_001",
        "category": "training",
        "title": "Training Opportunities – CGWB and National Institutes",
        "content": (
            "Key training opportunities in groundwater: "
            "(1) CGWB Training Division, Faridabad: Short courses on hydrogeology, groundwater "
            "modelling (MODFLOW), aquifer mapping, water quality analysis. Duration: 1–4 weeks. "
            "(2) National Institute of Hydrology (NIH), Roorkee: PG diploma, short courses on "
            "hydrology, groundwater management, remote sensing applications. "
            "(3) CGWB Regional Training Centres (Chennai, Lucknow, Nagpur, Kolkata): "
            "State-level training for engineers and geologists. "
            "(4) NCWRD (National Centre for Water Resources Development): Integrated water management courses. "
            "Contact: training@cgwb.gov.in or visit cgwb.gov.in/training."
        ),
        "keywords": ["training", "CGWB", "NIH Roorkee", "short course", "hydrogeology", "groundwater modelling", "MODFLOW"]
    },
    {
        "id": "train_002",
        "category": "training",
        "title": "Online Courses and Certifications in Groundwater",
        "content": (
            "Online learning resources: "
            "(1) NPTEL (nptel.ac.in): 'Groundwater Hydrology' course by IIT Kharagpur – free, with certification. "
            "(2) SWAYAM Portal: Courses on water resources engineering, hydrology. "
            "(3) UNESCO-IHE (IHE Delft): Online courses on groundwater modelling and aquifer management. "
            "(4) Coursera / edX: 'Water Resources Management' by institutions like TU Delft, ADB Institute. "
            "(5) CGWB e-learning portal: Modules on GEC methodology, NOC procedures, quality assessment. "
            "(6) IWMI online resources: groundwater governance and sustainability. "
            "Most NPTEL courses are free; certification exams cost ₹500–1000."
        ),
        "keywords": ["online training", "NPTEL", "SWAYAM", "UNESCO-IHE", "IIT Kharagpur", "e-learning", "certification"]
    },
    {
        "id": "train_003",
        "category": "training",
        "title": "Training for Drillers and Field Technicians",
        "content": (
            "Field-level training programmes: "
            "(1) CGWB Driller Training Programme: 6-week practical course covering borewell drilling, "
            "casing installation, pump testing, and safety. Conducted at regional offices. "
            "(2) State Ground Water Departments conduct annual refresher programmes for junior hydrogeologists. "
            "(3) Tamil Nadu SGWD training: Borewell registration process, water quality sampling, "
            "geophysical survey interpretation. Contact SGWD Headquarters, Chennai. "
            "(4) NGOs like ACWADAM (Advanced Centre for Water Resources Development) offer field "
            "training in participatory hydrogeology for community workers. "
            "Stipend available for select CGWB training batches."
        ),
        "keywords": ["driller training", "CGWB course", "field technician", "pump testing", "ACWADAM", "SGWD training"]
    },

    # ─── REPORTS AND DATA SOURCES ────────────────────────────────────────────────
    {
        "id": "rep_001",
        "category": "reports",
        "title": "Key CGWB Reports and Publications",
        "content": (
            "CGWB publishes the following reports available at cgwb.gov.in/publications: "
            "(1) Ground Water Year Book (annual) – national water level and quality data by state. "
            "(2) Dynamic Ground Water Resources of India (biennial) – resource assessment by block/taluk. "
            "(3) District Ground Water Brochures – hydrogeological profiles, well statistics, quality, "
            "management suggestions for each district. "
            "(4) Aquifer Mapping Reports (NAQUIM) – detailed aquifer geometry, properties, quality. "
            "(5) Master Plan for Artificial Recharge – potential sites and structures. "
            "(6) Ground Water Quality Data Reports – state-wise chemical analysis summaries. "
            "All publications are freely downloadable in PDF format from the CGWB website."
        ),
        "keywords": ["CGWB report", "Year Book", "brochure", "NAQUIM", "Dynamic Resources", "publication", "PDF"]
    },
    {
        "id": "rep_002",
        "category": "reports",
        "title": "India-WRIS and Data Portals",
        "content": (
            "Key data portals for groundwater information: "
            "(1) India-WRIS (indiawris.gov.in) – Water Resources Information System; provides "
            "groundwater level, quality, abstraction data; GIS layers for basins, aquifers. "
            "(2) CGWB Portal (cgwb.gov.in) – reports, NOC applications, monitoring data. "
            "(3) Data.gov.in – open government datasets including CGWB groundwater data. "
            "(4) NAQUIM Viewer – interactive aquifer maps at 1:50,000 scale. "
            "(5) IMD Hydromet Data – rainfall data useful for recharge estimation. "
            "(6) TWAD (Tamil Nadu) portal – state-level water supply and groundwater data. "
            "APIs available on India-WRIS for programmatic data access (REST/JSON)."
        ),
        "keywords": ["India-WRIS", "data portal", "CGWB portal", "NAQUIM viewer", "open data", "GIS", "API"]
    },
    {
        "id": "rep_003",
        "category": "reports",
        "title": "Accessing District-Specific Groundwater Reports",
        "content": (
            "To access groundwater reports for a specific district: "
            "(1) Visit cgwb.gov.in → Publications → District Ground Water Brochures → select State → District. "
            "(2) India-WRIS portal → Reports → select district from dropdown. "
            "(3) State Ground Water Department website (e.g., environment.tn.gov.in for Tamil Nadu). "
            "(4) CGWB Regional Office: CGWB South Eastern Regional Office (SERO), Taramani, Chennai – "
            "contact for Tamil Nadu districts including Coimbatore. Phone: 044-22542391. "
            "(5) RTI application to CGWB for unpublished data. "
            "Reports typically cover: hydrogeology, water levels, quality, assessment, recharge potential."
        ),
        "keywords": ["district report", "brochure", "access", "CGWB SERO Chennai", "Tamil Nadu reports", "RTI"]
    },

    # ─── COMPREHENSIVE AREA REPORT ───────────────────────────────────────────────
    {
        "id": "comp_001",
        "category": "comprehensive_report",
        "title": "Comprehensive Groundwater Report Structure for an Area",
        "content": (
            "A comprehensive Area-of-Interest (AoI) groundwater report includes: "
            "1. Executive Summary. "
            "2. Area Description: location, administrative units, physiography, climate. "
            "3. Hydrogeological Setting: geology, aquifer type, depth to water, hydraulic parameters. "
            "4. Water Level Scenario: pre/post-monsoon trends, long-term analysis, spatial distribution. "
            "5. Groundwater Resource Assessment: GEC 2015 methodology, ARGWR, stage of development. "
            "6. Categorization: Safe/Semi-critical/Critical/Over-exploited. "
            "7. Water Quality: physical, chemical, bacterial parameters; fitness for use. "
            "8. GW Management Practices: recommended recharge, demand-side measures. "
            "9. NOC Requirements: applicability, conditions, procedure. "
            "10. Available Reports and Data Sources. "
            "11. Training Opportunities. "
            "12. Definitions and Glossary. "
            "13. References."
        ),
        "keywords": ["comprehensive report", "AoI report", "area report", "structure", "executive summary", "report format"]
    }
]
