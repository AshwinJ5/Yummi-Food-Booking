import React, { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";
import { addToUserCartAPI, getAProductAPI } from "../Services/allAPIS";
import nonVeg from "../assets/nveg.png";
import veg from "../assets/veg.png";
import "./cart.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userCartDetailsContext } from "../Context/ContextAPICart";

function ProductDetails() {
  const [singleProduct, setSingleProduct] = useState([]);
  const { userCartDetails, setUserCartDetails } = useContext(
    userCartDetailsContext
  );

  const navigate = useNavigate();
  const pid = useParams();
  // console.log(pid);

  const userId = sessionStorage.getItem("userId");

  const getAProductDetail = async (id) => {
    const result = await getAProductAPI(id);
    setSingleProduct(result.data);
    setUserCartDetails({
      ...userCartDetails,
      productName: result.data.productName,
      id: result.data._id,
      type: result.data.type,
      price: result.data.price,
      productDescription: result.data.productDescription,
      vegOrNonveg: result.data.vegOrNonveg,
      productImage: result.data.productImage,
      userId: userId,
      quantity: 1,
      totalAmount: result.data.price,
    });
  };

  useEffect(() => {
    getAProductDetail(pid.id);
  }, []);

  // console.log(singleProduct);
  // console.log(userCartDetails);

  //add to cart
  const addToCart = async () => {
    const {
      productName,
      id,
      type,
      price,
      productDescription,
      vegOrNonveg,
      productImage,
      quantity,
      totalAmount,
      userId,
    } = userCartDetails;
    if (
      !sessionStorage.getItem("token") ||
      !sessionStorage.getItem("username")
    ) {
      toast.info("Please Login");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else if (
      !productName ||
      !id ||
      !type ||
      !price ||
      !productDescription ||
      !productImage ||
      !quantity ||
      !totalAmount ||
      !userId
    ) {
      toast.info("Missing Data");
    } else {
      const reqBody = new FormData();
      reqBody.append("productName", productName);
      reqBody.append("id", id);
      reqBody.append("type", type);
      reqBody.append("price", price);
      reqBody.append("productDescription", productDescription);
      reqBody.append("vegOrNonveg", vegOrNonveg);
      reqBody.append("productImage", productImage);
      reqBody.append("quantity", quantity);
      reqBody.append("totalAmount", totalAmount);
      reqBody.append("userId", userId);

      console.log(reqBody);
      const token = sessionStorage.getItem("token");
      const userName = sessionStorage.getItem("username");
      if (token && userName) {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await addToUserCartAPI(reqBody, reqHeader);
          console.log(result);
          if (result.status === 200) {
            // console.log(result.data);
            setUserCartDetails({
              productName: "",
              id: "",
              type: "",
              price: 0,
              productDescription: "",
              vegOrNonveg: "",
              productImage: "",
              quantity: 0,
              totalAmount: 0,
              userId: "",
            });
            toast.success(`Item added to Cart`);
            setTimeout(() => {
              navigate("/cart");
            }, 1000);
          } else {
            toast.warning(result.data);
            setTimeout(() => {
              navigate("/cart");
            }, 1000);
          }
        } catch (err) {
          toast.info(err.response.data);
        }
      }
    }
  };

  return (
    <>
      <div className="product_details_main w-100">
        <div className=" container">
          <div className="row">
            <div className="col-lg-7 col-12 p-5 product_details_div text-center">
              <img
                src={singleProduct.productImage}
                width={"100%"}
                height={"100%"}
              />
            </div>
            <div className="col-lg-5 col-12 p-5 align-items-center d-grid">
              <div
                style={{ color: "#d7504a" }}
                className="h1 text-center fw-bolder"
              >
                <p>{singleProduct.productName}</p>
              </div>
              <div className="vegOrNonVeg">
                {singleProduct.vegOrNonveg === true ? (
                  <img src={nonVeg} alt="" />
                ) : (
                  <img src={veg} alt="" />
                )}
              </div>

              <div className="ingredients">
                Description:
                <p style={{ textAlign: "justify" }}>
                  {singleProduct.productDescription}
                </p>
              </div>
              <div className="h1 ">
                <p>
                  Price: ₹<span className="fw-bold">{singleProduct.price}</span>
                  /-
                </p>
              </div>
              <div className="cart_button text-center" onClick={addToCart}>
                Add to Cart
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-left"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
