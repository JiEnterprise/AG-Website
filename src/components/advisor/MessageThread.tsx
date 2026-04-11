'use client'

import { useState } from 'react'
import type { Message } from '@/lib/types'

interface MessageThreadProps {
  clientId: string
  clientName: string
  initials: string
  color: string
  seedMessages: Message[]
}

export default function MessageThread({
  clientId,
  clientName,
  initials,
  color,
  seedMessages,
}: MessageThreadProps) {
  const [messages, setMessages] = useState(seedMessages)
  const [draft, setDraft] = useState('')

  const onSend = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    const newMessage: Message = {
      id: `local-${Date.now()}`,
      clientId,
      direction: 'outbound',
      from: 'SC001',
      body: trimmed,
      timestamp: new Date().toISOString(),
      read: true,
    }
    setMessages((prev) => [...prev, newMessage])
    setDraft('')
  }

  return (
    <article className="card">
      <header className="card-h">{clientName} — {clientId}</header>

      <div>
        {messages.map((message) => (
          <div key={message.id} className="msg-row">
            <div
              className="msg-av"
              style={{
                background: message.direction === 'outbound' ? 'var(--gold-dim)' : `${color}26`,
                color: message.direction === 'outbound' ? 'var(--gold)' : color,
              }}
            >
              {message.direction === 'outbound' ? 'SC' : initials}
            </div>
            <div className="msg-body">
              <div className="msg-top">
                <span className="msg-name" style={{ color: message.direction === 'outbound' ? 'var(--gold)' : color }}>
                  {message.direction === 'outbound' ? 'You' : clientName}
                </span>
                <span className="msg-time">{new Date(message.timestamp).toLocaleDateString()}</span>
              </div>
              <div className="msg-text">{message.body}</div>
            </div>
            {message.direction === 'inbound' && !message.read && <span className="unread-dot" />}
          </div>
        ))}
      </div>

      <div className="compose-box">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
          placeholder={`Message ${clientName.split(' ')[0]}...`}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
          <button
            onClick={onSend}
            className="btn-gold"
          >
            Send
          </button>
        </div>
      </div>
    </article>
  )
}
