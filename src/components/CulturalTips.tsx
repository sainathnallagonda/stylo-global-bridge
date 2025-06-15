
import { useState } from "react";
import { Info, Globe, Heart, MessageSquare, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CulturalTipsProps {
  serviceType: string;
  region: string;
  isOpen: boolean;
  onClose: () => void;
}

const CulturalTips = ({ serviceType, region, isOpen, onClose }: CulturalTipsProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const culturalData = {
    'food-delivery': {
      title: 'Food Delivery Cultural Tips',
      tips: {
        english: [
          '🏠 Most delivery personnel prefer contactless delivery - they may leave food at your door',
          '💰 Tipping is appreciated but not mandatory. $2-5 for good service is common',
          '🕒 Peak meal times (12-2pm, 6-9pm) may have longer wait times',
          '🌶️ Spice levels vary by region - "mild" in one area might be "hot" in another',
          '📱 Keep your phone nearby for delivery updates and driver contact'
        ],
        hindi: [
          '🏠 अधिकतर डिलीवरी कर्मचारी संपर्क रहित डिलीवरी पसंद करते हैं',
          '💰 टिप देना सराहनीय है लेकिन आवश्यक नहीं - अच्छी सेवा के लिए ₹20-50',
          '🕒 भोजन के समय (दोपहर 12-2, शाम 6-9) में देरी हो सकती है',
          '🌶️ मसाले का स्तर अलग-अलग क्षेत्रों में अलग होता है',
          '📱 डिलीवरी अपडेट के लिए फोन पास रखें'
        ]
      }
    },
    'groceries': {
      title: 'Grocery Shopping Cultural Tips',
      tips: {
        english: [
          '🛒 Fresh produce selection varies by season and local preferences',
          '🥛 Dairy products may have different fat content standards than you\'re used to',
          '🏪 Local grocery stores often have regional specialties worth trying',
          '💳 Many stores accept digital payments, but keep some cash handy',
          '📦 Eco-friendly packaging is increasingly common and appreciated'
        ],
        hindi: [
          '🛒 ताजी सब्जियों का चयन मौसम और स्थानीय पसंद के अनुसार होता है',
          '🥛 डेयरी उत्पादों में वसा की मात्रा अलग हो सकती है',
          '🏪 स्थानीय किराना दुकानों में क्षेत्रीय विशेषताएं मिलती हैं',
          '💳 कई दुकानें डिजिटल भुगतान स्वीकार करती हैं, लेकिन नकदी रखें',
          '📦 पर्यावरण-अनुकूल पैकेजिंग की सराहना की जाती है'
        ]
      }
    },
    'gifts': {
      title: 'Gift Giving Cultural Tips',
      tips: {
        english: [
          '🎁 Flowers are universally appreciated, but avoid chrysanthemums (funeral flowers)',
          '🏠 When visiting homes, bringing a small gift for the host is customary',
          '🎂 Birthday flowers are popular, but check if there are specific preferences',
          '💐 Odd numbers of flowers are preferred in many cultures (except 13)',
          '🎀 Gift wrapping is important - neat presentation shows thoughtfulness'
        ],
        hindi: [
          '🎁 फूल सार्वभौमिक रूप से पसंद किए जाते हैं, लेकिन गुलदाउदी से बचें',
          '🏠 घर जाते समय मेजबान के लिए छोटा उपहार लाना प्रथा है',
          '🎂 जन्मदिन पर फूल लोकप्रिय हैं, लेकिन विशेष पसंद जांचें',
          '💐 कई संस्कृतियों में विषम संख्या में फूल पसंद किए जाते हैं',
          '🎀 उपहार की पैकिंग महत्वपूर्ण है - साफ प्रस्तुति विचारशीलता दिखाती है'
        ]
      }
    },
    'rides': {
      title: 'Ride Booking Cultural Tips',
      tips: {
        english: [
          '🚗 Always share ride details with the person you\'re booking for',
          '📍 Provide clear pickup and drop-off locations with landmarks',
          '💬 Most drivers speak local language - basic phrases help',
          '💰 Tipping is appreciated for good service ($1-3 typical)',
          '⏰ Traffic patterns vary by time of day - allow extra time during rush hours'
        ],
        hindi: [
          '🚗 हमेशा राइड की जानकारी उस व्यक्ति के साथ साझा करें जिसके लिए बुक कर रहे हैं',
          '📍 स्पष्ट पिकअप और ड्रॉप स्थान दें और निशान बताएं',
          '💬 अधिकतर ड्राइवर स्थानीय भाषा बोलते हैं - बुनियादी वाक्य मदद करते हैं',
          '💰 अच्छी सेवा के लिए टिप देना सराहनीय है (₹20-50 सामान्य)',
          '⏰ ट्रैफिक का पैटर्न समय के अनुसार बदलता है - व्यस्त समय में अतिरिक्त समय दें'
        ]
      }
    }
  };

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const currentData = culturalData[serviceType as keyof typeof culturalData];

  if (!currentData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            {currentData.title}
            <Badge variant="outline" className="ml-auto">
              {region}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Language Selector */}
          <div className="flex gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage(lang.code)}
                className="text-xs"
              >
                {lang.flag} {lang.name}
              </Button>
            ))}
          </div>

          {/* Cultural Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                Cultural Insights & Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentData.tips[selectedLanguage as keyof typeof currentData.tips]?.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                )) || []}
              </div>
            </CardContent>
          </Card>

          {/* Regional Customs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-green-500" />
                Common Phrases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedLanguage === 'english' ? (
                  <>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="font-medium">Thank you</p>
                      <p className="text-sm text-gray-600">Express gratitude</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="font-medium">Please</p>
                      <p className="text-sm text-gray-600">Polite request</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="font-medium">Excuse me</p>
                      <p className="text-sm text-gray-600">Getting attention</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="font-medium">Have a good day</p>
                      <p className="text-sm text-gray-600">Friendly farewell</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="font-medium">धन्यवाद (Dhanyawad)</p>
                      <p className="text-sm text-gray-600">Thank you</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="font-medium">कृपया (Kripaya)</p>
                      <p className="text-sm text-gray-600">Please</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="font-medium">माफ करिए (Maaf kariye)</p>
                      <p className="text-sm text-gray-600">Excuse me</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="font-medium">शुभ दिन (Shubh din)</p>
                      <p className="text-sm text-gray-600">Have a good day</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
              Got it, thanks!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CulturalTips;
