import { Shield, Lock, Eye, Camera, Key, Bell, Radio, Fingerprint } from "lucide-react";

interface FloatingObjectsProps {
  variant?: "light" | "dark";
}

const FloatingObjects = ({ variant = "light" }: FloatingObjectsProps) => {
  const opacity = variant === "dark" ? "opacity-10" : "opacity-5";
  const color = variant === "dark" ? "text-primary-foreground" : "text-primary";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top left area */}
      <div className={`absolute top-[10%] left-[5%] ${opacity} ${color} animate-float`}>
        <Shield className="w-16 h-16 md:w-24 md:h-24" />
      </div>
      
      {/* Top right area */}
      <div className={`absolute top-[15%] right-[8%] ${opacity} ${color} animate-float-slow delay-1000`}>
        <Lock className="w-12 h-12 md:w-20 md:h-20" />
      </div>
      
      {/* Middle left */}
      <div className={`absolute top-[45%] left-[3%] ${opacity} ${color} animate-float-reverse delay-500`}>
        <Camera className="w-14 h-14 md:w-18 md:h-18" />
      </div>
      
      {/* Middle right */}
      <div className={`absolute top-[40%] right-[4%] ${opacity} ${color} animate-float delay-2000`}>
        <Eye className="w-10 h-10 md:w-16 md:h-16" />
      </div>
      
      {/* Bottom left */}
      <div className={`absolute bottom-[20%] left-[8%] ${opacity} ${color} animate-float-slow delay-3000`}>
        <Key className="w-12 h-12 md:w-16 md:h-16" />
      </div>
      
      {/* Bottom right */}
      <div className={`absolute bottom-[15%] right-[6%] ${opacity} ${color} animate-float-reverse delay-1000`}>
        <Bell className="w-10 h-10 md:w-14 md:h-14" />
      </div>
      
      {/* Extra decorative elements */}
      <div className={`absolute top-[70%] left-[15%] ${opacity} ${color} animate-float delay-500`}>
        <Radio className="w-8 h-8 md:w-12 md:h-12" />
      </div>
      
      <div className={`absolute top-[25%] right-[20%] ${opacity} ${color} animate-float-slow delay-2000`}>
        <Fingerprint className="w-10 h-10 md:w-14 md:h-14" />
      </div>
    </div>
  );
};

export default FloatingObjects;