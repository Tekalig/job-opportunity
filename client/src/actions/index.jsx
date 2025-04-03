import { create } from "zustand";
import axios from "../api/axios";

const AuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isChackingAuth: false,
  isEmployer: false,
  jobs: [],
  applicants: [],
  experts: [],
  companies: [],

  signup: async (data, path) => {
    set({ isLoading: true, error: null });
    const { confirmPassword, ...signupData } = data;
    try {
      if (data.password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const response = await axios.post(path, { ...signupData });
      set({
        user: response?.data?.data || null,
        isAuthenticated: false,
        isLoading: false,
        isEmployer: response.data?.isEmployer || false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on signing up",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  verifyEmail: async (verificationToken, path) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.patch(path, {verificationToken });
      set({
        isEmployer: response.data?.isEmployer || null,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on verifying email",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  login: async (role, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`/${role}/login`, { email, password });
      set({
        user: response.data?.data || null,
        isAuthenticated: true,
        isLoading: false,
        isEmployer: response.data?.isEmployer || false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on logging in",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.get("/logout");
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        jobs: [],
        isEmployer: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error on logging out", isLoading: false });
      throw new Error(error);
    }
  },

  postJob: async (jobData) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post("/employer/postJob", { ...jobData });
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on posting job",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  getJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/expert/getJobs");
      set({ jobs: response.data?.jobs || [], isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on getting jobs",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  applyJob: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(
        "/expert/applyJob",
        { ...formData },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on applying job",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  getApplicant: async (jobId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/employer/applicants/${jobId}`);
      set({ applicants: response.data?.applicants || [], isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on getting applicants",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  getApplicants: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/employer/applicants");
      set({ applicants: response.data?.applicants || [], isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on getting applicants",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  examineApplicant: async (applicantId, status, jobId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.patch(`/employer/applicant`, { applicantId, status, jobId });
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on examining applicant",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  editJob: async (jobData, jobId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.patch(`/employer/editJob/${jobId}`, { ...jobData });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on editing job",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  deleteJob: async (jobId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`/employer/removeJob/${jobId}`);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on deleting job",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  editProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    const { isEmployer } = AuthStore.getState();

    try {
      if (isEmployer) {
        await axios.patch("/employer/editProfile", { ...profileData }, { headers: { "Content-Type": "multipart/form-data" }});
      } else {
        await axios.patch("/expert/editProfile", { ...profileData }, { headers: { "Content-Type": "multipart/form-data" }});
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on editing profile",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  getExperts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/expert/experts");
      set({ experts: response.data?.experts || [], isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on getting experts",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  getCompanies: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/employer/companies");
      set({ companies: response.data?.companies || [], isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error on getting companies",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  checkUserAuth: async (path) => {
    set({ isChackingAuth: true });
    try {
      const response = await axios.get(path);
      set({
        user: response.data?.data || null,
        isAuthenticated: true,
        isEmployer: response.data?.isEmployer || false,
        isChackingAuth: false,
      });
    } catch (error) {
      set({error:error.response.error?.message, isChackingAuth: false });
    }
  }
}));

export default AuthStore;
