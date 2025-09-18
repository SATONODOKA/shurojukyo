import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: "inline-flex items-center rounded-full border-2 border-green-800 bg-green-800/20 text-green-400 px-2.5 py-0.5 text-xs font-semibold transition-colors",
    secondary: "inline-flex items-center rounded-full border border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold transition-colors",
    destructive: "inline-flex items-center rounded-full border border-transparent bg-destructive text-destructive-foreground px-2.5 py-0.5 text-xs font-semibold transition-colors",
    outline: "inline-flex items-center rounded-full border text-foreground px-2.5 py-0.5 text-xs font-semibold transition-colors",
  }

  return (
    <div className={`${variants[variant]} ${className || ''}`} {...props} />
  )
}

export { Badge }
