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
                  onClick={() => setSelectedSection(section)}
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
      <AnimatePresence>
        {selectedSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
                fixed
                inset-0
                bg-black/60
                z-50
                flex
                items-center
                justify-center
                p-4
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                    bg-white
                    rounded-3xl
                    w-full
                    max-w-3xl
                    shadow-2xl
                    overflow-hidden
                "
            >
              {/* Header */}

              <div className="flex justify-between items-center p-8 border-b">
                <div>
                  <h2 className="text-3xl font-semibold">
                    {selectedSection.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {selectedSection.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedSection(null)}
                  className="
                            w-12
                            h-12
                            rounded-full
                            bg-gray-100
                            hover:bg-red-500
                            hover:text-white
                            transition
                            flex
                            items-center
                            justify-center
                        "
                >
                  <FaTimes />
                </button>
              </div>

              {/* Body */}

              <div className="p-8">
                <div className="bg-gray-50 rounded-2xl p-10 text-center">
                  <h3 className="text-2xl font-semibold">
                    {selectedSection.title}
                  </h3>

                  <p className="text-gray-500 mt-3">
                    Section editor will be added in the next step.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Website;
