import  { useState } from "react";

export default function MyAddProducts() {
  const [sizeType, setSizeType] = useState("number");
  const sizeOptions = [];
  for (let i = 34; i <= 46; i++) {
    sizeOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  // Initialize state for sizes
  const [sizes, setSizes] = useState(
    Array(46 - 34 + 1)
      .fill(0)
      .map((_, i) => ({ size: i + 34, quantity: 0 }))
  );

  // Initialize state for clothing sizes
  const clothingSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  const [clothingSizeQuantities, setClothingSizeQuantities] = useState(
    clothingSizes.map((size) => ({ size, quantity: 0 }))
  );

  // Handle change in quantity for a particular size
  const handleQuantityChange = (size, event) => {
    const newSizes = sizes.map((s) =>
      s.size === size ? { ...s, quantity: event.target.value } : s
    );
    setSizes(newSizes);
  };

  // Handle change in quantity for a particular clothing size
  const handleClothingSizeQuantityChange = (size, event) => {
    const newQuantities = clothingSizeQuantities.map((s) =>
      s.size === size ? { ...s, quantity: event.target.value } : s
    );
    setClothingSizeQuantities(newQuantities);
  };
  return (
    <>
      <h1>Upload Product</h1>
      <form action="#" method="post" encType="multipart/form-data">
        <label htmlFor="gender">Gender:</label>
        <select name="gender" id="gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
        </select>
        <br />
        <br />
        <label htmlFor="category">Category:</label>
        <select name="category" id="category" required>
          <option value="woman">Woman</option>
          <option value="man">Man</option>
          <option value="kids">Kids</option>
        </select>
        <br />
        <br />

        <label htmlFor="price">Price:</label>
        <input type="number" name="price" id="price" required />
        <br />
        <br />

        <label htmlFor="brand">Brand:</label>
        <input type="text" name="brand" id="brand" required />
        <br />
        <br />

        <label htmlFor="name">Product Name:</label>
        <input type="text" name="name" id="name" required />
        <br />
        <br />

        <label htmlFor="new">New Product:</label>
        <input type="checkbox" name="new" id="new" />
        <br />
        <br />

        <h2>Add Item to itemList:</h2>
        <label htmlFor="color">Color:</label>
        <input type="text" name="color" id="color" />
        <br />
        <br />
        <label htmlFor="photo">Upload Photo:</label>
        <input type="file" name="photo" id="photo" accept="image/*" required />
        <br />
        <br />

        <h2>Add Sizes:</h2>
        <label htmlFor="size-type">Size Type:</label>
        <select
          name="size-type"
          id="size-type"
          value={sizeType}
          onChange={(e) => setSizeType(e.target.value)}
        >
          <option value="number">Number</option>
          <option value="clothing">Clothing</option>
        </select>
        <br />
        <br />

        {sizeType === "number" &&
          sizes.map((s) => (
            <div key={s.size}>
              <label htmlFor={`size-${s.size}`}>Size {s.size}:</label>
              <input
                type="number"
                name={`size-${s.size}`}
                id={`size-${s.size}`}
                value={s.quantity}
                onChange={(e) => handleQuantityChange(s.size, e)}
              />
              <br />
              <br />
            </div>
          ))}

        {sizeType === "clothing" &&
          clothingSizeQuantities.map((s) => (
            <div key={s.size}>
              <label htmlFor={`clothing-size-${s.size}`}>Size {s.size}:</label>
              <input
                type="number"
                name={`clothing-size-${s.size}`}
                id={`clothing-size-${s.size}`}
                value={s.quantity}
                onChange={(e) => handleClothingSizeQuantityChange(s.size, e)}
              />
              <br />
              <br />
            </div>
          ))}

        <input type="submit" value="Upload Product" />
      </form>
    </>
  );
}
