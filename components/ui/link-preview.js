import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { encode } from "qss";
import { cn } from "../../lib/utils";

const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
  ...props
}) => {
  let src;
  if (isStatic) {
    src = imageSrc;
  } else {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  }

  return (
    <HoverCardPrimitive.Root
      openDelay={50}
      closeDelay={100}
      {...props}
    >
      <HoverCardPrimitive.Trigger asChild>
        <span className={cn("cursor-pointer", className)}>
          {children}
        </span>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Content
        className={cn(
          "z-50 w-80 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        )}
        side="top"
        sideOffset={10}
        style={{
          width: width,
          height: height,
        }}
      >
        <img
          src={src}
          width={width}
          height={height}
          className="rounded-lg"
          alt="Preview"
          loading="lazy"
        />
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};

export { LinkPreview };