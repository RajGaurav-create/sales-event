// CustomModal.jsx
import React, { useEffect, useState } from "react";


const CustomModal = ({ modalType, onClose, onSubmit, response }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
  });

  const [inputValue, setInputValue] = useState(""); // Generalized input for all cases

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGeneralInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (modalType) {
      case "addProduct": {
        const processedData = {
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10),
          categoryId: parseInt(formData.categoryId, 10),
        };
        onSubmit(processedData);
        break;
      }
      case "deleteProduct": {
        const productId = parseInt(inputValue, 10);
        onSubmit({ productId });
        break;
      }
      case "viewUser": {
        const userId = parseInt(inputValue, 10);
        onSubmit({ userId });
        break;
      }
      case "modifyUser": {
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const email = formData.get("email");
        const role = formData.get("role");
        const userId = parseInt(inputValue, 10);
        const data = {
          username,
        };
        onSubmit(userId);
        break;
      }
      case "monthlyBusiness": {
        const month = formData.month;
        const year = formData.year;
        onSubmit({ month, year });
        break;
      }
      case "dailyBusiness": {
        const date = formData.date;
        onSubmit({ date });
        break;
      }

      case "yearlyBusiness": {
        const year = formData.year;
        onSubmit({ year });
        break;
      }

      case "overallBusiness": {
        onSubmit();
        break;
      }

      default:
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 max-h-[90vh] overflow-y-auto">
        {/* Add Product Form */}
        {modalType === "addProduct" &&
          (!response ? (
            <>
              <div className="p-6">
  <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg mx-auto space-y-6">
    
    <h2 className="text-3xl font-bold text-gray-800 text-center">
      Add Product
    </h2>

    <form className="modal-form space-y-5" onSubmit={handleSubmit}>

      <div className="modal-form-item flex flex-col space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-600">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div className="modal-form-item flex flex-col space-y-2">
        <label htmlFor="price" className="text-sm font-medium text-gray-600">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div className="modal-form-item flex flex-col space-y-2">
        <label htmlFor="stock" className="text-sm font-medium text-gray-600">
          Stock
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div className="modal-form-item flex flex-col space-y-2">
        <label htmlFor="categoryId" className="text-sm font-medium text-gray-600">
          Category ID
        </label>
        <input
          type="number"
          id="categoryId"
          name="categoryId"
          placeholder="Category ID"
          value={formData.categoryId}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div className="modal-form-item flex flex-col space-y-2">
        <label htmlFor="imageUrl" className="text-sm font-medium text-gray-600">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div className="modal-form-item flex flex-col space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-gray-600">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          rows="4"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md"
      >
        Submit
      </button>
    </form>

    <button
      onClick={onClose}
      className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition duration-200 shadow-md"
    >
      Cancel
    </button>

  </div>
</div>
            </>
          ) : (
            <>
              <div className="p-6">
  <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-4xl mx-auto space-y-8">
    
    <h2 className="text-3xl font-bold text-gray-800 text-center">
      Product Details
    </h2>

    <div className="full-products grid md:grid-cols-2 gap-8 items-start">

      {/* Image Section */}
      <div className="product-details img flex justify-center">
        <img
          src={response.product.imageUrl}
          alt="Product"
          className="rounded-xl shadow-lg object-cover max-h-96 w-full"
        />
      </div>

      {/* Info Section */}
      <div className="product-details-info space-y-4">

        <div className="product-details flex justify-between border-b pb-2">
          <div className="font-semibold text-gray-700">Name :</div>
          <div className="text-gray-900">
            {response?.product?.product?.name}
          </div>
        </div>

        <div className="product-details flex justify-between border-b pb-2">
          <div className="font-semibold text-gray-700">Description :</div>
          <div className="text-gray-900 text-right max-w-xs">
            {response?.product?.product?.description}
          </div>
        </div>

        <div className="product-details flex justify-between border-b pb-2">
          <div className="font-semibold text-gray-700">Price :</div>
          <div className="text-gray-900 font-medium">
            ₹ {response?.product?.product?.price}
          </div>
        </div>

        <div className="product-details flex justify-between border-b pb-2">
          <div className="font-semibold text-gray-700">Stock :</div>
          <div className="text-gray-900">
            {response?.product?.product?.stock}
          </div>
        </div>

        <div className="product-details flex justify-between">
          <div className="font-semibold text-gray-700">Category :</div>
          <div className="text-gray-900">
            {response?.product?.product?.category.categoryName}
          </div>
        </div>

      </div>
    </div>

    <div className="product-details flex justify-center pt-4">
      <button
        onClick={onClose}
        className="px-6 py-2.5 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition duration-200 shadow-md"
      >
        Close
      </button>
    </div>

  </div>
</div>
            </>
          ))}

        {/* Delete Product Form */}
        {modalType === "deleteProduct" &&
          (!response ? (
           <>
  <div className="p-6">
    <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md mx-auto space-y-6">

      <h2 className="text-2xl font-bold text-red-600 text-center">
        Delete Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Enter Product ID"
          value={inputValue}
          onChange={handleGeneralInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
        />

        <button
          className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition duration-200 shadow-md"
        >
          Delete
        </button>
      </form>

      <button
        onClick={onClose}
        className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition duration-200 shadow-md"
      >
        Cancel
      </button>

    </div>
  </div>
</>
          ) : (
           <div className="p-6">
  <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md mx-auto space-y-6 text-center">

    <h2 className="text-2xl font-bold text-green-600">
      Product Deleted Successfully
    </h2>

    <button
      onClick={onClose}
      className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition duration-200 shadow-md"
    >
      Close
    </button>

  </div>
</div>
          ))}

        {/* View User Details Form */}
        {modalType === "viewUser" && (
          <>
           <div className="p-6">
  <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md mx-auto space-y-6">

    <h2 className="text-2xl font-bold text-blue-600 text-center">
      View User Details
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        placeholder="Enter User ID"
        value={inputValue}
        onChange={handleGeneralInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      />

      <button
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md"
      >
        Submit
      </button>
    </form>

    <button
      onClick={onClose}
      className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition duration-200 shadow-md"
    >
      Cancel
    </button>

  </div>
</div>
          </>
        )}

        {/* Response Display */}
        {modalType === "response" && response && (
          <>
            {response.user ? (
              <>
                <div className="p-6">
  <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md mx-auto space-y-6">

    <h2 className="text-2xl font-bold text-blue-600 text-center">
      User Details
    </h2>

    <div className="user-details space-y-4 text-gray-700">

      <div className="flex justify-between border-b pb-2">
        <strong className="text-gray-800">User ID:</strong>
        <span>{response.user.userId}</span>
      </div>

      <div className="flex justify-between border-b pb-2">
        <strong className="text-gray-800">Username:</strong>
        <span>{response.user.username}</span>
      </div>

      <div className="flex justify-between border-b pb-2">
        <strong className="text-gray-800">Email:</strong>
        <span>{response.user.email}</span>
      </div>

      <div className="flex justify-between border-b pb-2">
        <strong className="text-gray-800">Role:</strong>
        <span>{response.user.role}</span>
      </div>

      <div className="flex justify-between border-b pb-2">
        <strong className="text-gray-800">Created At:</strong>
        <span>
          {new Date(response.user.createdAt).toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between">
        <strong className="text-gray-800">Updated At:</strong>
        <span>
          {new Date(response.user.updatedAt).toLocaleString()}
        </span>
      </div>

    </div>

  </div>
</div>
              </>
            ) : (
              <>
                <div className="p-6">
  <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md mx-auto text-center space-y-4">

    <h2 className="text-2xl font-bold text-red-600">
      Error 1
    </h2>

    <p className="text-gray-600">
      Something went wrong.
    </p>

  </div>
</div>
              </>
            )}
            <button onClick={onClose} className="font font-semibold bg-blue-600 hover:bg-blue-900 p-4">Back to Dashboard</button>
          </>
        )}
        {modalType === "monthlyBusiness" && (
          <>
            <form className="modal-form bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto" onSubmit={handleSubmit}>
              {!response && (
                <>
                  <div className="modal-form-item mb-4 flex flex-col">
                    <label htmlFor="month" className="text-sm font-semibold text-gray-700 mb-1">Month:</label>
                    <input
                      type="number"
                      id="month"
                      name="month"
                      placeholder="10"
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-3 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <div className="modal-form-item mb-6 flex flex-col">
                    <label htmlFor="year" className="text-sm font-semibold text-gray-700 mb-1">Year:</label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      placeholder="2025"
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <button type="submit"
                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow-md transition duration-200"
                  >Sumbit</button>
                </>
              )}
              {response && (
                <div>
                  <div className="business-response-item flex justify-between items-center py-3 border-b border-gray-200">
                    <div className="text-lg font-semibold text-gray-700">Total Business: ₹ </div>
                    <div className="text-xl font-bold text-green-600">
                      {response?.monthlyBusiness?.totalRevenue?.toFixed(2)}
                    </div>
                  </div>
                  <div className="business-response-item mt-5 mb-3">
                    <h5 className="text-md font-semibold text-gray-800 uppercase tracking-wide">Category Sales</h5>
                  </div>
                  {Object.keys(response?.monthlyBusiness?.categorySales)?.map(
                    (key) => {
                      return (
                        <div key={key} className="business-response-item flex  justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition">
                          <div className="text-gray-700 font-medium">{key}</div>
                          <div className="text-blue-600 font-semibold">
                            {response?.monthlyBusiness?.categorySales[key]}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              <button onClick={onClose}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl shadow-md transition duration-200"
              >Cancel</button>
            </form>
          </>
        )}

        {modalType === "dailyBusiness" && (
          <>
            <form className="modal-form bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto space-y-6 " onSubmit={handleSubmit}>
              {!response && (
                <>
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                  Daily Business Report
                  </h2>
                  <div className="modal-form-item flex flex-col space-y-2">
                    <label htmlFor="date" className="text-sm font-medium text-gray-600">Date:</label>
                    <input
                      type="text"
                      id="date"
                      name="date"
                      placeholder="2025-12-31"
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  <button type="submit"
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md"
                  >Sumbit</button>
                </>
              )}
              {response && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-green-600 text-center">
                        Business Summary
                       </h2>
                  <div className="business-response-item flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                    <div className="font-medium text-gray-700">Total Business: ₹ </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {response?.dailyBusiness?.totalRevenue?.toFixed(2)}
                    </div>
                  </div>
                  <div className="business-response-item">
                    <h5 className="text-lg font-semibold text-gray-800">Category Sales</h5>
                  </div>
                  {Object.keys(response?.dailyBusiness?.categorySales)?.map(
                    (key) => {
                      return (
                        <div key={key} className="business-response-item flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                          <div className="text-gray-700">{key}</div>
                          <div className="font-medium text-gray-900">
                            {response?.dailyBusiness?.categorySales[key]}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              <button onClick={onClose}
              className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition duration-200 shadow-md"
              >Cancel</button>
            </form>
          </>
        )}

        {modalType === "yearlyBusiness" && (
          <>
            <form className="modal-form bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto" onSubmit={handleSubmit}>
              {!response && (
                <>
                  <div className="modal-form-item mb-6 flex flex-col">
                    <label htmlFor="year"
                     className="text-sm font-semibold text-gray-700 mb-1"
                    >Year:</label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      placeholder="2025"
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <button type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow-md transition duration-200"
                  >Sumbit</button>
                </>
              )}
              {response && (
                <div className="mt-4">
                  <div className="business-response-item flex justify-between items-center py-3 border-b border-gray-200">
                    <div className="text-lg font-semibold text-gray-700">Total Business: ₹ </div>
                    <div className="text-xl font-bold text-green-600">
                      {response?.yearlyBusiness?.totalRevenue?.toFixed(2)}
                    </div>
                  </div>
                  <div className="business-response-item mt-5 mb-3">
                    <h5 className="text-md font-semibold text-gray-800 uppercase tracking-wide">Category Sales</h5>
                  </div>
                  {Object.keys(response?.yearlyBusiness?.categorySales)?.map(
                    (key) => {
                      return (
                        <div key={key} className="business-response-item flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition">
                          <div className="text-gray-700 font-medium">{key}</div>
                          <div className="text-blue-600 font-semibold">
                            {response?.yearlyBusiness?.categorySales[key]}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              <button onClick={onClose} 
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl shadow-md transition duration-200"
              >Cancel</button>
            </form>
          </>
        )}

        {modalType === "overallBusiness" && (
          <>
            <form className="modal-form bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto" onSubmit={handleSubmit}>
              {!response && (
                <>
                  <button type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-900 text-white font-semibold py-2 rounded-xl shadow-md transition duration-200"
                  >Get Overall Business </button>
                </>
              )}
              {response && (
                <div className="mt-4">
                  <div className="business-response-item flex justify-between items-center py-3 border-b border-gray-200">
                    <div className="text-lg font-semibold text-gray-700">Total Business: ₹ </div>
                    <div className="text-xl font-bold text-green-600">
                     {response?.overallBusiness?.totalRevenue
                     ? response.overallBusiness.totalRevenue.toFixed(2)
                       : "0.00"}
                    </div>
                  </div>
                  <div className="business-response-item mt-5 mb-3">
                    <h5 className="text-md font-semibold text-gray-800 uppercase tracking-wide">Category Sales</h5>
                  </div>
                  {Object.keys(response?.overallBusiness?.categorySales)?.map(
                    (key) => {
                      return (
                        <div key={key} className="business-response-item flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition">
                          <div className="text-gray-700 font-medium">{key}</div>
                          <div className="text-blue-600 font-semibold">
                            {response?.overallBusiness?.categorySales[key]}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              <button onClick={onClose}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl shadow-md transition duration-200"
              >Cancel</button>
            </form>
          </>
        )}

        {/* ModifyUser */}
        {modalType === "modifyUser" && (
          <ModifyUserFormComponent onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default CustomModal;

const ModifyUserFormComponent = ({ onClose }) => {
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [updated, setUpdated] = useState(false);

  const handleFetchUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const userid = formData.get("user-id");

      if (!userid) return;

      const response = await fetch(`http://localhost:8080/admin/user/${userId}`, {
        method: "GET",
        credentials: "include",
        // Ensure userId is correctly passed
      });

      if (response.ok) {
        const user = await response.json();
        console.log("userDetails2==>", user);

        setUserDetails(user);
        setUserId(userid);
      }
    } catch (error) {
      console.log("Error fetching user details", error);
    }
  };

  useEffect(() => {
    console.log("userDetails==>", userDetails);
  }, [userDetails]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const role = formData.get("role");

    const response = await fetch("http://localhost:8080/admin/user/modify", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: +userId,
        username: username,
        email: email,
        role: role,
      }),
    });

    if (response.ok) {
      const user = await response.json();
      console.log("userDetails2==>", user);

      setUpdated(true);
      setUserDetails(user);
    }
  };

  if (userDetails == null) {
    return (
     <div className="p-6">
  <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md mx-auto space-y-6">

    <h2 className="text-2xl font-bold text-blue-600 text-center">
      Get User
    </h2>

    <form onSubmit={handleFetchUser} className="space-y-4">
      <div className="modal-form-item flex flex-col space-y-2">
        <label
          htmlFor="user-id"
          className="text-sm font-medium text-gray-600"
        >
          User ID
        </label>

        <input
          type="text"
          id="user-id"
          name="user-id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md"
      >
        Get User
      </button>
    </form>

  </div>
</div>
    );
  }

  if (userDetails && !updated) {
    return (
      <div className="p-6">
  <form
    onSubmit={handleUpdateUser}
    className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto space-y-6"
  >
    <h2 className="text-2xl font-semibold text-gray-800 text-center">
      Update User
    </h2>

    <div className="modal-form-item flex flex-col space-y-2">
      <label htmlFor="user-id" className="text-sm font-medium text-gray-600">
        User ID
      </label>
      <input
        type="text"
        id="user-id"
        name="user-id"
        value={userId}
        readOnly
        className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
      />
    </div>

    <div className="modal-form-item flex flex-col space-y-2">
      <label htmlFor="username" className="text-sm font-medium text-gray-600">
        Username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        defaultValue={userDetails?.username ?? ""}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      />
    </div>

    <div className="modal-form-item flex flex-col space-y-2">
      <label htmlFor="email" className="text-sm font-medium text-gray-600">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        defaultValue={userDetails?.email ?? ""}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      />
    </div>

    <div className="modal-form-item flex flex-col space-y-2">
      <label htmlFor="role" className="text-sm font-medium text-gray-600">
        Role
      </label>
      <input
        type="text"
        id="role"
        name="role"
        defaultValue={userDetails?.role ?? ""}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md"
    >
      Submit
    </button>
  </form>
</div>
    );
  }
  if (updated) {
  return (
    <div className="p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto space-y-6">
        <h2 className="text-2xl font-semibold text-green-600 text-center">
          Updated User Details
        </h2>

        <div className="user-details space-y-3 text-gray-700">
          <p>
            <strong className="font-medium text-gray-900">User ID:</strong>{" "}
            {userDetails.userId}
          </p>
          <p>
            <strong className="font-medium text-gray-900">Username:</strong>{" "}
            {userDetails.username}
          </p>
          <p>
            <strong className="font-medium text-gray-900">Email:</strong>{" "}
            {userDetails.email}
          </p>
          <p>
            <strong className="font-medium text-gray-900">Role:</strong>{" "}
            {userDetails.role}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition duration-200 shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  );
  }
  return <></>;
};