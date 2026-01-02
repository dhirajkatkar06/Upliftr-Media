
// import React from 'react';
// import { motion } from 'framer-motion';

// const WhatsApp: React.FC = () => {
//   return (
//     <motion.a
//       href="https://wa.me/919769708255"
//       target="_blank"
//       rel="noopener noreferrer"
//       initial={{ scale: 0, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all"
//     >
//       <i className="fa-brands fa-whatsapp"></i>
//     </motion.a>
//   );
// };

// export default WhatsApp;


import React from 'react';
import { motion } from 'framer-motion';

const WhatsApp: React.FC = () => {
  const phoneNumber = "919769708255";
  const message = "Hello! I would like to get in touch with you, about Upliftr services.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all"
    >
      <i className="fa-brands fa-whatsapp"></i>
    </motion.a>
  );
};

export default WhatsApp;
