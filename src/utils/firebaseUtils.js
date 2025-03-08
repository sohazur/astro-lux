import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

// Authentication functions
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Booking functions
export const addBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      ...bookingData,
      userId: auth.currentUser.uid,
      createdAt: new Date(),
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

export const getUserBookings = async () => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    const bookings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { bookings, error: null };
  } catch (error) {
    return { bookings: [], error: error.message };
  }
};

export const deleteBooking = async (bookingId) => {
  try {
    await deleteDoc(doc(db, "bookings", bookingId));
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateBooking = async (bookingId, updatedData) => {
  try {
    await updateDoc(doc(db, "bookings", bookingId), updatedData);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get destinations data
export const getDestinations = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "destinations"));
    const destinations = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { destinations, error: null };
  } catch (error) {
    return { destinations: [], error: error.message };
  }
};

// Get travel tips
export const getTravelTips = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "travelTips"));
    const tips = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { tips, error: null };
  } catch (error) {
    return { tips: [], error: error.message };
  }
};

// Get accommodations by destination
export const getAccommodationsByDestination = async (destination) => {
  try {
    const q = query(
      collection(db, "accommodations"),
      where("destination", "==", destination)
    );
    const querySnapshot = await getDocs(q);
    const accommodations = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { accommodations, error: null };
  } catch (error) {
    return { accommodations: [], error: error.message };
  }
};
