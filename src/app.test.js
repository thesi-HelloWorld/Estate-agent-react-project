import propertiesData from "../data/properties.json";

test("JSON contains properties", () => {
  expect(propertiesData.properties.length).toBeGreaterThan(0);
});

test("Each property has an id", () => {
  propertiesData.properties.forEach(property => {
    expect(property.id).toBeDefined();
  });
});

test("Each property has a price", () => {
  propertiesData.properties.forEach(property => {
    expect(property.price).toBeGreaterThan(0);
  });
});

test("Each property has bedrooms", () => {
  propertiesData.properties.forEach(property => {
    expect(property.bedrooms).toBeGreaterThan(0);
  });
});

test("Each property has images", () => {
  propertiesData.properties.forEach(property => {
    expect(property.images.length).toBeGreaterThan(0);
  });
});