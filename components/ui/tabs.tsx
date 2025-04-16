"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }



// "use client"

// import * as React from "react"
// import * as TabsPrimitive from "@radix-ui/react-tabs"
// import { cn } from "@/lib/utils"

// // Main Tabs Wrapper
// function Tabs({
//   className,
//   ...props
// }: React.ComponentProps<typeof TabsPrimitive.Root>) {
//   return (
//     <TabsPrimitive.Root
//       className={cn("flex flex-col space-y-4", className)}
//       {...props}
//     />
//   )
// }

// // Tabs Navigation Bar
// function TabsList({
//   className,
//   ...props
// }: React.ComponentProps<typeof TabsPrimitive.List>) {
//   return (
//     <TabsPrimitive.List
//       className={cn(
//         "inline-flex items-center justify-start rounded-xl gap-2 bg-gray-100 dark:bg-gray-800 p-1 shadow-inner border border-gray-200 dark:border-gray-700 w-full md:w-fit",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// // Individual Tab Button
// function TabsTrigger({
//   className,
//   ...props
// }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
//   return (
//     <TabsPrimitive.Trigger
//       className={cn(
//         "flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-all duration-200",
//         "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white",
//         "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
//         // Rounded & styling for active tab
//         "data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 data-[state=active]:rounded-lg",
//         "dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// // Content Area
// function TabsContent({
//   className,
//   ...props
// }: React.ComponentProps<typeof TabsPrimitive.Content>) {
//   return (
//     <TabsPrimitive.Content
//       className={cn(
//         "rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900 shadow-sm",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export { Tabs, TabsList, TabsTrigger, TabsContent }
