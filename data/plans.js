// data/plans.js
// Sample broadband plans used by the program.
// Prices are monthly, in Nigerian Naira (NGN). A dataCapGB of null means "unlimited".
// The figures are illustrative sample data, not real price lists.

export const plans = [
  { id: 1, name: "Home Fiber 50", provider: "MetroFibre", type: "fiber", speedMbps: 50, priceNaira: 25000, dataCapGB: null },
  { id: 2, name: "Home Fiber 100", provider: "MetroFibre", type: "fiber", speedMbps: 100, priceNaira: 40000, dataCapGB: null },
  { id: 3, name: "Office Fiber 200", provider: "CityLink", type: "fiber", speedMbps: 200, priceNaira: 85000, dataCapGB: null },
  { id: 4, name: "4G Router Lite", provider: "AirWave", type: "wireless", speedMbps: 20, priceNaira: 15000, dataCapGB: 100 },
  { id: 5, name: "5G Home Max", provider: "AirWave", type: "wireless", speedMbps: 150, priceNaira: 45000, dataCapGB: 500 },
  { id: 6, name: "Sky Standard", provider: "OrbitNet", type: "satellite", speedMbps: 100, priceNaira: 38000, dataCapGB: null },
  { id: 7, name: "Sky Business", provider: "OrbitNet", type: "satellite", speedMbps: 220, priceNaira: 120000, dataCapGB: null },
  { id: 8, name: "Fixed Wireless 30", provider: "CityLink", type: "wireless", speedMbps: 30, priceNaira: 20000, dataCapGB: 250 },
];