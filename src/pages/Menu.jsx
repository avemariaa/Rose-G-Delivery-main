import React, { useState, useEffect } from "react";
import MenuProductCard from "../components/UI/MenuProductCard";
import { Container, Row, Col } from "reactstrap";
import "../style/Menu.css";

// Connect Firebase
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";

const Menu = () => {
  //------------------ Retrieve Food Data ------------------//
  const [foodData, setFoodData] = useState([]);
  useEffect(() => {
    //LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "FoodData"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setFoodData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  console.log(foodData);

  // const iceCreamCategory = foodData.filter((iceCream) => {
  //   return iceCream.categoryTitle === "Ice Cream";
  // });

  // const drinksCategory = foodData.filter((drinks) => {
  //   return drinks.categoryTitle === "Drinks";
  // });

  //------------------ Category Buttons Function (Filter) ------------------//
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [allProducts, setAllProducts] = useState(foodData);

  useEffect(() => {
    if (category === "ALL") {
      setAllProducts(foodData);
    }

    if (category === "PALABOK") {
      const filteredProducts = foodData.filter(
        (item) => item.categoryTitle === "Palabok"
      );
      setAllProducts(filteredProducts);
    }

    if (category === "RICE MEALS") {
      const filteredProducts = foodData.filter(
        (item) => item.categoryTitle === "Rice Meal"
      );
      setAllProducts(filteredProducts);
    }

    if (category === "BARBECUE") {
      const filteredProducts = foodData.filter(
        (item) => item.categoryTitle === "Barbecue"
      );
      setAllProducts(filteredProducts);
    }

    if (category === "DRINKS") {
      const filteredProducts = foodData.filter(
        (item) => item.categoryTitle === "Drinks"
      );
      setAllProducts(filteredProducts);
    }

    if (category === "ICE CREAM") {
      const filteredProducts = foodData.filter(
        (item) => item.categoryTitle === "Ice Cream"
      );
      setAllProducts(filteredProducts);
    }

    if (category === "EXTRAS") {
      const filteredProducts = foodData.filter(
        (item) => item.categoryTitle === "Extra"
      );
      setAllProducts(filteredProducts);
    }
  });

  return (
    <div>
      <Container>
        {/*------------------ Category Buttons ------------------*/}
        <Row>
          <div className="category__title ">
            <Col className="categoryBtn__column">
              <button
                className="category__btn"
                onClick={() => setCategory("ALL")}
              >
                All
              </button>

              <button
                className="category__btn"
                onClick={() => setCategory("PALABOK")}
              >
                Palabok
              </button>

              <button
                className="category__btn"
                onClick={() => setCategory("RICE MEALS")}
              >
                Rice Meals
              </button>

              <button
                className="category__btn"
                onClick={() => setCategory("BARBECUE")}
              >
                Barbecue
              </button>

              <button
                className="category__btn"
                onClick={() => setCategory("DRINKS")}
              >
                Drinks
              </button>

              <button
                className="category__btn"
                onClick={() => setCategory("ICE CREAM")}
              >
                Ice Cream
              </button>

              <button
                className="category__btn"
                onClick={() => setCategory("EXTRAS")}
              >
                Extras
              </button>
            </Col>
          </div>
        </Row>

        {/*------------------ Display Food ------------------*/}
        <section>
          <Row>
            {allProducts
              .filter((post) => {
                if (query === "") {
                  return post;
                } else if (
                  post.title.toLowerCase().includes(query.toLowerCase()) ||
                  post.category.toLowerCase().includes(query.toLowerCase())
                ) {
                  return post;
                }
              })
              .map((item) => (
                <Col lg="3" md="6" sm="6" key={item.id}>
                  <MenuProductCard item={item} />
                </Col>
              ))}
          </Row>
        </section>
        {/*------------------ Rice Meals Row------------------*/}
        {/* <Row>
          <Col>
            {" "}
            <div className="menu__search">
              <i class="ri-search-line"></i>
              <input
                type="text"
                placeholder="Search item..."
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </Col>
        </Row> */}

        {/*Ice Cream Row*/}
        {/* <Row className="menu__iceCream">
          <Col lg="12" md="10" sm="8" className="mb-2 mt-3">
            <h5>Ice Cream</h5>
          </Col>{" "}
          {iceCreamCategory
            .filter((post) => {
              if (query === "") {
                return post;
              } else if (
                post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.category.toLowerCase().includes(query.toLowerCase())
              ) {
                return post;
              }
            })
            .map((item) => (
              <Col lg="3" md="6" sm="6" key={item.id}>
                <MenuProductCard item={item} />
              </Col>
            ))}
        </Row> */}

        {/*Drinks Row*/}
        {/* <Row className="menu__drinks">
          <Col lg="12" className="mb-2 mt-3">
            <h5>Drinks</h5>
          </Col>

          {drinksCategory
            .filter((post) => {
              if (query === "") {
                return post;
              } else if (
                post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.category.toLowerCase().includes(query.toLowerCase())
              ) {
                return post;
              }
            })
            .map((item) => (
              <Col lg="3" md="6" sm="6" key={item.id}>
                <MenuProductCard item={item} />
              </Col>
            ))}
        </Row> */}
      </Container>
    </div>
  );
};

export default Menu;
