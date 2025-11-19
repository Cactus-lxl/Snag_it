import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BUTTON, CARD, RADIUS } from './tokens';

// ====================================
// TEXT STYLES
// ====================================
export const textStyles = StyleSheet.create({
  h1: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.h1,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    lineHeight: TYPOGRAPHY.lineHeight.h1,
    color: COLORS.textDark,
  },
  h2: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.h2,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
    lineHeight: TYPOGRAPHY.lineHeight.h2,
    color: COLORS.textDark,
  },
  body: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.body,
    fontWeight: TYPOGRAPHY.fontWeight.regular,
    lineHeight: TYPOGRAPHY.lineHeight.body,
    color: COLORS.textBody,
    letterSpacing: TYPOGRAPHY.letterSpacing.body,
  },
  caption: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.caption,
    fontWeight: TYPOGRAPHY.fontWeight.regular,
    lineHeight: TYPOGRAPHY.lineHeight.caption,
    color: COLORS.textMuted,
  },
});

// ====================================
// BUTTON STYLES
// ====================================
export const buttonStyles = StyleSheet.create({
  // Primary Button (filled)
  primaryButton: {
    height: BUTTON.height,
    backgroundColor: COLORS.primary,
    borderRadius: BUTTON.borderRadius,
    paddingHorizontal: BUTTON.paddingHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
    ...BUTTON.shadow,
  },
  primaryButtonText: {
    fontSize: BUTTON.fontSize,
    fontWeight: BUTTON.fontWeight,
    color: COLORS.white,
    letterSpacing: TYPOGRAPHY.letterSpacing.body,
  },
  
  // Secondary Button (outline)
  secondaryButton: {
    height: BUTTON.height,
    backgroundColor: 'transparent',
    borderRadius: BUTTON.borderRadius,
    paddingHorizontal: BUTTON.paddingHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    fontSize: BUTTON.fontSize,
    fontWeight: BUTTON.fontWeight,
    color: COLORS.primary,
    letterSpacing: TYPOGRAPHY.letterSpacing.body,
  },
  
  // Tertiary Button (text only)
  tertiaryButton: {
    height: BUTTON.height,
    backgroundColor: 'transparent',
    paddingHorizontal: BUTTON.paddingHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tertiaryButtonText: {
    fontSize: BUTTON.fontSize,
    fontWeight: BUTTON.fontWeight,
    color: COLORS.primary,
    letterSpacing: TYPOGRAPHY.letterSpacing.body,
  },
  
  // Pressed state
  buttonPressed: {
    transform: [{ scale: BUTTON.pressScale }],
    opacity: BUTTON.pressOpacity,
  },
});

// ====================================
// CARD STYLES
// ====================================
export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: CARD.backgroundColor,
    borderRadius: CARD.borderRadius,
    padding: CARD.padding,
    ...CARD.shadow,
  },
  cardLarge: {
    backgroundColor: CARD.backgroundColor,
    borderRadius: CARD.borderRadiusLarge,
    padding: CARD.padding,
    ...CARD.shadow,
  },
});

// ====================================
// LAYOUT STYLES
// ====================================
export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite, // Changed from lightSage to offWhite
  },
  contentPadding: {
    paddingHorizontal: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionLarge: {
    marginBottom: SPACING.xxl,
  },
  elementSpacing: {
    marginBottom: SPACING.sm,
  },
});

// ====================================
// INPUT STYLES
// ====================================
export const inputStyles = StyleSheet.create({
  input: {
    height: BUTTON.height,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.input,
    paddingHorizontal: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.body,
    color: COLORS.textDark,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.caption,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
});

// ====================================
// DIVIDER STYLES
// ====================================
export const dividerStyles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.md,
  },
});
