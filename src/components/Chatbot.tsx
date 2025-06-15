
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Send, Bot, User } from 'lucide-react';
import { useAppState } from '@/contexts/AppStateContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const { isChatOpen, closeChat } = useAppState();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Stylo assistant. How can I help you today? I can assist with orders, menu information, delivery status, and general questions.',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedResponses: Record<string, string> = {
    'hello': 'Hello! How can I assist you today?',
    'hi': 'Hi there! What can I help you with?',
    'help': 'I can help you with:\n• Placing orders\n• Menu information\n• Delivery status\n• Payment issues\n• Account questions\n\nWhat would you like to know?',
    'menu': 'You can browse our full menu on the Food Delivery page. We have various categories including Indian, Chinese, Italian, Fast Food, and more!',
    'order': 'To place an order:\n1. Go to Food Delivery section\n2. Browse items from our vendors\n3. Add items to your cart\n4. Click the cart icon to review\n5. Proceed to checkout',
    'delivery': 'Delivery times vary by location and vendor, typically 20-45 minutes. You can track your order status in the Orders section of your dashboard.',
    'payment': 'We accept various payment methods including cards, digital wallets, and cash on delivery. You can manage your payment options in your profile.',
    'cart': 'To view your cart, click the shopping cart icon in the top right corner. From there you can review items, adjust quantities, and proceed to checkout.',
    'vendor': 'Are you interested in becoming a vendor? You can sign up through our Vendor Registration page to start selling your food items on our platform.',
    'account': 'You can manage your account by clicking on your profile. There you can update personal information, addresses, payment methods, and preferences.',
    'default': 'I understand you need help. Could you please be more specific? I can help with orders, menu, delivery, payments, or account questions.'
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    return predefinedResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isChatOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-96 shadow-xl flex flex-col">
        <CardHeader className="pb-3 bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-lg">Stylo Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeChat}
              className="h-8 w-8 text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-blue-100">Online now</p>
        </CardHeader>
        
        <CardContent className="flex flex-col flex-1 p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    message.isUser ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    {message.isUser ? (
                      <User className="h-3 w-3 text-white" />
                    ) : (
                      <Bot className="h-3 w-3 text-gray-600" />
                    )}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 px-3 py-2 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon"
                disabled={isTyping || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
