import express from "express";
import Address from "../models/Address.js";

const router = express.Router();

// ======================================================
// CREATE ADDRESS
//
// POST /api/addresses
// ======================================================

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      label,
      fullName,
      email,
      phone,
      addressLine,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    if (!fullName) {
      return res.status(400).json({
        message: "Full name is required",
      });
    }

    if (!phone) {
      return res.status(400).json({
        message: "Phone number is required",
      });
    }

    if (!addressLine) {
      return res.status(400).json({
        message: "Address is required",
      });
    }

    if (!city) {
      return res.status(400).json({
        message: "City is required",
      });
    }

    if (!state) {
      return res.status(400).json({
        message: "State is required",
      });
    }

    if (!postalCode) {
      return res.status(400).json({
        message: "Postal code is required",
      });
    }

    // ==========================================
    // DEFAULT ADDRESS
    // ==========================================

    // If this address should become default,
    // remove default from all previous addresses.

    if (isDefault) {
      await Address.updateMany(
        { userId },
        {
          $set: {
            isDefault: false,
          },
        },
      );
    }

    // ==========================================
    // CREATE ADDRESS
    // ==========================================

    const address = new Address({
      userId,

      label: label || "home",

      fullName,

      email: email || "",

      phone,

      addressLine,

      city,

      state,

      postalCode,

      country: country || "India",

      isDefault: Boolean(isDefault),
    });

    await address.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(201).json({
      message: "Address saved successfully",

      address,
    });
  } catch (error) {
    console.error("Create address error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// GET USER ADDRESSES
//
// GET /api/addresses/user/:userId
// ======================================================

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const addresses = await Address.find({ userId }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.json(addresses);
  } catch (error) {
    console.error("Get addresses error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// GET SINGLE ADDRESS
//
// GET /api/addresses/:id
// ======================================================

router.get("/:id", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.json(address);
  } catch (error) {
    console.error("Get address error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// UPDATE ADDRESS
//
// PUT /api/addresses/:id
// ======================================================

router.put("/:id", async (req, res) => {
  try {
    const {
      label,
      fullName,
      email,
      phone,
      addressLine,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    // ==========================================
    // DEFAULT ADDRESS
    // ==========================================

    if (isDefault) {
      await Address.updateMany(
        {
          userId: address.userId,

          _id: {
            $ne: address._id,
          },
        },
        {
          $set: {
            isDefault: false,
          },
        },
      );
    }

    // ==========================================
    // UPDATE
    // ==========================================

    address.label = label || address.label;

    address.fullName = fullName || address.fullName;

    address.email = email !== undefined ? email : address.email;

    address.phone = phone || address.phone;

    address.addressLine = addressLine || address.addressLine;

    address.city = city || address.city;

    address.state = state || address.state;

    address.postalCode = postalCode || address.postalCode;

    address.country = country || address.country;

    address.isDefault =
      isDefault !== undefined ? Boolean(isDefault) : address.isDefault;

    await address.save();

    res.json({
      message: "Address updated successfully",

      address,
    });
  } catch (error) {
    console.error("Update address error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// SET DEFAULT ADDRESS
//
// PUT /api/addresses/:id/default
// ======================================================

router.put("/:id/default", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    // Remove default from other addresses

    await Address.updateMany(
      {
        userId: address.userId,

        _id: {
          $ne: address._id,
        },
      },
      {
        $set: {
          isDefault: false,
        },
      },
    );

    // Make this default

    address.isDefault = true;

    await address.save();

    res.json({
      message: "Default address updated",

      address,
    });
  } catch (error) {
    console.error("Set default address error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// DELETE ADDRESS
//
// DELETE /api/addresses/:id
// ======================================================

router.delete("/:id", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    const wasDefault = address.isDefault;

    const userId = address.userId;

    await Address.findByIdAndDelete(req.params.id);

    // ==========================================
    // IF DEFAULT WAS DELETED
    // MAKE ANOTHER ADDRESS DEFAULT
    // ==========================================

    if (wasDefault) {
      const nextAddress = await Address.findOne({ userId }).sort({
        createdAt: -1,
      });

      if (nextAddress) {
        nextAddress.isDefault = true;

        await nextAddress.save();
      }
    }

    res.json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Delete address error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
