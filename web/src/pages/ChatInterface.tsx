import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Send, Bot, User, Plus, MessageSquare, Shield, Settings, Menu, X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import AuthButton from '../components/AuthButton'

interface Message {
  id: number
  content: string
  isUser: boolean
  timestamp: Date
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm Hades AI, your cybersecurity assistant. I can help you with threat analysis, vulnerability assessments, security best practices, and incident response. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { user } = useAuth()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        content: inputValue,
        isUser: true,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, newMessage])
      setInputValue('')
      setIsLoading(true)
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          content: "I understand your cybersecurity query. Let me analyze this and provide you with comprehensive insights and actionable recommendations based on current threat intelligence and security best practices.",
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
        setIsLoading(false)
      }, 1500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }

  const chatHistory = [
    "Vulnerability Assessment Report",
    "Network Security Analysis",
    "Incident Response Plan",
    "Threat Intelligence Brief",
    "Security Policy Review"
  ]

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 w-64 h-full bg-cyber-gray border-r border-gray-700 transition-transform duration-300`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-purple rounded-full flex items-center justify-center">
                  <Shield size={18} className="text-white" />
                </div>
                <span className="text-white font-semibold">Hades AI</span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <button className="w-full mt-4 flex items-center gap-2 px-3 py-2 bg-cyber-dark hover:bg-gray-600 rounded-lg text-white text-sm transition-colors">
              <Plus size={16} />
              New Chat
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">Recent Chats</h3>
              {chatHistory.map((chat, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg text-sm transition-colors truncate"
                >
                  <MessageSquare size={14} className="inline mr-2" />
                  {chat}
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-700">
            {user && <AuthButton variant="page" className="mb-4" />}
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-3"
            >
              <ArrowLeft size={16} />
              Back to Hades
            </Link>
            {!user && (
              <div className="mb-3">
                <AuthButton variant="page" />
              </div>
            )}
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
              <Settings size={16} />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-700 bg-cyber-gray">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-white font-semibold">Hades AI</h1>
          <div className="w-6"></div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 1 ? (
            /* Welcome Screen */
            <div className="h-full flex items-center justify-center p-8">
              <div className="max-w-2xl text-center">
                <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bot size={32} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">
                  Welcome to Hades AI
                </h1>
                <p className="text-gray-400 text-lg mb-8">
                  Your intelligent cybersecurity assistant. Ask me about threat analysis, 
                  vulnerability assessments, security best practices, and more.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <button
                    onClick={() => setInputValue("Analyze my network for vulnerabilities")}
                    className="p-4 glass rounded-lg text-left hover:bg-white hover:bg-opacity-10 transition-all"
                  >
                    <div className="text-white font-medium mb-1">Network Analysis</div>
                    <div className="text-gray-400 text-sm">Scan for vulnerabilities</div>
                  </button>
                  <button
                    onClick={() => setInputValue("Create an incident response plan")}
                    className="p-4 glass rounded-lg text-left hover:bg-white hover:bg-opacity-10 transition-all"
                  >
                    <div className="text-white font-medium mb-1">Incident Response</div>
                    <div className="text-gray-400 text-sm">Plan for security incidents</div>
                  </button>
                  <button
                    onClick={() => setInputValue("Review security best practices")}
                    className="p-4 glass rounded-lg text-left hover:bg-white hover:bg-opacity-10 transition-all"
                  >
                    <div className="text-white font-medium mb-1">Best Practices</div>
                    <div className="text-gray-400 text-sm">Security recommendations</div>
                  </button>
                  <button
                    onClick={() => setInputValue("Explain threat intelligence")}
                    className="p-4 glass rounded-lg text-left hover:bg-white hover:bg-opacity-10 transition-all"
                  >
                    <div className="text-white font-medium mb-1">Threat Intel</div>
                    <div className="text-gray-400 text-sm">Current threat landscape</div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="max-w-4xl mx-auto p-4 space-y-6">
              {messages.slice(1).map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isUser && (
                    <div className="w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={18} className="text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-3xl ${message.isUser ? 'order-1' : ''}`}>
                    <div
                      className={`p-4 rounded-2xl ${
                        message.isUser
                          ? 'bg-cyber-purple text-white ml-12'
                          : 'bg-cyber-gray text-gray-100'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className={`text-xs text-gray-500 mt-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  {message.isUser && (
                    <div className="w-8 h-8 rounded-full bg-cyber-blue flex items-center justify-center flex-shrink-0 mt-1 order-2">
                      <User size={18} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div className="bg-cyber-gray p-4 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-700 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  adjustTextareaHeight()
                }}
                onKeyPress={handleKeyPress}
                placeholder="Ask Hades about cybersecurity..."
                className="w-full p-4 pr-12 bg-cyber-gray border border-gray-600 rounded-2xl text-white placeholder-gray-400 resize-none focus:outline-none focus:border-cyber-purple transition-colors min-h-[56px] max-h-[200px]"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-3 bottom-3 w-8 h-8 bg-cyber-purple disabled:bg-gray-600 text-white rounded-full hover:bg-opacity-80 transition-all flex items-center justify-center disabled:cursor-not-allowed"
                title="Send message"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-xs text-gray-500 text-center mt-2">
              Hades AI can make mistakes. Consider checking important information.
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default ChatInterface