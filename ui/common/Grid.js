import { Row, Col } from 'antd';

const toSpan = (value) => {
  if (value === true) return 24;
  if (typeof value !== 'number') return undefined;
  return Math.round((value / 12) * 24);
};

const mapSizes = ({ xs, sm, md, lg, xl }) => {
  const sizes = {};
  if (xs !== undefined) sizes.xs = toSpan(xs);
  if (sm !== undefined) sizes.sm = toSpan(sm);
  if (md !== undefined) sizes.md = toSpan(md);
  if (lg !== undefined) sizes.lg = toSpan(lg);
  if (xl !== undefined) sizes.xl = toSpan(xl);
  return sizes;
};

const mapJustify = (justifyContent) => {
  if (!justifyContent) return undefined;
  if (justifyContent === 'flex-start') return 'start';
  if (justifyContent === 'flex-end') return 'end';
  return justifyContent;
};

const Grid = ({
  container,
  item,
  spacing,
  xs,
  sm,
  md,
  lg,
  xl,
  justifyContent,
  alignItems,
  direction,
  wrap,
  className,
  style,
  children,
  ...rest
}) => {
  const gutter =
    typeof spacing === 'number' ? [spacing * 8, spacing * 8] : spacing;
  const rowStyle =
    direction === 'column' ? { ...style, flexDirection: 'column' } : style;

  if (container && item) {
    return (
      <Col
        className={className}
        style={style}
        {...mapSizes({ xs, sm, md, lg, xl })}
      >
        <Row
          gutter={gutter}
          justify={mapJustify(justifyContent)}
          align={alignItems}
          wrap={wrap}
          style={rowStyle}
          {...rest}
        >
          {children}
        </Row>
      </Col>
    );
  }

  if (container) {
    return (
      <Row
        className={className}
        gutter={gutter}
        justify={mapJustify(justifyContent)}
        align={alignItems}
        wrap={wrap}
        style={rowStyle}
        {...rest}
      >
        {children}
      </Row>
    );
  }

  if (item) {
    return (
      <Col
        className={className}
        style={style}
        {...mapSizes({ xs, sm, md, lg, xl })}
        {...rest}
      >
        {children}
      </Col>
    );
  }

  return (
    <div className={className} style={style} {...rest}>
      {children}
    </div>
  );
};

export default Grid;
