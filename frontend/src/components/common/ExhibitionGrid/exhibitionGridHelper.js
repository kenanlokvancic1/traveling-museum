export const handleItemClick = (e, itemId) => {
  if (e.defaultPrevented) {
    return;
  }
};

export const getGridTemplateColumns = (gridProps) => {
  const { xs, sm, md } = gridProps;
  return {
    xs: `repeat(${12 / xs}, 1fr)`,
    sm: `repeat(${12 / sm}, 1fr)`,
    md: `repeat(${12 / md}, 1fr)`,
  };
};
