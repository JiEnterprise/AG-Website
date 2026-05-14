export type TemplateCategory =
  | 'onboarding'
  | 'statement'
  | 'fee'
  | 'trade'
  | 'quarterly'
  | 'holiday'
  | 'compliance'

export type EmailTemplate = {
  id: string
  name: string
  category: TemplateCategory
  subject: string
  preview: string
  body: string
  variables: string[]
  lastUsed?: string
  usageCount: number
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'TPL-001',
    name: 'Welcome New Client',
    category: 'onboarding',
    subject: 'Welcome to Aurum Global — Your Account Is Active',
    preview: 'Your investment management account has been activated...',
    variables: ['{{CLIENT_NAME}}', '{{CLIENT_ID}}', '{{INITIAL_DEPOSIT}}', '{{STRATEGY}}', '{{ADVISOR_NAME}}'],
    lastUsed: '2025-10-15',
    usageCount: 2,
    body: `Dear {{CLIENT_NAME}},

Welcome to Aurum Global Inc. Your investment management account is now active and fully configured.

Account Details:
• Client ID: {{CLIENT_ID}}
• Initial Deposit: {{INITIAL_DEPOSIT}}
• Assigned Strategy: {{STRATEGY}}
• Management Fee: 1% of month-end AUM, billed monthly

What happens next:
1. Your funds are now deployed under our AGQuant strategy
2. You will receive a monthly performance statement on the 1st of each month
3. Fee invoices are sent on the 5th and due within 5 business days
4. You can reach us at any time via this email or SMS

It is a privilege to manage your capital. We take that responsibility seriously.

Warm regards,
{{ADVISOR_NAME}}
Founder & Portfolio Manager
Aurum Global Inc.`,
  },
  {
    id: 'TPL-002',
    name: 'Monthly Statement Ready',
    category: 'statement',
    subject: '{{MONTH}} Statement — {{CLIENT_ID}} | Aurum Global',
    preview: 'Your monthly performance statement is attached...',
    variables: ['{{CLIENT_NAME}}', '{{CLIENT_ID}}', '{{MONTH}}', '{{NET_RETURN}}', '{{CLOSING_AUM}}', '{{ADVISOR_NAME}}'],
    lastUsed: '2025-12-01',
    usageCount: 9,
    body: `Dear {{CLIENT_NAME}},

Your {{MONTH}} performance statement is ready.

Summary:
• Net Return: {{NET_RETURN}}
• Closing AUM: {{CLOSING_AUM}}
• Statement Period: {{MONTH}}

Your detailed statement is attached to this email. It includes all trades, dividends received, fees, and your running balance.

If you have any questions about any line item, please don't hesitate to reach out.

Best,
{{ADVISOR_NAME}}
Aurum Global Inc.`,
  },
  {
    id: 'TPL-003',
    name: 'Fee Invoice Due',
    category: 'fee',
    subject: 'Management Fee Due — {{AMOUNT}} | Aurum Global',
    preview: 'Your monthly management fee invoice is attached...',
    variables: ['{{CLIENT_NAME}}', '{{CLIENT_ID}}', '{{AMOUNT}}', '{{DUE_DATE}}', '{{PERIOD}}', '{{PAYMENT_METHOD}}', '{{ADVISOR_NAME}}'],
    lastUsed: '2025-12-05',
    usageCount: 7,
    body: `Dear {{CLIENT_NAME}},

Your management fee invoice for {{PERIOD}} is ready.

Invoice Details:
• Client ID: {{CLIENT_ID}}
• Management Fee: {{AMOUNT}}
• Due Date: {{DUE_DATE}}
• Payment Method: {{PAYMENT_METHOD}}

Please send payment by the due date to avoid a late notice. As always, your full fee breakdown is included in your monthly statement.

Thank you,
{{ADVISOR_NAME}}
Aurum Global Inc.`,
  },
  {
    id: 'TPL-004',
    name: 'Fee Received — Confirmation',
    category: 'fee',
    subject: 'Fee Received — Thank You | Aurum Global',
    preview: 'We have received your management fee payment...',
    variables: ['{{CLIENT_NAME}}', '{{AMOUNT}}', '{{PERIOD}}', '{{ADVISOR_NAME}}'],
    lastUsed: '2025-12-03',
    usageCount: 8,
    body: `Dear {{CLIENT_NAME}},

We have received your management fee payment of {{AMOUNT}} for {{PERIOD}}.

Your account is current. No further action is required.

Thank you for your continued trust in Aurum Global.

Best,
{{ADVISOR_NAME}}
Aurum Global Inc.`,
  },
  {
    id: 'TPL-005',
    name: 'Trade Confirmation',
    category: 'trade',
    subject: 'Trade Executed — {{SYMBOL}} | Aurum Global',
    preview: 'A trade has been executed in your account...',
    variables: ['{{CLIENT_NAME}}', '{{CLIENT_ID}}', '{{ACTION}}', '{{SHARES}}', '{{SYMBOL}}', '{{PRICE}}', '{{TOTAL}}', '{{STRATEGY}}', '{{ADVISOR_NAME}}'],
    lastUsed: '2025-11-26',
    usageCount: 5,
    body: `Dear {{CLIENT_NAME}},

A trade has been executed in your account under the AGQuant strategy.

Trade Details:
• Action: {{ACTION}}
• Symbol: {{SYMBOL}}
• Shares: {{SHARES}}
• Price: {{PRICE}}
• Total Value: {{TOTAL}}
• Strategy: {{STRATEGY}}

This trade was executed by the AGQuant algorithm as part of your approved investment strategy. No action is required on your part.

For questions about this trade, reply to this email.

Best,
{{ADVISOR_NAME}}
Aurum Global Inc.`,
  },
  {
    id: 'TPL-006',
    name: 'Quarterly Outlook',
    category: 'quarterly',
    subject: '{{QUARTER}} Outlook & Portfolio Review | Aurum Global',
    preview: 'A note on market conditions and your portfolio heading into the next quarter...',
    variables: ['{{CLIENT_NAME}}', '{{QUARTER}}', '{{QUARTER_RETURN}}', '{{YTD_RETURN}}', '{{MARKET_NOTES}}', '{{STRATEGY_NOTES}}', '{{ADVISOR_NAME}}'],
    lastUsed: '2025-10-01',
    usageCount: 2,
    body: `Dear {{CLIENT_NAME}},

As we head into {{QUARTER}}, I wanted to share a brief update on your portfolio and my current market outlook.

Your Portfolio:
• Quarter Return: {{QUARTER_RETURN}}
• Year-to-Date: {{YTD_RETURN}}

Market Outlook:
{{MARKET_NOTES}}

Strategy Notes:
{{STRATEGY_NOTES}}

As always, the AGQuant engine is running continuously and we remain disciplined in our entries and exits. I'll continue to keep you informed.

Best regards,
{{ADVISOR_NAME}}
Founder & Portfolio Manager
Aurum Global Inc.`,
  },
  {
    id: 'TPL-007',
    name: 'Holiday Message',
    category: 'holiday',
    subject: 'Season\'s Greetings from Aurum Global',
    preview: 'Wishing you and your family a wonderful holiday season...',
    variables: ['{{CLIENT_NAME}}', '{{ADVISOR_NAME}}', '{{YEAR}}'],
    lastUsed: '2024-12-20',
    usageCount: 1,
    body: `Dear {{CLIENT_NAME}},

As {{YEAR}} comes to a close, I wanted to take a moment to express my sincere gratitude for your trust and confidence in Aurum Global Inc.

It has been a rewarding year of growth — both for your portfolio and for our firm. We look forward to continuing this journey together in the new year.

Wishing you and your family health, happiness, and prosperity.

With warm regards,
{{ADVISOR_NAME}}
Founder & Portfolio Manager
Aurum Global Inc.`,
  },
  {
    id: 'TPL-008',
    name: 'Fee Reminder (Overdue)',
    category: 'fee',
    subject: 'Reminder: Outstanding Fee — {{AMOUNT}} | Aurum Global',
    preview: 'This is a friendly reminder that your management fee is still outstanding...',
    variables: ['{{CLIENT_NAME}}', '{{AMOUNT}}', '{{ORIGINAL_DUE_DATE}}', '{{ADVISOR_NAME}}'],
    lastUsed: '2025-12-05',
    usageCount: 1,
    body: `Dear {{CLIENT_NAME}},

This is a friendly reminder that your management fee of {{AMOUNT}} was due on {{ORIGINAL_DUE_DATE}} and remains outstanding.

Please send payment at your earliest convenience. If you have already sent the payment, please let us know and we will update our records.

Thank you,
{{ADVISOR_NAME}}
Aurum Global Inc.`,
  },
  {
    id: 'TPL-009',
    name: 'Compliance — IMA Annual Renewal',
    category: 'compliance',
    subject: 'Annual Agreement Renewal Required | Aurum Global',
    preview: 'Your Investment Management Agreement is due for annual renewal...',
    variables: ['{{CLIENT_NAME}}', '{{CLIENT_ID}}', '{{RENEWAL_DATE}}', '{{ADVISOR_NAME}}'],
    usageCount: 0,
    body: `Dear {{CLIENT_NAME}},

As part of our annual compliance review, your Investment Management Agreement (IMA) is due for renewal by {{RENEWAL_DATE}}.

This is a routine process that ensures our agreement remains current and reflects any changes in your investment objectives, risk tolerance, or personal circumstances.

Please review the attached agreement and confirm your acknowledgment by replying to this email with "I confirm" or schedule a brief call at your convenience.

Your Client ID: {{CLIENT_ID}}

Thank you for your continued partnership.

Best,
{{ADVISOR_NAME}}
Aurum Global Inc.`,
  },
]
