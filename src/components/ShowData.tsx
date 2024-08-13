import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Class1 from "../assets/Class1.jpg";
import Class2 from "../assets/Class2.jpg";
import Class3 from "../assets/Class3.webp";
import Class4 from "../assets/Class4.jpg";
import ButtonPages from "./ButtonPages";
import SearchBar from "./SearchBar";
import "../ShowData.css";
import "../SearchBar.css";

interface Product {
  id: number;
  category: string;
  description: string;
  name: string;
}

const ShowData: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios
      .get(
        "https://c6ac9ab7-0ad6-4a92-8639-9a116c258fe1-00-299g209a7syl0.sisko.replit.dev/courses"
      )
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    // ตรวจสอบการเข้าสู่ระบบ
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm =
      product.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    return matchesSearchTerm && matchesCategory;
  });

  const imageMapping = {
    1: Class1,
    2: Class2,
    3: Class3,
    4: Class4,
  };

  const handleButtonClick = (category: string, id: number) => {
    if (!isLoggedIn) {
      navigate("/signin"); // ไปหน้า SignIn ถ้ายังไม่ได้เข้าสู่ระบบ
      return;
    }

    switch (category) {
      case "Programming Fundamentals":
        navigate(`/introPython/${id}`);
        break;
      case "Web Development":
        navigate(`/AdvancedJavaScript/${id}`);
        break;
      case "Machine Learning":
        navigate(`/MachineLearning/${id}`);
        break;
      case "Data Science":
        navigate(`/DataScience/${id}`);
        break;
      default:
        console.log("Unknown category");
    }
  };

  return (
    <div className="con-SearchBar">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />
      <div className="cards-container">
        <div className="card-map">
          {filteredProducts.map((product: Product) => (
            <Card key={product.id} className="con-card">
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={imageMapping[product.id]}
                  alt={product.name}
                  height="100%"
                  style={{ objectFit: "cover" }}
                />
                <CardContent className="con-card-content">
                  <Typography gutterBottom variant="h5" component="div">
                    {product.category}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="Con-Card-Content"
                  >
                    {product.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    {product.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="con-button-homepage">
                <ButtonPages
                  onClick={() =>
                    handleButtonClick(product.category, product.id)
                  }
                >
                  Open Access
                </ButtonPages>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowData;
