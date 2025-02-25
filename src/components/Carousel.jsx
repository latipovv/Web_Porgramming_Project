import {  Drawer, Sidebar } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCrypto } from "../store/selectedCryptosSlice";
import { Link } from "react-router-dom";

const customTheme ={
  "root": {
    "base": "h-full",
    "collapsed": {
      "on": "w-16",
      "off": "w-64"
    },
    "inner": "h-full   rounded bg-transparent px-3 py-4 dark:bg-gray-800"
  },
  "collapse": {
    "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 ",
    "icon": {
      "base": "h-6 w-6 text-gray-500 ",
      "open": {
        "off": "",
        "on": "text-gray-900"
      }
    },
    "label": {
      "base": "ml-3 flex-1 whitespace-nowrap text-left",
      "icon": {
        "base": "h-6 w-6 transition delay-0 ease-in-out",
        "open": {
          "on": "rotate-180",
          "off": ""
        }
      }
    },
    "list": "space-y-2 py-2"
  },
  "cta": {
    "base": "mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700",
    "color": {
      "blue": "bg-cyan-50 dark:bg-cyan-900",
      "dark": "bg-dark-50 dark:bg-dark-900",
      "failure": "bg-red-50 dark:bg-red-900",
      "gray": "bg-alternative-50 dark:bg-alternative-900",
      "green": "bg-green-50 dark:bg-green-900",
      "light": "bg-light-50 dark:bg-light-900",
      "red": "bg-red-50 dark:bg-red-900",
      "purple": "bg-purple-50 dark:bg-purple-900",
      "success": "bg-green-50 dark:bg-green-900",
      "yellow": "bg-yellow-50 dark:bg-yellow-900",
      "warning": "bg-yellow-50 dark:bg-yellow-900"
    }
  },
  "item": {
    "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal ",
    "active": "bg-gray-100 dark:bg-gray-700",
    "collapsed": {
      "insideCollapse": "group w-full pl-8 transition duration-75",
      "noIcon": "font-bold"
    },
    "content": {
      "base": "flex-1 whitespace-nowrap px-3 flex flex-col items-center"
    },
    "icon": {
      "base": "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      "active": "text-gray-700 dark:text-gray-100"
    },
    "label": "",
    "listItem": ""
  },
  "items": {
    "base": ""
  },
  "itemGroup": {
    "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
  },
  "logo": {
    "base": "mb-5 flex items-center pl-2.5",
    "collapsed": {
      "on": "hidden",
      "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    },
    "img": "mr-3 h-6 sm:h-7"
  }
}
const customDrawer = {
  root: {
    base: "fixed z-40 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800 scrollbar-hide ", // Add "scrollbar-hide" to hide scrollbar
    backdrop: "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
    edge: "bottom-16",
    position: {
      top: {
        on: "left-0 right-0 top-0 w-full transform-none",
        off: "left-0 right-0 top-0 w-full -translate-y-full",
      },
      right: {
        on: "right-0 top-0 h-screen w-80 transform-none",
        off: "right-0 top-0 h-screen w-80 translate-x-full",
      },
      bottom: {
        on: "bottom-0 left-0 right-0 w-full transform-none",
        off: "bottom-0 left-0 right-0 w-full translate-y-full",
      },
      left: {
        on: "left-0 top-0 h-screen w-80 transform-none",
        off: "left-0 top-0 h-screen w-80 -translate-x-full",
      },
    },
  },
  header: {
    inner: {
      closeButton:
        "absolute hidden end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      closeIcon: "h-4 w-4",
      titleIcon: "me-2.5 h-4 w-4",
      titleText:
        "text-center text-white text-3xl font-medium font-['Roboto'] uppercase leading-normal tracking-wide",
    },
    collapsed: {
      on: "hidden",
      off: "block",
    },
  },
  items: {
    base: "",
  },
};


export default function Header({setCurrency,currency}) {
  const [isOpen, setIsOpen] = useState(false);
 
  const handleClose = () => setIsOpen(false);
  const { selectedCryptos } = useSelector((store) => store.selectedCryptos); 
  const dispatch = useDispatch()
  const handleRemoveCrypto = (cryptoId) => {
    dispatch(removeCrypto(cryptoId)); 
  };
  return (
    <div className="max-w-[1140px] h-16 flex justify-between items-center mx-auto p-2 px-4 rounded-md ">
      <Link to="/">
      <div className="text-[#87ceeb] text-xl font-bold font-['Montserrat'] leading-loose tracking-tight">CRYPTOFOLIO</div>
      </Link>
      <div className="flex gap-5"> 
      <select
          name="currency"
          id="currency"
          className="bg-transparent outline-none border-none text-white text-base font-normal font-['Roboto'] leading-[19px] tracking-tight"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)} 
        >
          <option value="usd" className="bg-[#14161A]">USD</option>
          <option value="rub" className="bg-[#14161A]">RUB</option>
          <option value="eur" className="bg-[#14161A]">EURO</option>
          
        </select>
        <button 
          onClick={() => setIsOpen(true)} 
          className="text-center text-black/90 text-sm font-medium font-['Roboto'] uppercase leading-normal tracking-wide pl-[19px] pr-[17px] py-2 bg-[#87ceeb] rounded shadow justify-center items-center inline-flex"
        >
          WATCH LIST
        </button>
        <Drawer open={isOpen} onClose={handleClose} className="bg-[#515151] w-[511px]" theme={customDrawer} position="right">
          <Drawer.Header title="Watchlist" titleIcon={() => <></>}  />
          <Drawer.Items className="bg-[#515151]">
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              theme={customTheme}
              className=""
            >
              <div className="flex h-full flex-col justify-between py-2 bg-[#515151]">
                <div>
                  <Sidebar.Items>
                    <Sidebar.ItemGroup>
                      <div className="grid ml-3 grid-cols-[repeat(2,198px)] gap-10">
                        {selectedCryptos.map((crypto) => (
                          <Sidebar.Item
                            key={crypto.id} 
                            className="flex flex-col items-center py-4 px-[17px] justify-center  bg-[#14161a] rounded-[25px] w-[198px] "
                          >
                            
                            <img
                              src={crypto.image} 
                              alt={`${crypto.name} logo`} 
                              className="w-[118px] h-[118px] object-cover"
                            />
                            <p className=" text-white text-center text-xl font-normal font-['Roboto'] leading-tight tracking-tight mt-9 uppercase">{currency === "rub" ? "₽ " : currency === "usd" ? "$ " : "€ "}{crypto.current_price.toFixed(2)}</p>
                            <button className="text-center text-white text-xl font-normal font-['Roboto'] leading-tight tracking-tight bg-red-600 py-1 px-4 mt-4 " onClick={() => handleRemoveCrypto(crypto.id)} >Remove</button>
                          </Sidebar.Item>
                        ))}
                      </div>
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </div>
              </div>
            </Sidebar>
          </Drawer.Items>
        </Drawer>
      </div>
    </div>
  );
}
