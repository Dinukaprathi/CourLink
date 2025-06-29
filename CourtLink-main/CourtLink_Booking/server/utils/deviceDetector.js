// Device detection utility
export const detectDevice = (userAgent) => {
  if (!userAgent) return "Unknown Device";

  const ua = userAgent.toLowerCase();
  
  // Detect operating system
  let os = "Unknown OS";
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("mac")) os = "macOS";
  else if (ua.includes("linux")) os = "Linux";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("ios") || ua.includes("iphone") || ua.includes("ipad")) os = "iOS";

  // Detect browser
  let browser = "Unknown Browser";
  if (ua.includes("chrome")) browser = "Chrome";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("safari")) browser = "Safari";
  else if (ua.includes("edge")) browser = "Edge";
  else if (ua.includes("opera")) browser = "Opera";

  // Detect device type
  let deviceType = "Desktop";
  if (ua.includes("mobile")) deviceType = "Mobile";
  else if (ua.includes("tablet")) deviceType = "Tablet";

  return `${deviceType} - ${os} - ${browser}`;
};

// Get IP address from request
export const getClientIP = (req) => {
  return req.ip || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket?.remoteAddress ||
         req.headers['x-forwarded-for']?.split(',')[0] ||
         req.headers['x-real-ip'] ||
         "Unknown IP";
}; 