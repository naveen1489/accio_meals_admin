import React, { useEffect, useState } from "react";
import styles from "../../Styles/AddPartners.module.css";
import { Button, Input, Upload, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { PiImageLight } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import axios from "axios";
import { addPartners } from "../../api/partners/addPartners";
import { useAlert } from "../../Context/AlertContext";

const AddPartners = ({ isOpen, onClose, isPopupOpen }) => {
  const { showAlert } = useAlert();
  const { Option } = Select;
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
    } 
                        ${
                          name === "addressLine2"
                            ? value
                            : formData.addressLine2
                        }`.trim();

    if (fullAddress.length > 5) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              address: fullAddress,
              key: `${import.meta.env.VITE_APP_GOOGLE_API_KEY}`,
            },
          }
        );

        if (response.data.results.length > 0) {
          const result = response.data.results[0];
          const location = result.geometry.location;
          const addressComponents = result.address_components;

          let city = "",
            state = "",
            country = "",
            postalCode = "",
            address1 = "",
            address2 = "";

          addressComponents.forEach((component) => {
            if (component.types.includes("locality"))
              city = component.long_name;
            if (component.types.includes("administrative_area_level_1"))
              state = component.long_name;
            if (component.types.includes("country"))
              country = component.long_name;
            if (component.types.includes("postal_code"))
              postalCode = component.long_name;
            if (component.types.includes("street_number"))
              address1 = component.long_name;
            if (component.types.includes("route"))
              address2 = component.long_name;
          });

          setFormData((prev) => ({
            ...prev,
            addressLine1: address1 || prev.addressLine1,
            addressLine2: address2 || prev.addressLine2,
            latitude: location.lat,
            longitude: location.lng,
            city,
            state,
            country,
            postalCode,
          }));
        }
      } catch (error) {
        console.error(
          "Geocoding API Error:",
          error.response?.data || error.message
        );
      }
    }
  };

  const extractPostalCode = (address) => {
    const postalCodeMatch = address.match(/\b\d{6}\b/);
    return postalCodeMatch ? postalCodeMatch[0] : "";
  };

  const handleSave = async () => {
    const postalCode = extractPostalCode(formData.addressLine1);

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
      postalCode: postalCode,
      country: formData.country,
      latitude: formData.latitude,
      longitude: formData.longitude,
    };

    try {
      const response = await addPartners(payload);
      console.log('response', response)
      if (response && response.status === 201) {
        console.log("Attempting to show success alert");
        showAlert("success", response.message || "Partner added successfully");
        onClose();
      } else {
        showAlert("error", response.message || "Failed to add partner");
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
      showAlert("error", error.response?.data?.message || "An unexpected error occurred");
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
            <Upload className={styles.uploadBox}>
              <div className={styles.uploadContent}>
                <PiImageLight fontSize={"2.5rem"} />
                <p>
                  <MdOutlineModeEdit fontSize={"1rem"} /> Upload Restaurant
                  Image
                </p>
              </div>
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
