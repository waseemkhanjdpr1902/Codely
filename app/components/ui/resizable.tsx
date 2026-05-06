'use client';

import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof PanelGroup>,
  React.ComponentPropsWithoutRef<typeof PanelGroup>
>(({ className, ...props }, ref) => (
  <PanelGroup
    ref={ref}
    className={className}
    {...props}
  />
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof Panel>,
  React.ComponentPropsWithoutRef<typeof Panel>
>(({ className, ...props }, ref) => (
  <Panel
    ref={ref}
    className={className}
    {...props}
  />
));
ResizablePanel.displayName = "ResizablePanel";

const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof PanelResizeHandle>,
  React.ComponentPropsWithoutRef<typeof PanelResizeHandle> & {
    withHandle?: boolean;
  }
>(({ className, withHandle, ...props }, ref) => (
  <PanelResizeHandle
    ref={ref}
    className={`relative flex w-1.5 items-center justify-center bg-zinc-800 hover:bg-zinc-700 transition-colors ${className}`}
    {...props}
  >
    {withHandle && (
      <div className="h-8 w-1 rounded-full bg-zinc-600" />
    )}
  </PanelResizeHandle>
));
ResizableHandle.displayName = "ResizableHandle";

export { ResizablePanelGroup as ResizablePanelGroup, ResizablePanel, ResizableHandle };
