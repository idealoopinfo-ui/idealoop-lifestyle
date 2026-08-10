import axios from "axios";

const GRAPH_API_VERSION = "v26.0";

/**
 * Publish a product to the Idealoop Lifestyle Facebook Page.
 *
 * Supports:
 * - title
 * - short description
 * - product highlights
 * - great-for points
 * - affiliate URL
 * - hashtags
 * - up to 5 product images
 */
export async function publishProductToFacebook({
    title,
    shortDescription = "",
    productHighlights = [],
    greatFor = [],
    affiliateUrl,
    images = [],
    hashtags = [],
    department = "",
  }) {
  // Read Facebook settings when the function runs
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const pageAccessToken =
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!pageId) {
    throw new Error("FACEBOOK_PAGE_ID is missing");
  }

  if (!pageAccessToken) {
    throw new Error(
      "FACEBOOK_PAGE_ACCESS_TOKEN is missing"
    );
  }

  if (!title?.trim()) {
    throw new Error("Product title is required");
  }

  if (!affiliateUrl?.trim()) {
    throw new Error("Affiliate URL is required");
  }

  // ---------------------------------------------
  // CLEAN PRODUCT IMAGES
  // ---------------------------------------------

  const validImages = Array.isArray(images)
    ? images
        .filter(
          (url) =>
            typeof url === "string" &&
            url.trim()
        )
        .map((url) => url.trim())
        .slice(0, 5)
    : [];

  // ---------------------------------------------
  // CLEAN PRODUCT HIGHLIGHTS
  // ---------------------------------------------

  const cleanHighlights = Array.isArray(
    productHighlights
  )
    ? productHighlights
        .filter(
          (item) =>
            typeof item === "string" &&
            item.trim()
        )
        .map((item) =>
          item.trim().replace(/^•\s*/, "")
        )
        .filter(Boolean)
    : [];

  // ---------------------------------------------
  // CLEAN GREAT-FOR ITEMS
  // ---------------------------------------------

  const cleanGreatFor = Array.isArray(greatFor)
    ? greatFor
        .filter(
          (item) =>
            typeof item === "string" &&
            item.trim()
        )
        .map((item) =>
          item.trim().replace(/^•\s*/, "")
        )
        .filter(Boolean)
    : [];

  // ---------------------------------------------
  // CLEAN HASHTAGS
  // ---------------------------------------------

  const cleanHashtags = Array.isArray(hashtags)
    ? hashtags
        .filter(
          (tag) =>
            typeof tag === "string" &&
            tag.trim()
        )
        .map((tag) =>
          tag.trim().replace(/^#/, "")
        )
        .filter(Boolean)
        .map((tag) => `#${tag}`)
    : [];

    const departmentKey = department
  .trim()
  .toLowerCase();

let greatForLabel = "Great for:";

if (departmentKey === "beauty") {
  greatForLabel = "💄 Perfect for:";
}

if (departmentKey === "home-living") {
  greatForLabel = "🏠 Perfect for:";
}

if (
  departmentKey === "toys-gifts"
) {
  greatForLabel = "🧸 Great for:";
}

if (
  departmentKey === "fitness-wellness" ||
  departmentKey === "fitness"
) {
  greatForLabel = "🏋️ Great for:";
}

if (departmentKey === "fashion") {
  greatForLabel = "👗 Great for:";
}

  // ---------------------------------------------
  // BUILD FACEBOOK MESSAGE
  // ---------------------------------------------

  const messageParts = [];

  // Title
  messageParts.push(`✨ ${title.trim()}`);

  // Description
  if (shortDescription?.trim()) {
    messageParts.push(
      shortDescription.trim()
    );
  }

  // Product highlights
  if (cleanHighlights.length > 0) {
    messageParts.push(
      "⭐ Product highlights:"
    );

    cleanHighlights.forEach((item) => {
      messageParts.push(`• ${item}`);
    });
  }

  // Great for
if (cleanGreatFor.length > 0) {
    messageParts.push(greatForLabel);
  
    cleanGreatFor.forEach((item) => {
      messageParts.push(`• ${item}`);
    });
  }

  // Affiliate link
  messageParts.push(
    "🛍️ Shop here:",
    affiliateUrl.trim()
  );

  // Hashtags
  if (cleanHashtags.length > 0) {
    messageParts.push(
      cleanHashtags.join(" ")
    );
  }

  const message =
    messageParts.join("\n\n");

  // ---------------------------------------------
  // PUBLISH TO FACEBOOK
  // ---------------------------------------------

  try {
    // -------------------------------------------
    // TEXT-ONLY POST
    // -------------------------------------------

    if (validImages.length === 0) {
      const response = await axios.post(
        `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/feed`,
        null,
        {
          params: {
            message,
            access_token:
              pageAccessToken,
          },
        }
      );

      return {
        success: true,
        postId:
          response.data?.id ?? null,
        imageCount: 0,
        message,
      };
    }

    // -------------------------------------------
// MULTI-IMAGE POST
// -------------------------------------------

const uploadedPhotoIds = [];

for (const imageUrl of validImages) {
  const photoResponse = await axios.post(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/photos`,
    null,
    {
      params: {
        url: imageUrl,
        published: false,
        access_token: pageAccessToken,
      },
    }
  );

  const photoId =
    photoResponse.data?.id;

  if (photoId) {
    uploadedPhotoIds.push(photoId);
  }
}

if (uploadedPhotoIds.length === 0) {
  throw new Error(
    "Facebook did not return any uploaded photo IDs"
  );
}

// -------------------------------------------
// CREATE FEED POST WITH ALL IMAGES
// -------------------------------------------

const attachedMedia = uploadedPhotoIds.map(
  (photoId) => ({
    media_fbid: photoId,
  })
);

const feedResponse = await axios.post(
  `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/feed`,
  null,
  {
    params: {
      message,
      attached_media: JSON.stringify(
        attachedMedia
      ),
      access_token: pageAccessToken,
    },
  }
);

return {
  success: true,
  postId:
    feedResponse.data?.id ?? null,
  imageCount:
    uploadedPhotoIds.length,
  message,
};

  } catch (error) {
    const facebookError =
      error.response?.data?.error;

    console.error(
      "Facebook Graph API error:",
      JSON.stringify(
        error.response?.data ??
          error.message,
        null,
        2
      )
    );

    throw new Error(
      facebookError?.message ||
        facebookError?.error_user_msg ||
        error.message ||
        "Facebook publishing failed"
    );
  }
}