import React from 'react';
import { motion } from 'framer-motion';
import { Play, Shield, Zap, Wrench } from 'lucide-react';

const VideoSection = () => {
  return (
    <section className="py-24 bg-industrial-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-industrial-red/5 skew-x-12 transform translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="text-industrial-red font-bold tracking-widest uppercase mb-4 flex items-center gap-3">
                <span className="w-12 h-1 bg-industrial-red"></span>
                In Action
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-none mb-6">
                BSC-7200 <br />
                <span className="text-industrial-red">Unmatched Power</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-lg">
                India's Fastest Chainsaw! Clocking over 17,000+ RPM of raw speed. Precision meet power in our gasoline range.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-industrial-red border border-white/10">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-tight">17K RPM</h4>
                  <p className="text-gray-500 text-sm">Peak Performance</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-industrial-red border border-white/10">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-tight">Engineered</h4>
                  <p className="text-gray-500 text-sm">Industrial Grade</p>
                </div>
              </div>
            </div>

            <button className="px-8 py-4 bg-industrial-red text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-industrial-red/90 transition-all flex items-center gap-3 shadow-2xl shadow-industrial-red/20 group">
              Explore Chainsaws
              <Play size={18} className="fill-current group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group lg:ml-auto"
          >
            <div className="absolute -inset-4 bg-industrial-red/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
            <div className="relative aspect-[9/16] md:aspect-video w-full max-w-2xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <video 
                className="w-full h-full object-cover"
                poster="https://bscpowertools.com/wp-content/uploads/2024/04/Chainsaw-2-2-scaled.jpg"
                controls
                autoPlay
                muted
                loop
              >
                <source src="https://bscpowertools.com/wp-content/uploads/2024/02/BSC-7200-Chainsaw.mp4#t=5" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none p-8 flex flex-col justify-end">
                <h3 className="text-white font-black text-2xl uppercase tracking-tighter mb-1">BSC Gasoline PRO</h3>
                <p className="text-gray-300 text-sm font-bold tracking-widest uppercase">Series 7200 Demo</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VideoSection;
