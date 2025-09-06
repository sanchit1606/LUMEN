import { ArrowRight } from "lucide-react";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
  onClick?: () => void;
  content?: ReactNode;
  poweredBy?: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[20rem] gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  onClick,
  content,
  poweredBy,
  ...props
}: BentoCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.location.href = href;
    }
  };

  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl",
        // light styles
        "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
    <div>{background}</div>
    <div className="p-6 flex flex-col justify-between h-full">
      {/* Main content area */}
      <div className="flex flex-col items-center text-center space-y-4">
        {/* 1. Icon */}
        <Icon className="h-16 w-16 text-neutral-700 dark:text-neutral-300" />
        
        {/* 2. Feature name */}
        <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
          {name}
        </h3>
        
        {/* 3. Grey sub heading (description) */}
        <p className="text-sm text-neutral-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* 4. Powered by - at the bottom */}
      {poweredBy && (
        <div className="mt-auto pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Powered by {poweredBy}
          </p>
        </div>
      )}
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
  );
};

export { BentoCard, BentoGrid };
