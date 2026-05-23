# 🤖 CXO TechBOT - Engati Implementation Guide
**Website:** https://cxotechbot.com/  
**Created:** 2026-04-17  
**Platform:** Engati AI Chatbot Builder

---

## 📋 Table of Contents
1. [Global Setup](#global-setup)
2. [Engati-Specific Configuration](#engati-specific-configuration)
3. [Flow Architecture](#flow-architecture)
4. [Detailed Node Instructions](#detailed-node-instructions)
5. [Entity & Attribute Management](#entity--attribute-management)
6. [Lead Capture Strategy](#lead-capture-strategy)
7. [Integration & Analytics](#integration--analytics)
8. [Testing Checklist](#testing-checklist)

---

## 🌐 Global Setup

### Step 1: Create Engati Bot
1. Go to [Engati.ai](https://www.engati.ai/)
2. Sign up or log in
3. Click "Create New Bot"
4. Name: `CXO-TechBOT`
5. Select Language: English
6. Use template: **Blank** (custom build)

### Step 2: Configure Bot Settings
- **Bot Name:** CXO TechBOT
- **Description:** AI-powered tech news, reports, and events platform
- **Greeting Message:** "👋 Hi, welcome to CXO TechBOT! I can help you with tech news, reports, events, and more."
- **Default Flow:** WELCOME_FLOW

---

## 🔧 Engati-Specific Configuration

### Global Attributes (Variables)
Create these in **Train > Attributes** section:

| Attribute | Type | Description | Required |
|-----------|------|-------------|----------|
| `user_email` | Text | Email address for lead capture | Yes |
| `user_name` | Text | User's full name | Yes |
| `user_message` | Text | User's inquiry message | No |
| `selected_topic` | Text | Tech news topic choice | No |
| `selected_report` | Text | Selected report type | No |
| `selected_event` | Text | Selected event | No |
| `user_phone` | Phone | Contact phone number | No |
| `user_company` | Text | Company name (optional) | No |
| `registration_timestamp` | DateTime | When user registered | Auto |

### Built-in Entities (Use Engati's Pre-defined)
- **email** - Auto-extract email addresses
- **phone_number** - Auto-extract phone numbers
- **date** - Auto-extract dates for events
- **url** - Auto-extract website URLs

### Custom Entities to Create
1. **tech_topics** - Values: AI, Cybersecurity, Startups, Leadership, Cloud Computing
2. **report_types** - Values: AI Adoption, Cloud Trends, Security, Innovation, Market Analysis
3. **event_types** - Values: Summit, Conference, Webinar, Workshop

---

## 🗺️ Flow Architecture

### Flow Hierarchy
```
WELCOME_FLOW (Entry Point)
│
├── NEWS_FLOW
│   ├── NEWS_TOPIC_SELECT
│   ├── NEWS_ARTICLES
│   ├── NEWS_SUMMARY
│   └── NEWS_FULL
│
├── REPORT_FLOW
│   ├── REPORT_SELECT
│   ├── REPORT_SUMMARY
│   └── REPORT_DOWNLOAD (Lead Capture)
│
├── EVENT_FLOW
│   ├── EVENT_SELECT
│   ├── EVENT_DETAILS
│   └── EVENT_REGISTER (Lead Capture)
│
├── CONTACT_FLOW
│   ├── CONTACT_MESSAGE
│   └── CONTACT_CONFIRM (Lead Capture)
│
└── FALLBACK_FLOW
```

---

## 📝 Detailed Node Instructions

### 🎯 FLOW 1: WELCOME_FLOW

**Flow Name:** `WELCOME_FLOW`  
**Node Type:** Start/Entry Point  
**Purpose:** Main welcome screen with navigation options

#### Node 1.1: Welcome Message
- **Node Type:** Send Message with Options
- **Message Text:**
```
👋 Hi, welcome to CXO TechBOT!

I can help you with:
📰 Tech News & Trends
📊 Industry Reports
📅 Events & Webinars
🤝 Get in Touch

What interests you?
```

- **Button Options:**
  1. Text: "📰 Tech News" → Trigger Path: NEWS_FLOW
  2. Text: "📊 Reports" → Trigger Path: REPORT_FLOW
  3. Text: "📅 Events" → Trigger Path: EVENT_FLOW
  4. Text: "🤝 Contact" → Trigger Path: CONTACT_FLOW

- **Node Settings:**
  - Allow user to type custom response: Yes
  - If custom input → Trigger: FALLBACK_FLOW

---

### 📰 FLOW 2: NEWS_FLOW

**Flow Name:** `NEWS_FLOW`  
**Purpose:** Deliver tech news by topic

#### Node 2.1: Topic Selection
- **Node Type:** Send Message with Options
- **Message Text:**
```
📰 Select a tech topic:

What would you like to read about?
```

- **Button Options:**
  1. "🤖 AI & Machine Learning" → Save: `selected_topic = "AI"`
  2. "🔒 Cybersecurity" → Save: `selected_topic = "Cybersecurity"`
  3. "🚀 Startups & Innovation" → Save: `selected_topic = "Startups"`
  4. "👔 Leadership & Culture" → Save: `selected_topic = "Leadership"`
  5. "☁️ Cloud Computing" → Save: `selected_topic = "Cloud"`

- **After Button Click:** Proceed to Node 2.2

#### Node 2.2: Show Articles
- **Node Type:** Send Message
- **Message Text:**
```
📰 Latest {{selected_topic}} Articles:

Here are the top stories today:

1️⃣ "The Future of {{selected_topic}} in 2026"
   - Industry leaders share insights
   - Read time: 8 mins

2️⃣ "{{selected_topic}} Trends You Should Know"
   - Key takeaways for decision-makers
   - Read time: 5 mins

3️⃣ "Expert Roundtable: {{selected_topic}} Predictions"
   - Top CXOs discuss what's next
   - Read time: 12 mins

What would you like to do?
```

**Wait for:** Node 2.3

#### Node 2.3: Article Options
- **Node Type:** Send Message with Options
- **Message Text:** "How would you like to proceed?"

- **Button Options:**
  1. "📄 Read Summary" → Trigger Path: NEWS_SUMMARY
  2. "📖 Read Full Article" → Trigger Path: NEWS_FULL
  3. "🔙 Back" → Trigger Path: WELCOME_FLOW

#### Node 2.4: NEWS_SUMMARY (Sub-path)
- **Node Type:** Send Message
- **Message Text:**
```
📋 Quick Summary - {{selected_topic}}

Key Points:
✓ Latest industry trends and innovations
✓ Key players and market movements
✓ Impact on enterprise IT decisions
✓ Recommended actions for leadership

💡 Full article available on our website: https://cxotechbot.com/news

Would you like anything else?
```

- **Button Options:**
  1. "📖 Full Article" → Trigger Path: NEWS_FULL
  2. "📰 More News" → Trigger Path: NEWS_FLOW (Node 2.1)
  3. "🏠 Home" → Trigger Path: WELCOME_FLOW

#### Node 2.5: NEWS_FULL (Sub-path)
- **Node Type:** Send Message
- **Message Text:**
```
📖 Full Article - {{selected_topic}}

Complete analysis available exclusively on our website:
🔗 https://cxotechbot.com/articles/{{selected_topic}}

This article includes:
• In-depth analysis
• Expert interviews
• Data visualizations
• Actionable insights

💌 Subscribe to our newsletter for weekly updates!
```

- **Button Options:**
  1. "📰 More News" → Trigger Path: NEWS_FLOW (Node 2.1)
  2. "📊 View Reports" → Trigger Path: REPORT_FLOW
  3. "🏠 Home" → Trigger Path: WELCOME_FLOW

---

### 📊 FLOW 3: REPORT_FLOW

**Flow Name:** `REPORT_FLOW`  
**Purpose:** Download industry reports with lead capture

#### Node 3.1: Report Selection
- **Node Type:** Send Message with Options
- **Message Text:**
```
📊 Select a Report:

Download insights from our latest research:
```

- **Button Options:**
  1. "🤖 AI Adoption Report 2026" → Save: `selected_report = "AI Adoption"`
  2. "☁️ Cloud Trends Report" → Save: `selected_report = "Cloud Trends"`
  3. "🔒 Cybersecurity Posture Report" → Save: `selected_report = "Cybersecurity"`
  4. "📈 Market Analysis 2026" → Save: `selected_report = "Market Analysis"`

- **After Selection:** Proceed to Node 3.2

#### Node 3.2: Report Summary
- **Node Type:** Send Message
- **Message Text:**
```
📊 {{selected_report}} Report

📌 Key Findings:
• Market size and growth projections
• Enterprise adoption rates
• Key challenges and opportunities
• Technology recommendations
• Budget allocation insights

📄 Format: PDF (15-20 pages)
⏱️ Read time: 45 minutes
📅 Updated: 2026-04-17

Download this report to access:
✓ Detailed market analysis
✓ Competitive landscape
✓ Implementation roadmap
✓ Budget planning guide

Would you like to download?
```

- **Button Options:**
  1. "⬇️ Download Report" → Trigger Path: REPORT_DOWNLOAD
  2. "🔙 Back" → Trigger Path: REPORT_FLOW (Node 3.1)
  3. "🏠 Home" → Trigger Path: WELCOME_FLOW

#### Node 3.3: REPORT_DOWNLOAD (Lead Capture)
- **Node Type:** Send Message
- **Message Text:**
```
📩 Download Your Report

To send you the report, we just need:
```

**Then Trigger:** Node 3.3a

#### Node 3.3a: Request Email
- **Node Type:** Request User Data
- **Request Type:** Email (Built-in Entity)
- **Message Text:** "What's your email address?"
- **Validation:** Strict email validation
- **Save to Attribute:** `user_email`
- **On Success:** Proceed to Node 3.3b

#### Node 3.3b: Request Name (Optional)
- **Node Type:** Request User Data
- **Request Type:** Standard Text Input
- **Message Text:** "And your name? (optional)"
- **Save to Attribute:** `user_name`
- **Optional:** Yes (can skip)
- **On Success:** Proceed to Node 3.3c

#### Node 3.3c: Confirmation & Lead Tracking
- **Node Type:** Send Message
- **Message Text:**
```
✅ Perfect! Thanks {{user_name}}!

📧 We're sending "{{selected_report}}" to {{user_email}}

You should receive it within 2 minutes.
Check your spam folder if you don't see it.

💬 Tip: Reply with any questions and our team will help!
```

- **Backend Action:** 
  - Save lead to database (email, name, report, timestamp)
  - Trigger CRM integration (HubSpot/Salesforce)
  - Send automated email with report PDF

- **Button Options:**
  1. "📰 Read News" → Trigger Path: NEWS_FLOW
  2. "📅 View Events" → Trigger Path: EVENT_FLOW
  3. "🏠 Home" → Trigger Path: WELCOME_FLOW

---

### 📅 FLOW 4: EVENT_FLOW

**Flow Name:** `EVENT_FLOW`  
**Purpose:** Event promotion and registration

#### Node 4.1: Event Selection
- **Node Type:** Send Message with Options
- **Message Text:**
```
📅 Upcoming Events & Webinars

Join us for exclusive insights from industry leaders:
```

- **Button Options:**
  1. "🏆 AI Summit 2026" → Save: `selected_event = "AI Summit"`
  2. "🔒 Cybersecurity Conference" → Save: `selected_event = "Security Conf"`
  3. "💼 CXO Leadership Roundtable" → Save: `selected_event = "Roundtable"`
  4. "☁️ Cloud Architecture Webinar" → Save: `selected_event = "Cloud Webinar"`

- **After Selection:** Proceed to Node 4.2

#### Node 4.2: Event Details
- **Node Type:** Send Message
- **Message Text:**
```
📅 {{selected_event}}

📍 Details:
🕐 Date: June 15, 2026
⏰ Time: 10:00 AM - 4:00 PM (EST)
📍 Location: Virtual + In-Person
👥 Expected Attendees: 500+ CXOs & IT Leaders

🎯 What You'll Learn:
• Emerging technology trends
• Real-world case studies
• Networking with peers
• Exclusive insights from industry experts

🎤 Featured Speakers:
• CXO leaders from Fortune 500
• Technology visionaries
• Industry analysts

💰 Investment: Free Registration

Ready to join?
```

- **Button Options:**
  1. "✅ Register Now" → Trigger Path: EVENT_REGISTER
  2. "📖 Learn More" → Link: https://cxotechbot.com/events/{{selected_event}}
  3. "🔙 Back" → Trigger Path: EVENT_FLOW (Node 4.1)

#### Node 4.3: EVENT_REGISTER (Lead Capture)
- **Node Type:** Send Message
- **Message Text:**
```
🎉 Event Registration

Let's get you registered for {{selected_event}}:
```

**Then Trigger:** Node 4.3a

#### Node 4.3a: Request Name
- **Node Type:** Request User Data
- **Request Type:** Standard Text Input
- **Message Text:** "What's your full name?"
- **Save to Attribute:** `user_name`
- **On Success:** Proceed to Node 4.3b

#### Node 4.3b: Request Email
- **Node Type:** Request User Data
- **Request Type:** Email (Built-in Entity)
- **Message Text:** "Your email address:"
- **Save to Attribute:** `user_email`
- **On Success:** Proceed to Node 4.3c

#### Node 4.3c: Request Company (Optional)
- **Node Type:** Request User Data
- **Request Type:** Standard Text Input
- **Message Text:** "Your company? (optional)"
- **Save to Attribute:** `user_company`
- **Optional:** Yes
- **On Success:** Proceed to Node 4.3d

#### Node 4.3d: Confirmation
- **Node Type:** Send Message
- **Message Text:**
```
🎉 Excellent! You're registered!

✅ Name: {{user_name}}
✅ Email: {{user_email}}
✅ Company: {{user_company}}
✅ Event: {{selected_event}}

📧 Confirmation email sent to {{user_email}}

👉 What's next?
```

- **Backend Action:**
  - Save registration to database
  - Add to event waitlist/attendee list
  - Send calendar invite
  - Add to email marketing list

- **Button Options:**
  1. "📰 Read News" → Trigger Path: NEWS_FLOW
  2. "📊 View Reports" → Trigger Path: REPORT_FLOW
  3. "🏠 Home" → Trigger Path: WELCOME_FLOW

---

### 🤝 FLOW 5: CONTACT_FLOW

**Flow Name:** `CONTACT_FLOW`  
**Purpose:** Lead inquiries and customer contact

#### Node 5.1: Request Message
- **Node Type:** Request User Data
- **Request Type:** Long Text Input
- **Message Text:**
```
🤝 Let's Connect!

How can we help you? Tell us about your inquiry:
```

- **Save to Attribute:** `user_message`
- **Character Limit:** 500 characters
- **On Success:** Proceed to Node 5.2

#### Node 5.2: Request Email
- **Node Type:** Request User Data
- **Request Type:** Email (Built-in Entity)
- **Message Text:** "What's your email? (so we can reach you)"
- **Save to Attribute:** `user_email`
- **On Success:** Proceed to Node 5.3

#### Node 5.3: Request Phone (Optional)
- **Node Type:** Request User Data
- **Request Type:** Phone Number (Built-in Entity)
- **Message Text:** "Your phone number? (optional)"
- **Save to Attribute:** `user_phone`
- **Optional:** Yes
- **On Success:** Proceed to Node 5.4

#### Node 5.4: Confirmation
- **Node Type:** Send Message
- **Message Text:**
```
✅ Thank You {{user_name}}!

We received your message:
"{{user_message}}"

📧 Contact: {{user_email}}

Our team will get back to you within 24 hours.

💡 In the meantime, explore more:
```

- **Backend Action:**
  - Save inquiry to database
  - Create support ticket
  - Send confirmation email
  - Notify sales team

- **Button Options:**
  1. "📰 Read News" → Trigger Path: NEWS_FLOW
  2. "📅 Upcoming Events" → Trigger Path: EVENT_FLOW
  3. "🏠 Home" → Trigger Path: WELCOME_FLOW

---

### 🤖 FLOW 6: FALLBACK_FLOW

**Flow Name:** `FALLBACK_FLOW`  
**Purpose:** Handle unrecognized user inputs

#### Node 6.1: Fallback Message
- **Node Type:** Send Message with Options
- **Message Text:**
```
😅 Hmm, I didn't quite understand that.

Let me help you get back on track:
```

- **Button Options:**
  1. "📰 Tech News" → Trigger Path: NEWS_FLOW
  2. "📊 Industry Reports" → Trigger Path: REPORT_FLOW
  3. "📅 Events" → Trigger Path: EVENT_FLOW
  4. "🤝 Contact Us" → Trigger Path: CONTACT_FLOW
  5. "🏠 Home" → Trigger Path: WELCOME_FLOW

- **Smart Response (Optional):**
  - Use Engati's NLU to detect intent from custom input
  - Route to most relevant flow

---

## 📊 Entity & Attribute Management

### Setting Up in Engati

**Step 1: Create Attributes**
1. Go to **Train** section
2. Click **Attributes**
3. Add each attribute with:
   - Name: `user_email`, `user_name`, etc.
   - Type: Text, Email, Phone, DateTime
   - Scope: Global (applies to all flows)

**Step 2: Create Entities**
1. Go to **Train** section
2. Click **Entities**
3. Create Custom Entities:

#### Entity: tech_topics
```
Values:
- AI
- Cybersecurity
- Startups
- Leadership
- Cloud Computing
- DevOps
```

#### Entity: report_types
```
Values:
- AI Adoption
- Cloud Trends
- Cybersecurity
- Innovation
- Market Analysis
```

#### Entity: event_types
```
Values:
- Summit
- Conference
- Webinar
- Workshop
- Roundtable
```

**Step 3: Use in Flows**
- When requesting user input, select:
  - **Attribute** (for saving) 
  - **Entity** (for NLU extraction if applicable)

---

## 💼 Lead Capture Strategy

### Lead Quality Scoring
Capture these fields in order of priority:

**Tier 1 (Critical)**
- ✅ Email address (all flows)
- ✅ Full name (reports & events)

**Tier 2 (Important)**
- Company name
- Phone number
- Topic/Report/Event interest

**Tier 3 (Nice-to-have)**
- Job title
- Company size
- Budget timeline

### Integration Points

#### CRM Integration (Recommended)
- **Zapier → HubSpot/Salesforce**
  - Trigger: User completes lead capture
  - Action: Create new contact/lead in CRM
  - Fields: email, name, company, source, timestamp

#### Email Marketing
- **Mailchimp/ActiveCampaign**
  - Auto-add users to segment based on interest
  - Send welcome email immediately
  - Segment 1: News readers
  - Segment 2: Report downloaders
  - Segment 3: Event registrants

#### Analytics
- **Google Analytics / Mixpanel**
  - Track flow completion rates
  - Identify drop-off points
  - Measure conversion funnel

---

## 🔌 Integration & Analytics

### Step 1: Enable Chat Widget
1. Go to **Configure** → **Channels**
2. Select **Website** → **Chat Widget**
3. Copy embed code
4. Add to: https://cxotechbot.com/

```html
<!-- Add to your website footer -->
<script>
  window.engawaiting = window.engawaiting || [];
  engawaiting.push({
    widget_id: "YOUR_WIDGET_ID",
    bot_id: "YOUR_BOT_ID"
  });
</script>
<script src="https://engati.ai/widget.js"></script>
```

### Step 2: Analytics Dashboard
1. Go to **Analytics** section
2. Set up dashboards:
   - **Conversation Metrics**
     - Total conversations: Track volume
     - Avg conversation length: Quality indicator
     - User satisfaction: CSAT score
   
   - **Flow Performance**
     - Flow completion rate by path
     - Drop-off points
     - Time spent in each node
   
   - **Lead Capture Metrics**
     - Email capture rate
     - Lead source breakdown
     - Conversion funnel

### Step 3: Connect External Tools
- **Zapier Integration** → Connect 1000+ apps
- **Webhook** → Send data to custom APIs
- **API Integration** → Direct backend connection

**Example Workflow:**
```
User completes report download
↓
Zapier trigger fires
↓
Create HubSpot contact
↓
Send welcome email
↓
Add to marketing automation
```

---

## ✅ Testing Checklist

### Before Launch Testing

#### Conversation Flow
- [ ] WELCOME_FLOW loads correctly
- [ ] All button navigations work
- [ ] Fallback handles unknown inputs
- [ ] Navigation history works (back button)

#### Data Collection
- [ ] Email validation works
- [ ] Phone validation works
- [ ] Text input saves to attributes
- [ ] Attributes display correctly in messages

#### Each Main Flow
- [ ] NEWS_FLOW: All topics load, articles show, options work
- [ ] REPORT_FLOW: Report summary displays, download link works
- [ ] EVENT_FLOW: Event details load, registration saves data
- [ ] CONTACT_FLOW: Message captured, no data loss

#### Lead Capture
- [ ] Email sent to user after registration
- [ ] Lead appears in CRM within 2 minutes
- [ ] User added to email list
- [ ] Confirmation message displays correctly

#### Integration
- [ ] Chat widget loads on website
- [ ] Analytics dashboard shows conversations
- [ ] Webhook receives data
- [ ] Email notifications sent to team

#### Edge Cases
- [ ] User leaves mid-conversation
- [ ] User returns to same flow twice
- [ ] User tries rapid clicking
- [ ] Very long text input (500+ chars)
- [ ] Special characters in name/email

#### Mobile Experience
- [ ] Chat widget responsive
- [ ] Buttons readable on mobile
- [ ] Input fields usable on mobile
- [ ] No text overflow

---

## 🚀 Launch Steps

### Week 1: Build & Test
1. Create all flows in Engati
2. Set up attributes and entities
3. Configure integrations
4. Test all conversation paths
5. Deploy to test channel

### Week 2: Integration
1. Add chat widget to website
2. Set up CRM sync
3. Configure email notifications
4. Set up analytics tracking
5. Prepare team training

### Week 3: Soft Launch
1. Limited release (internal team + beta users)
2. Monitor conversations
3. Collect feedback
4. Fix issues found
5. Refine messaging

### Week 4: Full Launch
1. Enable on public website
2. Market on social media
3. Email announcement
4. Monitor closely for first week
5. Daily optimization

---

## 📈 Optimization Tips

### Improve Engagement
- Use emojis strategically (not overdone)
- Ask for permission before requesting data
- Show progress (step 1 of 3)
- Offer alternatives when possible

### Reduce Drop-off
- Keep messages concise (max 3-4 lines)
- Limit button options to 3-4 per message
- Make data requests optional when possible
- Always provide "Back" and "Home" options

### Increase Conversions
- Lead with value ("Download report", not "Enter email")
- Show social proof ("500+ CXOs already registered")
- Create urgency ("Limited seats available")
- Follow up with email immediately

---

## 📞 Support & Resources

- **Engati Help Center:** https://help.engati.com/
- **Documentation:** https://docs.engati.com/
- **Community:** https://community.engati.com/
- **Support Email:** support@engati.ai

---

## 📝 Notes for Your Team

**Next Steps:**
1. Create Engati account
2. Build flows following this guide
3. Set up CRM/email integrations
4. Test thoroughly before launch
5. Monitor analytics daily first month

**Key Contacts:**
- Bot Developer: [Your Name]
- CRM Admin: [Team Member]
- Marketing Lead: [Team Member]
- Analytics Owner: [Team Member]

---

**Last Updated:** 2026-04-17  
**Version:** 1.0  
**Status:** Ready for Implementation
