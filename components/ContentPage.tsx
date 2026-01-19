
import React from 'react';
import { Page } from '../types';

interface ContentPageProps {
  page: Page;
}

const ContentPage: React.FC<ContentPageProps> = ({ page }) => {
  const getContent = () => {
    switch (page) {
      case Page.Shipping:
        return {
          title: "Shipping & Returns",
          subtitle: "House Logistics & Acquisition Handling",
          content: [
            { heading: "Global Concierge Shipping", text: "We offer complimentary worldwide shipping for all signature acquisitions. Each piece is handled with extreme care and shipped via our premium courier network." },
            { heading: "The Hand-Over Process", text: "Acquisitions within Bangladesh are delivered within 48-72 hours. International acquisitions require 7-10 business days for customs clearance and courier logistics." },
            { heading: "Return Protocol", text: "If a piece does not meet your high standards of excellence, you may initiate a return within 7 days of arrival. The piece must remain in unworn, pristine condition with all heritage tags intact." }
          ]
        };
      case Page.Privacy:
        return {
          title: "Privacy Policy",
          subtitle: "Elite Data Security & Confidentiality",
          content: [
            { heading: "Information Custody", text: "S & S Fashion House treats client data as a sacred trust. We only collect essential information required to fulfill your luxury acquisitions and provide personalized concierge services." },
            { heading: "Secure Vaults", text: "All financial transactions are conducted through high-level encrypted gateways. We never store credit card information on our house servers." },
            { heading: "Communications", text: "Clients may receive exclusive insights and first-looks at new collections. You can opt-out of our digital communications at any time." }
          ]
        };
      case Page.Terms:
        return {
          title: "Terms of Use",
          subtitle: "House Rules & Client Agreements",
          content: [
            { heading: "Intellectual Heritage", text: "All designs, imagery, and text hosted by S & S Fashion House are the exclusive property of our brand and protected by international copyright laws." },
            { heading: "Acquisition Agreement", text: "By placing an order, you agree to the valuation displayed and acknowledge the craftsmanship timeline associated with our premium collections." },
            { heading: "House Etiquette", text: "We reserve the right to limit quantities or refuse service to preserve the exclusivity of our heritage collections." }
          ]
        };
      case Page.Bespoke:
        return {
          title: "Bespoke Service",
          subtitle: "Tailored Excellence Beyond Measure",
          content: [
            { heading: "Personal Appointments", text: "Our lead stylists are available for private consultations at our London and Mayfair boutiques. Experience the touch of Egyptian cotton firsthand." },
            { heading: "Made-to-Measure", text: "We provide exclusive tailoring for high-profile events. Select from our finest Italian silks and custom patterns designed specifically for your silhouette." },
            { heading: "Corporate Curation", text: "Elegant uniform solutions for world-class hospitality and corporate environments that demand a standard of sophistication." }
          ]
        };
      default:
        return null;
    }
  };

  const data = getContent();
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 animate-fade-in">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">{data.title}</h1>
        <p className="text-yellow-600 uppercase tracking-[0.4em] text-[10px] font-bold">{data.subtitle}</p>
        <div className="w-24 h-[1px] bg-yellow-600/30 mx-auto mt-12"></div>
      </div>

      <div className="space-y-16">
        {data.content.map((item, idx) => (
          <div key={idx} className="border-l border-yellow-600/20 pl-10">
            <h3 className="text-white text-xl font-serif mb-6">{item.heading}</h3>
            <p className="text-gray-400 text-lg font-light leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-24 pt-16 border-t border-white/5 text-center">
        <p className="text-gray-500 italic text-sm font-light">
          "Excellence is not an act, but a habit. We strive for perfection in every interaction."
        </p>
        <p className="text-gray-600 text-[9px] uppercase tracking-widest mt-8">S & S Fashion House Archive &bull; Est. 2025</p>
      </div>
    </div>
  );
};

export default ContentPage;
