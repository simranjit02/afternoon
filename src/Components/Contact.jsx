import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Contact = () => {
  const initialstage = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    textmessage: "",
  };
  const [{ firstname, lastname, email, phone, textmessage }, setFormData] =
    useState(initialstage);
  const FormHandler = (e) => {
    const { name, value } = e.target;
    setFormData((previousdata) => ({ ...previousdata, [name]: value }));
  };
  const [loading, setLoading] = useState(false);
  const SubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send(
        "service_ky9cixn",
        "template_wrz7zax",
        {
          name: firstname + lastname,
          user_email: email,
          user_name: firstname + lastname,
          User_number: phone,
          textmessage: textmessage,
        },
        "vzkwQZ1uNnSZb2MOd"
      )
      ?.then(() => {
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          textmessage: "",
        });
        toast("Enquiry send successfully", {
          duration: 4000,
          position: "top-right",
          icon: "👏",
        });
        setLoading(false);
      });
  };
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="">
        <h1 className="text-6xl py-10 bg-[rgb(46,50,56)] text-white text-center mb-16">
          Contact
        </h1>

        <div className="flex w-full border border-black mb-16">
          <div className="w-1/2  px-10">
            <h1 className="text-6xl text-center">Customer Service</h1>
            <p className="mt-10">
              I'm a paragraph. Click here to add your own text and edit me. It’s
              easy. Just click “Edit Text” or double click me to add your own
              content and make changes to the font. I’m a great place for you to
              tell a story and let your users know a little more about you.
            </p>
          </div>
          <div className="w-1/2  bg-[#3f5c58] text-white border-l border-black ">
            <div className="m-12">
              <form onSubmit={SubmitForm}>
                <div className="flex">
                  <div className="w-full ">
                    <div className="">First Name*</div>
                    <input
                      name={"firstname"}
                      value={firstname}
                      required
                      onChange={FormHandler}
                      className={
                        "border-y border-l border-r-[1px] border-white w-full bg-[#3f5c58] p-2 pr-1 outline-none"
                      }
                    />
                  </div>
                  <div className="w-full">
                    <div className="">Last Name</div>
                    <input
                      name={"lastname"}
                      value={lastname}
                      required
                      onChange={FormHandler}
                      className={
                        "border-y border-l border-r-[1px] border-white w-full bg-[#3f5c58] p-2 pr-1 outline-none"
                      }
                    />
                  </div>
                </div>
                <div className="flex mt-4">
                  <div className="w-full ">
                    <div className="">Email*</div>
                    <input
                      name={"email"}
                      value={email}
                      required
                      onChange={FormHandler}
                      className={
                        "border-y border-l border-r-[1px] border-white w-full bg-[#3f5c58] p-2 pr-1 outline-none"
                      }
                    />
                  </div>
                  <div className="w-full">
                    <div className="">Phone</div>
                    <input
                      name={"phone"}
                      value={phone}
                      required
                      onChange={FormHandler}
                      className={
                        "border-y border-l border-r-[1px] border-white w-full bg-[#3f5c58] p-2 pr-1 outline-none"
                      }
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <h1>Type your message here...*</h1>
                  <div className="">
                    <textarea
                      name="textmessage"
                      value={textmessage}
                      required
                      onChange={FormHandler}
                      id=""
                      className=" border border-white w-full outline-none textarea text-white bg-[#3f5c58]  p-2 h-28"
                    ></textarea>
                    <button
                      type="submit"
                      className={
                        "text-white border border-white w-full p-2  hover:bg-white hover:text-black"
                      }
                      disabled={!(firstname && email && textmessage)}
                    >
                      {loading ? "Loading..." : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
