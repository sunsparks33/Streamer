"use client";

import React from "react";

const specsData = [
  {
    category: "Gaming PC",
    items: [
      { name: "CPU", val: "AMD Ryzen 7 7800X3D (4.2GHz to 5.0GHz)", desc: "Best Gaming Processor", icon: "cpu" },
      { name: "GPU", val: "NVIDIA GeForce RTX 4090 24GB GDDR6X", desc: "Ultimate 4K Powerhouse", icon: "gpu" },
      { name: "RAM", val: "32GB Corsair Vengeance DDR5 6000MHz", desc: "Ultra-Low Latency Memory", icon: "ram" },
      { name: "Storage", val: "2TB Samsung 990 Pro NVMe SSD", desc: "7450 MB/s Read Speed", icon: "storage" }
    ]
  },
  {
    category: "Gear & Audio",
    items: [
      { name: "Monitor", val: "ASUS ROG Swift 360Hz OLED 27\"", desc: "Fluid Motion Clarity", icon: "monitor" },
      { name: "Keyboard", val: "Wooting 60HE (Analog Switches)", desc: "Rapid Trigger Performance", icon: "keyboard" },
      { name: "Mouse", val: "Logitech G Pro X Superlight 2", desc: "60g Lightweight Precision", icon: "mouse" },
      { name: "Microphone", val: "Shure SM7B + Wave XLR Interface", desc: "Studio-Grade Broadcaster Voice", icon: "mic" }
    ]
  }
];

function getIcon(type) {
  switch (type) {
    case "cpu":
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
        </svg>
      );
    case "gpu":
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 10v4M10 10v4M14 10v4M18 10v4M2 12h20M7 6v12M17 6v12" />
        </svg>
      );
    case "ram":
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="8" width="18" height="8" rx="1.5" />
          <path d="M7 8v2M10 8v2M13 8v2M16 8v2M19 8v2M3 12h18" />
        </svg>
      );
    case "storage":
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 8h10M7 12h10M7 16h4" />
        </svg>
      );
    case "monitor":
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="13" rx="2" />
          <path d="M12 16v5M8 21h8M6 21h12" />
        </svg>
      );
    case "keyboard":
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M10 13h.01M14 13h.01M18 13h.01M8 15h8" />
        </svg>
      );
    case "mouse":
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="6" y="2" width="12" height="20" rx="6" />
          <path d="M12 2v6M6 9h12" />
        </svg>
      );
    case "mic":
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="9" y="2" width="6" height="11" rx="3" />
          <path d="M5 10a7 7 0 0014 0M12 17v4M8 21h8" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SetupSpecs() {
  return (
    <div className="glass rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#111118]/80 to-[#0a0a0f]/80 space-y-6">
      <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.04]">
        <div className="h-5 w-1 rounded-full bg-[#53FC18]" />
        <h2 className="text-sm font-bold text-white tracking-tight uppercase">Battlestation Setup</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specsData.map((categoryGroup, catIdx) => (
          <div key={catIdx} className="space-y-3.5">
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{categoryGroup.category}</h3>
            
            <div className="space-y-2.5">
              {categoryGroup.items.map((spec, itemIdx) => (
                <div 
                  key={itemIdx} 
                  className="group flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:bg-[#53FC18]/[0.02] hover:border-[#53FC18]/20 transition-all duration-300"
                >
                  <div className="h-9 w-9 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-white/40 group-hover:bg-[#53FC18]/10 group-hover:border-[#53FC18]/30 group-hover:text-[#53FC18] transition-all duration-300">
                    {getIcon(spec.icon)}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white/80 tracking-wide">{spec.name}</span>
                      <span className="text-[9px] font-medium text-white/20 group-hover:text-[#53FC18]/60 transition-colors">{spec.desc}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-white/40 group-hover:text-white/60 transition-colors mt-0.5 truncate">
                      {spec.val}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
