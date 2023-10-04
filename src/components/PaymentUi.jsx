import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  AiFillApple,
  AiOutlineArrowLeft,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineCalendar,
} from "react-icons/ai";
import {
  BsChevronDown,
  BsCreditCardFill,
  BsFillCalendarDateFill,
} from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { countries } from "./api/ApiData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const initialState = {
  email: "coopergoldenhoit12@gmail.com",
  cardInput: "",
  cardExpiration: "",
  cardNumber: "",
  cardInput: "",
  cardCVC: "",
  cardName: "",
  billingAddress: "",
  selectedCountry: "",
  saveInfo: false, // Add a new state for the checkbox
};

const PaymentUi = () => {
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [startDate, setStartDate] = useState(null);
  const datePickerRef = useRef(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleCalenderIconClick = () => {
    datePickerRef.current?.onInputClick();
    console.log(datePickerRef.current);
  };

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };
  const handleDateChange = (date) => {};

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    arrows: false,
    fade: true,
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsModal(false);
      }
    }

    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleInputChange = (e) => {
    // e.preventDefault();
    const { name, value, type, checked } = e.target;

    setFormErrors({
      ...formErrors,
      [name]: "", // Clear the error for the current field
    });

    // Handle checkbox input separately
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name === "cardNumber") {
      // Remove any non-numeric characters from the input
      const numericValue = value.replace(/\D/g, "");

      // Check if the input exceeds 16 digits and show an error
      if (numericValue.length > 16) {
        setFormErrors({
          ...formErrors,
          cardNumber: "",
        });
      } else {
        setFormErrors({
          ...formErrors,
          cardNumber: "", // Clear the error if the input is valid
        });

        // Add a space after every 4 digits
        let formattedValue = "";
        for (let i = 0; i < numericValue.length; i++) {
          formattedValue += numericValue[i];
          if ((i + 1) % 4 === 0 && i !== numericValue.length - 1) {
            formattedValue += " ";
          }
        }

        setFormData({
          ...formData,
          [name]: formattedValue,
        });
        setFormErrors({
          ...formErrors,
          [name]: "", // Clear the error for the current field
        });
      }
    } else if (name === "cardExpiration") {
      // Remove any non-numeric characters from the input
      const numericValue = value.replace(/\D/g, "");

      // Add a slash automatically after entering two digits
      let formattedValue = numericValue;
      /* if (numericValue.length === 2 && !numericValue.includes('/')) {
                formattedValue += '/';
            } */
      if (formattedValue.length > 2) {
        formattedValue =
          formattedValue.substring(0, 2) + "/" + formattedValue.substring(2);
      }
      const [enteredMonthValue, enteredYear] = formattedValue.split("/");
      // Check if the input has a valid MM/YY format (without a leading zero in month)
      if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(formattedValue)) {
        /* setFormErrors({
                    ...formErrors,
                    cardExpiration: '', // Clear the error if the input is valid
                }); */
        const [enteredMonth, enteredYear] = formattedValue.split("/");
        const currentMonth = new Date().getMonth() + 1; // Current month (1-12)
        const currentYear = new Date().getFullYear() % 100; // Last two digits of current year
        // Convert enteredYear to a number
        const numericEnteredYear = parseInt(enteredYear, 10);

        // Check if the entered expiration date is earlier than the current month and year
        if (
          numericEnteredYear < currentYear ||
          (numericEnteredYear === currentYear &&
            parseInt(enteredMonth, 10) < currentMonth)
        ) {
          setFormErrors({
            ...formErrors,
            cardExpiration: "Your card has expired.",
          });
        } else {
          setFormErrors({
            ...formErrors,
            cardExpiration: "", // Clear the error if the input is valid
          });
        }

        setFormData({
          ...formData,
          [name]: formattedValue,
        });
        /* setFormErrors({
                    ...formErrors,
                    cardExpiration: '', // Clear the error if the input is valid
                }); */
      } else if (formattedValue.length > 5) {
        setFormErrors({
          ...formErrors,
          cardExpiration: "",
        });
      } else if (enteredMonthValue < 0 || enteredMonthValue > 12) {
        setFormErrors({
          ...formErrors,
          cardExpiration: "Enter a valid month (1-12)",
        });
      } else if (name === "cardInput") {
        const numericValue = value.replace(/\D/g, "");

        let formattedValue = numericValue;
        if (formattedValue.length > 3) {
          formattedValue = `(${formattedValue.slice(
            0,
            3
          )}) ${formattedValue.slice(3, 6)}-${formattedValue.slice(6, 9)}`;
        }

        const [enteredNumericValue, enteredYear] = formattedValue.split("/");

        // Check if the input has a valid (XXX) XXX-XXX format
        if (/^\(\d{3}\) \d{3}-\d{3}$/.test(formattedValue)) {
          setFormErrors({
            ...formErrors,
            cardInput: "",
          });
          setFormData({
            ...formData,
            [name]: formattedValue,
          });
        } else if (formattedValue.length > 12) {
          setFormErrors({
            ...formErrors,
            cardInput: "Invalid format. Please use (XXX) XXX-XXX",
          });
        } else if (enteredNumericValue < 0 || enteredNumericValue > 12) {
          setFormErrors({
            ...formErrors,
            cardInput: "Enter a valid month (1-12)",
          });
        } else {
          setFormErrors({
            ...formErrors,
            cardInput: "Invalid format. Please use (XXX) XXX-XXX",
          });
        }
      } else {
        setFormData({
          ...formData,
          [name]: formattedValue,
        });
        setFormErrors({
          ...formErrors,
          cardExpiration: "",
        });
      }
    } else if (name === "cardCVC") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 4) {
        setFormErrors({
          ...formErrors,
          cardCVC: "",
        });
      } else {
        setFormData({
          ...formData,
          [name]: numericValue,
        });
        setFormErrors({
          ...formErrors,
          cardCVC: "", // Clear the error if the input is valid
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setFormErrors({
        ...formErrors,
        [name]: "", // Clear the error for the current field
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate email
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Validate card number
    if (!formData.cardNumber) {
      errors.cardNumber = "Card number is required";
    } else if (!isValidCardNumber(formData.cardNumber)) {
      errors.cardNumber = "Invalid card number";
    }

    // Validate card expiration (MM/YY format)
    if (!formData.cardExpiration) {
      errors.cardExpiration = "Expiration date is required";
    } else if (!isValidCardExpiration(formData.cardExpiration)) {
      errors.cardExpiration = "Invalid expiration date (MM/YY)";
    }

    // Validate CVC
    if (!formData.cardCVC) {
      errors.cardCVC = "CVC is required";
    } else if (!isValidCardCVC(formData.cardCVC)) {
      errors.cardCVC = "Invalid CVC";
    }
    // Validate input

    if (!formData.cardInput) {
      errors.cardInput = "Input is required";
    } else if (!isValidCardInput(formData.cardInput)) {
      errors.cardInput = "Invalid Input";
    }

    // Validate Name on card
    if (!formData.cardName) {
      errors.cardName = "Name on card is required";
    }

    // Validate Select country
    if (!formData.selectedCountry) {
      errors.selectedCountry = "Select a country is required";
    }

    // Validate Address
    if (!formData.billingAddress) {
      errors.billingAddress = "Billing address is required";
    }
    if (!formData.saveInfo) {
      errors.saveInfo = "Please accept the terms to continue.";
    }

    // Add validation logic for other fields here

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    // Regular expression pattern for a valid email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Use the test method to check if the email matches the pattern
    return emailPattern.test(email);
  };

  const isValidCardNumber = (cardNumber) => {
    // Remove any non-numeric characters from the input
    const numericValue = cardNumber.replace(/\D/g, "");

    // Validate if the numeric value contains exactly 16 numerical digits
    return numericValue.length === 16;
  };

  const isValidCardExpiration = (expiration) => {
    // Validate if expiration is in MM/YY format and within a valid date range
    const [month, year] = expiration.split("/");
    const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
    return (
      /^\d{2}\/\d{2}$/.test(expiration) &&
      +month <= 12 &&
      +month > 0 &&
      +year >= currentYear
    );
  };

  const isValidCardInput = (cardInput) => {
    const phoneNumberPattern = /^\(\d{3}\) \d{3}-\d{4}$/;

    return phoneNumberPattern.test(cardInput);
  };

  const isValidCardCVC = (cvc) => {
    // Validate if CVC contains 3 or 4 numerical digits
    return /^\d{3,4}$/.test(cvc);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (validateForm() && formData.saveInfo) {
      setIsLoading(true);

      // Perform subscription logic here

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(formData.selectedCountry.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:justify-center w-full min-h-screen relative">
        {/* flex flex-col lg:flex-row items-center justify-center w-full min-h-screen custom:max-h-screen custom:min-h-screen relative */}
        <div className="bg-black w-full lg:w-1/2 lg:min-h-screen flex flex-col items-center lg:items-end  gap-10 text-white relative 2xl:pt-16 ">
          <header
            className={`flex fixed  items-center justify-between w-full pt-3 px-5 z-50 lg:hidden ${
              isModal ? "bg-white " : "bg-black "
            }  `}
          >
            <div className="flex items-center gap-3 justify-center ">
              <AiOutlineArrowLeft className="w-10 text-gray-400 " />
              {isModal ? (
                <Image
                  src="/images/olevl.png"
                  width="100"
                  height="80"
                  alt="olevl"
                  className="w-[50px] xs:w-[100px]"
                />
              ) : (
                <Image
                  src="/images/Layer_1.svg"
                  width="100"
                  height="80"
                  alt="olevl"
                  className="w-[50px]  xs:w-[100px]  "
                />
              )}
            </div>
            <button
              className="flex items-center justify-center gap-1 py-3 rounded-md text-[#BCBCBC] "
              onClick={(e) => {
                e.stopPropagation();
                setIsModal(!isModal);
              }}
            >
              <span className="  inline-block leading-5  ">
                {scrollY > 250 ? "$125.00" : isModal ? "Close" : "Details"}
              </span>

              <BsChevronDown
                className={`transform ${
                  isModal ? "rotate-180" : "rotate-0"
                } transition-transform duration-300 ease-in-out`}
              />
            </button>
          </header>

          {isModal && (
            <div
              className={` ${
                isModal ? "slide-in" : "slide-out  -translate-y-[156%] "
              } fixed top-14 z-10 flex  justify-center gap-0 w-full flex-col bg-white px-7 shadow-[0px_25px_20px_-20px_rgba(0,0,0,0.45)] `}
              ref={dropdownRef}
            >
              <div className="flex items-center justify-between gap-10 py-5 border-b border-gray-600">
                <div className="flex flex-col items-start">
                  <span className="text-base font-semibold text-black ">
                    Complete Shooter Club Payments
                  </span>
                  <span className="text-gray-400 text-sm font-medium ">
                    Billed monthly
                  </span>
                </div>
                <div className="flex flex-col items-end justify-end">
                  <span className="text-base font-semibold text-black ">
                    $0.00
                  </span>
                  <span className="text-gray-400 text-sm font-medium ">
                    $125.00 / Month after
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between gap-10 py-5 border-b border-gray-600">
                <div className="flex flex-col items-start gap-4">
                  <span className="text-base font-semibold text-black ">
                    Sub total
                  </span>
                  <span className="text-gray-400 text-sm font-medium ">
                    Tax
                  </span>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <span className="text-base font-semibold text-black ">
                    $125.00
                  </span>
                  <span className="text-gray-400 text-sm font-medium ">
                    Enter address to calculate
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-10 py-5 ">
                <div className="flex flex-col items-start gap-4">
                  <span className="text-base text-black ">
                    Total on October 15, 2023
                  </span>
                  <span className="text-sm font-semibold text-black ">
                    Total due today
                  </span>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <span className="text-base text-black ">$125.00</span>
                  <span className="text-sm font-semibold text-black ">
                    $0.00
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col items-center lg:items-start px-5 pb-10 lg:pb-0 lg:p-10 xl:p-16 xl:pt-16 gap-10 pt-16 ">
            <div className="lg:flex items-center gap-3 hidden ">
              <AiOutlineArrowLeft className=" text-gray-400" />
              <Image
                src="/images/Layer_1.svg"
                width="100"
                height="80"
                alt="olevl"
              />
            </div>

            <div className="flex  items-center lg:items-start gap-2 flex-col lg:leading-4">
              <span className="text-center  lg:leading-4 text-base lg:text-xl  text-white lg:text-gray-500 ">
                Subscribe to <br class="lg:hidden" />
                <span className=" leading-relaxed lg:leading-4 text-xl font-bold lg:font-normal text-white lg:text-gray-500  ">
                  Complete Shooter Club &nbsp;
                  <span className="lg:inline-block hidden "> Payments</span>
                </span>
              </span>
              {/* <div className="flex lg:hidden">
                <span className="text-center text-xl lg:leading-4 text-gray-400 ">
                  Subscribe to <br class="lg:hidden" />
                  <span className="leading-4 lg:leading-4 text-xl text-gray-400  ">
                    Complete Shooter Club Payment
                  </span>
                </span>
              </div> */}
              {/* <span class="text-gray-400 text-center text-xl font-semibold lg:leading-4">
                Subscribe to
              </span>
              <span class="text-gray-400 text-center text-xl font-semibold lg:leading-4">
                Complete Shooter Club Payment
              </span> */}
              <div className="lg:flex hidden items-center gap-2 ">
                <span className="text-5xl font-semibold ">$0.00</span>
                <div className="flex flex-row lg:flex-col items-start gap-1 pt-5 lg:pt-0 ">
                  <span className="text-gray-500 text-lg font-medium  ">
                    due
                  </span>
                  <span className="text-gray-500 text-lg font-medium ">
                    today
                  </span>
                </div>
              </div>
              <span className="text-lg text-gray-500 font-semibold text-center lg:flexhidden lg:text-start lg:flex hidden">
                Then $125.00 per month starting on October 15, 2023
              </span>
            </div>

            <div className={`lg:flex justify-center gap-2 flex-col  hidden `}>
              <div className="flex items-center justify-between gap-10 py-5 border-b border-gray-900">
                <div className="flex flex-col items-start">
                  <span className="text-lg font-semibold  ">
                    Complete Shooter Club Payments
                  </span>
                  <span className="text-gray-500 text-lg font-medium ">
                    Billed monthly
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-lg font-semibold  ">$0.00</span>
                  <span className="text-gray-500 text-lg font-medium ">
                    $125.00 / Month after
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between gap-10 py-5 border-b border-gray-900">
                <div className="flex flex-col items-start gap-4">
                  <span className="text-lg font-semibold  ">Subtotal</span>
                  <span className="text-gray-500 text-lg font-medium ">
                    Tax
                  </span>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <span className="text-lg font-semibold  ">$125.00</span>
                  <span className="text-gray-500 text-lg font-medium ">
                    Enter address to calculate
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-10 py-5 ">
                <div className="flex flex-col items-start gap-4">
                  <span className="text-lg ">Total on October 15, 2023</span>
                  <span className="text-lg font-semibold ">
                    Total due today
                  </span>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <span className="text-lg ">$125.00</span>
                  <span className="text-lg font-semibold ">$0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full  lg:max-h-screen flex flex-col items-center lg:items-end pt-5 lg:py:0 xl:pt-16 gap-10 overflow-auto max-w-[500px] lg:max-w-full bg-white ">
          <div className="flex flex-col items-center lg:items-start  gap-10 w-full text-xl font-semibold  ">
            <div className="flex flex-col gap-4 items-center justify-center w-full px-8">
              <div className="flex lg:hidden flex-col items-start w-full relative border border-gray-300 shadow-md rounded-lg cursor-pointer ">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  disabledKeyboardNavigation
                  readOnly
                  placeholderText="Start Choosing Date"
                  className="\ rounded-lg w-full bg-transparent py-1 pl-2 outline-none cursor-pointer transition duration-300 ease-in-out "
                />
                {/* <div className="absolute right-1 top-2 mr-1">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className=""
                    placeholder="gfgfhf"
                    customInput={
                      <BsFillCalendarDateFill
                        className=""
                        // onClick={toggleDatePicker}
                      />
                    }
                  />
                </div> */}
                <div className="absolute right-1 top-2 mr-1">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className=""
                    customInput={
                      <BsFillCalendarDateFill
                        className=""
                        // onClick={toggleDatePicker}
                      />
                    }
                  />
                </div>
              </div>

              <div className="flex lg:hidden w-full border border-gray-300 items-center rounded-lg shadow-md cursor-pointer ">
                <label
                  className="border-r border-gray-400
                     bg-transparent py-1 w-1/2 pl-2 outline-none text-gray-400"
                >
                  Quantity
                </label>
                {/* <input
                  type="text"
                  id="dateInput"
                  placeholder="Quantity"
                  className="border-r border-gray-400
                     bg-transparent py-1 w-1/2 pl-2 outline-none"
                /> */}
                <div className="flex items-center justify-between pr-2 w-1/2">
                  <input
                    type=""
                    name=""
                    id=""
                    placeholder="1"
                    maxlength="1"
                    className="border-none bg-transparent py-1 w-full outline-none px-5 "
                  />
                  {/* <BsCreditCardFill className=" w-fit " /> */}
                </div>
                {/* <input
                  type="text"
                  id="dateInput"
                  name="cardExpiration"
                  pattern="\d{2}/\d{2}"
                  placeholder="Quantity"
                  className={` ${
                    formErrors.cardCVC ||
                    formErrors.cardExpiration ||
                    formErrors.cardNumber
                      ? "border-r border-red-300"
                      : "border-r border-gray-400"
                  } bg-transparent py-1 pl-2 w-1/2 outline-none   `}
                  value={formData.cardExpiration}
                  onChange={(e) => handleInputChange(e)}
                />
                <div className="flex items-center justify-between pr-2 w-1/2 ">
                  <input
                    type="text"
                    name="cardCVC"
                    id="cardCVC"
                    placeholder="1"
                    className="border-none bg-transparent py-1 w-full outline-none px-5 "
                    value={formData.cardCVC}
                    onChange={(e) => handleInputChange(e)}
                  />
                 
                </div> */}
              </div>

              <div className="flex items-center justify-center gap-1 bg-black w-full text-white py-2 rounded-md lg:hidden cursor-pointer ">
                <AiFillApple />
                <button type="button"> Pay </button>
              </div>
            </div>

            <div className="flex  items-center w-full lg:hidden px-8">
              <div className="w-full h-[2px] border-b border-gray-400  "></div>
              <span className="lg:text-2xl lg:font-semibold text-base text-gray-400 leading-5 w-[310px] mx-2 whitespace-nowrap  ">
                Or pay with card
              </span>
              <div className="w-full h-[2px] border-b border-gray-400  "></div>
            </div>
            <span className=" lg:text-2xl lg:font-semibold text-base lg:block hidden text-black leading-5 w-[310px]  whitespace-nowrap px-8 mt-3 ">
              Pay with card
            </span>
            <form action="" className="w-full  lg:max-w-[500px]  ">
              <div className="flex items-start flex-col gap-4  w-full px-8">
                <div className="flex items-center gap-10 p-2 border border-gray-200 rounded-lg bg-gray-100 w-full cursor-pointer  ">
                  <label
                    htmlFor="AddEmail"
                    className="text-lg font-medium text-gray-400 "
                  >
                    Email
                  </label>
                  <input
                    className="w-full max-w-[300px] bg-none border-none bg-transparent text-base font-normal lg:font-semibold sm:text-sm lg:text-xl"
                    disabled
                    type="email"
                    name="email"
                    id="AddEmail"
                    placeholder="coopergoldenhoit12@gmail.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>

                <div className="lg:flex hidden flex-col items-start w-full relative border border-gray-200 rounded-lg cursor-pointer  ">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    ref={datePickerRef}
                    readOnly
                    disabledKeyboardNavigation
                    placeholderText="Choose Starting Date"
                    className=" rounded-lg h-10 text-lg shadow-md bg-red-300 w-full bg-transparent py-1 pl-2 outline-none transition duration-300 ease-in-out cursor-pointer"
                  />
                  {/* <BsFillCalendarDateFill
                    className="absolute right-1 top-2 mr-1"
                    onClick={toggleDatePicker}
                  /> */}
                  <div className="absolute right-1 top-2 mr-1">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className=""
                      customInput={
                        <BsFillCalendarDateFill
                          className=""
                          // onClick={toggleDatePicker}
                        />
                      }
                    />
                  </div>

                  {/* <AiOutlineCalendar className="absolute right-2 top-2" /> */}
                </div>

                <div className="lg:flex hidden w-full border border-gray-200 shadow-md items-center rounded-lg ">
                  <label
                    className="border-r border-gray-200
                     bg-transparent py-1 w-1/2 pl-2 outline-none text-lg text-gray-400"
                  >
                    Quantity
                  </label>
                  {/* <input
                    type="text"
                    id="dateInput"
                    placeholder="Quantity"
                    className="border-r border-gray-200
                     bg-transparent py-1 w-1/2 pl-2 outline-none text-lg "
                  /> */}
                  <div className="flex items-center justify-between pr-2 w-1/2">
                    <input
                      type="tel"
                      name=""
                      id=""
                      placeholder="1"
                      maxlength="1"
                      className=" bg-transparent py-1 w-full outline-none  px-2 cursor-pointer  "
                    />
                    {/* <BsCreditCardFill className=" w-fit " /> */}
                  </div>
                </div>

                {/* <div className="flex flex-row items-start">
                  <input
                    type="text"
                    id="dateInput"
                    placeholder="Quantity"
                    className="border border-gray-400 bg-transparent py-1 pl-2 outline-none rounded-l-lg"
                    // value={formData.cardExpiration}
                    // onChange={(e) => handleInputChange(e)}
                  />

                  <div className="flex items-center justify-between pr-2 w-64">
                    <input
                      type="text"
                      id="cardCVC"
                      placeholder="1"
                      className="border border-gray-400 bg-transparent py-1 w-full rounded-r-lg outline-none px-5"
                      //   value={formData.cardCVC}
                      //   onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </div> */}

                <div className="flex items-start flex-col w-full relative">
                  <div className="flex items-center justify-between w-full">
                    <label
                      htmlFor="AddCard"
                      className=" text-gray-500 text-base font-medium leading-8 cursor-pointer "
                    >
                      Card information
                    </label>

                    <div
                      className={`error-message text-sm text-red-500 font-medium shadow-sm ${
                        formErrors.cardCVC ||
                        formErrors.cardExpiration ||
                        formErrors.cardNumber
                          ? "opacity-100 transition-opacity duration-300 delay-300"
                          : "opacity-0"
                      }`}
                    >
                      Required
                    </div>

                    {/* {(formErrors.cardCVC || formErrors.cardExpiration || formErrors.cardNumber) && <div className="error-message text-sm text-red-500 font-medium ">Required</div>} */}
                  </div>

                  <div
                    className={`flex items-start flex-col  ${
                      formErrors.cardCVC ||
                      formErrors.cardExpiration ||
                      formErrors.cardNumber
                        ? "border border-red-300"
                        : "border border-gray-200"
                    } rounded-lg w-full transition duration-300 ease-in-out `}
                  >
                    <div
                      className={`w-full flex items-center justify-between  ${
                        formErrors.cardCVC ||
                        formErrors.cardExpiration ||
                        formErrors.cardNumber
                          ? "border-b border-red-300"
                          : "border-b border-gray-200"
                      }`}
                    >
                      <input
                        type="text"
                        name="cardNumber"
                        id="AddCard"
                        className="w-[48%] xs:w-[80%] bg-transparent py-1 pl-2 outline-none "
                        placeholder="1234 1234 1234 1234"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange(e)}
                      />
                      <div className="flex items-center justify-center pr-2 gap-2">
                        <Image
                          src="/images/visa.png"
                          width="20"
                          height="15"
                          alt="olevl"
                        />
                        <Image
                          src="/images/mastercard.jpg"
                          width="20"
                          height="15"
                          alt="olevl"
                          className="h-[15px]"
                        />
                        <Image
                          src="/images/bluecard.png"
                          width="20"
                          height="15"
                          alt="olevl"
                        />
                        <div className="max-w-[20px] max-h-[40px] pb-2 ">
                          <Slider {...settings}>
                            <Image
                              src="/images/visa.png"
                              width="20"
                              height="15"
                              alt="olevl"
                              className=""
                            />
                            <Image
                              src="/images/mastercard.jpg"
                              width="20"
                              height="15"
                              alt="olevl"
                              className="h-[15px]"
                            />
                            <Image
                              src="/images/bluecard.png"
                              width="20"
                              height="15"
                              alt="olevl"
                            />
                          </Slider>
                        </div>
                      </div>
                    </div>
                    <div className="w-full border flex items-center rounded-b-lg">
                      <input
                        type="text"
                        id="dateInput"
                        name="cardExpiration"
                        // pattern="\d{2}/\d{2}"
                        placeholder="MM / YY"
                        className={` ${
                          formErrors.cardCVC ||
                          formErrors.cardExpiration ||
                          formErrors.cardNumber
                            ? "border-r border-red-300"
                            : "border-r border-gray-200"
                        } bg-transparent py-1 pl-2 w-1/2 outline-none`}
                        value={formData.cardExpiration}
                        onChange={(e) => handleInputChange(e)}
                      />
                      <div className="flex items-center justify-between pr-2  w-1/2">
                        <input
                          type="text"
                          name="cardCVC"
                          id="cardCVC"
                          placeholder="CVC"
                          className=" border-none  bg-transparent py-1 w-full  outline-none px-5 "
                          value={formData.cardCVC}
                          onChange={(e) => handleInputChange(e)}
                        />
                        <BsCreditCardFill className=" w-fit cursor-pointer " />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`error-message absolute top-[108px] text-sm text-red-500 font-medium ${
                      formErrors.cardExpiration
                        ? "opacity-100 transition-opacity duration-300 delay-300"
                        : "opacity-0"
                    } `}
                  >
                    {formErrors.cardExpiration}
                  </div>
                </div>

                <div className="flex flex-col items-start w-full shadow-sm ">
                  <div className="flex items-center justify-between w-full">
                    <label
                      htmlFor="Addcardname"
                      className=" text-gray-500 text-base font-medium leading-8 cursor-pointer "
                    >
                      Name on card
                    </label>

                    <div
                      className={`error-message text-sm text-red-500 font-medium ${
                        formErrors.cardName
                          ? "opacity-100 transition-opacity duration-300 delay-300"
                          : "opacity-0"
                      }`}
                    >
                      Required
                    </div>
                  </div>
                  <input
                    type="text"
                    name="cardName"
                    id="Addcardname"
                    className={`w-full ${
                      formErrors.cardName
                        ? "border border-red-300"
                        : "border border-gray-200"
                    } bg-transparent py-1 pl-2  rounded-lg outline-none transition duration-300 ease-in-out `}
                    value={formData.cardName}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                {/* {formErrors.cardName && <div className="error-message">{formErrors.cardName}</div>} */}

                <div
                  className="relative inline-block text-left w-full "
                  ref={dropdownRef}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className=" text-gray-500 text-base font-medium leading-8 ">
                      Billing address
                    </span>

                    <div
                      className={`error-message text-sm text-red-500 font-medium ${
                        formErrors.billingAddress || formErrors.selectedCountry
                          ? "opacity-100 transition-opacity duration-300 delay-300"
                          : "opacity-0"
                      }`}
                    >
                      Required
                    </div>
                  </div>

                  <div
                    className={`flex items-center bg-transparent ${
                      formErrors.billingAddress || formErrors.selectedCountry
                        ? "border border-red-300"
                        : "border border-gray-200"
                    } rounded-t-lg shadow-sm px-4 w-full transition duration-300 ease-in-out`}
                  >
                    <input
                      type="text"
                      name="selectedCountry"
                      className=" py-2 text-lg font-medium text-gray-700 bg-transparent w-full outline-none "
                      placeholder="Select Country"
                      onClick={() => toggleDropdown()}
                      value={formData.selectedCountry}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          selectedCountry: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          selectedCountry: "", // Clear the error for the current field
                        });
                      }}
                    />
                    <BsChevronDown
                      className={`transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                      } transition-transform duration-300 ease-in-out w-4 h-4 cursor-pointer `}
                      onClick={() => toggleDropdown()}
                    />
                  </div>
                  {isOpen && (
                    <div className="absolute z-10 mt-0 w-full bg-white border border-gray-300 rounded-b-md shadow-lg h-[200px] overflow-auto ">
                      <ul>
                        {filteredCountries.map((country, index) => (
                          <li
                            key={index}
                            className="px-4 py-1 hover:bg-indigo-100 cursor-pointer text-base font-medium"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                selectedCountry: country,
                              });
                              toggleDropdown();
                              setFormErrors({
                                ...formErrors,
                                selectedCountry: "", // Clear the error for the current field
                              });
                            }}
                          >
                            {country}
                          </li>
                        ))}
                        {filteredCountries.length === 0 &&
                          !filteredCountries.includes(
                            formData.selectedCountry
                          ) && (
                            <li className="text-red-300 px-4 py-1 hover:bg-indigo-100 cursor-pointer text-base font-medium">
                              {" "}
                              Selected country is not available.
                            </li>
                          )}
                      </ul>
                    </div>
                  )}
                  <input
                    type="text"
                    name="billingAddress"
                    id="address"
                    placeholder="Address"
                    className={`  py-2 text-lg font-medium text-gray-700 bg-transparent  w-full border-b border-l border-r ${
                      formErrors.billingAddress || formErrors.selectedCountry
                        ? "border-red-300"
                        : " border-gray-200"
                    }  shadow-sm px-4 rounded-b-lg outline-none transition duration-300 ease-in-out `}
                    value={formData.billingAddress}
                    onChange={(e) => handleInputChange(e)}
                  />

                  <div className=" text-gray-400 text-base font-semibold border-b cursor-pointer border-dashed inline-block leading-5 border-gray-400 ">
                    Enter address manually
                  </div>
                </div>

                <div className="relative w-full">
                  <div className="border-t border-r border-l border-gray-200 rounded-t-lg shadow-sm px-4 w-full flex items-start justify-around lg:border lg:rounded-xl gap-3 py-2 mt-3 ">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      id="saveInfo"
                      className="w-5 h-5 shadow-2xl mt-1 cursor-pointer  "
                      value={formData.saveInfo}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <div className="flex items-start justify-center flex-col  ">
                      <label
                        htmlFor="saveInfo"
                        className="text-sm md:whitespace-nowrap font-semibold cursor-pointer  "
                      >
                        Save my info for 1-click checkout with Link
                      </label>
                      <label
                        htmlFor="saveInfo"
                        className="text-base font-medium text-gray-400 cursor-pointer w-full  "
                      >
                        Securely pay on Levl and everywhere Link is accepted.{" "}
                      </label>
                    </div>
                  </div>
                  <div className="flex lg:hidden border w-full border-gray-200 rounded-b-lg ">
                    <PhoneInput
                      country={"us"}
                      disableDropdown={true}
                      disableCountryCode={true}
                      // containerClass="bg-red-500 w-full"
                      // inputClass="bg-green-500 w-full"
                      className="h-10 w-full "
                      inputStyle={{
                        width: "100%",
                        height: "40px",
                        border: "none",
                      }}
                      dropdownStyle={{
                        border: "none",
                        boxShadow: "none",
                      }}
                    />
                  </div>

                  <div className="flex lg:hidden flex-row text-xs text-gray-400 justify-center gap-2 m-1 cursor-pointer">
                    <h1 className="">link</h1>
                    <p className="">.</p>
                    <h2 className="border-b border-dotted border-gray-300">
                      More info
                    </h2>
                  </div>
                  <div
                    className={`error-message absolute -bottom-5 text-sm text-red-500 font-medium ${
                      formErrors.saveInfo
                        ? "opacity-100 transition-opacity duration-300 delay-300"
                        : "opacity-0"
                    } `}
                  >
                    {formErrors.saveInfo}
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full hidden bg-black py-3 lg:flex rounded-lg mt-5 text-gray-400 text-xl font-semibold relative justify-center cursor-pointer  ${
                    isLoading
                      ? "opacity-100 h-[52px] cursor-not-allowed lg:bg-white  "
                      : " lg:bg-black"
                  }`}
                  onClick={(e) => handleSubscribe(e)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loader-spinner "></div>
                  ) : (
                    "Subscribe"
                  )}
                </button>

                <div className="text-center lg:flex hidden">
                  <p className="text-center text-base font-semibold text-gray-400  ">
                    By confirming your subscription, you allow levl to charge
                    your card for this payment and future payment in accordance
                    with their terms. You can always cancel your subscription.
                  </p>
                </div>
              </div>
              <div className="bg-black mt-2 flex  flex-col-reverse   ">
                <div className="  lg:hidden  flex items-center gap-2 ">
                  <span className="text-5xl font-semibold ">$0.00</span>

                  {/* <div className="flex flex-row lg:flex-col items-start gap-1 pt-5 lg:pt-0 ">
                    <span className="text-gray-400 text-lg font-medium  ">
                      due
                    </span>
                    <span className="text-gray-400 text-lg font-medium ">
                      today
                    </span>
                  </div> */}
                </div>
                <div className="flex flex-col w-full justify-center items-center px-4  ">
                  <div className="flex flex-row justify-center items-center">
                    <span className=" lg:hidden text-lg text-gray-400 font-semibold text-center lg:text-start flex flex-col  mt-2">
                      <div className="flex flex-row justify-center items-center">
                        <span className="text-base mb-2 text-white">$</span>
                        <span className="text-4xl font-semibold text-white ">
                          503.23
                        </span>
                      </div>
                      <span className="text-white text-lg  ">due today</span>
                      <span className="text-sm text-[#BCBCBC] ">
                        Then $125.00 per month starting on October 2, 2023
                      </span>
                      {/* <span className="text-4xl font-semibold text-white mt-1">
                        $503.23
                      </span>
                      <br></br>Due Today<br></br>Then $125.00 per month starting
                      on October 15, 2023 */}
                    </span>
                  </div>
                  <div className="flex flex-row lg:flex-col items-start gap-1 pt-5 lg:pt-0 ">
                    {/* <span className="text-gray-400 text-lg font-medium  ">
                      due
                    </span>
                    <span className="text-gray-400 text-lg font-medium ">
                      today
                    </span> */}
                  </div>
                  <button
                    type="button"
                    className=" lg:hidden flex items-center justify-center gap-1 bg-[#E3E3E363] px-4 py-2 w-[167px] mb-2 rounded-lg "
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModal(!isModal);
                    }}
                  >
                    <span className="text-[#FFF] "> View Details</span>
                    {/* {isDetails ? <AiOutlineUp /> : <AiOutlineDown />
                            } */}
                    <BsChevronDown
                      className={`transform ${
                        isModal ? "rotate-180" : "rotate-0"
                      } transition-transform duration-300 ease-in-out text-white`}
                    />
                  </button>
                  <button
                    type="submit"
                    className={`w-full px-3 lg:hidden bg-white py-3 flex justify-center rounded-lg mt-5 text-black text-lg font-bold relative  ${
                      isLoading
                        ? "opacity-100 h-[52px] cursor-not-allowed lg:bg-black "
                        : " lg:bg-white"
                    }`}
                    onClick={(e) => handleSubscribe(e)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loader-spinner "></div>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
              </div>
              {/* <button
                type="submit"
                className={`w-full lg:hidden bg-white py-3 flex justify-center rounded-lg mt-5 text-black text-lg text-xl font-semibold relative   ${
                  isLoading
                    ? "opacity-100 h-[52px] cursor-not-allowed lg:bg-black  "
                    : " lg:bg-white"
                }`}
                onClick={(e) => handleSubscribe(e)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loader-spinner "></div>
                ) : (
                  "Subscribe"
                )}
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentUi;
