import { useMemo } from 'react';

let styleCounter = 0;
let styleTag = null;

const toKebab = (value) =>
  value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const toCssValue = (value) => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const objectToCss = (styles) => {
  return Object.entries(styles || {})
    .map(([key, value]) => `${toKebab(key)}:${toCssValue(value)};`)
    .join('');
};

const ensureStyleTag = () => {
  if (typeof document === 'undefined') return null;
  if (styleTag) return styleTag;
  styleTag = document.createElement('style');
  styleTag.setAttribute('data-local-styles', 'true');
  document.head.appendChild(styleTag);
  return styleTag;
};

const injectStyles = (css) => {
  if (!css) return;
  const tag = ensureStyleTag();
  if (!tag) return;
  tag.appendChild(document.createTextNode(css));
};

const makeStyles = (stylesInput) => {
  return () =>
    useMemo(() => {
      const theme = {
        palette: {
          primary: { main: '#2b6cb0' },
          background: { paper: '#ffffff' },
        },
        spacing: (...args) => args.map((value) => `${value * 8}px`).join(' '),
      };
      const styles =
        typeof stylesInput === 'function'
          ? stylesInput(theme)
          : stylesInput || {};
      const classes = {};
      let css = '';

      Object.entries(styles).forEach(([key, value]) => {
        const className = `local-${styleCounter++}-${key}`;
        classes[key] = className;
        if (value && typeof value === 'object') {
          css += `.${className}{${objectToCss(value)}}`;
        }
      });

      injectStyles(css);
      return classes;
    }, []);
};

export default makeStyles;
