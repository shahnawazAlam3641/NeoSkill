import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../api";

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    console.log(catalogData.CATALOGPAGEDATA_API);
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      {
        categoryId: categoryId,
      }
    );
    console.log(response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Catagory page data.");
    }
    result = response?.data;
  } catch (error) {
    console.log("CATALOGPAGEDATA_API API ERROR............", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
};
