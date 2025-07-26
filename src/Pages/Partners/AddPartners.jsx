import React, { useEffect, useState } from "react";
import styles from "../../Styles/AddPartners.module.css";
import { Button, Input, Upload, Select, Spin } from "antd";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { PiImageLight } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import axios from "axios";
import { addPartners } from "../../api/partners/addPartners";
import { useAlert } from "../../Context/AlertContext";
import { useData } from "../../Context/DataProvider";
import { validateField, validateForm } from "../../Utils/validation";
import { uploadImage } from "../../api/Uploads/fileImg";

const GOOGLE_MAPS_API_URL = import.meta.env.VITE_APP_GOOGLE_MAPS_API_URL;
const GOOGLE_API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const AddPartners = ({ isOpen, onClose }) => {
  const { showAlert } = useAlert();
  const { Option } = Select;
  const { handleGetAllPartnersData } = useData();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
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
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.suggestionsContainer}`) &&
        !event.target.closest('input[name="addressLine1"]')) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    let city = "", state = "", country = "", postalCode = "";

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
      addressLine1: suggestion.description,
      latitude: suggestion.location.lat,
      longitude: suggestion.location.lng,
      city,
      state,
      country,
      postalCode,
    }));

    setShowSuggestions(false);
    setAddressSuggestions([]);
  };

  const handleAddressChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "addressLine1") {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      const newTimeout = setTimeout(() => {
        fetchAddressSuggestions(value);
      }, 300);

      setDebounceTimeout(newTimeout);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFormValid = validateForm(formData, errors);

  const handleImageUpload = (file) => {
    setIsUploadingImage(true);
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
        setIsUploadingImage(false);
      });
    return false;
  };

  const handleSave = async () => {
    if (!isFormValid) return;
    if (!formData.latitude || !formData.longitude) {
      showAlert(
        "error",
        "Please provide a valid address to fetch location coordinates."
      );
      return;
    }

    setIsSaving(true);
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
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay}
    // onClick={handleOverlayClick}
    >
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
              // onBlur={handleBlur}
              />
              {errors.companyName && (
                <p className={styles.errorText}>{errors.companyName}</p>
              )}
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
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}
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
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setFormData((prev) => ({ ...prev, contactNumber: value }));
                    if (value.length === 10) {
                      setErrors((prev) => ({ ...prev, contactNumber: "" }));
                    }
                  }}
                  onBlur={handleBlur}
                  type="number"
                />
              </div>
              {touched.contactNumber && errors.contactNumber && (
                <p className={styles.errorText}>{errors.contactNumber}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Email Id</label>
              <Input
                name="emailId"
                placeholder="Enter email id"
                className={styles.inputField}
                value={formData.emailId}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prev) => ({ ...prev, emailId: value }));
                  if (!validateField("emailId", value)) {
                    setErrors((prev) => ({ ...prev, emailId: "" }));
                  }
                }}
                onBlur={handleBlur}
                type="email"
              />
              {touched.emailId && errors.emailId && (
                <p className={styles.errorText}>{errors.emailId}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Address</label>
              <div style={{ position: "relative" }}>
                <Input
                  name="addressLine1"
                  placeholder="address line"
                  className={styles.inputField}
                  value={formData.addressLine1}
                  onChange={handleAddressChange}
                  onBlur={handleBlur}
                  onFocus={() => {
                    if (formData.addressLine1 && addressSuggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                />
                {showSuggestions && (
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
              {errors.addressLine1 && (
                <p className={styles.errorText}>{errors.addressLine1}</p>
              )}
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
              beforeUpload={handleImageUpload}
              showUploadList={false}
              action=""
            >
              {formData.imageUrl ? (
                <img
                  src={`https://cdn.blinkdish.com/${formData.imageUrl}`}
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
                  {isUploadingImage ? (
                    <Spin size="large" />
                  ) : (
                    <>
                      <PiImageLight fontSize={"2.5rem"} />
                      <p>
                        <MdOutlineModeEdit fontSize={"1rem"} /> Upload Restaurant Image
                      </p>
                    </>
                  )}
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
            disabled={!isFormValid || isSaving}
          >
            {isSaving ? (
              <>
                Save & Add Partner{" "}
                <Spin
                  indicator={<LoadingOutlined style={{ color: "red" }} spin />}
                />
              </>
            ) : (
              "Save & Add Partner"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPartners;
