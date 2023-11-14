import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import CustomInput from "../../../components/CustomInput";
import IdVerificationMethod from "./idVerificationMethod/IdVerificationMethod";
import Toast from "./toast/Toast";
import http from "../../../api/http";
import useAuth from "../../../hooks/useAuth";
import { updateUser } from "../../../context/reducers/userReducer";
import Layout from "../../Layout";
import { Avatar, Stack, IconButton, Button } from "@mui/material";
import { AiOutlineCamera } from "react-icons/ai";
import { useCtx } from "../../../context";
import { useDispatch } from "react-redux";
import { BsLink45Deg } from "react-icons/bs";
import { CLIENT_ORIGIN } from "../../../config/constants";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { StyledLink } from "../../../styled";

const defaultFormData = {
  firstname: "",
  lastname: "",
  line1: "",
  line2: "",
  zipCode: "",
  country: ""
};

const Profile = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { setSnackBar, handleAutoResendToken } = useCtx();

  const { currentUser } = useAuth();

  const [formData, setFormData] = useState(defaultFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [photoUrl, setPhotoUrl] = useState(currentUser.photoUrl);

  const [kyc, setKyc] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let v;

    for (const key in currentUser.kycIds) {
      const obj = currentUser.kycIds[key] || {};

      if (obj.status === "confirmed" || obj.status === "rejected") {
        v = v.status;
        break;
      }
    }

    if (!v) {
      for (const key in currentUser.kycDocs) {
        const obj = currentUser.kycDocs[key] || {};
        if (obj.status === "confirmed" || obj.status === "rejected") {
          v = v.status;
          break;
        }
      }
    }

    if (!v) v = "rejected";

    setKyc(v);
  }, [currentUser.kycIds, currentUser.kycDocs]);

  useEffect(() => {
    if (formData.avatar) {
      const url = URL.createObjectURL(formData.avatar);
      setPhotoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [formData]);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const { id } = currentUser;

  const handleInputChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (file) setFormData(data => ({ ...data, avatar: file }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const _formData = new FormData();

      for (const key in formData) {
        const v = formData[key];

        if (!v) continue;

        switch (key) {
          case "line1":
          case "line2":
          case "zipCode":
            _formData.set(`address[${key}]`, v);
            break;
          default:
            _formData.set(key, v);
            break;
        }
      }

      const response = await http.put(`/users/${id}`, _formData, {
        withCredentials: true
      });

      if (!response.success) throw response;

      console.log("Data sent successfully", response);
      handleSuccess(response.data);
    } catch (error) {
      console.error("An error occurred:", error.message);
      setSnackBar(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [swap, setSwap] = useState(false);
  const [swap1, setSwap1] = useState(false);

  const handleSwap = () => {
    setSwap(swap);
    setSwap1(!swap1);
    setIsSuccessModalOpen(false);
  };

  const handleSuccess = user => {
    setFormData(defaultFormData);
    dispatch(updateUser(user));
    setSwap(!swap);
    setIsSuccessModalOpen(!isSuccessModalOpen);
  };

  const resetPhotoUrl = () => {
    setPhotoUrl(currentUser.photoUrl);
    setFormData(data => {
      delete data.avatar;
      return { ...data };
    });
  };

  const avatarSize = isMobile ? "75px" : "150px";

  const fileId = "avatar-id";
  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(
      `${CLIENT_ORIGIN}/auth/signup?ref=${
        currentUser.referralCode
      }&u=${encodeURIComponent(
        `${currentUser.username || currentUser.fullname}`
      )}`
    );
    setSnackBar({
      message: "Refferal link copied to clipboard",
      severity: "success",
      autoHideDuration: 2000
    });
  };

  return (
    <Layout>
      {!swap && (
        <div className={`ct ${styles.main_cont}`} id="ct">
          <div className={styles.personal_cont}>
            <Stack>
              <div>
                {currentUser.accountExpires ? (
                  <StyledLink
                    onClick={handleAutoResendToken}
                    to={`/auth/token-verification/account/${currentUser.id}`}
                    sx={{
                      color: "error.main",
                      fontSize: "16px",
                      display: "inline-block"
                    }}
                  >
                    Verify account
                  </StyledLink>
                ) : null}
                <p style={{ margin: 0 }}>Investor Profile and information</p>
              </div>
              {
                {
                  rejected: (
                    <StyledLink
                      id="link-id"
                      sx={{ color: "#000" }}
                      to="/idVerificatonMethod/IdVerificationMethod"
                    >
                      Verify your identity
                    </StyledLink>
                  ),
                  confirmed: <p>Identity verified</p>
                }[kyc]
              }
            </Stack>
          </div>
          <Stack
            component="form"
            justifyContent="center"
            onSubmit={handleSubmit}
          >
            <div>
              <div className={styles.personal_info_cont}>
                <Stack
                  justifyContent="center"
                  sx={{
                    my: 3,
                    maxWidth: avatarSize,
                    mx: "auto",
                    div: {
                      maxWidth: "inherit"
                    }
                  }}
                >
                  <div>
                    <div
                      style={{
                        position: "relative"
                      }}
                    >
                      <Avatar
                        sx={{
                          width: avatarSize,
                          height: avatarSize,
                          border: "2px solid currentColor",
                          borderColor: "divider"
                        }}
                        src={photoUrl}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: {
                            xs: "-10px",
                            s800: "0px"
                          },
                          right: {
                            xs: "5px",
                            s800: "15px"
                          },
                          backgroundColor: "grey.200",
                          "&:hover": {
                            backgroundColor: "grey.300"
                          },
                          cursor: isSubmitting ? "not-allowed" : "cursor"
                        }}
                        component="label"
                        htmlFor={fileId}
                      >
                        <AiOutlineCamera />
                      </IconButton>
                    </div>
                    {formData.avatar ? (
                      <Button
                        disabled={isSubmitting}
                        variant="outlined"
                        sx={{ display: "block", mt: 2, mx: "auto" }}
                        onClick={resetPhotoUrl}
                      >
                        Reset
                      </Button>
                    ) : null}

                    <input
                      multiple={false}
                      readOnly={isSubmitting}
                      type="file"
                      accept=".jpg,.jpeg,.png,.svg"
                      id={fileId}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </Stack>

                <Stack flexWrap="wrap-reverse" className={styles.rev_cont}>
                  <span
                    style={{
                      borderBottom: "3px solid rgba(240, 166, 23, 0.5)"
                    }}
                  >
                    Personal Information
                  </span>

                  <span
                    onClick={handleCopyReferralLink}
                    style={{
                      borderBottom: "3px solid rgba(240, 166, 23, 0.5)",
                      cursor: "pointer"
                    }}
                  >
                    Referral link
                    <BsLink45Deg
                      style={{
                        fontSize: "18px",
                        position: "relative",
                        top: "4px",
                        marginLeft: "5px"
                      }}
                    />
                  </span>
                </Stack>

                <div className={styles.input_cont}>
                  <div>
                    <CustomInput
                      readOnly={isSubmitting}
                      label="First Name"
                      name="firstname"
                      type="text"
                      sx={{
                        width: isMobile ? "300px" : "430px",
                        height: isMobile ? "30px" : "50px"
                      }}
                      value={formData.firstname || currentUser.firstname}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <CustomInput
                      readOnly={isSubmitting}
                      label="Surname"
                      name="lastname"
                      type="text"
                      sx={{
                        width: isMobile ? "300px" : "430px",
                        height: isMobile ? "30px" : "50px"
                      }}
                      defaultValue={formData.lastname || currentUser.lastname}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className={styles.input_cont}>
                  <div>
                    <CustomInput
                      readOnly={isSubmitting}
                      label="Username"
                      name="username"
                      type="text"
                      sx={{
                        width: isMobile ? "300px" : "430px",
                        height: isMobile ? "30px" : "50px"
                      }}
                      value={formData.username || currentUser.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <CustomInput
                      readOnly={isSubmitting}
                      label="Phone"
                      name="phone"
                      type="text"
                      sx={{
                        width: isMobile ? "300px" : "430px",
                        height: isMobile ? "30px" : "50px"
                      }}
                      defaultValue={formData.phone || currentUser.phone[0]}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.input_cont}>
                  <div>
                    {" "}
                    <CustomInput
                      readOnly={isSubmitting}
                      label="Address Line 1:"
                      name="line1"
                      type="text"
                      sx={{
                        width: isMobile ? "300px" : "430px",
                        height: isMobile ? "30px" : "50px"
                      }}
                      value={formData.line1 || currentUser.address.line1}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <CustomInput
                      readOnly={isSubmitting}
                      label="Address Line 2:"
                      name="line2"
                      type="text"
                      sx={{
                        width: isMobile ? "300px" : "430px",
                        height: isMobile ? "30px" : "50px"
                      }}
                      value={formData.line2 || currentUser.address.line2}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className={styles.input_cont}>
                  <div>
                    <CustomInput
                      readOnly={isSubmitting}
                      label="Postal Code/Zip code:"
                      name="zipCode"
                      type="text"
                      sx={{
                        width: isMobile ? "300px" : "430px",
                        height: isMobile ? "30px" : "50px"
                      }}
                      value={formData.zipCode || currentUser.address.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    {" "}
                    <CustomInput
                      readOnly={isSubmitting}
                      label="Country Of Residence"
                      name="country"
                      type="text"
                      sx={{
                        width: isMobile ? "300px" : "430px",
                        height: isMobile ? "30px" : "50px"
                      }}
                      value={
                        formData.country ||
                        currentUser.country ||
                        currentUser.address.country
                      }
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
                className={styles.btn}
              >
                Save
              </button>
            </div>
          </Stack>
        </div>
      )}
      {isSuccessModalOpen && (
        <Toast
          message="Congratulations, your profile has been saved"
          btnText="Proceed to KYC"
          closeModal={handleSwap}
        />
      )}
      {swap1 && <IdVerificationMethod />}
    </Layout>
  );
};

export default Profile;
