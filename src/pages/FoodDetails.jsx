import React, { useState, useEffect } from "react";
import "../style/FoodDetails.css";
import { Container, Row, Col } from "reactstrap";

// Navigation
import { useParams, useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { bagActions } from "../store/MyBag/bagSlice";

// Icons or Images
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

// Connect Firebase
import {
  getDoc,
  setDoc,
  arrayUnion,
  updateDoc,
  doc,
  addDoc,
  collection,
} from "firebase/firestore";
import { db, auth } from "../firebase.js";

const FoodDetails = () => {
  //------------------ Get Document ID of the selected food ------------------//
  const { id } = useParams();
  // console.log(id);

  //------------------ Navigation ------------------//
  const navigate = useNavigate();

  //------------------ Retrieve Food Data ------------------//
  const [foodData, setFoodData] = useState();

  const getFoodData = async () => {
    const docRef = doc(db, "FoodData", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data: ", docSnap.data());
      setFoodData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getFoodData();
  }, []);

  // Food Quantity
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //------------------ Add to Bag Function ------------------//
  const dispatch = useDispatch();
  // Firebase
  const addToBag = () => {
    dispatch(
      bagActions.addItem({
        foodId: id,
        foodName: foodData?.foodName,
        img: foodData?.img,
        price: foodData?.price,
        foodQty: quantity,
      })
    );
    const totalPrice = foodData?.price * quantity;

    // Add item to firebase
    const docRef = doc(db, "UserBag", auth.currentUser.uid);
    const data1 = {
      foodId: id,
      foodName: foodData?.foodName,
      img: foodData?.img,
      price: foodData?.price,
      foodQty: quantity,
      totalPrice: totalPrice,
    };

    // Check if document exists before updating it
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          updateDoc(docRef, {
            bag: arrayUnion(data1),
          })
            .then(() => {
              alert("Item added to bag in Firestore.");
              navigate("/menu");
            })
            .catch((error) => {
              alert(`Error adding item to bag in Firestore: ${error}`);
            });
        } else {
          setDoc(docRef, {
            bag: [data1],
          })
            .then(() => {
              alert("Item added to bag in Firestore.");
              navigate("/menu");
            })
            .catch((error) => {
              alert(`Error adding item to bag in Firestore: ${error}`);
            });
        }
      })
      .catch((error) => {
        alert(`Error checking if document exists in Firestore: ${error}`);
      });
  };

  return (
    <section>
      <Container>
        <Row className="single__product-row mb-5">
          <Col className="container__leftCol" lg="4" md="4">
            <div className="foodProduct__image">
              <img src={foodData?.img} alt="product-img" />
            </div>

            <div className="single__product-content">
              <Row className="align-items-center justify-content-center m-0 p-0">
                <Col>
                  <h2 className="foodProduct__title mb-3">
                    {foodData?.foodName}
                  </h2>
                </Col>
                <Col>
                  <p className="foodProduct__price">
                    ₱ <span>{parseFloat(foodData?.price).toFixed(2)}</span>
                  </p>
                </Col>
              </Row>

              <p className="foodProduct__category mb-3">
                Category: <span>{foodData?.categoryTitle}</span>
              </p>

              <div className="foodProduct_desc">
                <p>Description:</p>
                <span>{foodData?.description}</span>
              </div>
            </div>

            <Row className="mt-2">
              <Col className="totalPrice__txt">
                <span>
                  Total Price: ₱&nbsp;
                  {parseFloat(foodData?.price * quantity).toFixed(2)}
                </span>
              </Col>
              <Col>
                <div className="foodProduct__qty">
                  <button onClick={handleDecrease}>
                    <RemoveCircleOutlineOutlinedIcon
                      sx={{ fontSize: "1.7rem" }}
                    />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={handleIncrease}>
                    <AddCircleOutlineOutlinedIcon sx={{ fontSize: "1.7rem" }} />
                  </button>
                </div>
              </Col>
            </Row>
            <button className="foodProduct__addBtn" onClick={addToBag}>
              Add to Bag
            </button>
          </Col>

          {/* Add to bag function */}

          <Col lg="6" md="6">
            <div className="customize__order">Customize your order:</div>
          </Col>
        </Row>

        {/* <Row>
          <Col lg="12" className="mb-5 mt-4">
            <h2>You might also like</h2>
          </Col>
          {relatedProduct.map((item) => (
            <Col lg="3" md="4" sm="6" xs="6" key={item.id}>
              <MenuProductCard item={item} />
            </Col>
          ))}
        </Row> */}
      </Container>
    </section>
  );
};

export default FoodDetails;
