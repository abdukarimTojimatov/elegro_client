import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_RAW_MATERIAL } from "../graphql/mutations/rawMaterial.mutation"; // Import the create mutation
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateRawMaterialPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rawMaterialName: "",
    rawMaterialDescription: "",
    rawMaterialQuantity: 0,
    customerName: "",
    phoneNumber: "",
    unitOfMeasurement: "",
    rawMaterialCategory: "",
    rawMaterialPrice: 0,
  });

  const [createRawMaterial, { loading }] = useMutation(CREATE_RAW_MATERIAL, {
    onCompleted: () => {
      toast.success("Raw material created successfully");
      navigate("/rawMaterial");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRawMaterial({
      variables: { input: formData },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Parse quantity and price as floats
    if (name === "rawMaterialQuantity" || name === "rawMaterialPrice") {
      setFormData({ ...formData, [name]: parseFloat(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form
      className="w-full max-w-2xl flex flex-col gap-6 px-3 mx-auto"
      onSubmit={handleSubmit}
    >
      {/* Raw Material Name */}
      <div className="flex flex-col gap-2">
        <label
          className="block uppercase tracking-wide text-white text-sm font-bold"
          htmlFor="rawMaterialName"
        >
          Xom ashyo nomi
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="rawMaterialName"
          name="rawMaterialName"
          type="text"
          placeholder="Xom ashyo nomini kiriting"
          value={formData.rawMaterialName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label
          className="block uppercase tracking-wide text-white text-sm font-bold"
          htmlFor="rawMaterialDescription"
        >
          Ta'rif
        </label>
        <textarea
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="rawMaterialDescription"
          name="rawMaterialDescription"
          placeholder="Xom ashyo haqida ta'rif yozing"
          value={formData.rawMaterialDescription}
          onChange={handleChange}
          required
        />
      </div>

      {/* Quantity and Price */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            className="block uppercase tracking-wide text-white text-sm font-bold mb-2"
            htmlFor="rawMaterialQuantity"
          >
            Miqdori
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="rawMaterialQuantity"
            name="rawMaterialQuantity"
            type="number"
            placeholder="Miqdor kiriting"
            value={formData.rawMaterialQuantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <label
            className="block uppercase tracking-wide text-white text-sm font-bold mb-2"
            htmlFor="rawMaterialPrice"
          >
            Narxi
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="rawMaterialPrice"
            name="rawMaterialPrice"
            type="number"
            placeholder="Narx kiriting"
            value={formData.rawMaterialPrice}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Customer Name and Phone Number */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            className="block uppercase tracking-wide text-white text-sm font-bold mb-2"
            htmlFor="customerName"
          >
            Mijoz nomi
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="customerName"
            name="customerName"
            type="text"
            placeholder="Mijoz nomini kiriting"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <label
            className="block uppercase tracking-wide text-white text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Telefon raqami
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="Telefon raqamini kiriting"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Unit of Measurement */}
      <div className="flex flex-col gap-2">
        <label
          className="block uppercase tracking-wide text-white text-sm font-bold"
          htmlFor="unitOfMeasurement"
        >
          O'lchov birligi
        </label>
        <select
          className="block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="unitOfMeasurement"
          name="unitOfMeasurement"
          value={formData.unitOfMeasurement}
          onChange={handleChange}
          required
        >
          <option value="">Tanlang</option>
          <option value="kg">Kilogram</option>
          <option value="gr">Gramm</option>
          <option value="meter">Metr</option>
          <option value="dona">Dona</option>
          <option value="liter">Liter</option>
          <option value="qop">Qop</option>
          <option value="metrkv">Metr kvadrat</option>
        </select>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <label
          className="block uppercase tracking-wide text-white text-sm font-bold"
          htmlFor="rawMaterialCategory"
        >
          Kategoriya
        </label>
        <select
          className="block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="rawMaterialCategory"
          name="rawMaterialCategory"
          value={formData.rawMaterialCategory}
          onChange={handleChange}
          required
        >
          <option value="">Tanlang</option>
          <option value="Machalka">Machalka</option>
          <option value="Mehanizm">Mehanizm</option>
          <option value="Kraska">Kraska</option>
          <option value="Temir">Temir</option>
          <option value="Material">Material</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        className="w-full py-3 px-4 rounded bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold disabled:opacity-70 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading..." : "Xom ashyo qo'shish"}
      </button>
    </form>
  );
};

export default CreateRawMaterialPage;
