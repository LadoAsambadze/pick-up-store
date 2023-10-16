import { Box, FormLabel, Typography, styled } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const SizeInput = ({
  size,
  quantity,
  handleQuantityChange,
}: {
  size: string;
  quantity: number;
  handleQuantityChange: Function;
}) => (
  <div key={size}>
    <label htmlFor={`size-${size}`}>Size {size}:</label>
    <input
      type="number"
      name={`size-${size}`}
      id={`size-${size}`}
      value={quantity}
      onChange={(e) => handleQuantityChange(size, e)}
    />
    <br />
    <br />
  </div>
);

const createSizeArray = (start: any, end: any) => {
  return Array(end - start + 1)
    .fill(0)
    .map((_, i) => ({ size: i + start, quantity: 0 }));
};

const handleQuantityChange =
  (sizeArray: Array<{ size: any; quantity: number }>, setSizeArray: Function) =>
  (size: number, event: any) => {
    const newSizes = sizeArray.map((s) =>
      s.size === size ? { ...s, quantity: event.target.value } : s
    );
    setSizeArray(newSizes);
  };

export default function MyAddProducts() {
  const [sizeType, setSizeType] = useState("Shoes");
  const [sizes, setSizes] = useState(createSizeArray(34, 46));
  const [kidSizes, setKidSizes] = useState(createSizeArray(16, 32));
  const clothingSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  const [clothingSizeQuantities, setClothingSizeQuantities] = useState(
    clothingSizes.map((size) => ({ size, quantity: 0 }))
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const color = formData.get("color");
    const files = formData.getAll("photo");
    files;

    let productSizesObject: { [key: string]: number } = {};

    if (sizeType === "Shoes") {
      sizes.forEach((s) => {
        productSizesObject[s.size] = s.quantity;
      });
    } else if (sizeType === "Clothing") {
      clothingSizeQuantities.forEach((s) => {
        productSizesObject[s.size] = s.quantity;
      });
    } else if (sizeType === "Kid Shoes") {
      kidSizes.forEach((s) => {
        productSizesObject[s.size] = s.quantity;
      });
    }

    let photoNames = Array.from(files).map(
      (file) => "/image/" + (file as File).name
    );

    const productData = {
      type: formData.get("Type"),
      gender: formData.get("gender"),
      category: formData.get("category"),
      price: formData.get("price"),
      brand: formData.get("brand"),
      name: formData.get("name"),
      new: formData.get("new") === "true",
      itemList: [
        {
          color,
          size: productSizesObject,
          urls: photoNames,
        },
      ],
    };
    formData.append("productData", JSON.stringify(productData));

    try {
      await axios.post("http://localhost:3000/uploadproduct", formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Main>
        <Header>Upload Product</Header>
        <form
          onSubmit={handleSubmit}
          action="#"
          method="post"
          encType="multipart/form-data"
        >
          <FormDiv>
            <FirstDiv>
              <Label htmlFor="Type">Type:</Label>
              <Select name="Type" required>
                <Option value="Shoes">Shoes</Option>
                <Option value="Clothes">Clothes</Option>
              </Select>
              <Label htmlFor="gender">Gender:</Label>
              <Select name="gender" id="gender" required>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Unisex">Unisex</Option>
              </Select>

              <Label htmlFor="category">Category:</Label>
              <Select name="category" id="category" required>
                <Option value="Woman">Woman</Option>
                <Option value="Man">Man</Option>
                <Option value="Kids">Kids</Option>
              </Select>

              <Label htmlFor="price">Price:</Label>
              <InputEl type="number" name="price" id="price" required />

              <Label htmlFor="brand">Brand:</Label>
              <InputEl type="text" name="brand" id="brand" required />

              <Label htmlFor="name">Product Name:</Label>
              <InputEl type="text" name="name" id="name" required />

              <Label htmlFor="new" required>
                New Product:
                <InputEl type="radio" name="new" value="true" />
                Yes
                <InputEl type="radio" name="new" value="false" />
                No
              </Label>
            </FirstDiv>
            <SecondDiv>
              <Label htmlFor="color">Color:</Label>
              <InputEl type="text" name="color" id="color" />

              <Label htmlFor="size-type">Size Type:</Label>
              <Select
                name="size-type"
                id="size-type"
                value={sizeType}
                onChange={(e) => setSizeType(e.target.value)}
              >
                <Option value="Shoes">Shoes</Option>
                <Option value="Clothing">Clothing</Option>
                <Option value="Kid Shoes">Kid Shoes</Option>
              </Select>

              {sizeType === "Shoes" &&
                sizes.map((s) => (
                  <SizeInput
                    size={s.size}
                    quantity={s.quantity}
                    handleQuantityChange={handleQuantityChange(sizes, setSizes)}
                  />
                ))}

              {sizeType === "Clothing" &&
                clothingSizeQuantities.map((s) => (
                  <SizeInput
                    size={s.size}
                    quantity={s.quantity}
                    handleQuantityChange={handleQuantityChange(
                      clothingSizeQuantities,
                      setClothingSizeQuantities
                    )}
                  />
                ))}

              {sizeType === "Kid Shoes" &&
                kidSizes.map((s) => (
                  <SizeInput
                    size={s.size}
                    quantity={s.quantity}
                    handleQuantityChange={handleQuantityChange(
                      kidSizes,
                      setKidSizes
                    )}
                  />
                ))}

              <input type="submit" value="Upload Product" />
            </SecondDiv>
            <ThirthDiv>
              <Label htmlFor="photo">Upload Photo:</Label>
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                multiple
              />
            </ThirthDiv>
          </FormDiv>
        </form>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
`;
const Header = styled(Typography)`
  font-family: "Ysabeau Office", sans-serif;
  color: black;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

const Label = styled(FormLabel)``;

const Select = styled("select")`
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
`;

const Option = styled("option")`
  font-size: 16px;
`;

const InputEl = styled("input")`
  border: 1px solid gray;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const FormDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const FirstDiv = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const SecondDiv = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const ThirthDiv = styled(Box)`
  display: flex;
  flex-direction: column;
`;
