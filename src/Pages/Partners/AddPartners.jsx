import React, { useEffect, useState } from "react";
import styles from "../../Styles/AddPartners.module.css";
import { Button, Input, Upload, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { PiImageLight } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import axios from "axios";
import { addPartners } from "../../api/partners/addPartners";
import { useAlert } from "../../Context/AlertContext";
import { useData } from "../../Context/DataProvider";
import imageCompression from "browser-image-compression"; // Import the library

const GOOGLE_MAPS_API_URL = import.meta.env.VITE_APP_GOOGLE_MAPS_API_URL;
const GOOGLE_API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY; 

const AddPartners = ({ isOpen, onClose, isPopupOpen }) => {
  const { showAlert } = useAlert();
  const { Option } = Select;
  const { handleGetAllPartnersData } = useData();
  const [formData, setFormData] = useState({
    companyName: "",
    nameTitle: "Mr.",
    name: "",
    countryCode: "+91",
    contactNumber: "",
    emailId: "",
    status: "Active",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    latitude: null,
    longitude: null,
    imageUrl: "", 
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const fullAddress = `${
      name === "addressLine1" ? value : formData.addressLine1
    } ${name === "addressLine2" ? value : formData.addressLine2}`.trim();

    console.log("Full Address:", fullAddress);

    if (!fullAddress || fullAddress.length < 5) {
      console.error("Invalid address provided.");
      // showAlert("error", "Please provide a valid address.");
      return;
    }

    try {
      const response = await axios.get(GOOGLE_MAPS_API_URL, {
        params: {
          address: fullAddress,
          key: GOOGLE_API_KEY,
        },
      });

      if (response.data.status === "OK" && response.data.results.length > 0) {
        const result = response.data.results[0];
        const location = result.geometry.location;
        const addressComponents = result.address_components;

        let city = "",
          state = "",
          country = "",
          postalCode = "";

        addressComponents.forEach((component) => {
          if (component.types.includes("locality")) city = component.long_name;
          if (component.types.includes("administrative_area_level_1"))
            state = component.long_name;
          if (component.types.includes("country"))
            country = component.long_name;
          if (component.types.includes("postal_code"))
            postalCode = component.long_name;
        });

        setFormData((prev) => ({
          ...prev,
          latitude: location.lat,
          longitude: location.lng,
          city,
          state,
          country,
          postalCode,
        }));
      } else {
        console.error("No results found for the given address.");
        // showAlert("error", "Unable to fetch location. Please check the address.");
      }
    } catch (error) {
      console.error(
        "Geocoding API Error:",
        error.response?.data || error.message
      );
      showAlert("error", "Failed to fetch location. Please try again.");
    }
  };

  const extractPostalCode = (address) => {
    const postalCodeMatch = address.match(/\b\d{6}\b/);
    return postalCodeMatch ? postalCodeMatch[0] : "";
  };

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleImageUpload = async (file) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const options = {
      maxSizeMB: 1, // Compress to 1MB or less
      maxWidthOrHeight: 1024, // Resize to a maximum of 1024px width/height
      useWebWorker: true, // Use web workers for better performance
    };
  
    try {
      if (file.size > MAX_FILE_SIZE) {
        showAlert("error", "File size exceeds the 5MB limit.");
        return false; // Prevent upload
      }
  
      const compressedFile = await imageCompression(file, options); // Compress the image
      const reader = new FileReader();
  
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
        showAlert("success", "Image uploaded and compressed successfully!");
      };
  
      reader.onerror = () => {
        showAlert("error", "Failed to upload image. Please try again.");
      };
  
      reader.readAsDataURL(compressedFile); // Read the compressed file
    } catch (error) {
      console.error("Image compression error:", error);
      showAlert("error", "Failed to compress image. Please try again.");
    }
  
    return false; // Prevent default upload behavior
  };
  
  const handleSave = async () => {
    if (!formData.latitude || !formData.longitude) {
      showAlert(
        "error",
        "Please provide a valid address to fetch location coordinates."
      );
      return;
    }
  
    const payload = {
      companyName: formData.companyName,
      nameTitle: formData.nameTitle,
      name: formData.name,
      countryCode: formData.countryCode,
      contactNumber: formData.contactNumber,
      emailId: formData.emailId,
      status: formData.status,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
      latitude: formData.latitude,
      longitude: formData.longitude,
      imageUrl: formData.imageUrl,
    };
  
    try {
      const response = await addPartners(payload);
      if (response && response.status == 200) {
        showAlert("success", response.data.message);
        handleGetAllPartnersData();
        onClose();
      } else {
        showAlert("error", response.data.message);
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
  
      if (error.response && error.response.status === 400) {
        showAlert("error", error.response.data.message || "Bad Request");
      } else {
        showAlert(
          "error",
          error.response?.data?.message || "An unexpected error occurred"
        );
      }
    }
  };
  

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add Partner</h2>
          <CloseOutlined className={styles.closeIcon} onClick={onClose} />
        </div>
        <div className={styles.modalContent}>
          <div className={styles.leftSection}>
            <div className={styles.inputGroup}>
              <label>Company Name</label>
              <Input
                name="companyName"
                placeholder="Company Name"
                className={styles.inputField}
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Contact Person name</label>
              <div className={styles.inputRow}>
                <Select
                  style={{ width: "4rem" }}
                  className={styles.inputField}
                  value={formData.nameTitle}
                  onChange={(value) => handleSelectChange("nameTitle", value)}
                >
                  <Option value="Mr.">Mr.</Option>
                  <Option value="Mrs.">Mrs.</Option>
                </Select>
                <Input
                  name="name"
                  placeholder="Contact person name"
                  className={styles.inputField}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Contact No.</label>
              <div className={styles.inputRow}>
                <Select
                  style={{ width: "4rem" }}
                  className={styles.inputField}
                  value={formData.countryCode}
                  onChange={(value) => handleSelectChange("countryCode", value)}
                >
                  <Option value="+91">+91</Option>
                  <Option value="+11">+11</Option>
                </Select>
                <Input
                  name="contactNumber"
                  placeholder="Number"
                  className={styles.inputField}
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Email Id</label>
              <Input
                name="emailId"
                placeholder="Enter email id"
                className={styles.inputField}
                value={formData.emailId}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Address</label>
              <Input
                name="addressLine1"
                placeholder="address line"
                className={styles.inputField}
                value={formData.addressLine1}
                onChange={handleAddressChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Status</label>
              <Select
                style={{ width: "7.3rem" }}
                placeholder="Select"
                className={styles.inputField}
                value={formData.status}
                onChange={(value) => handleSelectChange("status", value)}
              >
                <Option value="Active">Active</Option>
                <Option value="Non-Active">Inactive</Option>
              </Select>
            </div>
          </div>
          <div className={styles.rightSection}>
            <Upload
              className={styles.uploadBox}
              beforeUpload={handleImageUpload} // Compress image before upload
              showUploadList={false}
            >
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="Uploaded"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <div className={styles.uploadContent}>
                  <PiImageLight fontSize={"2.5rem"} />
                  <p>
                    <MdOutlineModeEdit fontSize={"1rem"} /> Upload Restaurant
                    Image
                  </p>
                </div>
              )}
            </Upload>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button
            type="primary"
            className={styles.saveButton}
            onClick={handleSave}
          >
            Save & Add Partner
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPartners;
