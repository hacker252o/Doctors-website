import React, {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";

import EmergencyBanner from "../components/EmergencyBanner";

import Hero from "../components/Hero";

import Counters from "../components/Counters";

import About from "../components/About";

import Services from "../components/Services";

import WhyChooseUs from "../components/WhyChooseUs";


import Testimonials from "../components/Testimonials";


import Contact from "../components/Contact";

import Footer from "../components/Footer";

import FloatingWhatsApp from "../components/FloatingWhatsApp";

import LoadingScreen from "../components/LoadingScreen";

import AppointmentDialog from "../components/AppointmentDialog";

/* ---------- Component ---------- */

export default function HomePage() {

  const [dialogOpen, setDialogOpen] =
    useState(false);

  /* ---------- Auto Popup ---------- */

  useEffect(() => {

    const alreadySeen =
      sessionStorage.getItem(
        "appointment_popup_seen"
      );

    if (alreadySeen) {
      return;
    }

    const timer =
      setTimeout(() => {

        setDialogOpen(true);

        sessionStorage.setItem(
          "appointment_popup_seen",
          "true"
        );

      }, 18000);

    return () =>
      clearTimeout(timer);

  }, []);

  /* ---------- Open Dialog ---------- */

  const openDialog = () => {
    setDialogOpen(true);
  };

  return (
    <div className="bg-white">

      {/* ---------- Loading ---------- */}

      <LoadingScreen />

      {/* ---------- Top Banner ---------- */}

      <EmergencyBanner />

      {/* ---------- Navbar ---------- */}

      <Navbar
        onBook={openDialog}
      />

      {/* ---------- Main ---------- */}

      <main>

        <Hero
          onBook={openDialog}
        />

        <Counters />

        <About />

        <Services
          onBook={openDialog}
        />

        <WhyChooseUs />

      

        <Testimonials />

        

        <Contact />
      </main>

      {/* ---------- Footer ---------- */}

      <Footer />

      {/* ---------- WhatsApp ---------- */}

      <FloatingWhatsApp />

      {/* ---------- Appointment Dialog ---------- */}

      <AppointmentDialog
        open={dialogOpen}
        onOpenChange={
          setDialogOpen
        }
      />
    </div>
  );
}