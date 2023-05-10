import { MdForwardToInbox } from "react-icons/md";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const contactData = [
    {
        title: "Email",
        desc: "s2sharpit@gmail.com",
        url: "mailto:s2sharpit@gmail.com",
        icon: <MdForwardToInbox />,
    },
    {
        title: "LinkedIn",
        desc: "s2sharpit",
        url: "https://www.linkedin.com/in/s2sharpit/",
        icon: <FaLinkedin />,
    },
    {
        title: "Twitter",
        desc: "@s2sharpit",
        url: "https://twitter.com/s2sharpit",
        icon: <FaTwitter />,
    },
];

export default contactData;