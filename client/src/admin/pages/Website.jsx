import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaImages,
  FaMagic,
  FaGem,
  FaPalette,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

const sections = [
  {
    id: 1,
    title: "Hero Section",
    description: "Manage hero products, headings, buttons and homepage banner.",
    icon: <FaImages />,
    color: "from-violet-500 to-fuchsia-500",
    items: "2 Featured Products",
  },
  {
    id: 2,
    title: "Curated Essentials",
    description: "Choose products displayed in the luxury product showcase.",
    icon: <FaMagic />,
    color: "from-blue-500 to-cyan-500",
    items: "4 Featured Products",
  },
  {
    id: 3,
    title: "Signature Collection",
    description: "Update signature banner and featured collection products.",
    icon: <FaGem />,
    color: "from-amber-500 to-orange-500",
    items: "Banner + 3 Products",
  },
  {
    id: 4,
    title: "Euphoria Edit",
    description: "Manage editorial images, luxury campaign and homepage story.",
    icon: <FaPalette />,
    color: "from-pink-500 to-rose-500",
    items: "Editorial Content",
  },
];

const Website = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  return (
    <div className="min-h-screen">
      {/* Header */}

      <div className="mb-12">
        <p className="uppercase tracking-[5px] text-sm text-gray-500">
          Website Manager
        </p>

        <h1 className="text-5xl font-light mt-3">Manage Homepage</h1>

        <p className="text-gray-500 mt-4 max-w-2xl">
          Customize every section of your Euphoria homepage without touching the
          code.
        </p>
      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -8,
            }}
            className="relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100"
          >
            {/* Gradient */}

            <div className={`h-2 bg-gradient-to-r ${section.color}`} />

            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <div
                    className={`
                                        w-16
                                        h-16
                                        rounded-2xl
                                        bg-gradient-to-r
                                        ${section.color}
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        text-2xl
                                    `}
                  >
                    {section.icon}
                  </div>

                  <h2 className="text-2xl font-semibold mt-6">
                    {section.title}
                  </h2>

                  <p className="text-gray-500 mt-3 leading-7">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <span className="px-4 py-2 rounded-full bg-gray-100 text-sm">
                  {section.items}
                </span>

                <button
                  className="
                                    flex
                                    items-center
                                    gap-3
                                    bg-black
                                    text-white
                                    px-6
                                    py-3
                                    rounded-xl
                                    hover:bg-gray-900
                                    transition
                                "
                >
                  Edit Section
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Website;
