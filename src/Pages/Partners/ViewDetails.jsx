import React, { useState, useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styles from "../../Styles/AddPartners.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input, message, Upload } from "antd";
import { editPartners } from "../../api/partners/getPartners";
import { useAlert } from "../../Context/AlertContext";
import { useData } from "../../Context/DataProvider";
import { FALLBACK_IMAGE_URL } from "../../api/Uploads/fileImg";
import axios from "axios";

const GOOGLE_MAPS_API_URL = import.meta.env.VITE_APP_GOOGLE_MAPS_API_URL;
const GOOGLE_API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const ViewDetails = ({ onClose, restaurant, isEditable }) => {
  const { showAlert } = useAlert();
  const { handleGetAllPartnersData } = useData();
  if (!restaurant) return null;

  // State to manage editable fields
  const [formData, setFormData] = useState({
    companyName: restaurant.companyName || "",
    name: restaurant.name || "",
    contactNumber: restaurant.contactNumber || "",
    emailId: restaurant.emailId || "",
    address: `${restaurant.addressLine1 || ""}, ${restaurant.city || ""} - ${
      restaurant.postalCode || ""
    }`,
    imageUrl: restaurant.imageUrl || "",
    // Store parsed address components
    addressLine1: restaurant.addressLine1 || "",
    city: restaurant.city || "",
    state: restaurant.state || "",
    postalCode: restaurant.postalCode || "",
    country: restaurant.country || "",
  });
  const [imgUploading, setImgUploading] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.suggestionsContainer}`) &&
        !event.target.closest('input[name="address"]')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  // Function to fetch address suggestions
  const fetchAddressSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setAddressSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const response = await axios.get(GOOGLE_MAPS_API_URL, {
        params: {
          address: query,
          key: GOOGLE_API_KEY,
          components: 'country:IN',
          region: 'IN',
        },
      });

      if (response.data.status === "OK" && response.data.results.length > 0) {
        const suggestions = response.data.results.slice(0, 5).map((result) => ({
          description: result.formatted_address,
          place_id: result.place_id,
          location: result.geometry.location,
          address_components: result.address_components,
        }));
        setAddressSuggestions(suggestions);
        setShowSuggestions(true);
      } else {
        setAddressSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      setAddressSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Function to handle address suggestion selection
  const handleAddressSelection = (suggestion) => {
    const addressComponents = suggestion.address_components;
    let streetNumber = "", route = "", sublocality = "", sublocalityLevel2 = "", locality = "", 
        city = "", state = "", country = "", postalCode = "";

    // Parse address components with priority handling
    addressComponents.forEach((component) => {
      const types = component.types;
      
      // Street number (building number)
      if (types.includes("street_number")) {
        streetNumber = component.long_name;
      }
      
      // Route (street name)
      if (types.includes("route")) {
        route = component.long_name;
      }
      
      if (types.includes("sublocality_level_2")) {
        sublocalityLevel2 = component.long_name;
      }
      
      if (types.includes("sublocality") || types.includes("sublocality_level_1")) {
        sublocality = component.long_name;
      }
      
      if (types.includes("locality")) {
        locality = component.long_name;
      }
      
      if (types.includes("administrative_area_level_2") && !locality) {
        city = component.long_name;
      }
      
      if (types.includes("administrative_area_level_1")) {
        state = component.long_name;
      }
      
      // Country
      if (types.includes("country")) {
        country = component.long_name;
      }
      
      // Postal code
      if (types.includes("postal_code")) {
        postalCode = component.long_name;
      }
    });

    // Determine the best city value
    const finalCity = locality || city;
    
    // Create a comprehensive address line from all street/area components
    const addressParts = [streetNumber, route, sublocalityLevel2, sublocality].filter(Boolean);
    const cleanAddressLine1 = addressParts.length > 0 ? addressParts.join(", ") : suggestion.description.split(",")[0];
    
    setFormData((prev) => ({
      ...prev,
      address: suggestion.description,
      addressLine1: cleanAddressLine1,
      city: finalCity,
      state: state,
      postalCode: postalCode,
      country: country,
    }));

    setShowSuggestions(false);
    setAddressSuggestions([]);
  };

  const handleAddressChange = (value) => {
    handleInputChange("address", value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const newTimeout = setTimeout(() => {
      fetchAddressSuggestions(value);
    }, 300);

    setDebounceTimeout(newTimeout);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (file) => {
    setImgUploading(true);
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    // File size validation
    if (file.size > MAX_FILE_SIZE) {
      showAlert("error", "File size exceeds the 5MB limit.");
      return false;
    }
    // File type validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      showAlert("error", "Please upload only image files (JPEG, PNG, GIF).");
      return false;
    }
    const newFormData = new FormData();
    newFormData.append("file", file);
    import("../../api/Uploads/fileImg").then(({ uploadImage }) => {
      uploadImage(newFormData)
        .then((response) => {
          if (response && response?.data?.file) {
            setFormData((prev) => ({ ...prev, imageUrl: response.data.file }));
            showAlert("success", "Image uploaded successfully!");
          } else {
            console.error("No image URL in response:", response);
            showAlert("error", "Failed to upload image. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Image upload error:", error);
          if (error.response) {
            const errorMessage = error.response.data?.message || "Server error occurred during upload.";
            showAlert("error", errorMessage);
          } else if (error.request) {
            showAlert("error", "Network error. Please check your connection.");
          } else {
            showAlert("error", "Failed to upload image. Please try again.");
          }
        })
        .finally(() => {
          setImgUploading(false);
        });
    });
    return false;
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        companyName: formData.companyName,
        name: formData.name,
        contactNumber: formData.contactNumber,
        emailId: formData.emailId,
        addressLine1: formData.addressLine1 || formData.address.split(",")[0].trim(),
        city: formData.city || formData.address.split(",")[1]?.trim().split("-")[0]?.trim() || "",
        state: formData.state || "",
        postalCode: formData.postalCode || formData.address.split("-")[1]?.trim() || "",
        country: formData.country || "India",
        imageUrl: formData.imageUrl,
      };

      const response = await editPartners(restaurant.id, updatedData);
      if (response.status === 200) {
        showAlert("success", response.data.message);
        handleGetAllPartnersData();
        onClose(response.data); 
      } else {
        showAlert("error", response.data.message);
      }
    } catch (error) {
      message.error("Failed to update partner details.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer} style={{ width: "30rem", height: "auto" }}>
        <div className={styles.modalHeader}>
          <CloseOutlined className={styles.closeIcon} onClick={onClose} />
        </div>

        <div className={styles.modal_info}>
          <div style={{ position: "relative", width: "120px", margin: "0 auto" }}>
            <Upload
              beforeUpload={handleImageUpload}
              showUploadList={false}
              className={styles.uploadBox}
            >
              {formData.imageUrl ? (
                <>
                  <img
                    src={`https://cdn.blinkdish.com/${formData.imageUrl}`}
                    alt="Restaurant"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      width: "120px",
                      height: "120px"
                    }}
                  />
                  {isEditable && !imgUploading && (
                    <span style={{
                      position: "absolute",
                      top: "8px",
                      left: "88px",
                      background: "#fff",
                      borderRadius: "50%",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      padding: "6px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <EditOutlined style={{ fontSize: "20px", color: "#333" }} />
                    </span>
                  )}
                  {imgUploading && (
                    <span style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "rgba(255,255,255,0.7)",
                      borderRadius: "50%",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Spin size="large" />
                    </span>
                  )}
                </>
              ) : (
                <div className={styles.uploadContent}>
                  <img src={FALLBACK_IMAGE_URL} alt="default image" />
                  {isEditable && !imgUploading && (
                    <span style={{
                      position: "absolute",
                      top: "8px",
                      left: "88px",
                      background: "#fff",
                      borderRadius: "50%",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      padding: "6px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <EditOutlined style={{ fontSize: "20px", color: "#333" }} />
                    </span>
                  )}
                  {imgUploading && (
                    <span style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "rgba(255,255,255,0.7)",
                      borderRadius: "50%",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Spin size="large" />
                    </span>
                  )}
                </div>
              )}
            </Upload>
          </div>
          <div>
            <div className={styles.inputGroup}>
              <label>Company Name</label>
              <Input
                value={formData.companyName}
                className={styles.inputField}
                readOnly={!isEditable}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Name</label>
              <Input
                value={formData.name}
                className={styles.inputField}
                readOnly={!isEditable}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.details}>
          <h3>Personal Details</h3>
          <div className={styles.inputGroup}>
            <label>Contact No.</label>
            <Input
              value={formData.contactNumber}
              className={styles.inputField}
              readOnly={!isEditable}
              onChange={(e) =>
                handleInputChange("contactNumber", e.target.value)
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Email ID</label>
            <Input
              value={formData.emailId}
              className={styles.inputField}
              readOnly={!isEditable}
              onChange={(e) => handleInputChange("emailId", e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Address</label>
            <div style={{ position: "relative" }}>
              <Input
                name="address"
                value={formData.address}
                className={styles.inputField}
                readOnly={!isEditable}
                onChange={(e) => handleAddressChange(e.target.value)}
                onFocus={() => {
                  if (formData.address && addressSuggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
              />
              {showSuggestions && isEditable && (
                <div className={styles.suggestionsContainer}>
                  {isLoadingSuggestions ? (
                    <div className={styles.suggestionItem}>
                      <Spin size="small" /> Loading suggestions...
                    </div>
                  ) : (
                    addressSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className={styles.suggestionItem}
                        onClick={() => handleAddressSelection(suggestion)}
                      >
                        {suggestion.description}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {isEditable && (
          <div className={styles.modalFooter}>
            <Button
              type="primary"
              className={styles.saveButton}
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDetails;
