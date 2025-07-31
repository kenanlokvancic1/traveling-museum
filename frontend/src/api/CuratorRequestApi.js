import api from "./AxiosInstance";
import { getMyProfile } from "./UserApi";

export const createCuratorRequest = async (data) => {
  try {
    const userProfile = await getMyProfile();
    
    if (!userProfile?.id) {
      throw new Error("User not authenticated");
    }

    if (!data.message || !data.cv_url) {
      throw new Error("Missing required fields");
    }

    const requestData = {
      motivation: data.message,  
      cv_url: data.cv_url,
      additional_files: data.additional_files || [],
      user_id: userProfile.id
    };

    const res = await api.post('/curator-requests', requestData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    
    return res.data;
  } catch (err) {
    console.error("Complete error:", err);
    console.error("Request data that failed:", err.config?.data);
    if (err.response?.status === 500) {
      console.error("Server error details:", err.response.data);
      throw new Error(err.response.data.details || "Server error occurred");
    }
    throw err;
  }
};

export const getAllCuratorRequests = async () => {
  try {
    const res = await api.get('/curator-requests', {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch curator requests:", err.response?.data || err.message);
    throw err;
  }
};

export const getCuratorRequestById = async (id) => {
  try {
    const res = await api.get(`/curator-requests/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(`Error fetching curator request ${id}:`, err.response?.data || err.message);
    throw err;
  }
};

export const updateCuratorRequestStatus = async (id, status) => {
  try {
    const userProfile = await getMyProfile();
    
    if (!userProfile?.id || userProfile.role !== 'admin') {
      throw new Error("Unauthorized - Admin access required");
    }

    const res = await api.put(
      `/curator-requests/${id}/status`,
      { 
        status,
        admin_id: userProfile.id 
      }, 
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );
    
    return res.data;
  } catch (err) {
    console.error(`Error updating curator request status ${id}:`, err.response?.data);
    throw err;
  }
};

export const deleteCuratorRequest = async (id) => {
  try {
    const res = await api.delete(`/curator-requests/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(`Error deleting curator request ${id}:`, err.response?.data || err.message);
    throw err;
  }
};