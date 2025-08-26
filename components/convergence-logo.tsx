export function ConvergenceLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        {/* Logo icon - stylized C with modern design */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
          <svg 
            viewBox="0 0 24 24" 
            className="w-7 h-7 text-white"
            fill="none"
          >
            <path 
              d="M12 2L22 8.5L12 15L2 8.5L12 2Z" 
              fill="currentColor" 
              fillOpacity="0.8"
            />
            <path 
              d="M12 15L22 21.5L12 28L2 21.5L12 15Z" 
              fill="currentColor" 
              fillOpacity="0.6"
              transform="scale(0.8) translate(3, -2)"
            />
          </svg>
        </div>
      </div>
      <div className="mt-2 text-center">
        <h1 className="text-lg font-bold text-blue-700">CONVERGENCE</h1>
        <p className="text-xs text-gray-500 tracking-wider">ACQUISITIONS</p>
      </div>
    </div>
  )
}
