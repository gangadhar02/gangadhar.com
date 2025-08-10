import * as ToastPrimitive from '@radix-ui/react-toast'
import { cn } from '../lib/utils'

export default function Toast({ title, description, isSuccess, showToast, setShowToast, children }) {
  const iconColor = isSuccess ? '#4cb782' : '#b75c4c'
  const iconName = isSuccess ? 'checkbox-circle' : 'error-warning'

  return (
    <ToastPrimitive.Provider asChild>
      {children}
      <ToastPrimitive.Root
        className={cn(
          "bg-hover rounded border border-[rgb(48,50,54)] shadow-[0_4px_13px_rgba(0,0,0,0.08)]",
          "text-[rgb(138,143,152)] text-sm overflow-hidden m-0 p-3 flex z-[2]",
          "data-[state=open]:animate-slide-in",
          "data-[state=closed]:animate-slide-out"
        )}
        open={showToast}
        onOpenChange={setShowToast}
      >
        <div className="text-base -mt-[2px] mr-2" style={{ color: iconColor }}>
          <i className={`ri-${iconName}-fill`} />
        </div>
        <div>
          <ToastPrimitive.Title className="text-primary leading-7">
            {title}
          </ToastPrimitive.Title>
          <ToastPrimitive.Description className="-mt-[5px] leading-7">
            {description}
          </ToastPrimitive.Description>
        </div>
        <ToastPrimitive.Close 
          className={cn(
            "absolute right-0 top-0 w-8 h-8 bg-transparent border-0",
            "text-lg text-[rgb(138,143,152)] transition-colors duration-200 ease-in-out",
            "hover:text-primary"
          )}
          aria-label="Close"
        >
          <span aria-hidden>×</span>
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed bottom-5 right-5 z-[2]" />
    </ToastPrimitive.Provider>
  )
}