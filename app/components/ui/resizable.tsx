'use client';

import * as React from "react";

const ResizablePanelGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    direction?: "horizontal" | "vertical";
  }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex h-full w-full ${props.direction === "vertical" ? "flex-col" : "flex-row"} ${className || ""}`}
    {...props}
  />
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

const ResizablePanel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`min-h-0 min-w-0 flex-1 ${className || ""}`}
    {...props}
  />
));
ResizablePanel.displayName = "ResizablePanel";

const ResizableHandle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    withHandle?: boolean;
  }
>(({ className, withHandle, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative flex w-1.5 shrink-0 items-center justify-center bg-zinc-800 transition-colors hover:bg-zinc-700 ${className || ""}`}
    {...props}
  >
    {withHandle && (
      <div className="h-8 w-1 rounded-full bg-zinc-600" />
    )}
  </div>
));
ResizableHandle.displayName = "ResizableHandle";

export { ResizablePanelGroup as ResizablePanelGroup, ResizablePanel, ResizableHandle };
