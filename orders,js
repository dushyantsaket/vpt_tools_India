import express from "express";
import WarrantyClaim from "../models/WarrantyClaim.js";

const router = express.Router();

const normalizePhotoObject = (photo) => {
  if (!photo || typeof photo !== "object") return null;
  const { name, type, mimeType, dataUrl } = photo;
  return {
    name: name || null,
    mimeType: mimeType || type || null,
    dataUrl: dataUrl || null,
  };
};

const normalizePhotos = (photos) => {
  if (!photos || typeof photos !== "object") return {};
  return {
    problem: Array.isArray(photos.problem)
      ? photos.problem.map(normalizePhotoObject).filter(Boolean)
      : [],
    warranty: normalizePhotoObject(photos.warranty),
    invoice: normalizePhotoObject(photos.invoice),
    serial: normalizePhotoObject(photos.serial),
  };
};

router.post("/claims", async (req, res) => {
  console.log("[Warranty Claim] POST /claims received:", {
    bodyKeys: Object.keys(req.body || {}),
    contentType: req.headers["content-type"],
    hasPhotos: Boolean(req.body?.photos),
  });

  try {
    const body = req.body || {};
    const claim = await WarrantyClaim.create({
      productName: body.productName,
      modelNo: body.modelNo,
      invoiceNo: body.invoiceNo,
      customerName:
        body.customerName ||
        body.name ||
        body.customerEmail?.split("@")[0] ||
        "Customer",
      customerEmail: body.customerEmail,
      contactPhone: body.contactPhone || body.phone,
      address: body.address,
      purchaseDate: body.purchaseDate || undefined,
      reasons: Array.isArray(body.reasons) ? body.reasons : [],
      description: body.description || body.mainIssue,
      severity: body.severity || "Medium",
      photos: normalizePhotos(body.photos),
      status: "Pending",
    });

    console.log("[Warranty Claim] saved claim:", {
      claimId: claim.claimId,
      id: claim._id,
    });
    res.status(201).json({ success: true, data: claim });
  } catch (error) {
    console.error("[Warranty Claim] create error:", error);
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get("/claims/:claimId", async (req, res) => {
  try {
    const claim = await WarrantyClaim.findOne({
      $or: [{ claimId: req.params.claimId }, { _id: req.params.claimId }],
    });
    if (!claim)
      return res.status(404).json({ success: false, error: "Claim not found" });
    res.json({ success: true, data: claim });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
