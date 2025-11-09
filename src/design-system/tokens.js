// Design System Tokens - 8-point grid system

// ====================================
// 1. SPACING (8-point grid)
// ====================================
export const SPACING = {
  xs: 8,      // Small spacing
  sm: 12,     // Between related elements
  md: 16,     // Medium spacing
  lg: 24,     // Horizontal padding
  xl: 32,     // Between main sections
  xxl: 40,    // Large section spacing
};

// ====================================
// 2. TYPOGRAPHY
// ====================================
export const TYPOGRAPHY = {
  // Font Families
  fontFamily: {
    heading: 'Poppins',
    body: 'Inter',
  },
  
  // Font Sizes
  fontSize: {
    h1: 26,
    h2: 20,
    body: 16,
    caption: 13,
    button: 16,
  },
  
  // Font Weights
  fontWeight: {
    regular: '400',
    semiBold: '600',
    bold: '700',
  },
  
  // Line Heights
  lineHeight: {
    h1: 36.4,     // 26 × 1.4
    h2: 28,       // 20 × 1.4
    body: 22.4,   // 16 × 1.4
    caption: 18.2, // 13 × 1.4
  },
  
  // Letter Spacing
  letterSpacing: {
    body: 0.4,
  },
};

// ====================================
// 3. COLOR PALETTE
// ====================================
export const COLORS = {
  // Primary
  primary: '#6BAA38',           // Primary Green
  primaryDark: '#5A9130',       // Darker shade for pressed state
  
  // Backgrounds
  lightSage: '#C8CEA4',         // Light Sage
  gradientStart: '#D8E2B8',     // Top background fade
  gradientEnd: '#C2CDA0',       // Bottom fade
  offWhite: '#FAFAF8',          // Card backgrounds
  white: '#FFFFFF',             // Pure white
  
  // Text
  textDark: '#1A1A1A',          // Headlines
  textBody: '#4A4A4A',          // General text
  textMuted: '#6B6B6B',         // Secondary text/metadata
  
  // Borders & Dividers
  divider: 'rgba(16,16,16,0.08)',
  border: 'rgba(16,16,16,0.12)',
  
  // States
  success: '#6BAA38',
  error: '#E53935',
  warning: '#FB8C00',
  info: '#039BE5',
};

// ====================================
// 4. BUTTONS
// ====================================
export const BUTTON = {
  height: 52,
  borderRadius: 24,
  paddingHorizontal: 24,
  fontSize: 16,
  fontWeight: '600',
  
  // Shadow
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // Press state
  pressScale: 0.97,
  pressOpacity: 0.9,
};

// ====================================
// 5. ICONS
// ====================================
export const ICONS = {
  size: 24,
  strokeWidth: 1.5,
  spacing: 8,
  colorInactive: '#1A1A1A',
  colorActive: '#6BAA38',
};

// ====================================
// 6. CARDS
// ====================================
export const CARD = {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  borderRadiusLarge: 20,
  padding: 20,
  
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  
  shadowLight: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
};

// ====================================
// 7. NAVIGATION BAR
// ====================================
export const NAV_BAR = {
  height: 72,
  backgroundColor: '#FAFAF8',
  borderTopColor: 'rgba(0,0,0,0.1)',
  borderTopWidth: 1,
  
  tab: {
    fontSize: 12,
    iconSize: 24,
    activeColor: '#6BAA38',
    inactiveColor: '#6B6B6B',
  },
};

// ====================================
// 8. ANIMATIONS
// ====================================
export const ANIMATION = {
  // Durations (ms)
  fast: 200,
  medium: 300,
  slow: 500,
  
  // Timing
  easeInOut: 'ease-in-out',
  spring: 'spring',
  
  // Effects
  fadeIn: {
    duration: 400,
    translateY: 10,
  },
  
  buttonPress: {
    scale: 0.97,
    duration: 100,
  },
  
  cardStagger: 100, // interval between card loads
};

// ====================================
// 9. BORDER RADIUS
// ====================================
export const RADIUS = {
  button: 24,
  card: 16,
  cardLarge: 20,
  input: 12,
  small: 8,
};

// ====================================
// 10. ACCESSIBILITY
// ====================================
export const A11Y = {
  minHitArea: 44,
  minContrastRatio: 4.5, // WCAG AA
};
