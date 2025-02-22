"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { HiDesktopComputer } from "react-icons/hi";
import { BiWorld } from "react-icons/bi";
import { MdEditLocationAlt } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdCurrencyExchange } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [domainAvailable, setDomainAvailable] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("Bangladesh");
  const [category, setCategory] = useState("Fashion");
  const [currency, setCurrency] = useState("BDT");

  useEffect(() => {
    axios
      .get("https://glore-bd-backend-node-mongo.vercel.app/api/product")
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data && typeof response.data === "object") {
          if (Array.isArray(response.data.data)) {
            setProducts(response.data.data);
          } else {
            setProducts([]);
            console.error("Unexpected API response format:", response.data);
          }
        } else {
          setProducts([]);
          console.error("Invalid data format for products:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, []);

  const checkDomain = async () => {
    try {
      const response = await axios.get(
        `https://interview-task-green.vercel.app/task/domains/check/${domain}.expressitbd.com`
      );
      setDomainAvailable(response.data.available);

      if (!response.data.available) {
        await axios.post(
          "https://interview-task-green.vercel.app/task/stores/create",
          {
            name: storeName,
            currency: currency,
            country: location,
            domain: domain,
            category: category,
            email: email,
          }
        );
      }
    } catch (error) {
      console.error("Error checking domain:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Create a Store</h1>
      <p className="mb-2">Add your basic store information and complete the setup</p>
      <hr className="my-4 border-t border-gray-300" />
      <div className="space-y-4">
        <div className="flex gap-2">
          <div>
            <div className="flex gap-2">
              <p className="">
                <HiDesktopComputer className="text-2xl text-blue-500" />
              </p>
              <h1>
                <span className="font-bold">Give Your Online Store a Name</span>
                <br />A great store name is a big part of your success. Make
                sure it aligns with your brand and products.
              </h1>
            </div>
          </div>
          <input
            type="text"
            placeholder="Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
        </div>
        <div className="flex gap-2">
          <div>
            <div className="flex gap-2">
              <p className="">
                <BiWorld className="text-2xl text-blue-500" />
              </p>
              <h1> <span className="font-bold">Your Online Store Subdomain<br /></span>
              A grate store name is a big part of your success.Make sure it
              aligns with your brand and products.
              </h1>
            </div>
            
          </div>
          <input
            type="text"
            placeholder="Enter your domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
        </div>
        <div className="flex gap-8">
        <div className="flex gap-2">
              <p className="">
                <MdEditLocationAlt className="text-2xl text-blue-500" />
              </p>
              <h1> <span className="font-bold">Where's Your store location<br /></span>
              set your store default location so we can optimize store access and speed for our customer
              </h1>
            </div>
            <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          <option value="Bangladesh">Bangladesh</option>
          {/* Add more options as needed */}
        </select>
        </div>
        <div className="flex gap-6">
        <div className="flex gap-2">
              <p className="">
                <MdCategory className="text-2xl text-blue-500" />
              </p>
              <h1> <span className="font-bold">What's your category<br /></span>
              set your store default category so we can optimize store access and speed for our customer
              </h1>
            </div>
            <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          <option value="Fashion">Fashion</option>
          {/* Add more options as needed */}
        </select>
        </div>
        <div className="flex gap-30">
        <div className="flex gap-2">
              <p className="">
                <MdCurrencyExchange className="text-2xl text-blue-500" />
              </p>
              <h1> <span className="font-bold">Chose store currency<br /></span>
              This is the main currency you wish to sell in
              </h1>
            </div>
            <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          <option value="BDT">BDT (Taka)</option>
          {/* Add more options as needed */}
        </select>
        </div>
        <div className="flex gap-12">
        <div className="flex gap-2">
              <p className="">
                <MdOutlineEmail className="text-2xl text-blue-500" />
              </p>
              <h1> <span className="font-bold">Store Contact email<br /></span>
              This is the email you'll use to sent notification to and receive order from customer
              </h1>
            </div>
            <input
          type="email"
          placeholder="Store contact email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        </div>
        
        
        
        
        <div className="flex justify-end">
  <button
    onClick={checkDomain}
    className="bg-blue-500 text-white p-2 rounded mb-4"
  >
    Create Store
  </button>
</div>
        {domainAvailable !== null && (
          <p className={domainAvailable ? "text-green-500" : "text-red-500"}>
            {domainAvailable
              ? "Domain is available"
              : "Domain is not available, store created"}
          </p>
        )}
      </div>

      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="border p-4 rounded shadow"
            >
              <Image
                src={product.images[0]?.secure_url || "/placeholder.jpg"}
                alt={product.name}
                width={150}
                height={150}
                className="mb-2"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.price} BDT</p>
            </Link>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}
