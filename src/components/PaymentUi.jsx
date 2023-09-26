import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { AiFillApple, AiOutlineArrowLeft, AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { BsCreditCard, BsCreditCardFill } from 'react-icons/bs';

const countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo (Congo-Brazzaville)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czechia (Czech Republic)',
    'Democratic Republic of the Congo (Congo-Kinshasa)',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor (Timor-Leste)',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Holy See',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Ivory Coast',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar (formerly Burma)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia (formerly Macedonia)',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine State',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe'
];


const PaymentUi = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDetails, setIsDetails] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = () => {
        setIsLoading(true);

        
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        // Attach the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const filteredCountries = countries.filter(country =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectCountry = (country) => {
        // setSelectedCountry(country); // Update selectedCountry
        setSearchTerm(country); // Update searchTerm
        toggleDropdown();
    }

    return (
        <>
            <div className='flex flex-col lg:flex-row items-center justify-center w-full min-h-screen'>
                <div className='bg-black w-full lg:w-1/2 lg:min-h-screen flex flex-col items-center lg:items-end  gap-10 text-white relative 2xl:pt-16 '>
                    <header className={`flex fixed  items-start justify-between w-full pt-3 px-5 lg:hidden ${(isModal && scrollY < 250) ? "bg-white" : "bg-black"} `}>
                        <div className='flex items-center gap-3  '>
                            <AiOutlineArrowLeft className='w-10 text-gray-400' />
                            {(isModal && scrollY < 250) ? <Image src="/images/olevl.png"
                                width="100"
                                height="80"
                                alt='olevl'
                            /> :
                                <Image src="/images/olevl (1).png"
                                    width="100"
                                    height="80"
                                    alt='olevl'
                                />}
                        </div>
                        <button className='flex items-center justify-center gap-1 py-3 rounded-md text-gray-400 ' onClick={() => setIsModal(!isModal)}>
                            <span className='underline decoration-dotted ' >{scrollY > 250 ? "$125.00" : isModal ? "Close" : "Details"}</span>
                            {isModal ? <AiOutlineUp /> : <AiOutlineDown />
                            }
                        </button>
                    </header>
                    {
                        // (isModal && scrollY < 250) && 
                        <div className={` ${(isModal && scrollY < 250) ? "slide-in" : "slide-out  -translate-y-[156%] "} absolute top-14 flex  justify-center gap-0 w-full flex-col bg-white px-7 `}>
                            <div className='flex items-center justify-between gap-10 py-5 border-b border-gray-600'>
                                <div className='flex flex-col items-start'>
                                    <span className='text-base font-semibold text-black '>Complete Shooter Club Payments</span>
                                    <span className='text-gray-400 text-sm font-medium ' >Billed monthly</span>
                                </div>
                                <div className='flex flex-col items-end justify-end'>
                                    <span className='text-base font-semibold text-black '>$0.00</span>
                                    <span className='text-gray-400 text-sm font-medium '>$125.00 / Month after</span>
                                </div>
                            </div>
                            <div className='flex items-start justify-between gap-10 py-5 border-b border-gray-600'>
                                <div className='flex flex-col items-start gap-4' >
                                    <span className='text-base font-semibold text-black '>Sub total</span>
                                    <span className='text-gray-400 text-sm font-medium ' >Tax</span>
                                </div>
                                <div className='flex flex-col items-end gap-4'>
                                    <span className='text-base font-semibold text-black '>$125.00</span>
                                    <span className='text-gray-400 text-sm font-medium '>Enter address to calculate</span>
                                </div>
                            </div>
                            <div className='flex items-center justify-between gap-10 py-5 '>
                                <div className='flex flex-col items-start gap-4'>
                                    <span className='text-base text-black '>Total on October 15, 2023</span>
                                    <span className='text-sm font-semibold text-black '>Total due today</span>
                                </div>
                                <div className='flex flex-col items-end gap-4'>
                                    <span className='text-base text-black '>$125.00</span>
                                    <span className='text-sm font-semibold text-black '>$0.00</span>
                                </div>
                            </div>
                        </div>}
                    <div className='flex flex-col items-center lg:items-start px-5 pb-10 lg:pb-0 lg:p-10 xl:p-16 xl:pt-16 gap-10 pt-16 '>
                        <div className='lg:flex items-center gap-3 hidden '>
                            <AiOutlineArrowLeft className='w-10 text-gray-400' />
                            <Image src="/images/olevl (1).png"
                                width="100"
                                height="80"
                                alt='olevl'
                            />
                        </div>
                        <div className='flex items-center lg:items-start gap-2  flex-col'>
                            <span className='text-gray-400 text-center text-xl font-semibold lg:leading-4 '>Subscribe to Complete Shooter Club Payment</span>
                            <div className='flex items-center gap-2 '>
                                <span className='text-5xl font-semibold  '>$0.00</span>
                                <div className='flex flex-row lg:flex-col items-start  pt-5 lg:pt-0 '>
                                    <span className='text-gray-400 text-lg font-medium  '>due</span>
                                    <span className='text-gray-400 text-lg font-medium '>today</span>
                                </div>
                            </div>
                            <span className='text-lg text-gray-400 font-semibold text-center '>Then $125.00 per month starting on October 15, 2023</span>
                        </div>

                        <div className={`lg:flex justify-center gap-2 flex-col  hidden `}>
                            <div className='flex items-center justify-between gap-10 py-5 border-b border-gray-600'>
                                <div className='flex flex-col items-start'>
                                    <span className='text-lg font-semibold  '>Complete Shooter Club Payments</span>
                                    <span className='text-gray-400 text-lg font-medium ' >Billed monthly</span>
                                </div>
                                <div className='flex flex-col items-end'>
                                    <span className='text-lg font-semibold  '>$0.00</span>
                                    <span className='text-gray-400 text-lg font-medium '>$125.00 / Month after</span>
                                </div>
                            </div>
                            <div className='flex items-start justify-between gap-10 py-5 border-b border-gray-600'>
                                <div className='flex flex-col items-start gap-4' >
                                    <span className='text-lg font-semibold  '>Sub total</span>
                                    <span className='text-gray-400 text-lg font-medium ' >Tax</span>
                                </div>
                                <div className='flex flex-col items-end gap-4'>
                                    <span className='text-lg font-semibold  '>$125.00</span>
                                    <span className='text-gray-400 text-lg font-medium '>Enter address to calculate</span>
                                </div>
                            </div>
                            <div className='flex items-center justify-between gap-10 py-5 '>
                                <div className='flex flex-col items-start gap-4'>
                                    <span className='text-lg '>Total on October 15, 2023</span>
                                    <span className='text-lg font-semibold '>Total due today</span>
                                </div>
                                <div className='flex flex-col items-end gap-4'>
                                    <span className='text-lg '>$125.00</span>
                                    <span className='text-lg font-semibold '>$0.00</span>
                                </div>
                            </div>
                        </div>

                        <button className='flex items-center justify-center gap-1 bg-gray-900 px-4 py-3 rounded-md lg:hidden ' onClick={() => setIsModal(!isModal)}>
                            <span > View details</span>
                            {isDetails ? <AiOutlineUp /> : <AiOutlineDown />
                            }
                        </button>
                    </div>
                </div>
                <div className='lg:w-1/2 w-full  lg:max-h-screen flex flex-col items-center lg:items-end py-5 lg:py:0 xl:pt-16 gap-10 overflow-auto max-w-[500px] lg:max-w-full bg-white '>

                    <div className='flex flex-col items-center lg:items-start px-5 lg:px-16 gap-10 w-full text-xl font-semibold  '>
                        <div className='flex items-center justify-center gap-1 bg-black w-full text-white py-2 rounded-md lg:hidden  '>
                            <AiFillApple />
                            <button type="button"> Pay </button>
                        </div>
                        <div className='flex  items-center w-full lg:hidden'>
                            <div className='w-full h-[2px] border-b border-gray-400 '></div>
                            <span className=' lg:text-2xl lg:font-semibold text-base text-gray-400 leading-5 w-[310px] mx-2 whitespace-nowrap '>Or Pay with card</span>
                            <div className='w-full h-[2px] border-b border-gray-400 '></div>
                        </div>
                        <span className=' lg:text-2xl lg:font-semibold text-base lg:block hidden text-gray-400 leading-5 w-[310px] mx-2 whitespace-nowrap '>Pay with card</span>
                        <form action="" className='w-full  lg:max-w-[500px] '>
                            <div className='flex items-start flex-col gap-3 w-full '>
                                <div className='flex items-center gap-8 p-2 border border-gray-400 rounded-lg bg-gray-200 w-full cursor-pointer '>
                                    <label htmlFor="AddEmail" className='text-base font-medium text-gray-400 '>Email</label>
                                    <input className='w-full max-w-[300px] bg-none border-none bg-transparent' disabled type="email" name="email" id="AddEmail" placeholder='coopergoldenhoit12@gmail.com' />
                                </div>

                                <div className='flex items-start flex-col w-full'>
                                    <label htmlFor="AddCard" className=' text-gray-400 text-base font-medium leading-8 cursor-pointer '>Card information</label>
                                    <div className='flex items-start flex-col  border border-gray-400 rounded-lg w-full S '>
                                        <div className='w-full flex items-center border-b border-gray-400 '>
                                            <input type="text" name="card" id="AddCard" className='w-full bg-transparent py-1 pl-2 outline-none ' placeholder='1234 1234 1234 1234 ' />
                                            <div className='flex items-center pr-2 gap-2'>
                                                <BsCreditCardFill />
                                                <BsCreditCard />
                                            </div>
                                        </div>
                                        <div className='w-full border flex items-center rounded-b-lg '>
                                            <input type="number" id="dateInput" name="dateInput" pattern="\d{2}/\d{2}" placeholder="MM / YY" className=' border-r border-gray-400  bg-transparent py-1 pl-2 w-1/2  outline-none ' />
                                            <div className='flex items-center justify-between px-5 w-1/2'>
                                                <input type="number" name="cvc" id="" placeholder="CVC" className=' border-none  bg-transparent py-1 w-1/2  outline-none ' />
                                                <BsCreditCardFill />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col items-start w-full '>
                                    <label htmlFor="Addcardname" className=' text-gray-400 text-base font-medium leading-8 cursor-pointer '>Name on card</label>
                                    <input type="text" name="cardname" id="Addcardname" className='w-full border-gray-400  bg-transparent py-1 pl-2 border rounded-lg outline-none ' />
                                </div>


                                <div className="relative inline-block text-left w-full">
                                    <span className=' text-gray-400 text-base font-medium leading-8 '>Billing address</span>
                                    <div className='flex items-center bg-transparent border border-gray-300 rounded-t-lg shadow-sm px-4 w-full '>
                                        <input
                                            type="text"
                                            className="  py-2 text-sm font-medium text-gray-700 bg-transparent  w-full outline-none "
                                            placeholder="Select Country"
                                            onClick={toggleDropdown}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        {
                                            isOpen ? <AiOutlineUp className='w-4 h-4 cursor-pointer' onClick={() => toggleDropdown()} /> : <AiOutlineDown className='w-4 h-4 cursor-pointer' onClick={() => toggleDropdown()} />
                                        }
                                    </div>
                                    {isOpen && (
                                        <div className="absolute z-10 mt-0 w-full bg-white border border-gray-300 rounded-b-md shadow-lg h-[200px] overflow-auto ">
                                            <ul>
                                                {filteredCountries.map((country, index) => (
                                                    <li
                                                        key={index}
                                                        className="px-4 py-1 hover:bg-indigo-100 cursor-pointer text-base font-medium"
                                                        onClick={() => selectCountry(country)}
                                                    >
                                                        {country}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <input type="text" name="address" id="address" placeholder='Address' className="  py-2 text-sm font-medium text-gray-700 bg-transparent  w-full border-b border-l border-r border-gray-300  shadow-sm px-4 rounded-b-lg outline-none " />

                                    <div className='underline decoration-dotted text-gray-400 text-base font-semibold '>Enter address manually</div>
                                </div>

                                <div className='border border-gray-300 rounded-lg shadow-sm px-4 w-full flex items-start gap-5 py-2 mt-3 '>
                                    <input type="checkbox" name="" id="" className='w-6 h-6 shadow-2xl ' />
                                    <div className='flex items-start justify-center flex-col' >
                                        <span className='text-lg font-semibold '>Save my info for 1-click checkout with Link</span>
                                        <span className='text-base font-medium text-gray-400'>Securely pay on Level and everywhere Link is accepted. </span>
                                    </div>
                                </div>

                                <button
                                    // type="submit"
                                    className={`w-full bg-black py-3 rounded-lg mt-5 text-gray-500 text-xl font-semibold relative ${isLoading ? 'opacity-100  h-[52px] cursor-not-allowed bg-black' : ''
                                        }`}
                                    onClick={handleSubscribe}
                                    disabled={isLoading}
                                >
                                    {/* {isLoading && (
                                        <div className="loader-spinner"></div>
                                    )} */}
                                    {isLoading ? <div className="loader-spinner "></div> : 'Subscribe'}
                                </button>

                                <div className='text-center'>
                                    <p className='text-center text-base font-semibold text-gray-400 '>By confirming your subscription, you allow levl to charge your card for this payment and future payment in acordance with their terms. you can always cancel your subscription.</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentUi