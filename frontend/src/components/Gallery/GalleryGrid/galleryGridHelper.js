export const handleItemClick = (e, itemId) => {
  e.preventDefault();
};

export const getGridTemplateColumns = (gridProps) => {
  return {
    xs: "repeat(auto-fill, minmax(250px, 1fr))",
    sm: "repeat(auto-fill, minmax(250px, 1fr))",
    md: "repeat(auto-fill, minmax(250px, 1fr))",
  };
};
