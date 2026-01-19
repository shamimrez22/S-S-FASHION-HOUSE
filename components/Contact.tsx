
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">Get in <br /><span className="text-gradient-gold">Touch</span></h1>
          <p className="text-gray-400 text-lg mb-12 font-light max-w-md leading-relaxed">
            Whether you're looking for personalized style advice or have inquiries about our collections, our concierge team is here to assist you.
          </p>
          
          <div className="space-y-10">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-yellow-500 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-2">Flagship Boutique</h4>
                <p className="text-gray-400 font-light">12 Savile Row, Mayfair<br />London, W1S 3PQ</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-yellow-500 shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-2">Concierge Services</h4>
                <p className="text-gray-400 font-light">+44 (0) 20 7123 4567</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-yellow-500 shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-2">Inquiries</h4>
                <p className="text-gray-400 font-light">bespoke@ssfashionhouse.com</p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook size={20} /></a>
          </div>
        </div>

        <div className="bg-[#111] p-10 border border-white/5">
          <h3 className="text-2xl font-serif mb-8 text-white">Send a Message</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Full Name</label>
                <input type="text" className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-yellow-600" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Email Address</label>
                <input type="email" className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-yellow-600" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Subject</label>
              <input type="text" className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-yellow-600" />
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Message</label>
              <textarea rows={6} className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-yellow-600 resize-none"></textarea>
            </div>
            <button className="w-full py-4 bg-yellow-600 hover:bg-yellow-500 text-black font-bold uppercase tracking-widest text-sm transition-all">
              Send Concierge Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
