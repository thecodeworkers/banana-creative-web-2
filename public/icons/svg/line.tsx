const Line = ({ pinked = false }) => (
  <svg width="100%" height="5" viewBox="0 0 294 4" fill="none" >
    <path d="M294 0H0V3H294V0Z" fill="url(#paint0_linear_2372_137)" />
    <defs>
      <linearGradient id="paint0_linear_2372_137" x1="0" y1="1.50022" x2="294" y2="1.50022" gradientUnits="userSpaceOnUse">
        <stop stopColor={`${!pinked ? "#FF70A0" : "#D480FF"}`} />
        <stop offset="1" stopColor={`${!pinked ? "#DF2833" : "#D480FF"}`} />
      </linearGradient>
    </defs>
  </svg>

)

export default Line
