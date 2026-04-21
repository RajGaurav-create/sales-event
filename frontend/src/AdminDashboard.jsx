import React,{useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Footer} from './Footer'
import Logo from './logo.png'
import CustomModel from "./CustomModel";

function AdminDashboard() {
    const navigate = useNavigate();
    const[modelType, setModelType] = useState(null);
    const[modelData, setModelData] = useState(null);
    const[response, setResponse] = useState(null);

    const cartData = [
        {
            title: "Add Product",
            description: "Create and manage new product listings with validation",
            team: "Product Management",
            modelType: "addProduct",
        },
        {
            title: "Delete Product",
            description: "Remove products from inventory system",
            team: "Product Management",
            modelType: "deleteProduct",
        },
        {
            title: "Modify User",
            description: "Update user details and manage roles",
            team: "User Management",
            modelType: "modifyUser",
        },
        {
            title: "View User Details",
            description: "Fetch and display details of a specific user",
            team: "User Management",
            modelType: "viewUser",
        },
        {
            title: "Monthly Business",
            description: "View revenue metrics for specific months",
            team: "Analytics",
            modelType: "monthlyBusiness",
        },
        {
            title: "Yearly Business",
            description: "Analyze annual revenue performance",
            team: "Analytics",
            modelType: "yearlyBusiness",
        },
        {
            title: "Overall Business",
            description: "View total revenue since inception",
            team: "Analytics",
            modelType: "overallBusiness",
        },
    ];
    const handleLogout = async() => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/logout",{
                method:"POST",
                credentials: "include",
            });

            if(response.ok){
                console.log("User successfully logged out");
                navigate("/admin");
            } else {
                console.error("Failed to log out");
            }
        }catch(err){
            console.log("Error during logout: ", err);
        }
    };

    const handleAddProductSubmit = async (productData) => {
        try{
            const response = await fetch("http://localhost:8080/admin/products/add", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });
            const data = await response.json();
            setResponse({product: data, imageUrl: productData.imageUrl});
            setModelType("addProduct");
         } catch (error) {
            console.log("Error adding product: ", error);
         }
    };

    const handleDeleteProductSubmit = async ({productId}) => {
        try{
            const response = await fetch("http://localhost:8080/admin/products/delete",{
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({productId}),
            });
            console.log("response:", response);
            if(response.ok){
                setResponse({message:"Delete Success"});
            }else{
                const errorMesssage = await response.text();
                setResponse({message: `Error: ${errorMesssage}`});
            }
        }catch (err){
            console.error("Error deleting product:",err);
        }
    };

    const handleViewUserSubmit = async ({userId}) => {
        try{
            const response = await fetch(`http://localhost:8080/admin/user/${userId}`, {
                method: "GET",
                credentials: "include",
               });
            if(response.ok){
                const data = await response.json();
                setResponse({user:data});
                setModelType("response");
            } else {
                const errorMesssage = await response.text();
                setResponse({message: `Error: ${errorMesssage}`});
                setModelType("response");
            }
        }catch(error){
            setResponse({message: "Error: Something went wrong"});
            setModelType("response");
        }
    };

    const handleModifyUserSubmit = async (data) => {
    if (!data.username) {
      // Fetch user details
      try {
        console.log("Fetching user details for ID:", data.userId); // Debugging
        const response = await fetch(
          "http://localhost:8080/admin/user/getbyid",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: data.userId }), // Ensure userId is correctly passed
          }
        );
        if (response.ok) {
          const userDetails = await response.json();
          setResponse({ user: userDetails });
          setModelType("modifyUser");
        } else {
          const error = await response.text();
          setResponse({ message: `Error: ${error}` });
          setModelType("response");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setResponse({ message: "Error: Something went wrong" });
        setModelType("response");
      }
    } else {
      // Update user details
      try {
        console.log("Updating user details:", data); // Debugging
        const response = await fetch(
          "http://localhost:8080/admin/user/modify",
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Ensure the full payload is sent
          }
        );
        if (response.ok) {
          const updatedUser = await response.json();
          setResponse({ user: updatedUser });
          setModelType("response");
        } else {
          const error = await response.text();
          setResponse({ message: `Error: ${error}` });
          setModelType("response");
        }
      } catch (error) {
        console.error("Error updating user details:", error);
        setResponse({ message: "Error: Something went wrong" });
        setModelType("response");
      }
    }
  };

const handleMonthlyBusiness = async (data) => {
    try{
        const response = await fetch(`http://localhost:8080/admin/business/monthly?month=${data?.month}&year=${data?.year}`,{
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(response.ok){
            const data = await response.json();
            setResponse({monthlyBusiness: data});
            setModelType("monthlyBusiness");
        }else{
            const errorMessage = await response.text();
            setResponse({message: `Error: ${errorMessage}`});
            setModelType("monthlyBusiness");
        }
    }catch (error){
        console.error("Error fetching user details:", error);
        setResponse({message: "Error: something went wrong"});
        setModelType("response");
    }
};

  const handleDailyBusiness = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/business/daily?date=${data?.date}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setResponse({ dailyBusiness: data });
        setModelType("dailyBusiness");
      } else {
        const errorMessage = await response.text();
        setResponse({ message: `Error: ${errorMessage}` });
        setModelType("dailyBusiness");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setResponse({ message: "Error: Something went wrong" });
      setModelType("dailyBusiness");
    }
  };

  const handleYearlyBusiness = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/business/yearly?year=${data?.year}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setResponse({ yearlyBusiness: data });
        setModelType("yearlyBusiness");
      } else {
        const errorMessage = await response.text();
        setResponse({ message: `Error: ${errorMessage}` });
        setModelType("yearlyBusiness");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setResponse({ message: "Error: Something went wrong" });
      setModelType("yearlyBusiness");
    }
  };

  const handleOverallBusiness = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/business/overall`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setResponse({ overallBusiness: data });
        setModelType("overallBusiness");
      } else {
        const errorMessage = await response.text();
        setResponse({ message: `Error: ${errorMessage}` });
        setModelType("overallBusiness");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setResponse({ message: "Error: Something went wrong" });
      setModelType("overallBusiness");
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800">
  
  {/* Header */}
  <header className="sticky top-0 z-50 flex items-center justify-between
                     bg-white/80 backdrop-blur-md
                     px-4 sm:px-6 py-4
                     shadow-md border-b border-slate-200">
    
    <img
      src={Logo}
      alt="Logo"
      className="h-9 w-auto cursor-pointer transition-transform duration-200 hover:scale-105"
    />

    <div className="flex items-center gap-4">
      <span className="hidden sm:block text-sm font-semibold text-slate-700">
        Admin
      </span>

      <button
        onClick={handleLogout}
        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white
                   shadow-sm transition-all duration-200
                   hover:bg-red-600 hover:shadow-md
                   focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Logout
      </button>
    </div>
  </header>

  {/* Main Content */}
  <main className="p-4 sm:p-6 lg:p-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      
      {cartData.map((card, index) => (
        <div
          key={index}
          onClick={() => {
            console.log("Clicked:", card.modelType)
            setModelType(card.modelType);
            setModelData(null);
          }}
          className="cursor-pointer rounded-2xl bg-white
                     border border-slate-200
                     shadow-sm transition-all duration-300
                     hover:-translate-y-1 hover:shadow-lg
                     active:scale-95"
        >
          <div className="p-5 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-slate-800">
              {card.title}
            </h3>

            <p className="text-sm text-slate-600 line-clamp-2">
              {card.description}
            </p>

            <span className="mt-2 inline-block w-fit rounded-full
                             bg-indigo-100 px-3 py-1
                             text-xs font-medium text-indigo-700">
              Team: {card.team}
            </span>
          </div>
        </div>
      ))}

    </div>
  </main>
      {/* Footer */}
      <Footer />

      {/* Modal */}
      {modelType && (
        <CustomModel
          modalType={modelType}
          onClose={() => {
            setModelType(null);
            setResponse(null);
          }}
          onSubmit={(data) => {
            switch (modelType) {
              case "addProduct":
                handleAddProductSubmit(data);
                break;
              case "deleteProduct":
                handleDeleteProductSubmit(data);
                break;
              case "viewUser":
                handleViewUserSubmit(data);
                break;
              case "modifyUser":
                handleModifyUserSubmit(data);
                break;
              case "monthlyBusiness":
                handleMonthlyBusiness(data);
                break;
              case "dailyBusiness":
                handleDailyBusiness(data);
                break;
              case "yearlyBusiness":
                handleYearlyBusiness(data);
                break;
              case "overallBusiness":
                handleOverallBusiness();
                break;

              // Add more cases here as needed
              default:
                break;
            }
          }}
          response={response}
        />
      )}
    </div>
  );
};

export default AdminDashboard;