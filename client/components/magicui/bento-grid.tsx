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
        "grid w-full auto-rows-[minmax(280px,auto)] gap-x-6 gap-y-12",
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
    <>
      <style>{`
        .feature-card {
          width: 100%;
          height: 100%;
          min-height: 280px;
          border-radius: 20px;
          background: #f5f5f5;
          position: relative;
          padding: 1.8rem 1.8rem 2.6rem;
          border: 2px solid #c3c6ce;
          transition: 0.5s ease-out;
          overflow: visible;
          cursor: pointer;
        }

        .card-details {
          color: black;
          height: 100%;
          gap: .5em;
          display: grid;
          place-content: center;
        }

        .card-button {
          transform: translate(-50%, 125%);
          width: 60%;
          border-radius: 1rem;
          border: none;
          background-color: #008bf8;
          color: #fff;
          font-size: 1rem;
          padding: .5rem 1rem;
          position: absolute;
          left: 50%;
          bottom: -0.75rem;
          opacity: 0;
          transition: 0.3s ease-out;
          cursor: pointer;
          z-index: 5;
        }

        .text-body {
          color: rgb(134, 134, 134);
        }

        .text-title {
          font-size: 1.5em;
          font-weight: bold;
        }

        .feature-card:hover {
          border-color: #008bf8;
          box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
        }

        .feature-card:hover .card-button {
          transform: translate(-50%, 50%);
          opacity: 1;
        }

        .dark .feature-card {
          background: #1a1a1a;
          border-color: #3a3a3a;
        }

        .dark .card-details {
          color: white;
        }

        .dark .text-body {
          color: rgb(180, 180, 180);
        }
      `}</style>
      <div
        key={name}
        className={cn("feature-card col-span-1", className)}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label={`Navigate to ${name}`}
        {...props}
      >
        <div className="card-details">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icon */}
            <Icon className="h-16 w-16 text-neutral-700 dark:text-neutral-300" />
            
            {/* Feature name */}
            <h3 className="text-title text-neutral-700 dark:text-neutral-300">
              {name}
            </h3>
            
            {/* Description */}
            <p className="text-body text-sm leading-relaxed">
              {description}
            </p>

            {/* Powered by */}
            {poweredBy && (
              <p className="text-body text-xs mt-2">
                Powered by {poweredBy}
              </p>
            )}
          </div>
        </div>
        
        <button
          className="card-button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {cta}
        </button>
      </div>
    </>
  );
};

export { BentoCard, BentoGrid };
