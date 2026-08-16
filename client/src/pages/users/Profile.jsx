import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import useAuth from "../../hooks/useAuth";
import useUserProfile from "../../hooks/useUserProfile";

import Navbar from "../../components/common/Navbar";

import {
  FiArrowLeft,
  FiUser,
  FiPackage,
  FiMapPin,
  FiHeart,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiEdit3,
} from "react-icons/fi";

const Profile = () => {
  const { user } = useAuth();
  const profile = useUserProfile(user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    {
      title: "My Orders",
      description: "View your orders and track deliveries",
      icon: FiPackage,
      path: "/orders",
    },
    {
      title: "Saved Addresses",
      description: "Manage your delivery addresses",
      icon: FiMapPin,
      path: "/addresses",
    },
    {
      title: "Wishlist",
      description: "Pieces you've saved for later",
      icon: FiHeart,
      path: "/wishlist",
    },
    {
      title: "Account Settings",
      description: "Manage your account preferences",
      icon: FiSettings,
      path: "/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-black">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-20">
        {/* ================= BACK ================= */}

        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-gray-500
            hover:text-black
            transition
          "
        >
          <FiArrowLeft />
          Back to Euphoria
        </Link>

        {/* ================= PAGE INTRO ================= */}

        <div className="mt-14 mb-12">
          <p
            className="
              uppercase
              tracking-[0.45em]
              text-[11px]
              text-[#8b5e3c]
            "
          >
            My Account
          </p>

          <h1
            className="
              mt-4
              text-5xl
              md:text-6xl
              font-light
              tracking-tight
            "
          >
            Welcome back
          </h1>

          <p className="mt-4 text-gray-500 max-w-lg leading-relaxed">
            Manage your Euphoria account, orders, saved pieces and personal
            details.
          </p>
        </div>

        {/* ================= PROFILE CARD ================= */}

        <section
          className="
            bg-white
            border
            border-gray-100
            rounded-[32px]
            p-7
            md:p-10
            shadow-[0_10px_40px_rgba(0,0,0,0.03)]
          "
        >
          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              justify-between
              gap-8
            "
          >
            {/* PROFILE INFORMATION */}

            <div className="flex items-center gap-6">
              {/* AVATAR */}

              <div
                className="
                  w-20
                  h-20
                  md:w-24
                  md:h-24
                  rounded-full
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-light
                  shrink-0
                "
              >
                {profile?.email ? (
                  profile.email.charAt(0).toUpperCase()
                ) : (
                  <FiUser />
                )}
              </div>

              {/* DETAILS */}

              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.3em]
                    text-gray-400
                  "
                >
                  Euphoria Member
                </p>

                <h2 className="text-2xl md:text-3xl font-light mt-2">
                  {profile?.name || "Guest User"}
                </h2>

                <p className="text-gray-500 mt-2">
                  {profile?.email || user?.email}
                </p>
              </div>
            </div>

            {/* EDIT BUTTON */}

            <button
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-3
                rounded-full
                border
                border-gray-200
                text-sm
                hover:bg-black
                hover:text-white
                hover:border-black
                transition
              "
            >
              <FiEdit3 />
              Edit Profile
            </button>
          </div>
        </section>

        {/* ================= ACCOUNT NAVIGATION ================= */}

        <section className="mt-10">
          <div className="mb-6">
            <p
              className="
                uppercase
                tracking-[0.35em]
                text-[11px]
                text-gray-400
              "
            >
              Your Euphoria
            </p>

            <h2 className="text-2xl font-light mt-2">Account</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="
                    group
                    bg-white
                    border
                    border-gray-100
                    rounded-[28px]
                    p-7
                    md:p-8
                    flex
                    items-center
                    justify-between
                    gap-6
                    shadow-[0_8px_30px_rgba(0,0,0,0.025)]
                    hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]
                    hover:-translate-y-1
                    transition-all
                    duration-300
                  "
                >
                  <div className="flex items-center gap-5">
                    {/* ICON */}

                    <div
                      className="
                        w-12
                        h-12
                        rounded-full
                        bg-[#f8f7f5]
                        flex
                        items-center
                        justify-center
                        text-lg
                        group-hover:bg-black
                        group-hover:text-white
                        transition
                      "
                    >
                      <Icon />
                    </div>

                    {/* TEXT */}

                    <div>
                      <h3 className="text-lg font-medium">{item.title}</h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <FiChevronRight
                    className="
                      text-gray-400
                      group-hover:text-black
                      group-hover:translate-x-1
                      transition
                      shrink-0
                    "
                  />
                </Link>
              );
            })}
          </div>
        </section>

        {/* ================= ACCOUNT DETAILS ================= */}

        <section className="mt-12">
          <div className="mb-6">
            <p
              className="
                uppercase
                tracking-[0.35em]
                text-[11px]
                text-gray-400
              "
            >
              Account
            </p>

            <h2 className="text-2xl font-light mt-2">Personal details</h2>
          </div>

          <div
            className="
              bg-white
              border
              border-gray-100
              rounded-[28px]
              divide-y
              divide-gray-100
              overflow-hidden
            "
          >
            {/* NAME */}

            <div className="px-7 py-6 flex justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                  Name
                </p>

                <p className="mt-2 text-gray-800">
                  {profile?.name || "Not added"}
                </p>
              </div>

              <FiUser className="text-gray-400 mt-1" />
            </div>

            {/* EMAIL */}

            <div className="px-7 py-6 flex justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                  Email
                </p>

                <p className="mt-2 text-gray-800">
                  {profile?.email || user?.email || "Not available"}
                </p>
              </div>

              <span className="text-xs text-gray-400 mt-1">Verified</span>
            </div>
          </div>
        </section>

        {/* ================= LOGOUT ================= */}

        <section className="mt-10">
          <button
            onClick={handleLogout}
            className="
              w-full
              bg-white
              border
              border-gray-100
              rounded-[24px]
              px-7
              py-5
              flex
              items-center
              justify-between
              text-red-500
              hover:bg-red-50
              hover:border-red-100
              transition
            "
          >
            <div className="flex items-center gap-4">
              <FiLogOut />

              <div className="text-left">
                <p className="font-medium">Sign out</p>

                <p className="text-xs text-gray-400 mt-1">
                  Sign out of your Euphoria account
                </p>
              </div>
            </div>

            <FiChevronRight />
          </button>
        </section>

        {/* ================= FOOTER NOTE ================= */}

        <div className="text-center mt-16">
          <p className="text-xs tracking-[0.25em] uppercase text-gray-300">
            Euphoria
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Crafted for those who wear their own story.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Profile;
